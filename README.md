# WeTravel

A legacy travel application with a React/TypeScript frontend in `wetravel/` and an Express/Mongoose API in `server.ts`. This repository needs further setup and application testing before it can serve as a runnable portfolio showcase.

## API database configuration

The API requires `MONGODB_URI`. There is no default database or embedded credential. Use a new credential for a database you control; a credential previously committed to this repository must be rotated at the database provider because it remains in Git history.

From the repository root, install the locked API dependencies, copy the example, and edit `.env` to contain your connection URI:

```sh
npm ci --ignore-scripts
cp .env.example .env
```

The API does not automatically load `.env`. In a POSIX-compatible shell, export its values before starting:

```sh
set -a
. ./.env
set +a
npx ts-node server.ts
```

Do not commit `.env`. Missing or blank configuration fails before a database connection is attempted. The API starts its existing HTTP listener only after MongoDB connects. Initial connection failures print a credential-free message and produce a nonzero process exit code.

## Verify this configuration change

With Node.js 22 or newer and the locked API dependencies installed:

```sh
sh .claude/docs-first/verify.sh
```

The startup tests execute the actual TypeScript server source with an isolated Express/database boundary. They check missing and blank configuration, propagation of a configured URI, waiting for database readiness, and safe failure reporting. They do not connect to a database or establish end-to-end application correctness. The root `npm test` script remains the repository's existing placeholder.
