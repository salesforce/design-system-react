define(['exports', 'react'], function (exports, _react) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Traverse all children
  */
	function flatMapChildren(children, iterator) {
		var result = [];
		function go(xs) {
			return _react2.default.Children.map(xs, function (child) {
				result.push(iterator(child));
				if (child.type) go(child.props.children);
			});
		}
		go(children);
		return result;
	}

	/**
  * Perhaps there's a more pragmatic way to do this. Eventually, I suspect we'll have some utils to help find children.
  */
	function hasChild(children, name) {
		var flag = false;
		flatMapChildren(children, function (child) {
			flag = flag || child.type && child.type.name === name;
		});
		return flag;
	}

	// findDOMNode complains so filter out strings from virtual dom
	function textContent(children) {
		return flatMapChildren(children, function (child) {
			// eslint-disable-line consistent-return
			if (typeof child === 'string') return child;
		}).join(' ');
	}

	exports.default = { textContent: textContent, hasChild: hasChild };
});