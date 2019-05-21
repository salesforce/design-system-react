"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("../../../../components/button"));

var _carousel = _interopRequireDefault(require("../../../../components/carousel"));

var _iconSettings = _interopRequireDefault(require("../../../../components/icon-settings"));

var _log = _interopRequireDefault(require("../../../../utilities/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var items = [{
  buttonLabel: 'Get Started',
  id: 1,
  heading: 'Visit App Exchange',
  description: 'Extend Salesforce with the #1 business marketplace.',
  imageAssistiveText: 'Appy',
  src: '/assets/images/carousel/carousel-01.jpg',
  href: 'https://www.salesforce.com'
}, {
  buttonLabel: 'Get Started',
  id: 2,
  heading: 'Click to Customize',
  description: 'Use the Object Manager to add fields, build layouts, and more.',
  imageAssistiveText: 'Apps',
  src: '/assets/images/carousel/carousel-02.jpg',
  href: 'https://www.salesforce.com'
}, {
  buttonLabel: 'Get Started',
  id: 3,
  heading: 'Download Salesforce Apps',
  description: "Get the mobile app that's just for Salesforce admins.",
  imageAssistiveText: 'Salesforce Apps',
  src: '/assets/images/carousel/carousel-03.jpg',
  href: 'https://www.salesforce.com'
}, {
  buttonLabel: 'Get Started',
  id: 4,
  heading: 'Carousel Item 4',
  description: 'Description for carousel item #4',
  imageAssistiveText: 'Apps',
  src: '/assets/images/carousel/carousel-02.jpg',
  href: 'https://www.salesforce.com'
}, {
  buttonLabel: 'Learn More',
  id: 5,
  heading: 'Carousel Item 5',
  description: 'Description for carousel item #5',
  imageAssistiveText: 'Appy',
  src: '/assets/images/carousel/carousel-01.jpg',
  href: 'https://www.salesforce.com'
}, {
  buttonLabel: 'Learn More',
  id: 6,
  heading: 'Carousel Item 6',
  description: 'Description for carousel item #6',
  imageAssistiveText: 'Salesforce Apps',
  src: '/assets/images/carousel/carousel-03.jpg',
  href: 'https://www.salesforce.com'
}, {
  buttonLabel: 'Learn More',
  id: 7,
  heading: 'Carousel Item 7',
  description: 'Description for carousel item #7',
  imageAssistiveText: 'Apps',
  src: '/assets/images/carousel/carousel-02.jpg',
  href: 'https://www.salesforce.com'
}];

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Example)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderCustomItem", function (_ref) {
      var item = _ref.item;

      var onButtonClick = function onButtonClick(event) {
        event.preventDefault();
        (0, _log.default)({
          action: _this.props.action,
          event: event,
          eventName: 'Button Clicked',
          data: {
            item: item
          }
        });
      };

      return _react.default.createElement("div", {
        className: "slds-carousel-custom-rendering",
        style: {
          padding: '0 8px',
          margin: 0,
          textAlign: 'center'
        }
      }, _react.default.createElement("div", {
        className: "slds-carousel__content-title"
      }, item.heading), _react.default.createElement("div", {
        className: "slds-carousel__image"
      }, _react.default.createElement("img", {
        src: item.src,
        alt: item.imageAssistiveText
      })), _react.default.createElement(_button.default, {
        className: "slds-button_outline-brand slds-m-around_small",
        label: "Button1",
        onClick: function onClick(event) {
          onButtonClick(event, item);
        },
        tabIndex: item.isInCurrentPanel ? '0' : '-1'
      }), _react.default.createElement(_button.default, {
        className: "slds-button_outline-brand slds-m-around_small",
        label: "Button2",
        onClick: function onClick(event) {
          onButtonClick(event, item);
        },
        tabIndex: item.isInCurrentPanel ? '0' : '-1'
      }));
    });

    return _this;
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        style: {
          bottom: '1rem',
          left: '1rem',
          overflow: 'auto',
          position: 'absolute',
          right: '1rem',
          top: '1rem'
        }
      }, _react.default.createElement(_iconSettings.default, {
        iconPath: "/assets/icons"
      }, _react.default.createElement("div", {
        style: {
          maxWidth: '1280px'
        }
      }, _react.default.createElement(_carousel.default, {
        hasPreviousNextPanelNavigation: true,
        id: "carousel-with-custom-items-example",
        items: items,
        itemsPerPanel: 3,
        onRenderItem: this.renderCustomItem
      }))));
    }
  }]);

  return Example;
}(_react.default.Component);

_defineProperty(Example, "displayName", 'WithCustomItemsExample');

var _default = Example;
exports.default = _default;