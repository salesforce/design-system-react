define(['module', 'react', '../../utilities/utility-icon'], function (module, _react, _utilityIcon) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var displayName = 'InputIcon';

  var propTypes = {
    category: _react2.default.PropTypes.string,
    icon: _react2.default.PropTypes.object,
    name: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func
  };
  var defaultProps = {
    category: 'utility'
  };

  var InputIcon = function (_React$Component) {
    _inherits(InputIcon, _React$Component);

    function InputIcon(props) {
      _classCallCheck(this, InputIcon);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputIcon).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(InputIcon, [{
      key: 'render',
      value: function render() {
        var className = 'slds-input__icon slds-icon-text-default';
        return _react2.default.createElement(_utilityIcon2.default, {
          'aria-hidden': 'true',
          category: this.props.category,
          className: className,
          icon: this.props.icon,
          name: this.props.name,
          onClick: this.props.onClick,
          style: this.props.style
        });
      }
    }]);

    return InputIcon;
  }(_react2.default.Component);

  InputIcon.displayName = displayName;
  InputIcon.propTypes = propTypes;
  InputIcon.defaultProps = defaultProps;

  module.exports = InputIcon;
});