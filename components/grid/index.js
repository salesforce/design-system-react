define(['module', 'react', 'lodash.omit', 'classnames'], function (module, _react, _lodash, _classnames) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _lodash2 = _interopRequireDefault(_lodash);

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

  var GridColumn = function (_React$Component) {
    _inherits(GridColumn, _React$Component);

    function GridColumn() {
      _classCallCheck(this, GridColumn);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(GridColumn).apply(this, arguments));
    }

    _createClass(GridColumn, [{
      key: 'getClassName',
      value: function getClassName() {
        return this.props.className + ' slds-col';
      }
    }, {
      key: 'render',
      value: function render() {
        var props = (0, _lodash2.default)('className', this.props);

        return _react2.default.createElement(
          'div',
          _extends({ className: this.getClassName() }, props),
          this.props.children
        );
      }
    }]);

    return GridColumn;
  }(_react2.default.Component);

  var Grid = function (_React$Component2) {
    _inherits(Grid, _React$Component2);

    function Grid() {
      _classCallCheck(this, Grid);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).apply(this, arguments));
    }

    _createClass(Grid, [{
      key: 'getClassName',
      value: function getClassName() {
        var flavor = this.props.flavor;
        return (0, _classnames2.default)(this.props.className, 'slds-grid', _defineProperty({}, 'slds-grid--' + flavor, flavor));
      }
    }, {
      key: 'render',
      value: function render() {
        var props = (0, _lodash2.default)(['className', 'flavor'], this.props);

        return _react2.default.createElement(
          'div',
          _extends({}, props, { className: this.getClassName() }),
          this.props.children
        );
      }
    }]);

    return Grid;
  }(_react2.default.Component);

  Grid.Column = GridColumn;

  module.exports = Grid;
});