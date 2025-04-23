#!/bin/bash

set -e

rm -rf ./dist
rm -rf /home/ennas/.nvm/versions/node/v23.10.0/bin/seo

# npm run prepare
npm run build

npm unlink gutensight

npm link
