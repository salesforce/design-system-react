'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Svg = (0, _createReactClass2.default)({
	displayName: 'Svg',

	getPaths: function getPaths(paths) {
		if (paths instanceof Array) {
			return paths.map(function (item) {
				return _react2.default.createElement('path', item);
			});
		}
		return _react2.default.createElement('path', _extends({ key: 'pathSVG' }, paths));
	},
	getCircles: function getCircles(circles) {
		if (circles instanceof Array) {
			return circles.map(function (item) {
				return _react2.default.createElement('circle', item);
			});
		}
		return _react2.default.createElement('circle', _extends({ key: 'circleSVG' }, circles));
	},
	getEllipses: function getEllipses(ellipses) {
		if (ellipses instanceof Array) {
			return ellipses.map(function (item) {
				return _react2.default.createElement('ellipse', item);
			});
		}
		return _react2.default.createElement('ellipse', _extends({ key: 'ellipseSVG' }, ellipses));
	},
	getGroups: function getGroups(groups) {
		var _this = this;

		if (groups instanceof Array) {
			return groups.map(function (item) {
				return _react2.default.createElement(
					'g',
					null,
					_this.getShapes(item)
				);
			});
		}

		return _react2.default.createElement(
			'g',
			{ key: 'groupsSVG' },
			this.getShapes(groups)
		);
	},
	getShapes: function getShapes(data) {
		var shapes = [];

		if (data) {
			if (data.g) {
				shapes.push(this.getGroups(data.g));
			}

			if (data.ellipse) {
				shapes.push(this.getEllipses(data.ellipse));
			}

			if (data.circle) {
				shapes.push(this.getCircles(data.circle));
			}

			if (data.path) {
				shapes.push(this.getPaths(data.path));
			}
		}
		return shapes;
	},
	getSVG: function getSVG(_ref, props) {
		var viewBox = _ref.viewBox,
		    rest = _objectWithoutProperties(_ref, ['viewBox']);

		return _react2.default.createElement(
			'svg',
			{
				'aria-hidden': props['aria-hidden'],
				className: props.className,
				viewBox: viewBox,
				name: props.name,
				style: props.style
			},
			this.getShapes(rest)
		);
	},
	render: function render() {
		var _props = this.props,
		    data = _props.data,
		    props = _objectWithoutProperties(_props, ['data']);

		return data ? this.getSVG(data, props) : null;
	}
});

exports.default = Svg;