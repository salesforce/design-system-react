"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.omit");

var _lodash2 = _interopRequireDefault(_lodash);

var _SLDSIcon = require("../SLDSIcon");

var _SLDSIcon2 = _interopRequireDefault(_SLDSIcon);

var _Title = require("./Title");

var _Title2 = _interopRequireDefault(_Title);

var _Nav = require("./Nav");

var _Nav2 = _interopRequireDefault(_Nav);

var _NavMenu = require("./NavMenu");

var _NavMenu2 = _interopRequireDefault(_NavMenu);

var _NavMenuLink = require("./NavMenuLink");

var _NavMenuLink2 = _interopRequireDefault(_NavMenuLink);

var _styling = require("./styling");

var _styling2 = _interopRequireDefault(_styling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var classNames = require("classnames");


var pf = _styling2.default.pf;

var displayName = 'SLDSContextBar';
var propTypes = {
  /**
   * The main title shown in the bar.
   */
  title: _react2.default.PropTypes.string
};
var defaultProps = {
  title: 'Title'
};
/*
const OLD_CSS_PREFIX = 'slds-';
const NEW_CSS_PREFIX = 'slds2-';
function pf(className) {
  return className.split(/\s+/).map(c => {
    // Add prefix only for "context" classes
    return c.indexOf('context') >= 0 ? `${NEW_CSS_PREFIX}${c}` : `${OLD_CSS_PREFIX}${c}`;
  }).join(' ');
}
*/
/**
 * The SLDSContextBar component is the Lightning Design System Context Bar component. The SLDSContextBar is a container with dropdown menus.
 */

var ContextBar = function (_React$Component) {
  _inherits(ContextBar, _React$Component);

  function ContextBar(props) {
    _classCallCheck(this, ContextBar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContextBar).call(this, props));

    _this.state = { active: false };
    return _this;
  }

  _createClass(ContextBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // TODO: componentDidMount
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
    // TODO: componentWillUnmount


    // handleClick() {
    //   if(this.props.onClick) this.props.onClick();
    //   this.setState({ active: !this.state.active });
    // }

  }, {
    key: "getClassName",
    value: function getClassName() {
      return classNames(this.props.className, "slds2-context-bar", {
        // [`slds-button--${this.props.variant}`]: !base && !iconOnly,
        // [`slds-button--icon-${this.props.iconVariant}`]: this.props.iconVariant,
        // ["slds-max-small-button--stretch"]: this.props.responsive,
      });
    }
  }, {
    key: "renderLinkMenuItem",
    value: function renderLinkMenuItem(menuItem, menuItemIndex) {
      var onSelect = this.props.onSelect;
      var label = menuItem.label;

      var key = "SLDSContextBar.menuItem." + menuItemIndex + "." + label;

      function onClick(event) {
        if (onSelect) {
          if (event.stopPropagation) {
            event.stopPropagation();
          }
          if (event.preventDefault) {
            event.preventDefault();
          }
          onSelect(event, menuItem, menuItemIndex);
        }
      }

      return _react2.default.createElement(
        "li",
        { className: pf('context-bar-action grid'), key: key },
        _react2.default.createElement(
          "a",
          { href: "javascript:void(0)", className: pf('context-bar-action__label text-link--reset grid grid--vertical-align-center FIX-context-bar-a'), onClick: onClick.bind(this) },
          label
        )
      );
    }
  }, {
    key: "renderMenuItems",
    value: function renderMenuItems() {
      var _this2 = this;

      return (this.props.menuItems || []).map(function (menuItem, menuItemIndex) {
        switch (menuItem.type) {
          case 'link':
            return _this2.renderLinkMenuItem(menuItem, menuItemIndex);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = (0, _lodash2.default)(this.props, ["className", "label", "onClick"]);

      // <Menu className={pf('nubbin--top')}>
      //   <Menu.List isSelectable={false}>
      //     <Menu.Item>
      //       <SvgIcon className={pf('icon icon--x-small icon-text-default m-right--x-small')} sprite="utility" symbol="add" />
      //       Main action
      //     </Menu.Item>
      //   </Menu.List>
      //   <hr className={pf('m-vertical--xx-small')} role="presentation" />
      //   <div className={pf('dropdown__header')}>
      //     <span className={pf('text-heading--label')}>Menu header</span>
      //   </div>
      //   <Menu.List isSelectable={false}>
      //     <Menu.Item>Menu Item One</Menu.Item>
      //     <Menu.Item>Menu Item Two</Menu.Item>
      //     <Menu.Item>Menu Item Three</Menu.Item>
      //   </Menu.List>
      // </Menu>

      return _react2.default.createElement(
        "div",
        _extends({ className: this.getClassName() }, props),
        _react2.default.createElement(
          "div",
          { className: pf('context-bar grid') },
          _react2.default.createElement("div", { className: pf('context-bar__shadow') }),
          this.props.children,
          _react2.default.createElement(
            "style",
            null,
            _styling2.default.getComponentStyles()
          )
        )
      );
    }
  }]);

  return ContextBar;
}(_react2.default.Component);

ContextBar.displayName = displayName;
ContextBar.propTypes = propTypes;
ContextBar.defaultProps = defaultProps;
ContextBar.Title = _Title2.default;
ContextBar.Nav = _Nav2.default;
ContextBar.NavMenu = _NavMenu2.default;
ContextBar.NavMenuLink = _NavMenuLink2.default;
module.exports = ContextBar;