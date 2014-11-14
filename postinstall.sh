#!/bin/bash

set -e

unset GIT_DIR

cd app
../node_modules/bower/bin/bower install
cd -

if [ "$NODE_ENV" == "production" ]; then
    ./node_modules/gulp/bin/gulp.js build:dist
    ./node_modules/gulp/bin/gulp.js clean
    rm -rf ./app ./test ./gulp
    mkdir -p ./app/js/lib
fi
