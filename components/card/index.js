define(['module', 'react', 'classnames', './header', './body', './footer', './empty', 'shortid', '../../utilities/constants'], function (module, _react, _classnames, _header, _body, _footer, _empty, _shortid, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _header2 = _interopRequireDefault(_header);

	var _body2 = _interopRequireDefault(_body);

	var _footer2 = _interopRequireDefault(_footer);

	var _empty2 = _interopRequireDefault(_empty);

	var _shortid2 = _interopRequireDefault(_shortid);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


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
			id: PropTypes.string
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
				{ id: this.props.id },
				body
			);
		},
		renderDefaultEmpty: function renderDefaultEmpty() {
			return _react2.default.createElement(_empty2.default, { id: this.props.id, heading: this.props.heading });
		},
		render: function render() {
			var empty = this.props.empty;

			if (empty === true) {
				empty = this.renderDefaultEmpty();
			}
			return _react2.default.createElement(
				'div',
				{ id: this.props.id, className: (0, _classnames2.default)(cssClasses.base, this.props.className) },
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
});