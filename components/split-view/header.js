define(['exports', 'react', 'classnames', '../page-header', '../../utilities/constants'], function (exports, _react, _classnames, _pageHeader, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _pageHeader2 = _interopRequireDefault(_pageHeader);

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

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var propTypes = {};

	var defaultProps = {};
	/**
  * The Split View Header takes the same properties as the Page Header component. See: [PageHeader](https://react.lightningdesignsystem.com/components/page-headers/)
  * @param props {object} Page Header properties
  */
	var SplitViewHeader = function SplitViewHeader(_ref) {
		var className = _ref.className,
		    rest = _objectWithoutProperties(_ref, ['className']);

		return _react2.default.createElement(_pageHeader2.default, _extends({
			className: (0, _classnames2.default)('slds-split-view__header slds-has-bottom-magnet', className)
		}, rest));
	};

	SplitViewHeader.displayName = _constants.SPLIT_VIEW_HEADER;
	SplitViewHeader.propTypes = propTypes;
	SplitViewHeader.defaultProps = defaultProps;

	exports.default = SplitViewHeader;
});