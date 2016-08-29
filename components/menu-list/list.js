define(['module', 'react', 'classnames', './list-item', '../../utilities/constants'], function (module, _react, _classnames, _listItem, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _listItem2 = _interopRequireDefault(_listItem);

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


	/**
  * Component description.
  */
	var List = _react2.default.createClass({
		displayName: _constants.LIST,

		propTypes: {
			/**
    * Determines whether or not to show a checkmark for selected items.
    */
			checkmark: PropTypes.bool,
			/**
    * CSS classes to be added to `<ul />`.
    */
			className: PropTypes.string,
			/**
    * Used internally to determine the id that will be used for list items.
    */
			getListItemId: PropTypes.func,
			/**
    * Used internally to pass references to the individual menu items back up for focusing / scrolling.
    */
			itemRefs: PropTypes.func,
			/**
    * If provided, this function will be used to render the contents of each menu item.
    */
			itemRenderer: PropTypes.func,
			/**
    * Sets the height of the list based on the numeber of items.
    */
			length: PropTypes.oneOf([null, '5', '7', '10']),
			/**
    * Triggered when a list item is selected (via mouse or keyboard).
    */
			onSelect: PropTypes.func,
			/**
    * An array of items to render in the list.
    */
			options: PropTypes.array,
			/**
    * The index of the currently selected item in the list.
    */
			selectedIndex: PropTypes.number,
			/**
    * The id of the element which triggered this list (in a menu context).
    */
			triggerId: PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				length: '5',
				options: [],
				selectedIndex: -1
			};
		},
		getItems: function getItems() {
			var _this = this;

			return this.props.options.map(function (option, index) {
				var id = _this.props.getListItemId(index);

				return _react2.default.createElement(_listItem2.default, _extends({}, option, {
					checkmark: _this.props.checkmark,
					data: option,
					id: id,
					index: index,
					isSelected: index === _this.props.selectedIndex,
					key: id + '-' + option.value,
					labelRenderer: _this.props.itemRenderer,
					onSelect: _this.props.onSelect,
					ref: function ref(listItem) {
						return _this.props.itemRefs(listItem, index);
					}
				}));
			});
		},
		render: function render() {
			var lengthClassName = void 0;
			if (this.props.length) {
				lengthClassName = 'slds-dropdown--length-' + this.props.length;
			}

			return _react2.default.createElement(
				'ul',
				{
					'aria-labelledby': this.props.triggerId,
					className: (0, _classnames2.default)('dropdown__list', lengthClassName, this.props.className),
					role: 'menu'
				},
				this.getItems()
			);
		}
	});

	module.exports = List;
});