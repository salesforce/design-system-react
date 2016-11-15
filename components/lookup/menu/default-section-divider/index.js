define(['module', 'react', '../../../../utilities'], function (module, _react, _utilities) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

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

  var displayName = "LookupDefaultSectionDivider";
  var propTypes = {
    data: _react2.default.PropTypes.object
  };

  var DefaultSectionDivider = function (_React$Component) {
    _inherits(DefaultSectionDivider, _React$Component);

    function DefaultSectionDivider(props) {
      _classCallCheck(this, DefaultSectionDivider);

      return _possibleConstructorReturn(this, (DefaultSectionDivider.__proto__ || Object.getPrototypeOf(DefaultSectionDivider)).call(this, props));
    }

    _createClass(DefaultSectionDivider, [{
      key: 'handleMouseDown',
      value: function handleMouseDown(event) {
        _utilities.EventUtil.trapImmediate(event);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'li',
          { className: 'slds-p-around--x-small slds-lookup__divider', tabIndex: '-1' },
          _react2.default.createElement(
            'span',
            { className: 'slds-m-left--x-small' },
            _react2.default.createElement(
              'strong',
              null,
              this.props.data.label
            )
          )
        );
      }
    }]);

    return DefaultSectionDivider;
  }(_react2.default.Component);

  DefaultSectionDivider.displayName = displayName;
  DefaultSectionDivider.propTypes = propTypes;

  module.exports = DefaultSectionDivider;
});