"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _tabsList = _interopRequireDefault(require("./private/tabs-list"));

var _tab3 = _interopRequireDefault(require("./private/tab"));

var _tabPanel = _interopRequireDefault(require("./private/tab-panel"));

var _constants = require("../../utilities/constants");

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _event = _interopRequireDefault(require("../../utilities/event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && (node.classList.contains('slds-tabs_default__item') || node.classList.contains('slds-tabs_scoped__item') || node.classList.contains('slds-vertical-tabs__nav-item'));
} // Determine if a tab node is disabled


function isTabDisabled(node) {
  if (node.classList && node.classList.contains('slds-disabled')) {
    return true;
  } else if (node.getAttribute) {
    return node.getAttribute('aria-disabled') === 'true';
  }

  return !!node.props.disabled;
}
/**
 * Tabs keeps related content in a single container that is shown and hidden through navigation.
 */


var displayName = _constants.TABS;
var propTypes = {
  /**
   * HTML `id` attribute of primary element that has `.slds-tabs_default` on it. Optional: If one is not supplied, a `shortid` will be created.
   */
  id: _propTypes.default.string,

  /**
   * The `children` are the actual tabs and panels to be displayed.
   *
   * Note that the structure of the `<Tabs />` component **does not** correspond to the DOM structure that is rendered. The `<Tabs />` component requires one or more children of type `<TabsPanel />`, which themselves require a `label` property which will be what shows in the `<Tab />` and has `children`, which end up being the _contents of the tab's corresponding panel_.
   *
   * The component iterates through each `<TabsPanel />` and rendering one `<Tab />` and one `<TabPanel />` for each of them. The tab(s) end up being children of the `<TabsList />`.
   *
   * ```
   * <Tabs>
   * 	<TabsPanel label="Tab 1">
   * 		<div>
   * 			<h2 className="slds-text-heading_medium">This is my tab 1 contents!</h2>
   * 			<p>They show when you click the first tab.</p>
   * 		</div>
   * 	</TabsPanel>
   * 	<TabsPanel label="Tab 2">
   * 		<div>
   * 			<h2 className="slds-text-heading_medium">This is my tab 2 contents!</h2>
   * 			<p>They show when you click the second tab.</p>
   * 		</div>
   * 	</TabsPanel>
   * </Tabs>
   * ```
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node, _propTypes.default.element]).isRequired,

  /**
   * Class names to be added to the container element and is passed along to its children.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The Tab (and corresponding TabPanel) that is selected when the component first renders. Defaults to `0`.
   */
  defaultSelectedIndex: _propTypes.default.number,

  /**
   * This function triggers when a tab is selected.
   */
  onSelect: _propTypes.default.func,

  /**
   * If the Tabs should be scoped, vertical, or default (default value)
   */
  variant: _propTypes.default.oneOf(['default', 'scoped', 'vertical']),

  /**
   * The Tab (and corresponding TabPanel) that is currently selected.
   */
  selectedIndex: _propTypes.default.number
};
var defaultProps = {
  defaultSelectedIndex: 0,
  variant: 'default'
};
/**
 * A tab keeps related content in a single container that is shown and hidden through navigation.
 */

var Tabs = /*#__PURE__*/function (_React$Component) {
  _inherits(Tabs, _React$Component);

  var _super = _createSuper(Tabs);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var node = e.target;
      /* eslint-disable no-cond-assign, fp/no-loops */

      do {
        if (_this.isTabFromContainer(node)) {
          if (isTabDisabled(node)) {
            return;
          }

          var parentNode = node.parentNode; // eslint-disable-line prefer-destructuring

          if (parentNode.nodeName === 'LI') {
            node = node.parentNode;
            parentNode = node.parentNode; // eslint-disable-line prefer-destructuring
          }

          var index = [].slice.call(parentNode.children).indexOf(node);

          _this.setSelected(index);

          return;
        }
      } while ((node = node.parentNode) !== null);
      /* eslint-enable no-cond-assign */

    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (_this.isTabFromContainer(event.target)) {
        var index = _this.getSelectedIndex();

        var preventDefault = false;

        if (event.keyCode === _keyCode.default.LEFT || event.keyCode === _keyCode.default.UP) {
          // Select next tab to the left
          index = _this.getPrevTab(index);
          preventDefault = true;
        } else if (event.keyCode === _keyCode.default.RIGHT || event.keyCode === _keyCode.default.DOWN) {
          // Select next tab to the right
          index = _this.getNextTab(index);
          preventDefault = true;
        } // Prevent any dumn scrollbars from moving around as we type.


        if (preventDefault) {
          _event.default.trap(event);
        }

        _this.setSelected(index, true);
      }
    });

    _this.tabs = []; // If no `id` is supplied in the props we generate one. An HTML ID is _required_ for several elements in a tabs component in order to leverage ARIA attributes for accessibility.

    _this.generatedId = _shortid.default.generate();
    _this.flavor = _this.getVariant();
    _this.state = {
      selectedIndex: props.defaultSelectedIndex
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "getNextTab",
    value: function getNextTab(index) {
      var count = this.getTabsCount(); // Look for non-disabled tab from index to the last tab on the right
      // eslint-disable-next-line no-plusplus
      // eslint-disable-next-line no-plusplus, fp/no-loops

      for (var i = index + 1; i < count; i++) {
        var tab = this.getTab(i);

        if (!isTabDisabled(tab)) {
          return i;
        }
      } // If no tab found, continue searching from first on left to index
      // eslint-disable-next-line no-plusplus, fp/no-loops


      for (var _i = 0; _i < index; _i++) {
        var _tab = this.getTab(_i);

        if (!isTabDisabled(_tab)) {
          return _i;
        }
      } // No tabs are disabled, return index


      return index;
    }
  }, {
    key: "getPanelsCount",
    value: function getPanelsCount() {
      return this.props.children ? _react.default.Children.count(this.props.children) : 0;
    }
  }, {
    key: "getPrevTab",
    value: function getPrevTab(index) {
      var i = index; // Look for non-disabled tab from index to first tab on the left
      // eslint-disable-next-line fp/no-loops, no-plusplus

      while (i--) {
        var tab = this.getTab(i);

        if (!isTabDisabled(tab)) {
          return i;
        }
      } // If no tab found, continue searching from last tab on right to index


      i = this.getTabsCount(); // eslint-disable-next-line fp/no-loops, no-plusplus

      while (i-- > index) {
        var _tab2 = this.getTab(i);

        if (!isTabDisabled(_tab2)) {
          return i;
        }
      } // No tabs are disabled, return index


      return index;
    }
  }, {
    key: "getSelectedIndex",
    value: function getSelectedIndex() {
      return Number.isInteger(this.props.selectedIndex) ? this.props.selectedIndex : this.state.selectedIndex;
    }
  }, {
    key: "getTab",
    value: function getTab(index) {
      return this.tabs[index].tab;
    }
  }, {
    key: "getTabNode",
    value: function getTabNode(index) {
      return this.tabs[index].node;
    }
  }, {
    key: "getTabsCount",
    value: function getTabsCount() {
      return this.props.children ? _react.default.Children.count(this.props.children) : 0;
    }
  }, {
    key: "getVariant",
    value: function getVariant() {
      return this.props.variant || 'default';
    }
  }, {
    key: "setSelected",
    value: function setSelected(index, focus) {
      // Check index boundary
      if (index < 0 || index >= this.getTabsCount()) {
        return;
      } // Keep reference to last index for event handler


      var last = this.getSelectedIndex();
      /**
       * This is a temporary solution that could be broken in the future without notification,
       * since this component is not a controlled component and only relies on internal state.
       * If this breaks in the future an alternative way to control the state from outside the
       * component should be present.
       * */

      var shouldContinue; // Call change event handler

      if ((0, _lodash.default)(this.props.onSelect)) {
        shouldContinue = this.props.onSelect(index, last);
      } // Don't update the state if nothing has changed


      if (shouldContinue !== false && index !== this.state.selectedIndex) {
        this.setState({
          selectedIndex: index,
          focus: focus === true
        });
      }
    }
  }, {
    key: "isTabFromContainer",
    value:
    /**
     * Determine if a node from event.target is a Tab element for the current Tabs container.
     * If the clicked element is not a Tab, it returns false.
     * If it finds another Tabs container between the Tab and `this`, it returns false.
     */
    function isTabFromContainer(node) {
      // Return immediately if the clicked element is not a Tab. This prevents tab panel content from selecting a tab.
      if (!isTabNode(node)) {
        return false;
      } // Check if the first occurrence of a Tabs container is `this` one.


      var nodeAncestor = node.parentElement;

      do {
        if (nodeAncestor === this.tabsNode) return true;else if (nodeAncestor.getAttribute('data-tabs')) break;
        nodeAncestor = nodeAncestor.parentElement;
      } while (nodeAncestor);

      return false;
    }
  }, {
    key: "renderTabPanels",
    value: function renderTabPanels(parentId) {
      var _this2 = this;

      var children = _react.default.Children.toArray(this.props.children);

      var selectedIndex = this.getSelectedIndex();
      var result = null;
      result = children.map(function (child, index) {
        var tabId = "".concat(parentId, "-slds-tabs_tab-").concat(index);
        var id = "".concat(parentId, "-slds-tabs_panel-").concat(index);
        var selected = selectedIndex === index;

        var variant = _this2.getVariant();

        return /*#__PURE__*/_react.default.createElement(_tabPanel.default, {
          key: child.key,
          selected: selected,
          id: id,
          tabId: tabId,
          variant: variant
        }, children[index]);
      });
      return result;
    }
  }, {
    key: "renderTabsList",
    value: function renderTabsList(parentId) {
      var _this3 = this;

      var children = _react.default.Children.toArray(this.props.children);

      return (
        /*#__PURE__*/
        // `parentId` gets consumed by TabsList, adding a suffix of `-tabs__nav`
        _react.default.createElement(_tabsList.default, {
          id: parentId,
          variant: this.getVariant()
        }, children.map(function (child, index) {
          var id = "".concat(parentId, "-slds-tabs_tab-").concat(index);
          var panelId = "".concat(parentId, "-slds-tabs_panel-").concat(index);
          var selected = _this3.getSelectedIndex() === index;
          var focus = selected && _this3.state.focus;

          var variant = _this3.getVariant();

          return /*#__PURE__*/_react.default.createElement(_tab3.default, {
            key: child.key,
            ref: function ref(node) {
              _this3.tabs[index] = {
                tab: child,
                node: node
              };

              if (_this3.state.focus) {
                _this3.setState({
                  focus: false
                });
              }
            },
            focus: focus,
            selected: selected,
            id: id,
            panelId: panelId,
            disabled: child.props.disabled,
            variant: variant,
            hasError: child.props.hasError,
            assistiveText: child.props.assistiveText
          }, child.props.label);
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          className = _this$props.className,
          _this$props$id = _this$props.id,
          id = _this$props$id === void 0 ? this.generatedId : _this$props$id,
          _this$props$variant = _this$props.variant,
          variant = _this$props$variant === void 0 ? this.getVariant : _this$props$variant;
      return (
        /*#__PURE__*/

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        _react.default.createElement("div", {
          id: id,
          className: (0, _classnames.default)({
            'slds-tabs_default': variant === 'default',
            'slds-tabs_scoped': variant === 'scoped',
            'slds-vertical-tabs': variant === 'vertical'
          }, className),
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          "data-tabs": true,
          ref: function ref(node) {
            _this4.tabsNode = node;
          }
        }, this.renderTabsList(id), this.renderTabPanels(id))
      );
    }
  }]);

  return Tabs;
}(_react.default.Component);

Tabs.displayName = displayName;
Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
var _default = Tabs;
exports.default = _default;