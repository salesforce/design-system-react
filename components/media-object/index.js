define(['exports', 'react', 'create-react-class', 'prop-types', 'classnames', '../../utilities/constants'], function (exports, _react, _createReactClass, _propTypes, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.cssClasses = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`


	// ### classNames
	// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
	// This project uses `classnames`, "a simple javascript utility for conditionally
	// joining classNames together."
	var cssClasses = exports.cssClasses = {
		base: 'slds-media',
		figure: 'slds-media__figure',
		body: 'slds-media__body'
	};

	/**
  * When you need text and a figure next to each other, use a media object.
  */
	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

	// ### React
	var MediaObject = (0, _createReactClass2.default)({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.MEDIA_OBJECT,
		// ### Prop Types
		propTypes: {
			/**
    * Often the body may need to be truncated for correct layout. This is only applicable if using the component within a flexbox container.
    */
			canTruncate: _propTypes2.default.bool,
			/**
    * Class names to be added to the component's HTML tag with `slds-media` class.
    */
			className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
			/**
    * The body is often text such as a heading or paragraph.
    */
			body: _propTypes2.default.node,
			/**
    * The figure is the optional visualization of the text within the body.
    */
			figure: _propTypes2.default.node,
			/**
    * Vertically centers the body with the middle of the figure.
    */
			verticalCenter: _propTypes2.default.bool
		},

		render: function render() {
			return _react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)(cssClasses.base, {
						'slds-media--center': this.props.verticalCenter,
						'slds-has-flexi-truncate': this.props.canTruncate
					}, this.props.className)
				},
				this.props.figure ? _react2.default.createElement(
					'div',
					{ className: cssClasses.figure },
					this.props.figure,
					' '
				) : null,
				_react2.default.createElement(
					'div',
					{ className: cssClasses.body },
					this.props.body
				)
			);
		}
	});

	exports.default = MediaObject;
});