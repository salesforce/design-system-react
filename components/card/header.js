define(['module', 'react', 'classnames', '../media-object', '../../utilities/constants'], function (module, _react, _classnames, _mediaObject, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _mediaObject2 = _interopRequireDefault(_mediaObject);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
	var cssClasses = {
		base: 'slds-card__header'
	};

	var idSuffixes = {
		headerActions: '__header-actions',
		heading: '__heading'
	};

	// ## CardHeaderDefinition
	var CardHeader = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.CARD_HEADER,
		// ### Prop Types
		propTypes: {
			/**
    * Adds a filter input to the card header
    */
			filter: PropTypes.node,
			/**
    * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
    */
			headerActions: PropTypes.node,
			/**
    * The heading is the name of the related item group.
    */
			heading: PropTypes.string.isRequired,
			/**
    * Icon associated with grouped items
    */
			icon: PropTypes.node,
			/**
    * Set the HTML `id` of the card filter and header actions.
    */
			id: PropTypes.string.isRequired
		},

		renderFilter: function renderFilter() {
			var filter = _react2.default.cloneElement(this.props.filter, {
				id: this.props.id
			});

			return _react2.default.createElement(
				'div',
				{ className: 'slds-input-has-icon slds-input-has-icon--left slds-size--1-of-3' },
				filter
			);
		},
		renderMediaObjectBody: function renderMediaObjectBody() {
			return _react2.default.createElement(
				'h2',
				{
					id: this.props.id + idSuffixes.heading,
					className: 'slds-text-heading--small slds-truncate',
					title: this.props.heading
				},
				this.props.heading
			);
		},
		render: function render() {
			var filter = null;
			var hasFilter = this.props.filter ? true : null;

			if (this.props.filter) {
				filter = this.renderFilter();
			}

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(cssClasses.base, 'slds-grid') },
				_react2.default.createElement(_mediaObject2.default, {
					figure: this.props.icon,
					body: this.renderMediaObjectBody(),
					verticalCenter: true,
					canTruncate: true
				}),
				filter,
				_react2.default.createElement(
					'div',
					{
						id: this.props.id + idSuffixes.headerActions,
						className: (0, _classnames2.default)('slds-no-flex', { 'slds-size--1-of-3': hasFilter, 'slds-text-align--right': hasFilter })
					},
					this.props.headerActions
				)
			);
		}
	});

	module.exports = CardHeader;
	module.exports.cssClasses = cssClasses;
	module.exports.idSuffixes = idSuffixes;
});