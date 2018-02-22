define(['exports', 'react', 'create-react-class', 'prop-types', 'classnames', './item', '../../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _classnames, _item, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _item2 = _interopRequireDefault(_item);

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

	/**
  * Component description.
  */
	var List = (0, _createReactClass2.default)({
		displayName: _constants.LIST,

		propTypes: {
			/**
    * Determines whether or not to show a checkmark for selected items.
    */
			checkmark: _propTypes2.default.bool,
			/**
    * CSS classes to be added to `<ul />`.
    */
			className: _propTypes2.default.string,
			/**
    * Used internally to determine the id that will be used for list items.
    */
			getListItemId: _propTypes2.default.func,
			/**
    * Used internally to pass references to the individual menu items back up for focusing / scrolling.
    */
			itemRefs: _propTypes2.default.func,
			/**
    * If provided, this function will be used to render the contents of each menu item.
    */
			itemRenderer: _propTypes2.default.func,
			/**
    * Sets the height of the list based on the numeber of items.
    */
			length: _propTypes2.default.oneOf([null, '5', '7', '10']),
			/**
    * Triggered when a list item is selected (via mouse or keyboard).
    */
			onSelect: _propTypes2.default.func,
			/**
    * An array of items to render in the list.
    */
			options: _propTypes2.default.array,
			/**
    * The index of the currently selected item in the list.
    */
			selectedIndex: _propTypes2.default.number,
			/**
    * The id of the element which triggered this list (in a menu context).
    */
			triggerId: _propTypes2.default.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				length: '5',
				options: [],
				selectedIndex: -1
			};
		},
		render: function render() {
			var _this = this;

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
				this.props.options.map(function (option, index) {
					var id = _this.props.getListItemId(index);
					var isSingleSelected = index === _this.props.selectedIndex;
					var isMultipleSelected = !!_this.props.selectedIndices && _this.props.selectedIndices.indexOf(index) !== -1;
					return _react2.default.createElement(_item2.default, _extends({}, option, {
						'aria-disabled': option.disabled,
						checkmark: _this.props.checkmark && (isSingleSelected || isMultipleSelected),
						data: option,
						id: id,
						index: index,
						isSelected: isSingleSelected || isMultipleSelected,
						key: id + '-' + option.value,
						labelRenderer: _this.props.itemRenderer,
						onSelect: _this.props.onSelect,
						ref: function ref(listItem) {
							return _this.props.itemRefs(listItem, index);
						}
					}));
				})
			);
		}
	});

	exports.default = List;
});