define(['module', 'react', 'react-dom', '../../../icon', '../../../../utilities', 'lodash.escaperegexp', 'classnames'], function (module, _react, _reactDom, _icon, _utilities, _lodash, _classnames) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _icon2 = _interopRequireDefault(_icon);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _classnames2 = _interopRequireDefault(_classnames);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var displayName = 'Lookup-Menu-Item';
  var propTypes = {
    data: _react2.default.PropTypes.object,
    handleItemFocus: _react2.default.PropTypes.func,
    href: _react2.default.PropTypes.string,
    iconCategory: _react2.default.PropTypes.string,
    id: _react2.default.PropTypes.string,
    index: _react2.default.PropTypes.number,
    isActive: _react2.default.PropTypes.bool,
    isDisabled: _react2.default.PropTypes.bool,
    listItemLabelRenderer: _react2.default.PropTypes.func,
    onSelect: _react2.default.PropTypes.func,
    searchTerm: _react2.default.PropTypes.string,
    setFocus: _react2.default.PropTypes.func
  };

  var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item(props) {
      _classCallCheck(this, Item);

      return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
    }

    _createClass(Item, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
          this.scrollFocus();
          this.props.setFocus(this.props.id);
        }
      }
    }, {
      key: 'boldSearchText',
      value: function boldSearchText(children) {
        return children;
      }
    }, {
      key: 'handleClick',
      value: function handleClick(e) {
        return this.props.onSelect(this.props.id, this.props.data);
      }
    }, {
      key: 'handleMouseDown',
      value: function handleMouseDown(e) {
        _utilities.EventUtil.trapImmediate(e);
      }
    }, {
      key: 'scrollFocus',
      value: function scrollFocus() {
        var height = _reactDom2.default.findDOMNode(this).offsetHeight;
        if (height && this.props.handleItemFocus) this.props.handleItemFocus(this.props.index, height);
      }
    }, {
      key: 'getIcon',
      value: function getIcon() {
        if (this.props.iconName && !this.props.listItemLabelRenderer) {
          return _react2.default.createElement(_icon2.default, {
            category: this.props.iconCategory,
            className: 'slds-media__figure',
            inverse: this.props.iconInverse,
            key: this.props.iconName,
            name: this.props.iconName,
            size: 'small'
          });
        }
      }
    }, {
      key: 'getCustomLabel',
      value: function getCustomLabel() {
        if (this.props.listItemLabelRenderer) {
          var ListItemLabel = this.props.listItemLabelRenderer;
          return _react2.default.createElement(ListItemLabel, this.props);
        }
      }
    }, {
      key: 'getLabel',
      value: function getLabel() {
        var label = void 0;
        if (this.props.children.data.subTitle) {
          label = _react2.default.createElement(
            'div',
            { className: 'slds-media__body' },
            _react2.default.createElement(
              'div',
              { className: 'slds-lookup__result-text' },
              this.boldSearchText(this.props.children.label)
            ),
            _react2.default.createElement(
              'span',
              { className: 'slds-lookup__result-meta slds-text-body--small' },
              this.props.children.data.subTitle
            )
          );
        } else {
          var labelClassName = (0, _classnames2.default)('slds-lookup__result-text', {
            'slds-m-left--x-small': !this.props.iconName
          });

          label = _react2.default.createElement(
            'div',
            { className: 'slds-media__body' },
            _react2.default.createElement(
              'div',
              { className: labelClassName },
              this.boldSearchText(this.props.children.label)
            )
          );
        }
        return label;
      }
    }, {
      key: 'render',
      value: function render() {
        var itemClassName = 'js-slds-lookup__item';
        var id = this.props.id;
        if (this.props.isActive) itemClassName += ' slds-theme--shade';

        return (
          //IMPORTANT: anchor id is used to set lookup's input's aria-activedescendant
          _react2.default.createElement(
            'li',
            { className: itemClassName },
            _react2.default.createElement(
              'a',
              {
                'aria-disabled': this.props.isDisabled,
                className: 'slds-lookup__item-action slds-media slds-media--center',
                href: this.props.href,
                id: id,
                onClick: this.handleClick.bind(this),
                onMouseDown: this.handleMouseDown.bind(this),
                ref: id,
                role: 'option',
                tabIndex: '-1' },
              this.getIcon(),
              this.props.listItemLabelRenderer ? this.getCustomLabel() : this.getLabel()
            )
          )
        );
      }
    }]);

    return Item;
  }(_react2.default.Component);

  Item.displayName = displayName;
  Item.propTypes = propTypes;

  module.exports = Item;
});