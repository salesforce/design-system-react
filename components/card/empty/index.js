define(['module', 'react', '../../../utilities/constants'], function (module, _react, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var PropTypes = _react2.default.PropTypes;


	// Allow for predicatable DOM queries with `querySelectorAll(cssClasses.base)`
	var idSuffixes = {
		heading: '__empty-heading'
	};

	var CardEmpty = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.CARD_EMPTY,

		// ### Prop Types
		propTypes: {
			/**
    * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
    */
			children: PropTypes.node,
			/**
    * Primary text for an Empty Card.
    */
			heading: PropTypes.string,
			/**
    * Set the HTML `id` of the empty heading.
    */
			id: PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				heading: 'No Related Items'
			};
		},
		render: function render() {
			var id = this.props.id ? this.props.id + idSuffixes.heading : null;
			return _react2.default.createElement(
				'div',
				{ className: 'slds-p-horizontal--small' },
				_react2.default.createElement(
					'div',
					{ className: 'slds-text-align--center slds-m-bottom--x-large' },
					_react2.default.createElement(
						'h3',
						{ id: id, className: 'slds-text-heading--small slds-p-top--large slds-p-bottom--large' },
						this.props.heading
					),
					this.props.children
				)
			);
		}
	});

	module.exports = CardEmpty;
	module.exports.idSuffixes = idSuffixes;
});