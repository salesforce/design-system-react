define(['module', 'react', 'classnames', '../../utilities/constants'], function (module, _react, _classnames, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	var auditChildren = function auditChildren(children) {
		var primaryRegion = void 0;
		// there can be multiple secondary navigation regions
		var secondaryRegions = [];
		var tertiaryRegion = void 0;

		_react2.default.Children.forEach(children, function (child) {
			if (child && child.type.displayName === _constants.GLOBAL_NAVIGATION_BAR_REGION) {
				if (child.props.region === 'primary') {
					primaryRegion = child;
				} else if (child.props.region === 'secondary') {
					secondaryRegions.push(child);
				} else if (child.props.region === 'tertiary') {
					tertiaryRegion = child;
				}
			}
		});

		if (primaryRegion && secondaryRegions.length > 0) {
			var dividerPosition = primaryRegion.props.dividerPosition === undefined ? 'right' : primaryRegion.props.dividerPosition;

			primaryRegion = _react2.default.cloneElement(primaryRegion, {
				dividerPosition: dividerPosition,
				key: 'primary-region'
			});
		}

		return [primaryRegion].concat(secondaryRegions, [tertiaryRegion]);
	};

	/**
   * Global Navigation Bar represents a list of links that either take the user to another page or parts of the page the user is in.
  */
	var GlobalNavigationBar = function GlobalNavigationBar(props) {
		var _classNames;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-context-bar', (_classNames = {}, _defineProperty(_classNames, 'slds-context-bar--theme-' + props.cloud, props.cloud), _defineProperty(_classNames, 'slds-context-bar--theme-' + props.theme, props.theme), _classNames), props.className)
			},
			auditChildren(props.children)
		);
	};

	// ### Prop Types
	GlobalNavigationBar.propTypes = {
		/**
   * The items to be displayed in the Global Navigation Bar.
   */
		children: _react.PropTypes.node,
		/**
   * CSS class names to be added to the container element.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Typically the cloud name (e.g.- "sales" or "marketing"). This primarily changes the background color.
   */
		cloud: _react.PropTypes.string,
		/**
   * Transforms text and interactions (such as hover) to be more visually accessible.
   */
		theme: _react.PropTypes.oneOf(['light', 'dark'])
	};

	GlobalNavigationBar.defaultProps = {
		cloud: 'default',
		theme: 'dark'
	};

	GlobalNavigationBar.displayName = _constants.GLOBAL_NAVIGATION_BAR;

	module.exports = GlobalNavigationBar;
});