const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const serverPath = path.join(__dirname, '..', 'server.ts');
const source = fs.readFileSync(serverPath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  fileName: serverPath,
});

/** Execute the real server source with deterministic, network-free boundaries. */
function createServer(environment, connectionResult) {
  const calls = { connections: [], listeners: [], errors: [] };
  const app = {
    use() {},
    get() {},
    post() {},
    listen(port, onReady) {
      calls.listeners.push(port);
      onReady();
    },
  };
  const express = Object.assign(() => app, { json: () => ({}) });
  const context = {
    exports: {},
    process: { env: environment, exitCode: undefined },
    console: { log() {}, error: (message) => calls.errors.push(message) },
    require(name) {
      if (name === 'express') return express;
      if (name === 'cors') return () => ({});
      if (name.startsWith('./Database/')) return {};
      if (name === 'mongoose') {
        return {
          connect(uri) {
            calls.connections.push(uri);
            return connectionResult();
          },
        };
      }
      throw new Error(`Unexpected server dependency: ${name}`);
    },
  };
  return {
    calls,
    context,
    run: () => vm.runInNewContext(compiled.outputText, context, { filename: serverPath }),
  };
}

test('missing and blank database URIs fail before any external connection', () => {
  for (const environment of [{}, { MONGODB_URI: '' }, { MONGODB_URI: '   ' }]) {
    const server = createServer(environment, () => Promise.resolve());
    assert.throws(server.run, /MONGODB_URI is required/);
    assert.equal(server.calls.connections.length, 0);
    assert.equal(server.calls.listeners.length, 0);
  }
});

test('the configured URI is passed through and listener waits for connection', async () => {
  const uri = 'mongodb://database.invalid/travel';
  let resolveConnection;
  const connected = new Promise((resolve) => { resolveConnection = resolve; });
  const server = createServer({ MONGODB_URI: `  ${uri}  ` }, () => connected);
  const startup = server.run();
  assert.deepEqual(server.calls.connections, [uri]);
  assert.equal(server.calls.listeners.length, 0);
  resolveConnection();
  await startup;
  assert.equal(server.calls.listeners.length, 1);
  assert.equal(server.calls.errors.length, 0);
  assert.equal(server.context.process.exitCode, undefined);
});

test('initial connection failure never listens or logs connection details', async () => {
  const uri = 'mongodb://database.invalid/travel';
  const privateFailure = 'connection details that must not be logged';
  const server = createServer({ MONGODB_URI: uri }, () => Promise.reject(new Error(privateFailure)));
  await server.run();
  assert.equal(server.calls.listeners.length, 0);
  assert.equal(server.context.process.exitCode, 1);
  assert.deepEqual(server.calls.errors, [
    'MongoDB connection failed. Check MONGODB_URI and database access.',
  ]);
  assert.equal(server.calls.errors.join('').includes(privateFailure), false);
  assert.equal(server.calls.errors.join('').includes(uri), false);
});
