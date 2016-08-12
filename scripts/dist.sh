#!/bin/bash

# Copyright (c) 2015, salesforce.com, inc. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
# Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
# Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
# Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

./node_modules/.bin/babel-node scripts/inline-icons.js

echo "# Building design-system-react"
echo "## Preparing the .tmp directory"

rm -rf .tmp/
rm -rf .tmp-amd/
rm -rf .tmp-commonjs/
rm -rf .tmp-es/
mkdir -p .tmp/

echo "## Running webpack"

BUILD="./node_modules/.bin/webpack --config webpack.config.dist.js"

eval $BUILD
eval "MINIFY=1 $BUILD"

echo "## Cloning additional files"

cp .gitignore .tmp/.gitignore
cp LICENSE .tmp/LICENSE
cp CONTRIBUTING.md .tmp/CONTRIBUTING.md
cp package.json .tmp/package.json
cp README-dist.md .tmp/README.md

echo "## Running js steps"

./node_modules/.bin/babel-node scripts/dist.js

echo "## Copying the components"

cp -r .tmp .tmp-amd
cp -r .tmp .tmp-commonjs
cp -r .tmp .tmp-es
rm -rf .tmp/

cp -r components .tmp-es/components
cp -r icons .tmp-es/icons
cp -r utilities .tmp-es/utilities

echo "## Transpiling with Babel"

./node_modules/.bin/babel --plugins transform-es2015-modules-amd .tmp-es/components -d .tmp-amd/components
./node_modules/.bin/babel --plugins transform-es2015-modules-amd .tmp-es/icons -d .tmp-amd/icons
./node_modules/.bin/babel --plugins transform-es2015-modules-amd .tmp-es/utilities -d .tmp-amd/utilities

./node_modules/.bin/babel --plugins transform-es2015-modules-commonjs .tmp-es/components -d .tmp-commonjs/components
./node_modules/.bin/babel --plugins transform-es2015-modules-commonjs .tmp-es/icons -d .tmp-commonjs/icons
./node_modules/.bin/babel --plugins transform-es2015-modules-commonjs .tmp-es/utilities -d .tmp-commonjs/utilities
