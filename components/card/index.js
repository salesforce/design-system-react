'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _empty = require('./empty');

var _empty2 = _interopRequireDefault(_empty);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the need for `PropTypes`.


// ## Children
/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Card Component

// Implements the [Card design pattern](https://www.lightningdesignsystem.com/components/cards/) in React.

// ### React
// React is an external dependency of the project.
var PropTypes = _react2.default.PropTypes;

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."

// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
var cssClasses = {
	base: 'slds-card'
};

/**
 * Cards are used to apply a container around a related grouping of information. It has a header, a body, and an optional footer. It often contains a DataTable or Tile (coming soon). Actions associated with selected items or with all items are included within the header actions. Footer often contains pagination.
 */
var Card = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.CARD,

	// ### Prop Types
	propTypes: {
		/**
   * CSS classes to be added to the card body (wraps children).
   */
		bodyClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * The main section of the card. It often contains a `DataTable` or `Tile`.
   */
		children: PropTypes.node,
		/**
   * CSS classes to be added to the card.
   */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
   * Replaces the body (that is the children) with the specified empty state, this will also remove header actions, the filter, and the icon. If the default empty state is wanted, set to `true`.
   */
		empty: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
		/**
   * Adds a filter input to the card header.
   */
		filter: PropTypes.node,
		/**
   * Footer often contains pagination.
   */
		footer: PropTypes.node,
		/**
   * The heading is the name of the related item group.
   */
		heading: PropTypes.string.isRequired,
		/**
   * Actions to perform on selected items or actions that are not specific to one item such as adding an item. If no group actions are needed, then the number of selected items is often present.
   */
		headerActions: PropTypes.node,
		/**
   * Icon associated with the items within the `body`.
   */
		icon: PropTypes.node,
		/**
   * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
   */
		id: PropTypes.string,
		/**
   * Custom styles to be added to the card.
   */
		style: PropTypes.object
	},

	getDefaultProps: function getDefaultProps() {
		return {
			id: _shortid2.default.generate(),
			heading: 'Related Items'
		};
	},
	renderFooter: function renderFooter() {
		return _react2.default.createElement(
			_footer2.default,
			null,
			this.props.footer
		);
	},
	renderBody: function renderBody(body) {
		return _react2.default.createElement(
			_body2.default,
			{ id: this.props.id, className: this.props.bodyClassName },
			body
		);
	},


	// Can be overridden by passing in a node to the empty prop
	renderDefaultEmpty: function renderDefaultEmpty() {
		return _react2.default.createElement(_empty2.default, { id: this.props.id, heading: this.props.heading });
	},


	// ### Render
	render: function render() {
		var style = this.props.style;
		var empty = this.props.empty;


		if (empty === true) {
			empty = this.renderDefaultEmpty();
		}
		return _react2.default.createElement(
			'div',
			{ id: this.props.id, className: (0, _classnames2.default)(cssClasses.base, this.props.className), style: style },
			_react2.default.createElement(_header2.default, {
				icon: empty ? null : this.props.icon,
				id: this.props.id,
				filter: this.props.filter,
				heading: this.props.heading,
				headerActions: empty ? null : this.props.headerActions
			}),
			!empty ? this.renderBody(this.props.children) : this.renderBody(empty),
			this.props.footer && !empty ? this.renderFooter() : null
		);
	}
});

module.exports = Card;
module.exports.cssClasses = cssClasses;