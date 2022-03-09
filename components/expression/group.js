"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

var _combobox = _interopRequireDefault(require("../combobox"));

var _button = _interopRequireDefault(require("../button"));

var _input = _interopRequireDefault(require("../input"));

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

var propTypes = {
  /**
   *  **Assistive text for accessibility.**
   * * `label`: For users of assistive technology, assistive text for the expression group's label.
   * * `addCondition`: For users of assistive technology, assistive text for the Add Condition button's icon.
   * * `addGroup`: For users of assistive technology, assistive text for the Add Group button's icon.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string,
    addCondition: _propTypes.default.string,
    addGroup: _propTypes.default.string
  }),

  /**
   * HTML id for ExpressionGroup component.
   */
  id: _propTypes.default.string,

  /**
   * `ExpressionGroup` children, accepts `ExpressionCondition`. (Also accepts sub-`ExpressionGroup` if `isRoot`)
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to the element with class `.slds-expression__group`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Callbacks for various expression group events such as trigger change, add condition etc
   */
  events: _propTypes.default.shape({
    onChangeTrigger: _propTypes.default.func,
    onChangeCustomLogicValue: _propTypes.default.func,
    onAddCondition: _propTypes.default.func,
    onAddGroup: _propTypes.default.func
  }),

  /**
   * If set to true, the component will focus on the first focusable input upon mounting. This is useful for accessibility when adding new groups.
   */
  focusOnMount: _propTypes.default.bool,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `addCondition`: Label for the Add Condition Button. Defaults to "Add Condition"
   * * `addGroup`: Label for the Add Group Button. Defaults to "Add Group"
   * * `customLogic`: Label for the text box for inputting `customLogicValue`, if the `triggerType` is `custom`. Defaults to "Custom Logic"
   * * `label`: Label for the expression group, to indicate condition connectors based on the parent's trigger-type chosen. Defaults to ""
   * * `takeAction`: Label for the `triggerType` selector. Defaults to "Take Action When"
   * * `triggerAll`: Label for the `all` value within the trigger selector
   * * `triggerAlways`: Label for the `always` value within the trigger selector
   * * `triggerAny`: Label for the `any` value within the trigger selector
   * * `triggerCustom`: Label for the `custom` value within the trigger selector
   * * `triggerFormula`: Label for the `formula` value within the trigger selector
   */
  labels: _propTypes.default.shape({
    addCondition: _propTypes.default.string,
    addGroup: _propTypes.default.string,
    customLogic: _propTypes.default.string,
    label: _propTypes.default.string,
    takeAction: _propTypes.default.string,
    triggerAll: _propTypes.default.string,
    triggerAlways: _propTypes.default.string,
    triggerAny: _propTypes.default.string,
    triggerCustom: _propTypes.default.string,
    triggerFormula: _propTypes.default.string
  }),

  /**
   * Whether the group is at root level
   */
  isRoot: _propTypes.default.bool,

  /**
   * Trigger type for the Group
   */
  triggerType: _propTypes.default.oneOf(['all', 'any', 'custom', 'always', 'formula']),

  /**
   * Sets the input for the custom logic value input box, shown if the `triggerType` is set to `custom`.
   */
  customLogicValue: _propTypes.default.string
};
var defaultProps = {
  triggerType: 'all',
  customLogicValue: '',
  labels: {
    label: '',
    takeAction: 'Take Action When',
    customLogic: 'Custom Logic',
    addCondition: 'Add Condition',
    addGroup: 'Add Group',
    triggerAll: 'All Conditions Are Met',
    triggerAny: 'Any Condition Is Met',
    triggerCustom: 'Custom Logic Is Met',
    triggerAlways: 'Always (No Criteria)',
    triggerFormula: 'Formula Evaluates To True'
  }
};
/**
 * Expression Group Component
 */

var ExpressionGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpressionGroup, _React$Component);

  var _super = _createSuper(ExpressionGroup);

  function ExpressionGroup(props) {
    var _this;

    _classCallCheck(this, ExpressionGroup);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(ExpressionGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount && this.rootNode) {
        var input = this.rootNode.querySelector('input');

        if (input) {
          input.focus();
        }
      }
    }
    /**
     * Get the Expression Group's HTML id. Generate a new one if no ID present.
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
    /**
     * Generate and return trigger type objects, with labels either sent as props or using default props.
     */

  }, {
    key: "getTriggers",
    value: function getTriggers() {
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return [{
        id: '1',
        label: labels.triggerAll
      }, {
        id: '2',
        label: labels.triggerAny
      }, {
        id: '3',
        label: labels.triggerCustom
      }, {
        id: '4',
        label: labels.triggerAlways
      }, {
        id: '5',
        label: labels.triggerFormula
      }];
    }
    /**
     *  Returns object of trigger from trigger passed as prop
     */

  }, {
    key: "getTriggerSelection",
    value: function getTriggerSelection() {
      var selection = this.props.triggerType;
      var Triggers = this.getTriggers();
      var t = [];

      if (selection === 'all') {
        // eslint-disable-next-line fp/no-mutating-methods
        t.push(Triggers[0]);
      } else if (selection === 'any') {
        // eslint-disable-next-line fp/no-mutating-methods
        t.push(Triggers[1]);
      } else if (selection === 'custom') {
        // eslint-disable-next-line fp/no-mutating-methods
        t.push(Triggers[2]);
      } else if (selection === 'always') {
        // eslint-disable-next-line fp/no-mutating-methods
        t.push(Triggers[3]);
      } else if (selection === 'formula') {
        // eslint-disable-next-line fp/no-mutating-methods
        t.push(Triggers[4]);
      }

      return t;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);

      var triggerCombobox = /*#__PURE__*/_react.default.createElement(_combobox.default, {
        events: {
          onSelect: function onSelect(event, data) {
            return _this2.props.events.onChangeTrigger(event, {
              triggerType: ExpressionGroup.triggerChange(event, data)
            });
          }
        },
        id: "".concat(this.getId(), "-take-action-trigger"),
        multiple: false,
        options: this.getTriggers(),
        variant: "readonly",
        labels: {
          label: labels.takeAction
        },
        selection: this.getTriggerSelection()
      });

      var buttons = this.props.triggerType !== 'always' && this.props.triggerType !== 'formula' ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-expression__buttons"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        iconCategory: "utility",
        iconName: "add",
        iconPosition: "left",
        id: "".concat(this.getId(), "-add-condition-button"),
        label: labels.addCondition,
        assistiveText: {
          icon: assistiveText.addCondition
        },
        onClick: this.props.events.onAddCondition
      }), this.props.isRoot ? /*#__PURE__*/_react.default.createElement(_button.default, {
        iconCategory: "utility",
        iconName: "add",
        iconPosition: "left",
        id: "".concat(this.getId(), "-add-group-button"),
        label: labels.addGroup,
        assistiveText: {
          icon: assistiveText.addGroup
        },
        onClick: this.props.events.onAddGroup
      }) : null) : null;
      var body = null;

      if (this.props.triggerType !== 'always') {
        if (this.props.isRoot && this.props.triggerType === 'formula') {
          body = this.props.children;
        } else {
          body = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.props.triggerType === 'custom' ? /*#__PURE__*/_react.default.createElement(_input.default, {
            label: labels.customLogic,
            className: "slds-expression__custom-logic",
            id: "".concat(this.getId(), "-custom-logic-input"),
            value: this.props.customLogicValue,
            variant: "base",
            onChange: this.props.events.onChangeCustomLogicValue
          }) : null, /*#__PURE__*/_react.default.createElement("ul", null, this.props.children));
        }
      }

      if (this.props.isRoot) {
        if (this.props.triggerType === 'formula') {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
            className: "slds-expression__options"
          }, triggerCombobox), body);
        }

        return /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(this.props.className),
          id: this.getId()
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "slds-expression__options"
        }, triggerCombobox), body, buttons);
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        className: (0, _classnames.default)('slds-expression__group', this.props.className),
        id: this.getId(),
        ref: function ref(rootNode) {
          _this2.rootNode = rootNode;
        }
      }, /*#__PURE__*/_react.default.createElement("fieldset", null, /*#__PURE__*/_react.default.createElement("legend", {
        className: "slds-expression__legend slds-expression__legend_group"
      }, /*#__PURE__*/_react.default.createElement("span", null, labels.label), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label)), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-expression__options"
      }, triggerCombobox), body, buttons));
    }
  }], [{
    key: "triggerChange",
    value:
    /**
     *  Return triggerType selected, processing the triggerType objects generated
     */
    function triggerChange(event, data) {
      var selection = data.selection[0].id;
      var trigger = '';

      if (selection === '1') {
        trigger = 'all';
      } else if (selection === '2') {
        trigger = 'any';
      } else if (selection === '3') {
        trigger = 'custom';
      } else if (selection === '4') {
        trigger = 'always';
      } else if (selection === '5') {
        trigger = 'formula';
      }

      return trigger;
    }
  }]);

  return ExpressionGroup;
}(_react.default.Component);

ExpressionGroup.displayName = _constants.EXPRESSION_GROUP;
ExpressionGroup.propTypes = propTypes;
ExpressionGroup.defaultProps = defaultProps;
var _default = ExpressionGroup;
exports.default = _default;