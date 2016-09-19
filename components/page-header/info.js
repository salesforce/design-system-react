define(['module', 'react', 'classnames', 'lodash.omit'], function (module, _react, _classnames, _lodash) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _lodash2 = _interopRequireDefault(_lodash);

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

  var displayName = 'PageHeaderInfo';
  var propTypes = {
    /**
     * Optional class name
     */
    className: _react2.default.PropTypes.string
  };
  var defaultProps = {
    className: ''
  };

  var Info = function (_Component) {
    _inherits(Info, _Component);

    function Info() {
      _classCallCheck(this, Info);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Info).apply(this, arguments));
    }

    _createClass(Info, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var className = _props.className;

        var attr = (0, _lodash2.default)(['children', 'className'], this.props);
        var classes = this._getClassNames(className);

        return _react2.default.createElement(
          'p',
          _extends({ className: classes }, attr),
          children
        );
      }
    }, {
      key: '_getClassNames',
      value: function _getClassNames(className) {
        return (0, _classnames2.default)('slds-page-header__info', className);
      }
    }]);

    return Info;
  }(_react.Component);

  Info.displayName = displayName;
  Info.propTypes = propTypes;
  Info.defaultProps = defaultProps;

  module.exports = Info;
});