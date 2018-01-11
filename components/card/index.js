define(['exports', 'react', 'prop-types', 'classnames', './private/header', './private/body', './private/footer', './empty', '../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _header, _body, _footer, _empty, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.idSuffixes = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _header2 = _interopRequireDefault(_header);

	var _body2 = _interopRequireDefault(_body);

	var _footer2 = _interopRequireDefault(_footer);

	var _empty2 = _interopRequireDefault(_empty);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// ### classNames
	// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
	// This project uses `classnames`, "a simple javascript utility for conditionally
	// joining classNames together."
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// # Card Component

	// Implements the [Card design pattern](https://www.lightningdesignsystem.com/components/cards/) in React.
	// Based on SLDS v2.2.1

	// ### React
	var idSuffixes = {
		body: '__body',
		headerActions: '__header-actions',
		heading: '__heading',
		filter: '__filter-input'
	};

	/**
  * Cards are used to apply a container around a related grouping of information. It has a header, a body, and an optional footer. It often contains a DataTable or Tile (coming soon). Actions associated with selected items or with all items are included within the header actions. Footer often contains pagination.
  */


	// ## Children
	var Card = function Card(props) {
		var bodyId = props.id ? props.id + idSuffixes.body : null;
		var filterId = props.id ? props.id + idSuffixes.filter : null;
		var headingId = props.id ? props.id + idSuffixes.heading : null;
		var headerActionsId = props.id ? props.id + idSuffixes.headerActions : null;

		var empty = props.empty;

		if (empty === true) {
			// Can be overridden by passing in a node to the empty prop
			empty = _react2.default.createElement(_empty2.default, { id: props.id, heading: props.heading });
		}

		return _react2.default.createElement(
			'article',
			{
				id: props.id,
				className: (0, _classnames2.default)('slds-card', props.className),
				style: props.style
			},
			_react2.default.createElement(_header2.default, {
				header: props.header,
				headingId: headingId,
				icon: props.icon,
				filter: props.filter,
				filterId: filterId,
				heading: props.heading,
				headerActions: props.headerActions,
				headerActionsId: headerActionsId
			}),
			!empty ? _react2.default.createElement(
				_body2.default,
				{ id: bodyId, className: props.bodyClassName },
				props.children
			) : _react2.default.createElement(
				_body2.default,
				{ id: bodyId, className: props.bodyClassName },
				empty
			),
			props.footer ? _react2.default.createElement(
				_footer2.default,
				null,
				props.footer
			) : null
		);
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.
	Card.displayName = _constants.CARD;

	Card.defaultProps = {
		heading: 'Related Items'
	};

	// ### Prop Types
	Card.propTypes = {
		/**
   * CSS classes to be added to the card body (wraps children).
   */
		bodyClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * The main section of the card. It often contains a `DataTable` or `Tile`.
   */
		children: _propTypes2.default.node,
		/**
   * CSS classes to be added to the card.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Replaces the body (that is the children) with the specified empty state, this will also remove header actions, the filter, and the icon. If the default empty state is wanted, set to `true`.
   */
		empty: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.node]),
		/**
   * Adds a filter input to the card header.
   */
		filter: _propTypes2.default.node,
		/**
   * Footer often contains pagination.
   */
		footer: _propTypes2.default.node,
		/**
   * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed into the media object from Card if present. Use `design-system-react/components/media-object` to create your own custom header.
   */
		header: _propTypes2.default.node,
		/**
   * The heading is the name of the related item group and should only contain inline elements.
   */
		heading: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired,
		/**
   * Actions to perform on selected items or actions that are not specific to one item such as adding an item. If no group actions are needed, then the number of selected items is often present.
   */
		headerActions: _propTypes2.default.node,
		/**
   * Icon associated with the items within the `body`.
   */
		icon: _propTypes2.default.node,
		/**
   * Set the HTML `id` of the card. This also sets the `id` of the filter and the header actions.
   */
		id: _propTypes2.default.string,
		/**
   * Custom styles to be added to the card.
   */
		style: _propTypes2.default.object
	};

	exports.default = Card;
	exports.idSuffixes = idSuffixes;
});