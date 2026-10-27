# Versioned API evidence

Versions were resolved from `package-lock.json` and confirmed in an isolated `npm ci --ignore-scripts` installation: mongoose 6.2.2, TypeScript 4.5.5, ts-node 10.5.0. Verification ran on Node.js v26.3.0. Context7 was consulted first; its current Mongoose answer was checked against the versioned official source below.

| symbol | package@version | source | quote |
| --- | --- | --- | --- |
| `mongoose.connect(uri).then(...).catch(...)` | mongoose@6.2.2 | https://github.com/Automattic/mongoose/blob/6.2.2/docs/connections.md#error-handling | “To handle initial connection errors, you should use `.catch()` or `try/catch` with async/await.” |
| `process.env.MONGODB_URI` | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/process.md#processenv | “The `process.env` property returns an object containing the user environment.” |
| `process.exitCode` | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/process.md#processexitcode | “A number which will be the process exit code” |
| `ts.transpileModule(input, options)` | typescript@4.5.5 | https://github.com/microsoft/TypeScript/blob/v4.5.5/src/services/transpile.ts | “This function will compile source text from 'input' argument using specified compiler options.” |
| `fs.readFileSync(path, 'utf8')` | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/fs.md#fsreadfilesyncpath-options | “If the `encoding` option is specified then this function returns a string.” |
| `path.join(...paths)` | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/path.md#pathjoinpaths | “The `path.join()` method joins all given `path` segments together” |
| `vm.runInNewContext(code, context, options)` | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/vm.md#vmruninnewcontextcode-contextobject-options | “One can provide the context by [_contextifying_][contextified] an object.” |
| `test(name, fn)` | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/test.md | “The `node:test` module facilitates the creation of JavaScript tests.” |
| `assert.equal`, `assert.deepEqual`, `assert.throws` in strict mode | node@26.3.0 | https://github.com/nodejs/node/blob/v26.3.0/doc/api/assert.md | “In strict assertion mode, non-strict methods behave like their corresponding strict methods.” |

## Verification scope

The regression suite isolates database and HTTP boundaries; it makes no network requests. A separate TypeScript 4.5.5 compilation of the updated server and unchanged `Database/` sources passed with `noImplicitAny`, `esModuleInterop`, and Node types. A real database connection and the legacy frontend were not exercised. Existing dependency vulnerabilities and unrelated API validation/authentication gaps remain outside this repair.
