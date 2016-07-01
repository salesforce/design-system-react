'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadCrumb = function BreadCrumb(props) {
	var assistiveText = props.assistiveText;
	var trail = props.trail;


	return _react2.default.createElement(
		'nav',
		{ role: 'navigation' },
		_react2.default.createElement(
			'p',
			{ id: 'bread-crumb-label', className: 'slds-assistive-text' },
			assistiveText
		),
		_react2.default.createElement(
			'ol',
			{ className: 'slds-breadcrumb slds-list--horizontal', 'aria-labelledby': 'bread-crumb-label' },
			trail.map(function (crumb, index) {
				return _react2.default.createElement(
					'li',
					{
						key: 'BreadCrumb.' + index,
						className: 'slds-list__item slds-text-heading--label'
					},
					crumb
				);
			})
		)
	);
};

BreadCrumb.displayName = _constants.BREAD_CRUMB;

BreadCrumb.propTypes = {
	/**
  * The assistive text for the breadcrumb trail
  */
	assistiveText: _react2.default.PropTypes.string,
	/**
  * An array of react elements presumably anchor elements.
  */
	trail: _react2.default.PropTypes.array
};

module.exports = BreadCrumb;