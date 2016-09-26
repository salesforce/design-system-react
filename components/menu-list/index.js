"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require("../../utilities");

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _listItemLabel = require("./list-item-label");

var _listItemLabel2 = _interopRequireDefault(_listItemLabel);

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

var displayName = "MenuList";
var propTypes = {
  className: _react2.default.PropTypes.string,
  /**
   * If true, renders checkmark icon on the selected Menu Item.
   */
  checkmark: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  /**
   * Custom element that overrides the default Menu Item component.
   */
  listItemRenderer: _react2.default.PropTypes.func,
  /**
   * If true, component renders specifically to work inside Modal.
   */
  onClick: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  /**
   * Menu item data.
   */
  options: _react2.default.PropTypes.array.isRequired
};
var defaultProps = {
  checkmark: true
};

/**
 * The MenuPicklist component is a variant of the Lightning Design System Menu component.
 */

var MenuPicklist = function (_React$Component) {
  _inherits(MenuPicklist, _React$Component);

  function MenuPicklist(props) {
    _classCallCheck(this, MenuPicklist);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuPicklist).call(this, props));

    _this.state = {
      highlightedIndex: 0,
      isOpen: false,
      lastBlurredIndex: -1,
      lastBlurredTimeStamp: -1,
      selectedIndex: _this.props.selectedIndex,
      /* triggerId is the id of the element that triggers the Menu to open.
      * Need this for aria-labelledby on <ul> in Menu for accessibility. */
      triggerId: _this.props.label ? _this.props.label.replace(/\s+/g, '') + '_Button' : 'Picklist_Button'
    };

    return _this;
  }

  _createClass(MenuPicklist, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmounting = true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.lastBlurredTimeStamp !== prevState.lastBlurredTimeStamp) {
        if (this.state.lastBlurredIndex === this.state.highlightedIndex) {
          this.handleClose();
        }
      }
      if (this.state.selectedIndex !== prevState.selectedIndex) {
        this.handleClose();
      }

      if (this.props.selectedIndex !== prevProps.selectedIndex || !(0, _lodash2.default)(this.props.options, prevProps.options)) {
        if (this.props.selectedIndex !== this.state.selectedIndex) {
          this.handleSelect(this.props.selectedIndex);
        }
      }
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(index) {
      this.setState({ selectedIndex: index });
      if (this.props.onSelect) {
        this.props.onSelect(index);
      }
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      _utilities.EventUtil.trapImmediate(event);
    }
  }, {
    key: "handleUpdateHighlighted",
    value: function handleUpdateHighlighted(nextIndex) {
      this.setState({ highlightedIndex: nextIndex });
    }
  }, {
    key: "handleListBlur",
    value: function handleListBlur() {
      if (this.props.onListBlur) {
        this.props.onListBlur();
      }
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }, {
    key: "getListItemRenderer",
    value: function getListItemRenderer() {
      return this.props.listItemRenderer ? this.props.listItemRenderer : _listItemLabel2.default;
    }
  }, {
    key: "handleListItemBlur",
    value: function handleListItemBlur(index, relatedTarget) {
      this.setState({
        lastBlurredIndex: index,
        lastBlurredTimeStamp: Date.now()
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_list2.default, {
        checkmark: this.props.checkmark,
        highlightedIndex: this.state.highlightedIndex,
        itemRenderer: this.getListItemRenderer(),
        onCancel: this.handleCancel.bind(this),
        onListBlur: this.handleListBlur.bind(this),
        onListItemBlur: this.handleListItemBlur.bind(this),
        onSelect: this.handleSelect.bind(this),
        onUpdateHighlighted: this.handleUpdateHighlighted.bind(this),
        options: this.props.options,
        ref: "list",
        selectedIndex: this.state.selectedIndex
      });
    }
  }]);

  return MenuPicklist;
}(_react2.default.Component);

MenuPicklist.displayName = displayName;
MenuPicklist.propTypes = propTypes;
MenuPicklist.defaultProps = defaultProps;

module.exports = MenuPicklist;
module.exports.ListItemLabel = _listItemLabel2.default;