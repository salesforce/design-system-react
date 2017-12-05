define(['exports', 'react', 'create-react-class', '../../../../components/icon-settings', '../../../../components/popover', '../../../../components/button', '@storybook/addon-actions'], function (exports, _react, _createReactClass, _iconSettings, _popover, _button, _addonActions) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _iconSettings2 = _interopRequireDefault(_iconSettings);

	var _popover2 = _interopRequireDefault(_popover);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// `~` is replaced with design-system-react at runtime
	var Example = (0, _createReactClass2.default)({
		displayName: 'PopoverExample',

		getInitialState: function getInitialState() {
			return {
				isOpen: false
			};
		},
		handleOpen: function handleOpen() {
			this.setState({ isOpen: true });
		},
		handleCancel: function handleCancel() {
			this.setState({ isOpen: false });
		},
		handleApply: function handleApply() {
			this.setState({ isOpen: false });
		},
		handleRequestClose: function handleRequestClose(event, data) {
			if (this.props.log) {
				this.props.log('onRequestClose');
			}
			this.setState({ isOpen: false });
		},
		handleClose: function handleClose(event, data) {
			if (this.props.log) {
				this.props.log('onClose')(event, data);
			}
		},
		render: function render() {
			return _react2.default.createElement(
				_iconSettings2.default,
				{ iconPath: '/assets/icons' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_popover2.default,
						{
							isOpen: this.state.isOpen,
							body: 'Are you sure you want to continue with your action?',
							footer: _react2.default.createElement(
								'div',
								{ className: 'slds-text-align--right' },
								_react2.default.createElement(_button2.default, { label: 'Cancel', onClick: this.handleCancel }),
								_react2.default.createElement(_button2.default, { variant: 'brand', label: 'Apply', onClick: this.handleApply })
							),
							heading: 'Confirmation',
							onClose: this.handleClose,
							onRequestClose: this.handleRequestClose
						},
						_react2.default.createElement(_button2.default, { label: 'Trigger Popover', onClick: this.handleOpen })
					)
				)
			);
		}
	});

	exports.default = Example;
});