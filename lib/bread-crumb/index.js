'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'BreadCrumb';
var propTypes = {
  /**
   * The assistive text for the breadcrumb trail
   */
  assistiveText: _react2.default.PropTypes.string,
  /**
   * An array of react elements presumably anchor elements.
   */
  trail: _react2.default.PropTypes.array
};
var defaultProps = {};

var BreadCrumb = function (_Component) {
  _inherits(BreadCrumb, _Component);

  function BreadCrumb() {
    _classCallCheck(this, BreadCrumb);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BreadCrumb).apply(this, arguments));
  }

  _createClass(BreadCrumb, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var assistiveText = _props.assistiveText;
      var trail = _props.trail;

      var trailElement = void 0;

      var renderTrail = function renderTrail() {
        var breadCrumbTrail = trail.map(function (crumb, i) {
          var crumbId = 'BreadCrumb.' + i;

          return _react2.default.createElement(
            'li',
            {
              key: crumbId,
              className: 'slds-list__item slds-text-heading--label'
            },
            crumb
          );
        });

        return _react2.default.createElement(
          'ol',
          { className: 'slds-breadcrumb slds-list--horizontal', 'aria-labelledby': 'bread-crumb-label' },
          breadCrumbTrail
        );
      };

      trailElement = renderTrail();

      return _react2.default.createElement(
        'nav',
        { role: 'navigation' },
        _react2.default.createElement(
          'p',
          { id: 'bread-crumb-label', className: 'slds-assistive-text' },
          assistiveText
        ),
        trailElement
      );
    }
  }]);

  return BreadCrumb;
}(_react.Component);

BreadCrumb.displayName = displayName;
BreadCrumb.propTypes = propTypes;
BreadCrumb.defaultProps = defaultProps;

module.exports = BreadCrumb;