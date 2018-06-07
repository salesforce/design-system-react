"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _navigation = require("../../../../components/navigation");

var _navigation2 = _interopRequireDefault(_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var sampleReportCategories = [{
  id: 'reports',
  label: 'Reports',
  items: [{
    id: 'recent_reports',
    label: 'Recent'
  }, {
    id: 'my_reports',
    label: 'Created by Me'
  }, {
    id: 'private_reports',
    label: 'Private Reports'
  }, {
    id: 'public_reports',
    label: 'Public Reports'
  }, {
    id: 'all_reports',
    label: 'All Reports'
  }]
}, {
  id: 'folders',
  label: 'Folders',
  items: [{
    id: 'my_folders',
    label: 'Created by Me'
  }, {
    id: 'shared_folders',
    label: 'Shared with Me'
  }, {
    id: 'all_folders',
    label: 'All Folders'
  }]
}];
var Example = (0, _createReactClass2.default)({
  displayName: 'NavigationExample',
  getInitialState: function getInitialState() {
    return {
      selectedId: 'recent_reports'
    };
  },
  render: function render() {
    var _this = this;

    return _react2.default.createElement(_iconSettings2.default, {
      iconPath: "/assets/icons"
    }, _react2.default.createElement("div", {
      style: {
        width: '320px'
      }
    }, _react2.default.createElement(_navigation2.default, {
      id: "sample-navigation",
      categories: sampleReportCategories,
      selectedId: this.state.selectedId,
      onSelect: function onSelect(event, data) {
        _this.setState({
          selectedId: data.item.id
        });

        if (_this.props.action) {
          var dataAsArray = Object.keys(data).map(function (key) {
            return data[key];
          });

          _this.props.action('onSelect').apply(void 0, [event, data].concat(_toConsumableArray(dataAsArray)));
        } else if (console) {
          console.log('[onSelect] (event, data)', event, data);
        }
      }
    })));
  }
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime