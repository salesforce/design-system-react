/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* eslint-disable camelcase */
var argv = require('minimist')(process.argv.slice(2));
var isProd = argv.prod === true;
var _ = require('lodash');

var path = require('path');

var root = path.resolve(__dirname, '../../');
var app_modules = path.resolve(root, 'app_modules');
var node_modules = path.resolve(root, 'node_modules');

var paths = {
	'app_modules': app_modules,
	'assets': path.resolve(root, 'public/assets'),
	'build': path.resolve(root, 'build'),
	'content_base': path.resolve(root, 'public'),
	'dist': path.resolve(root, '.dist'),
	'docs': path.resolve(root, 'docs'),
	'generated': path.resolve(root, '.generated'),
	'node_modules': node_modules,
	'root': root,
	'sample_data': path.resolve(root, 'utilities/sample-data'),
	'scripts': path.resolve(root, 'scripts'),
	'scss': path.resolve(root, 'scss'),
	'site': path.resolve(root, 'site'),
	'site_assets': path.resolve(root, 'public/assets/facades'),
	'slds': path.resolve(node_modules, '@salesforce-ux/design-system'),
	'slds_assets': path.resolve(node_modules, '@salesforce-ux/design-system/assets'),
	// 'slds_public_assets': path.resolve(root, 'public/assets/design-system'),
	'slds_public_assets': path.resolve(root, 'public/assets'),
	'source_files': path.resolve(root, 'src'),
	'tmp': path.resolve(root, '.tmp'),
	'utilities': path.resolve(root, 'utilities'),
	'views': path.resolve(root, 'site/views'),
	'www': path.resolve(root, '.www')
};

module.exports = {

	/**
	 * Make __PATHS__ available in all modules
	 */
	install: function () {
		global.__PATHS__ = paths;
		global.__NODE_MODULES_PATTERN__ = new RegExp(
			_.escapeRegExp(path.resolve(root, 'node_modules'))
		);
	}

};
