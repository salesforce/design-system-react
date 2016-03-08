'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _EventUtil = require('../utils/EventUtil');

var _EventUtil2 = _interopRequireDefault(_EventUtil);

var _KEYS = require('../utils/KEYS');

var _KEYS2 = _interopRequireDefault(_KEYS);

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

var displayName = "SLDSList";
var propTypes = {
  className: _react2.default.PropTypes.string,
  checkmark: _react2.default.PropTypes.bool,
  highlightedIndex: _react2.default.PropTypes.number,
  itemRenderer: _react2.default.PropTypes.func,
  options: _react2.default.PropTypes.array,
  onCancel: _react2.default.PropTypes.func,
  onListBlur: _react2.default.PropTypes.func,
  onListItemBlur: _react2.default.PropTypes.func,
  onMoveFocus: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func,
  selectedIndex: _react2.default.PropTypes.number
};
var defaultProps = {
  className: '',
  highlightedIndex: 0,
  itemRenderer: null,
  options: [],
  onCancel: function onCancel(delta) {
    console.log("onCancel should be overwritten");
  },
  onListBlur: function onListBlur() {
    console.log("onListBlur should be overwritten");
  },
  onListItemBlur: function onListItemBlur(listItemIndex) {
    console.log("onListItemBlur should be overwritten");
  },
  onMoveFocus: function onMoveFocus(delta) {
    console.log("onMoveFocus should be overwritten");
  },
  onSelect: function onSelect(index) {
    console.log("onSelect should be overwritten");
  },
  selectedIndex: -1
};

var SLDSList = function (_React$Component) {
  _inherits(SLDSList, _React$Component);

  function SLDSList() {
    _classCallCheck(this, SLDSList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SLDSList).apply(this, arguments));
  }

  _createClass(SLDSList, [{
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      _EventUtil2.default.trapImmediate(event);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (e.nativeEvent) {
        e.nativeEvent.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
      }
      e.preventDefault();
    }
  }, {
    key: 'handleUpdateHighlighted',
    value: function handleUpdateHighlighted(nextIndex) {
      if (this.props.onUpdateHighlighted) {
        this.props.onUpdateHighlighted(nextIndex);
      }
    }
  }, {
    key: 'handleListItemBlur',
    value: function handleListItemBlur(event) {
      if (event && event.target) {
        var indexx = parseInt(event.target.getAttribute('data-index'));
        if (this.props.onListItemBlur) {
          this.props.onListItemBlur(indexx);
        }
        this.setState({ lastBlurredIndex: indexx });
      }
    }
  }, {
    key: 'handleMoveFocus',
    value: function handleMoveFocus(delta) {
      var newHighlightedIndex = this.props.highlightedIndex + delta;
      if (newHighlightedIndex < 0) {
        newHighlightedIndex = this.props.options.length - 1;
      } else if (newHighlightedIndex >= this.props.options.length) {
        newHighlightedIndex = 0;
      }
      if (this.props.onUpdateHighlighted) {
        this.props.onUpdateHighlighted(newHighlightedIndex);
      }
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(index) {
      if (this.props.onSelect) {
        this.props.onSelect(index);
      }
    }
  }, {
    key: 'handleItemFocus',
    value: function handleItemFocus(itemIndex, itemHeight) {
      if (this.refs.scroll) {
        _reactDom2.default.findDOMNode(this.refs.scroll).scrollTop = itemIndex * itemHeight;
      }
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(index, ch) {
      var searchChar = ch.toLowerCase();
      for (var i = index + 1; i < this.props.options.length; i++) {
        var option = this.props.options[i];
        if (option && option.label) {
          if (option.label.charAt(0).toLowerCase() === searchChar) {
            if (this.props.onUpdateHighlighted) {
              this.props.onUpdateHighlighted(i);
            }
            return;
          }
        }
      }
      for (var _i = 0; _i < index; _i++) {
        var _option = this.props.options[_i];
        if (_option && _option.label) {
          if (_option.label.charAt(0).toLowerCase() === searchChar) {
            if (this.props.onUpdateHighlighted) {
              this.props.onUpdateHighlighted(_i);
            }
            return;
          }
        }
      }
    }
  }, {
    key: 'getItems',
    value: function getItems() {
      var _this2 = this;

      return this.props.options.map(function (option, index) {
        return _react2.default.createElement(_ListItem2.default, {
          checkmark: _this2.props.checkmark,
          data: option,
          index: index,
          isHighlighted: index === _this2.props.highlightedIndex,
          isHover: _this2.props.isHover,
          isSelected: index === _this2.props.selectedIndex,
          key: 'ListItem_' + index,
          label: option.label,
          labelRenderer: _this2.props.itemRenderer,
          onFocus: _this2.handleItemFocus.bind(_this2)
          //          onMoveFocus={this.handleMoveFocus.bind(this)}
          , onSelect: _this2.handleSelect.bind(_this2),
          onUpdateHighlighted: _this2.handleUpdateHighlighted.bind(_this2),
          value: option.value });
      });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      if (event.keyCode) {

        if (event.keyCode === _KEYS2.default.DOWN) {
          _EventUtil2.default.trapEvent(event);
          this.handleMoveFocus(1);
        } else if (event.keyCode === _KEYS2.default.UP) {
          _EventUtil2.default.trapEvent(event);
          this.handleMoveFocus(-1);
        } else if (event.keyCode === _KEYS2.default.ENTER || event.keyCode === _KEYS2.default.SPACE) {
          _EventUtil2.default.trapEvent(event);
          var index = parseInt(event.target.getAttribute('data-index'));
          this.handleSelect(index);
        } else if (event.keyCode === _KEYS2.default.ESCAPE) {
          _EventUtil2.default.trapEvent(event);
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        } else if (event.keyCode === _KEYS2.default.TAB) {} else {
          _EventUtil2.default.trapEvent(event);
          var ch = String.fromCharCode(event.keyCode);
          var _index = parseInt(event.target.getAttribute('data-index'));
          this.handleSearch(_index, ch);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        {
          'aria-labelledby': this.props.triggerId,
          className: "slds-dropdown__list slds-dropdown--length-5 " + this.props.className
          //        onMouseEnter={this.props.onMouseEnter}
          //        onMouseDown={this.handleMouseDown.bind(this)}
          //        onMouseLeave={this.props.onMouseLeave}
          , onBlur: this.handleListItemBlur.bind(this),
          onKeyDown: this.handleKeyDown.bind(this),
          ref: 'scroll',
          role: 'menu'
        },
        this.getItems()
      );
    }
  }]);

  return SLDSList;
}(_react2.default.Component);

SLDSList.displayName = displayName;
SLDSList.propTypes = propTypes;
SLDSList.defaultProps = defaultProps;

module.exports = SLDSList;