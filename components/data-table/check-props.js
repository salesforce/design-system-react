'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deprecatedProperty = require('../../utilities/warning/deprecated-property');

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _sunsetProperty = require('../../utilities/warning/sunset-property');

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/* eslint-disable import/no-mutable-exports */

var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		(0, _deprecatedProperty2.default)(COMPONENT, props.collection, 'collection', 'items');
		(0, _deprecatedProperty2.default)(COMPONENT, props.onSelect, 'onSelect', 'onChange');
		(0, _deprecatedProperty2.default)(COMPONENT, props.onDeselect, 'onDeselect', 'onChange');
		(0, _sunsetProperty2.default)(COMPONENT, props.sortable, 'sortable', 'The table is sortable if one or more of its columns are sortable.');

		// Deprecated and moved to a child
		(0, _sunsetProperty2.default)(COMPONENT, props.columns, 'columns', 'Please provide one or more children of the type <Column /> instead.');
		/* eslint-enable max-len */
	};
}

exports.default = checkProps;