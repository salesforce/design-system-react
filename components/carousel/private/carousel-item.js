"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("../../button"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # CarouselItem Component
// Implements the [CarouselItem design pattern](https://www.lightningdesignsystem.com/components/carousel/) in React.

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
var CarouselItem = function CarouselItem(props) {
  function handleOnClick(event) {
    if (props.href === '#') {
      event.preventDefault();
    }

    if (props.onClick) {
      props.onClick(event);
    }
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    id: props.getPanelId({
      carouselId: props.carouselId,
      itemId: props.id
    }),
    className: "slds-carousel__panel slds-m-horizontal_xx-small slds-list_horizontal",
    role: "tabpanel",
    "aria-hidden": "false",
    "aria-labelledby": "indicator-id-".concat(props.carouselId, "-").concat(props.panelIndex),
    style: {
      margin: 0,
      maxWidth: "".concat(props.itemWidth, "px"),
      padding: '0 6px'
    }
  }, props.onRenderItem ? props.onRenderItem({
    item: props
  }) : /*#__PURE__*/_react.default.createElement("a", {
    className: "slds-carousel__panel-action slds-text-link_reset",
    href: props.href,
    onClick: handleOnClick,
    onFocus: props.onFocus,
    style: {
      backgroundColor: 'white',
      width: '100%'
    },
    tabIndex: props.isInCurrentPanel ? '0' : '-1'
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-carousel__image"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: props.src,
    alt: props.imageAssistiveText || props.heading
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-carousel__content",
    style: {
      height: 'auto'
    }
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "slds-carousel__content-title"
  }, props.heading), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-p-bottom_x-small slds-text-body_small",
    style: {
      minHeight: '40px'
    }
  }, props.description), props.buttonLabel && /*#__PURE__*/_react.default.createElement(_button.default, {
    label: props.buttonLabel,
    tabIndex: props.isInCurrentPanel ? '0' : '-1',
    variant: "neutral"
  }))));
};

CarouselItem.displayName = _constants.CAROUSEL_ITEM;
CarouselItem.propTypes = {
  /**
   * Label of the button to be displayed. If not provided, no button will be rendered.
   */
  buttonLabel: _propTypes.default.string,

  /**
   * Carousel HTML ID
   */
  carouselId: _propTypes.default.string,

  /**
   * CSS classes that are applied to the component
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Visible paragraph text to be displayed on the carousel item
   */
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),

  /**
   * Carousel Item's visible heading
   */
  heading: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
  href: _propTypes.default.string,

  /**
   * Id of the item component.
   */
  id: _propTypes.default.number.isRequired,

  /**
   * Image alt text
   */
  imageAssistiveText: _propTypes.default.string,

  /**
   * Boolean indicating whether this item is currently visible in the active parent carousel panel
   */
  isInCurrentPanel: _propTypes.default.bool,

  /**
   * Width of the carousel item
   */
  itemWidth: _propTypes.default.number,

  /**
   * Accepts a callback to handle when the a tag is focused on
   */
  onFocus: _propTypes.default.func,

  /**
   * Accepts a custom carousel item rendering function
   */
  onRenderItem: _propTypes.default.func,

  /**
   * Index of the panel this item belongs to, to be used when associating it to an indicator
   */
  panelIndex: _propTypes.default.number,

  /**
   * Path of the image to be used
   */
  src: _propTypes.default.string.isRequired
};
CarouselItem.defaultProps = {
  href: '#'
};
var _default = CarouselItem;
exports.default = _default;