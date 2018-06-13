"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _pill = require("../../../../components/pill");

var _pill2 = _interopRequireDefault(_pill);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var Example = (0, _createReactClass2.default)({
  displayName: 'BasePillExample',
  propTypes: {
    action: _react.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      action: function action() {
        return noop;
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      linked: true,
      unlinked: true,
      truncated: true
    };
  },
  onClick: function onClick(event) {
    this.props.action('onClick')(event);
  },
  onRemoveLinked: function onRemoveLinked(event) {
    this.props.action('onRemove')(event);
    this.setState({
      linked: false
    });
  },
  onRemoveUnlinked: function onRemoveUnlinked(event) {
    this.props.action('onRemove')(event);
    this.setState({
      unlinked: false
    });
  },
  onRemoveTruncated: function onRemoveTruncated(event) {
    this.props.action('onRemove')(event);
    this.setState({
      truncated: false
    });
  },
  renderLinked: function renderLinked() {
    if (this.state.linked) {
      return _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        onClick: this.onClick,
        onRemove: this.onRemoveLinked
      });
    }

    return null;
  },
  renderUnlinked: function renderUnlinked() {
    if (this.state.unlinked) {
      return _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill Label',
          title: 'Full pill label verbiage mirrored here',
          removeTitle: 'Remove'
        },
        onRemove: this.onRemoveUnlinked
      });
    }

    return null;
  },
  renderTruncated: function renderTruncated() {
    if (this.state.truncated) {
      return _react2.default.createElement("div", {
        style: {
          width: '220px',
          position: 'relative'
        }
      }, _react2.default.createElement("div", {
        className: "slds-pill_container"
      }, _react2.default.createElement(_pill2.default, {
        labels: {
          label: 'Pill label that is longer than the area that contains it',
          removeTitle: 'Remove'
        },
        onClick: this.onClick,
        onRemove: this.onRemoveTruncated
      })));
    }

    return null;
  },
  render: function render() {
    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      className: "slds-grid slds-grid_pull-padded-medium"
    }, _react2.default.createElement("div", {
      className: "slds-p-horizontal_medium"
    }, this.renderLinked()), _react2.default.createElement("div", {
      className: "slds-p-horizontal_medium"
    }, this.renderUnlinked()), _react2.default.createElement("div", {
      className: "slds-p-horizontal_medium"
    }, this.renderTruncated())));
  }
});
exports.default = Example;