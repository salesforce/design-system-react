define(['exports', 'react', 'classnames', '../../../utilities/constants'], function (exports, _react, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var TabsList = function TabsList(_ref) {
		var id = _ref.id,
		    className = _ref.className,
		    children = _ref.children,
		    variant = _ref.variant,
		    attributes = _objectWithoutProperties(_ref, ['id', 'className', 'children', 'variant']);

		return _react2.default.createElement(
			'ul',
			{
				id: id + '-slds-tabs__nav',
				className: (0, _classnames2.default)(className, {
					'slds-tabs--default__nav': variant === 'default',
					'slds-tabs--scoped__nav': variant === 'scoped'
				}),
				role: 'tablist'
			},
			children
		);
	};

	TabsList.displayName = _constants.TABS_LIST;

	TabsList.propTypes = {
		/**
   * Inherits the `id` from the parent `<Tabs />` component and appends `-tabs__nav`. Becomes the HTML `id` attribute of UL element that has the class `.slds-tabs--default__nav` on it.
   */
		id: _react.PropTypes.string,

		/**
   * Class names to be added to the tabs list element.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),

		/**
   * The `children` are the actual tabs to be rendered as `li` elements. They get created by [tabs/index.jsx](./index.jsx) in the `renderTabsList` function.
   */
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]),

		/**
   * If the Tabs should be scopped, defaults to false
   */
		variant: _react2.default.PropTypes.oneOf(['default', 'scoped'])
	};

	exports.default = TabsList;
});