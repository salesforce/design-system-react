"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.assign");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _button = require("../button");

var _button2 = _interopRequireDefault(_button);

var _popover = require("../popover");

var _popover2 = _interopRequireDefault(_popover);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable no-script-url */
// # Filter
// Implements part of the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1
// ## Dependencies
// ### React
// ### assign
// ### classNames
// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
// ## Constants

/**
 * A Filter is a popover with custom trigger. It can be used by [Panel Filtering](/components/panels/). Menus within a Filter Popover will need to not have "portal mounts" and be inline.
 */
var Filter = (0, _createReactClass2.default)({
  displayName: _constants.FILTER,
  propTypes: {
    /**
     * Aligns the popover with the respective side of the trigger. That is `left` will place the `Popover` to the left of the Filter.
     */
    align: _propTypes2.default.oneOf(['left', 'right']),

    /**
     * **Assistive text for accessibility**
     * * `removeFilter`: Assistive text for removing a filter. The default is `Remove Filter: this.props.property this.props.predicate`.
     * * `editFilter`: Assistive text for changing a filter.
     * * `editFilterHeading`: Assistive text for Popover heading.
     */
    assistiveText: _propTypes2.default.shape({
      editFilter: _propTypes2.default.string,
      editFilterHeading: _propTypes2.default.string,
      removeFilter: _propTypes2.default.string
    }),

    /**
     * Contents of popover. That is the dropdowns and inputs that set the filter criteria.
     */
    children: _propTypes2.default.node,

    /**
     * Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Applies error state styling. Per filter error messages are outside this components.
     */
    isError: _propTypes2.default.bool,

    /**
     * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
     */
    id: _propTypes2.default.string,

    /**
     * If true, the filter will not display an editing popover when clicked.
     */
    isLocked: _propTypes2.default.bool,

    /**
     * Applies new filter styling.
     */
    isNew: _propTypes2.default.bool,

    /**
     * If true, the filter will not include a remove button.
     */
    isPermanent: _propTypes2.default.bool,

    /**
     * Will be triggered when Done within the Popover is clicked. This is the place to update the filter props displayed. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
     */
    onChange: _propTypes2.default.func,

    /**
     * Will be triggered when "Remove Filter" button is clicked. Callback will recieve parameters: `clickEvent, { id }`. An index into your store may be a good setting for `id`, so that it will be passed back here.
     */
    onRemove: _propTypes2.default.func,

    /**
     * Will be triggered when Filter is clicked. This is the place to close/open popover if a custom popover is passed in
     */
    onClick: _propTypes2.default.func,

    /**
     * A `Popover` component. The props from this popover will be merged and override any default props. This also allows a Filter's Popover dialog to be a controlled component. _Tested with Mocha framework._
     */
    popover: _propTypes2.default.node,

    /**
     * The criteria you are filtering for. For instance, if "Hair Color is PURPLE" is your filter, "is PURPLE" is your filter predicate.
     */
    predicate: _propTypes2.default.node,

    /**
     * The property you are filtering. For instance, if "Hair Color is PURPLE" is your filter, "Hair Color" is your filter property.
     */
    property: _propTypes2.default.node
  },
  getDefaultProps: function getDefaultProps() {
    return {
      align: 'left',
      assistiveText: {
        editFilter: 'Edit filter:',
        editFilterHeading: 'Choose filter criteria'
      },
      predicate: 'New Filter'
    };
  },
  getInitialState: function getInitialState() {
    return {
      popoverIsOpen: this.props.popover ? this.props.popover.props.isOpen : false
    };
  },
  componentWillMount: function componentWillMount() {
    this.generatedId = _shortid2.default.generate();
    (0, _checkProps2.default)(_constants.FILTER);
  },
  getId: function getId() {
    return this.props.id || this.generatedId;
  },
  getCustomPopoverProps: function getCustomPopoverProps(_ref) {
    var assistiveText = _ref.assistiveText;

    /*
     * Generate the popover props based on passed in popover props. Using the default behavior if not provided by passed in popover
     */
    var popoverBody = _react2.default.createElement("div", null, _react2.default.createElement("h4", {
      className: "slds-assistive-text",
      id: "".concat(this.getId(), "-popover-heading")
    }, assistiveText.editFilterHeading), this.props.children, _react2.default.createElement("div", {
      className: "slds-m-top--small slds-text-align--right"
    }, _react2.default.createElement(_button2.default, {
      className: "slds-col--bump-left",
      label: "Done",
      onClick: this.handleChange
    })));

    var defaultPopoverProps = {
      ariaLabelledby: "".concat(this.getId(), "-popover-heading"),
      align: this.props.align,
      body: popoverBody,
      heading: '',
      id: this.getId(),
      isOpen: this.state.popoverIsOpen,
      // MAGIC NUMBERS - REMOVE/REDESIGN WHEN DESIGN FOR RIGHT-ALIGNED FILTERS ARE ADDED TO SLDS
      offset: this.props.align === 'right' ? '0px -35px' : undefined,
      onClose: this.handleClose,
      onRequestClose: this.handleClose,
      position: 'overflowBoundaryElement',
      triggerClassName: 'slds-grow'
    };
    /* Mixin passed popover's props if there is any to override the default popover props */

    var popoverProps = (0, _lodash2.default)(defaultPopoverProps, this.props.popover ? this.props.popover.props : {});
    delete popoverProps.children;
    return popoverProps;
  },
  handleFilterClick: function handleFilterClick() {
    this.setState({
      popoverIsOpen: true
    });

    if (this.props.onClick) {
      this.props.onClick();
    }
  },
  handleClose: function handleClose() {
    this.setState({
      popoverIsOpen: false
    });
  },
  handleChange: function handleChange(event) {
    this.setState({
      popoverIsOpen: false
    });

    if (this.props.onChange) {
      this.props.onChange(event, {
        id: this.getId()
      });
    }
  },
  handleRemove: function handleRemove(event) {
    if (this.props.onRemove) {
      this.props.onRemove(event, {
        id: this.getId()
      });
    }
  },
  render: function render() {
    /* Remove at next breaking change */
    var assistiveText = {
      editFilter: this.props.assistiveTextEditFilter || // eslint-disable-line react/prop-types
      this.props.assistiveText.editFilter,
      editFilterHeading: this.props.assistiveTextEditFilterHeading || // eslint-disable-line react/prop-types
      this.props.assistiveText.editFilterHeading,
      removeFilter: this.props.assistiveTextRemoveFilter || // eslint-disable-line react/prop-types
      this.props.assistiveText.removeFilter || "Remove Filter: ".concat(this.props.property, " ").concat(this.props.predicate)
    };
    /* TODO: Button wrapper for property and predictate should be transitioned to `Button` component. `Button` needs to take custom children first though. */

    var popoverProps = this.getCustomPopoverProps({
      assistiveText: assistiveText
    });
    return _react2.default.createElement("div", {
      className: (0, _classnames2.default)('slds-filters__item', 'slds-grid', 'slds-grid--vertical-align-center', {
        'slds-is-locked': this.props.isLocked,
        'slds-is-new': this.props.isNew,
        'slds-has-error': this.props.isError
      }, this.props.className)
    }, !this.props.isLocked && (this.props.children || this.props.popover) ? _react2.default.createElement(_popover2.default, popoverProps, _react2.default.createElement("button", {
      className: "slds-button--reset slds-grow slds-has-blur-focus",
      onClick: this.handleFilterClick,
      "aria-describedby": this.props.isError ? "".concat(this.getId(), "-error") : undefined
    }, _react2.default.createElement("span", {
      className: "slds-assistive-text"
    }, assistiveText.editFilter), this.props.property ? _react2.default.createElement("p", {
      className: "slds-text-body--small"
    }, this.props.property) : null, _react2.default.createElement("p", null, this.props.predicate))) : _react2.default.createElement("button", {
      "aria-describedby": this.props.isError ? "".concat(this.getId(), "-error") : undefined,
      className: "slds-button--reset slds-grow slds-has-blur-focus",
      disabled: true
    }, _react2.default.createElement("p", {
      className: "slds-text-body--small"
    }, this.props.property), _react2.default.createElement("p", null, this.props.predicate)), // Remove button
    !this.props.isPermanent && !this.props.isLocked ? _react2.default.createElement(_button2.default, {
      assistiveText: {
        icon: assistiveText.removeFilter
      },
      hint: true,
      iconCategory: "utility",
      iconName: "close",
      iconSize: "small",
      iconVariant: "bare",
      onClick: this.handleRemove,
      title: assistiveText.removeFilter,
      variant: "icon"
    }) : null);
  }
});
exports.default = Filter;