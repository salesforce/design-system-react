define(['exports', 'react', 'classnames', '../../utilities/constants'], function (exports, _react, _classnames, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.cssClasses = undefined;

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
	var cssClasses = exports.cssClasses = {
		base: 'slds-media',
		figure: 'slds-media__figure',
		body: 'slds-media__body'
	};

	/**
  * A media object should be used when text and a figure next to each other is needed.
  */
	var MediaObject = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.MEDIA_OBJECT,
		// ### Prop Types
		propTypes: {
			/**
    * Allows truncation in nested flexbox containers. Often the body may need to be truncated.
    */
			canTruncate: PropTypes.bool,
			/**
    * Class names to be added to the Media Object.
    */
			className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
			/**
    * The body is often text such as a heading or paragraph.
    */
			body: PropTypes.node,
			/**
    * The figure is the optional visualization of the text within the body.
    */
			figure: PropTypes.node,
			/**
    * Vertically centers the body with the middle of the figure.
    */
			verticalCenter: PropTypes.bool
		},

		_renderMediaFigure: function _renderMediaFigure() {
			// icon should be size small
			return _react2.default.createElement(
				'div',
				{ className: cssClasses.figure },
				this.props.figure
			);
		},
		render: function render() {
			var mediaFigure = null;
			if (this.props.figure) {
				mediaFigure = this._renderMediaFigure();
			}

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(cssClasses.base, {
						'slds-media--center': this.props.verticalCenter,
						'slds-has-flexi-truncate': this.props.canTruncate
					}, this.props.className) },
				mediaFigure,
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