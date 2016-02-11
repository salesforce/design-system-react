/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Generic Will Mount Mixin --- React Facade

// ## API

/* @todo Add a full API description of the control here. */

// ## Dependencies

// Bring in the [shared library functions](../../lib/lib.html).
import * as Lib from '../../lib/lib';

// ### ReactDOM
// ReactDOM is an external dependency of the project.
import ReactDOM                from 'react-dom';

// ## Generic Will Mount
const genericWillMount = {
	// ### Component Will Mount
	componentWillMount () {
		this.elements = {};
		if (Lib.isFunction(this._initialize)) this._initialize(this.props);
	},

	// ### Component Did Mount
	componentDidMount () {
		const node = ReactDOM.findDOMNode(this);
		if (node) {
			// If the render method returns `null` or `false`, then element is not set and should be set within the control object.
			this._setControlElement(Lib.wrapElement(node));
		}
	},

	// ### Set Control Element
	_setControlElement (element) {
		this.element = this.$el = this.elements.control = element;
		return element;
	},

	// ### Component Will Receive Props
	componentWillReceiveProps (nextProps) {
		// These are handled slightly differently than your average props, so they need to be kept in sync here
		if (nextProps.collection) {
			this._collection = this._getDataAdapter(nextProps.collection);
		}

		if (nextProps.id) {
			this.setState({ id: nextProps.id });
		}

		if (nextProps.strings) {
			this.setState({
				strings: Lib.extend({}, this.state.strings, nextProps.strings)
			});
		}
	},

	// ### Component Will Unmount
	componentWillUnmount () {
		// For React-specific cleanup delcaring `componentWillUnmount` at the control level will suffice, but an optional `_onDestroy` lifecycle method is also provided for cleanup at the core or trait level.
		if (Lib.isFunction(this._onDestroy)){
			return this._onDestroy();
		}
	}
};

export default genericWillMount;
