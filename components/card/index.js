define(['module', 'react', 'classnames', './header', './body', './footer', './empty', '../../utilities/constants'], function (module, _react, _classnames, _header, _body, _footer, _empty, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

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

	var PropTypes = _react2.default.PropTypes;


	/**
  * Cards are used to apply a container around a related grouping of information. It has a header, a body, and an optional footer. It often contains a DataTable or Tile (coming soon). Actions associated with selected items or with all items are included within the header actions. Footer often contains pagination.
  */
	var Card = function Card(props) {
		var empty = props.empty;

		if (empty === true) {
			// Can be overridden by passing in a node to the empty prop
			empty = _react2.default.createElement(_empty2.default, { id: props.id, heading: props.heading });
		}

		return _react2.default.createElement(
			'div',
			{ id: props.id, className: (0, _classnames2.default)('slds-card', props.className), style: props.style },
			_react2.default.createElement(_header2.default, {
				header: props.header,
				icon: empty ? null : props.icon,
				id: props.id,
				filter: props.filter,
				heading: props.heading,
				headerActions: empty ? null : props.headerActions
			}),
			!empty ? _react2.default.createElement(
				_body2.default,
				{ id: props.id, className: props.bodyClassName },
				props.children
			) : _react2.default.createElement(
				_body2.default,
				{ id: props.id, className: props.bodyClassName },
				empty
			),
			props.footer && !empty ? _react2.default.createElement(
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
   * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed into the media object from Card if present. Use `design-system-react/components/media-object` to create your own custom header.
   */
		header: PropTypes.node,
		/**
   * The heading is the name of the related item group and should only contain inline elements.
   */
		heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
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
	};

	module.exports = Card;
});