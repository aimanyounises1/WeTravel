#!/bin/sh
set -eu

git diff --check
node --test tests/database-startup.test.cjs
printf '%s\n' 'Database startup verification passed.'
