/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Data Table Component --- SLDS for React

// Implements the [Data Table design pattern](https://www.lightningdesignsystem.com/components/data-tables) in React.

// [![Data Table component example screenshot](/assets/demo-site/images/component-examples/data-table.png "Data Table component example screenshot")](/react/data-table)

// > See a [live example](/react/data-table) of the Data Table component in action

// ## Dependencies

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### React
// React is an external dependency of the project.
import React from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// SLDS for React uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together." Because of the small size of the library, the
// default build includes the entire library rather than requiring it as an
// external dependency.
import classNames from 'classnames';

// Removes the need for `React.PropTypes`.
const { PropTypes } = React;

// The component name will be used as the `DisplayName` and exported along with
// the component itself.
export const COMPONENT = 'DataTable';

/**
 * Description
 */
export const DataTableDefinition = {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: COMPONENT,

	// ### Prop Types
	propTypes: {
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(COMPONENT, this.props);
	},

	// ### Render
	render () {
		return null;
	}
};

const DataTable = React.createClass(DataTableDefinition);

export default DataTable;
