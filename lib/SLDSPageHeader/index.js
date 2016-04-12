'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _DetailRow = require('./DetailRow');

var _DetailRow2 = _interopRequireDefault(_DetailRow);

var _DetailBlock = require('./DetailBlock');

var _DetailBlock2 = _interopRequireDefault(_DetailBlock);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _RecordHome = require('./RecordHome');

var _RecordHome2 = _interopRequireDefault(_RecordHome);

var _ObjectHome = require('./ObjectHome');

var _ObjectHome2 = _interopRequireDefault(_ObjectHome);

var _SLDSIcon = require('../SLDSIcon');

var _SLDSIcon2 = _interopRequireDefault(_SLDSIcon);

var _SLDSBreadCrumb = require('../SLDSBreadCrumb');

var _SLDSBreadCrumb2 = _interopRequireDefault(_SLDSBreadCrumb);

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

var displayName = 'SLDSPageHeader';
var propTypes = {
  /**
   * Optional class name
   */
  className: _react2.default.PropTypes.string,
  /**
   * The type of component
   */
  variant: _react2.default.PropTypes.string,
  /**
   * The info property can be a string or a React element
   */
  label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  /**
   * The title property can be a string or a React element
   */
  title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  /**
   * The info property can be a string or a React element
   */
  info: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  /**
   * The page header icon
   */
  icon: _react2.default.PropTypes.element,
  /**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
  iconName: _react2.default.PropTypes.string,
  /**
   * The icons category
   */
  iconCategory: _react2.default.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
  /**
   * If omitted, icon position is centered.
   */
  iconPosition: _react2.default.PropTypes.oneOf(['left', 'right']),
  iconSize: _react2.default.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  /**
   * For icon variants, please reference <a href='http://www.lightningdesignsystem.com/components/buttons/#icon'>Lightning Design System Icons</a>.
   */
  iconVariant: _react2.default.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'small', 'more']),
  /**
   * Content to appear on the right hand side of the page header
   */
  contentRight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  /**
   * An array of buttons which appear on the component's right hand side.
   */
  details: _react2.default.PropTypes.array,
  /**
   * Nav content which appears in the upper right hand corner.
   */
  navRight: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
  /**
   * An array of react elements presumably anchor <a> elements.
   */
  trail: _react2.default.PropTypes.array
};

var defaultProps = {
  className: '',
  variant: 'base',
  navRight: '',
  contentRight: '',
  details: [],
  trail: []
};

/**
 * The SLDSPageHeader component adds SLDSPageHeader, SLDSPageHeader.Info, SLDSPageHeader.Title, SLDSPageHeader.DetailRow, and SLDSPageHeader.DetailBlock.
 */

var PageHeader = function (_Component) {
  _inherits(PageHeader, _Component);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PageHeader).apply(this, arguments));
  }

  _createClass(PageHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var icon = _props.icon;
      var iconName = _props.iconName;
      var iconCategory = _props.iconCategory;
      var iconPosition = _props.iconPosition;
      var iconSize = _props.iconSize;
      var iconVariant = _props.iconVariant;
      var label = _props.label;
      var title = _props.title;
      var info = _props.info;
      var variant = _props.variant;
      var contentRight = _props.contentRight;
      var navRight = _props.navRight;
      var details = _props.details;
      var trail = _props.trail;
      /**
       * OPTIMIZE ES7 style object destructuring removes the need for _.omit.
       *
       * Example:
       *
       *     const {foo, ...bar} = this.props;
       */

      var attr = (0, _lodash2.default)(['className', 'icon', 'iconName', 'iconCategory', 'iconPosition', 'iconSize', 'iconVariant', 'label', 'title', 'info', 'variant', 'contentRight', 'navRight', 'details', 'trail'], this.props);
      var classes = this._getClassNames(className);

      /**
       * Initialize component variables
       */
      var labelElement = void 0;
      var iconElement = void 0;
      var titleElement = void 0;
      var infoElement = void 0;
      var contentRightElement = void 0;
      var navRightElement = void 0;
      var Variant = void 0;

      /**
       * Render the icon
       */
      var renderIcon = function renderIcon() {
        if (icon) {
          return icon;
        } else if (iconName) {
          return _react2.default.createElement(_SLDSIcon2.default, {
            name: iconName,
            category: iconCategory,
            position: iconPosition,
            size: iconSize,
            variant: iconVariant });
        }
      };

      /**
       * Render the label
       */
      var renderLabel = function renderLabel() {
        var type = typeof label === 'undefined' ? 'undefined' : _typeof(label);

        if (trail.length > 0) {
          return _react2.default.createElement(
            'nav',
            { className: 'slds-m-bottom--xx-small', role: 'navigation' },
            _react2.default.createElement(_SLDSBreadCrumb2.default, { trail: trail })
          );
        } else {
          if (type === 'string') {
            return _react2.default.createElement(
              'p',
              { className: 'slds-text-heading--label' },
              label
            );
          } else {
            return label;
          }
        }
      };

      /**
       * Render the title
       */
      var renderTitle = function renderTitle() {
        var type = typeof title === 'undefined' ? 'undefined' : _typeof(title);

        if (type === 'string') {
          return _react2.default.createElement(_Title2.default, { title: title });
        } else {
          return title;
        }
      };

      /**
       * Render info
       */
      var renderInfo = function renderInfo() {
        var type = typeof info === 'undefined' ? 'undefined' : _typeof(info);

        if (type === 'string') {
          return _react2.default.createElement(
            _Info2.default,
            null,
            info
          );
        } else {
          return info;
        }
      };

      /**
       * Steal contentRight's children
       */
      var renderNavRight = function renderNavRight() {
        var type = typeof navRight === 'undefined' ? 'undefined' : _typeof(navRight);

        if (type !== 'string') {
          return _react2.default.createElement('div', _extends({
            className: 'slds-col slds-no-flex slds-grid slds-align-top'
          }, navRight.props));
        } else {
          return navRight;
        }
      };

      /**
       * Steal contentRight's children
       */
      var renderContentRight = function renderContentRight() {
        var type = typeof contentRight === 'undefined' ? 'undefined' : _typeof(contentRight);

        if (type !== 'string') {
          return _react2.default.createElement('div', _extends({ className: 'slds-grid' }, contentRight.props));
        } else {
          return contentRight;
        }
      };

      labelElement = renderLabel();
      iconElement = renderIcon();
      titleElement = renderTitle();
      infoElement = renderInfo();
      navRightElement = renderNavRight();
      contentRightElement = renderContentRight();

      switch (variant) {
        case 'objectHome':
          Variant = _ObjectHome2.default;
          break;
        case 'recordHome':
          Variant = _RecordHome2.default;
          break;
        case 'relatedList':
          Variant = RelatedList;
          break;
        default:
          Variant = _Base2.default;
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: classes, role: 'banner' }, attr),
        _react2.default.createElement(Variant, {
          label: labelElement,
          icon: iconElement,
          title: titleElement,
          info: infoElement,
          contentRight: contentRightElement,
          navRight: navRightElement,
          details: details })
      );
    }
  }, {
    key: '_getClassNames',
    value: function _getClassNames(className) {
      return (0, _classnames2.default)('slds-page-header', className);
    }
  }]);

  return PageHeader;
}(_react.Component);

PageHeader.displayName = displayName;
PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

module.exports = PageHeader;
module.exports.Info = _Info2.default;
module.exports.Title = _Title2.default;
module.exports.DetailRow = _DetailRow2.default;
module.exports.DetailBlock = _DetailBlock2.default;