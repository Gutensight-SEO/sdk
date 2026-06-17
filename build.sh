#!/bin/bash

set -e

rm -rf ./dist
rm -rf /home/ennas/.nvm/versions/node/v25.9.0/bin/seo

# npm run prepare
npm run build

npm unlink gutensight

npm link


# npm publish --access public