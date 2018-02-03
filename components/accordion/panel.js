'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	/**
  * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
  */
	children: _propTypes2.default.node,
	/**
  * Indicates whether item is expanded or not, which should be handled by `onTogglePanel`. _Tested with Mocha framework and snapshot testing._
  */
	expanded: _propTypes2.default.bool.isRequired,
	/**
  * Id of the item belonging to this panel. _Tested with snapshot testing._
  */
	id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
	/**
  * Component that can be passed as prop to `<Panel />`. As an example, a menu dropdown could be used here to handle additional actions for each accordion panel. _Tested with Mocha framework._
  */
	panelContentActions: _propTypes2.default.node,
	/**
  * Callback that will run whenever a panel is toggled. Function should handle state to toggle `expanded` prop. _Tested with Mocha framework._
  */
	onTogglePanel: _propTypes2.default.func.isRequired,
	/**
  * Summary in the span element in the header of this panel. The summary is truncated and so the title element should contain the full text so that it is accessible on hover. _Tested with snapshot testing._
  */
	summary: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]).isRequired,
	/**
  * HTML title attribute. _Tested with snapshot testing._
  */
	title: _propTypes2.default.string
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.3.2

var AccordionPanel = function AccordionPanel(_ref) {
	var children = _ref.children,
	    expanded = _ref.expanded,
	    id = _ref.id,
	    panelContentActions = _ref.panelContentActions,
	    summary = _ref.summary,
	    title = _ref.title,
	    onTogglePanel = _ref.onTogglePanel;
	return _react2.default.createElement(
		'li',
		{ className: 'slds-accordion__list-item' },
		_react2.default.createElement(
			'section',
			{
				className: (0, _classnames2.default)('slds-accordion__section', {
					'slds-is-open': expanded
				})
			},
			_react2.default.createElement(
				'div',
				{ className: 'slds-accordion__summary' },
				_react2.default.createElement(
					'h3',
					{ className: 'slds-text-heading_small slds-accordion__summary-heading slds-has-flexi-truncate' },
					_react2.default.createElement(
						_button2.default,
						{
							'aria-controls': id + '-accordion-panel',
							'aria-expanded': expanded,
							className: 'slds-button_reset slds-accordion__summary-action',
							iconClassName: 'slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left',
							iconName: 'switch',
							onClick: onTogglePanel,
							variant: 'base'
						},
						_react2.default.createElement(
							'span',
							{ className: 'slds-truncate', title: title || summary },
							summary
						)
					)
				),
				panelContentActions
			),
			_react2.default.createElement(
				'div',
				{
					'aria-hidden': !expanded,
					className: 'slds-accordion__content',
					id: id + '-accordion-panel'
				},
				children
			)
		)
	);
};

exports.default = AccordionPanel;


AccordionPanel.propTypes = propTypes;
AccordionPanel.displayName = _constants.ACCORDION_PANEL;