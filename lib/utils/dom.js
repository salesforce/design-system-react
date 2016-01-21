'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Traverse all children
 */
function flatMapChildren(children, f) {
  var result = [];
  function go(xs, f) {
    return _react2.default.Children.map(xs, function (c) {
      result.push(f(c));
      if (c.type) go(c.props.children, f);
    });
  }
  go(children, f);
  return result;
}

/**
 * Perhaps there's a more pragmatic way to do this. Eventually, I suspect we'll have some utils to help find children.
 */
function hasChild(children, name) {
  var flag = false;
  flatMapChildren(children, function (c) {
    flag = flag || c.type && c.type.name === name;
  });
  return flag;
}

// findDOMNode complains so filter out strings from virtual dom
function textContent(children) {
  return flatMapChildren(children, function (c) {
    if (typeof c === 'string') return c;
  }).join(' ');
}

exports.default = { textContent: textContent, hasChild: hasChild };