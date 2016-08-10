define(['module', 'react', 'classnames', 'lodash.omit'], function (module, _react, _classnames2, _lodash) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _classnames3 = _interopRequireDefault(_classnames2);

  var _lodash2 = _interopRequireDefault(_lodash);

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

  var displayName = 'PageHeaderTitle';
  var propTypes = {
    /**
     * Sets whether the title will truncate its content responsively.
     */
    truncate: _react2.default.PropTypes.bool,
    /**
     * Sets the vertical alignment on the title
     */
    align: _react2.default.PropTypes.oneOf(['top', 'middle', 'bottom']),
    /**
     * The title string (required)
     */
    title: _react2.default.PropTypes.string.isRequired,
    /**
     * Optional class name
     */
    className: _react2.default.PropTypes.string
  };
  var defaultProps = {
    truncate: true,
    align: 'middle',
    title: 'Page Header Title',
    className: ''
  };

  var Title = function (_Component) {
    _inherits(Title, _Component);

    function Title() {
      _classCallCheck(this, Title);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
    }

    _createClass(Title, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var title = _props.title;
        var truncate = _props.truncate;
        var align = _props.align;
        var className = _props.className;

        var attr = _objectWithoutProperties(_props, ['children', 'title', 'truncate', 'align', 'className']);

        var classes = this._getClassNames(truncate, align, className);

        return _react2.default.createElement(
          'p',
          _extends({ className: classes, title: title }, attr),
          title,
          children
        );
      }
    }, {
      key: '_getClassNames',
      value: function _getClassNames(truncate, align, className) {
        return (0, _classnames3.default)('slds-page-header__title', className, _defineProperty({
          'slds-truncate': truncate
        }, 'slds-align-' + align, align));
      }
    }]);

    return Title;
  }(_react.Component);

  Title.displayName = displayName;
  Title.propTypes = propTypes;
  Title.defaultProps = defaultProps;

  module.exports = Title;
});