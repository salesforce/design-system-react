'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.4.3

var propTypes = {
	/**
  * CSS class names to be added to the accordion component. _Tested with snapshot testing._
  */
	className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
	/**
  * HTML id for accordion component. _Tested with snapshot testing._
  */
	id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	/**
  * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
  *
  * Example:
  * ```
  * <SLDSAccordion>
  *   <SLDSAccordionpanel />
  *   <SLDSAccordionpanel />
  *   <SLDSAccordionpanel />
  * </SLDSAccordion>
  * ```
  */
	children: _propTypes2.default.node.isRequired
};

/**
 * An accordion allows a user to toggle the display of sections of content.
 * The accordion component wraps accordion panels that can be selected and expanded. It accepts children to define the content displayed within.
 */

var Accordion = function (_Component) {
	_inherits(Accordion, _Component);

	function Accordion() {
		_classCallCheck(this, Accordion);

		return _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).apply(this, arguments));
	}

	_createClass(Accordion, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.generatedId = _shortid2.default.generate();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'ul',
				{
					name: this.props.id || this.generatedId,
					className: (0, _classnames2.default)('slds-accordion', this.props.className)
				},
				this.props.children
			);
		}
	}]);

	return Accordion;
}(_react.Component);

exports.default = Accordion;


Accordion.displayName = _constants.ACCORDION;
Accordion.propTypes = propTypes;