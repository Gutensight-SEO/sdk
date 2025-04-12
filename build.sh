#!/bin/bash

set -e

rm -rf ./dist
rm -rf /home/ennas/.nvm/versions/node/v23.10.0/bin/seo

# npm run prepare
npm run build

npm unlink gutensight

# rm -rf ./sample 

npm link

# mkdir sample

# cd sample && npm init -y
# cd sample && rm seo.config.ts 
# cd sample/public && rm seo-map.json sitemap.xml robots.txt

# cp -r ./../../gutensight-ui/* ./