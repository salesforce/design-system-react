"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = textContent;

function textContentArray(child) {
  var text = [];

  if (typeof child === 'string' || typeof child === 'number') {
    text.push(child);
  } else if (Array.isArray(child)) {
    text.push(child.forEach(textContentArray));
  } else if (child && child.props) {
    var children = child.props.children;
    text.push(textContentArray(children));
  }

  return text;
}

function textContent(child) {
  return textContentArray(child).join('');
}