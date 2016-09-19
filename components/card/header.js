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

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	var PropTypes = _react2.default.PropTypes;


	// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
	var idSuffixes = {
		headerActions: '__header-actions',
		heading: '__heading',
		filter: '__filter-input'
	};

	var renderFilter = function renderFilter(filter, id) {
		// allow id to be set by custom header component passed in
		var clonedFilter = _react2.default.cloneElement(filter, {
			id: filter.props.id || id
		});

		return _react2.default.createElement(
			'div',
			{ className: 'slds-input-has-icon slds-input-has-icon--left slds-size--1-of-3' },
			clonedFilter
		);
	};

	renderFilter.displayName = 'renderFilter';

	/**
  * Card Header is a private component and is not meant to be imported or used for Card's `header` prop. It just happens to have the same file name.
  */
	var CardHeader = function CardHeader(props) {
		var title = null;

		if (typeof props.heading === 'string' || props.heading instanceof String) {
			title = props.heading;
		}

		var heading = _react2.default.createElement(
			'h2',
			{
				id: props.headingId,
				className: 'slds-text-heading--small slds-truncate',
				title: title
			},
			props.heading
		);

		var Header = void 0;

		if (props.header) {
			Header = _react2.default.cloneElement(props.header, _extends({
				figure: props.icon,
				body: heading,
				verticalCenter: true,
				canTruncate: true
			}, props.header.props));
		} else {
			Header = _react2.default.createElement(_mediaObject2.default, {
				figure: props.icon,
				body: heading,
				verticalCenter: true,
				canTruncate: true
			});
		}

		var hasFilter = props.filter ? true : null;

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('slds-card__header', 'slds-grid') },
			Header,
			props.filter ? renderFilter(props.filter, props.filterId) : null,
			_react2.default.createElement(
				'div',
				{
					id: props.headerActionsId,
					className: (0, _classnames2.default)('slds-no-flex', {
						'slds-size--1-of-3': hasFilter,
						'slds-text-align--right': hasFilter
					})
				},
				props.headerActions
			)
		);
	};

	// ### Display Name
	// Always use the canonical component name as the React display name.
	CardHeader.displayName = _constants.CARD_HEADER;

	// ### Prop Types
	CardHeader.propTypes = {
		/**
   * Adds a filter input to the card header
   */
		filter: PropTypes.node,
		/**
   * Set the HTML `id` of the card filter.
   */
		filterId: PropTypes.string,
		/**
   * Allows a custom header (the media object with the icon in the first column). `icon`, `heading` and other props are passed in the media object from Card. Use `design-system-react/components/media-object` to create your own.
   */
		header: PropTypes.node,
		/**
   * Actions performed on selected items or that relate to the entire group of items such as "Add Item.""
   */
		headerActions: PropTypes.node,
		/**
   * Set the HTML `id` of the card header actions.
   */
		headerActionsId: PropTypes.string,
		/**
   * The heading is the name of the related item group.
   */
		heading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
		/**
   * Set the HTML `id` of the card heading.
   */
		headingId: PropTypes.string,
		/**
   * Icon associated with grouped items
   */
		icon: PropTypes.node
	};

	module.exports = CardHeader;
	module.exports.idSuffixes = idSuffixes;
});