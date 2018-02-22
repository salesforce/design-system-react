define(['exports', 'react', 'prop-types', 'classnames', 'lodash.assign', '../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _lodash, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var propTypes = {
		/**
   * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button. _Tested with snapshot testing._
   */
		children: _propTypes2.default.node.isRequired,
		/**
   * CSS classes added to `slds-button-group` or `slds-checkbox--button-group` tag
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `error`: Message to display when any of Checkboxes are in an error state. _Tested with snapshot testing._
   * * `label`: This label appears above the button group. _Tested with snapshot testing._
   */
		labels: _propTypes2.default.shape({
			error: _propTypes2.default.string,
			label: _propTypes2.default.string
		}),
		/**
   * Use checkbox variant for "Checkbox Button Group" styling and add Checkbox components as children _Tested with snapshot testing._
   */
		variant: _propTypes2.default.oneOf(['checkbox'])
	}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// Implements the [Button Group design pattern](https://lightningdesignsystem.com/components/button-groups/) in React.
	// Based on SLDS v2.1.1

	var defaultProps = { labels: {} };

	/**
  * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, Checkboxes, etc).
  */
	var ButtonGroup = function ButtonGroup(props) {
		// Merge objects of strings with their default object
		var labels = props ? (0, _lodash2.default)({}, defaultProps.labels, props.labels) : defaultProps.labels;

		var children = props.children;
		var zeroIndexLength = _react2.default.Children.count(props.children) - 1;

		if (zeroIndexLength > 0) {
			children = _react2.default.Children.map(props.children, function (child, index) {
				var newChild = void 0;
				if (index === zeroIndexLength) {
					newChild = _react2.default.cloneElement(child, {
						triggerClassName: 'slds-button--last'
					});
				}

				return newChild || child;
			});
		}

		if (props.variant === 'checkbox') {
			children = _react2.default.Children.map(props.children, function (child) {
				return _react2.default.cloneElement(child, {
					variant: 'button-group'
				});
			});
		}

		if (props.variant === 'checkbox') {
			return _react2.default.createElement(
				'fieldset',
				{
					className: (0, _classnames2.default)('slds-form-element', {
						'slds-has-error': labels.error
					})
				},
				_react2.default.createElement(
					'legend',
					{ className: 'slds-form-element__legend slds-form-element__label' },
					props.labels.label
				),
				_react2.default.createElement(
					'div',
					{ className: 'slds-form-element__control' },
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('slds-checkbox--button-group', props.className)
						},
						children
					),
					labels.error ? _react2.default.createElement(
						'div',
						{ className: 'slds-form-element__help' },
						labels.error
					) : null
				)
			);
		}
		// default
		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-button-group', props.className),
				role: 'group'
			},
			children
		);
	};

	ButtonGroup.displayName = _constants.BUTTON_GROUP;
	ButtonGroup.propTypes = propTypes;
	ButtonGroup.defaultProps = defaultProps;

	exports.default = ButtonGroup;
});