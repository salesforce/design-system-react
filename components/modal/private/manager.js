'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _event = require('../../../utilities/event');

var _event2 = _interopRequireDefault(_event);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customStyles = {
	content: {
		position: 'default',
		top: 'default',
		left: 'default',
		right: 'default',
		bottom: 'default',
		border: 'default',
		background: 'default',
		overflow: 'default',
		WebkitOverflowScrolling: 'default',
		borderRadius: 'default',
		outline: 'default',
		padding: 'default'
	},
	overlay: {
		backgroundColor: 'default'
	}
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var Manager = (0, _createReactClass2.default)({
	displayName: 'Manager',
	getDefaultProps: function getDefaultProps() {
		return {
			title: '',
			isOpen: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			isOpen: this.props.isOpen,
			revealed: false
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		if (!this.state.revealed) {
			setTimeout(function () {
				_this.setState({ revealed: true });
			});
		}
		this.updateBodyScroll();
	},
	componentWillUnmount: function componentWillUnmount() {
		this.isUnmounting = true;
	},
	openModal: function openModal() {
		this.setState({ isOpen: true });
	},
	closeModal: function closeModal() {
		this.setState({ isOpen: false });
	},
	handleSubmitModal: function handleSubmitModal() {
		this.closeModal();
	},
	updateBodyScroll: function updateBodyScroll() {
		if (window && document && document.body) {
			if (this.state.isOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'inherit';
			}
		}
	},
	getModal: function getModal() {
		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			_react2.default.createElement(
				'div',
				{
					className: 'slds-modal' + (this.state.revealed ? ' slds-fade-in-open' : ''),
					onClick: this.closeModal
				},
				_react2.default.createElement(
					'div',
					{
						className: 'slds-modal__container',
						onClick: function onClick(e) {
							_event2.default.trap(e);
						}
					},
					_react2.default.createElement(
						'div',
						{ className: 'slds-modal__header' },
						_react2.default.createElement(
							'h2',
							{ className: 'slds-text-heading--medium' },
							this.props.title
						),
						_react2.default.createElement(
							_button2.default,
							{
								className: 'slds-button slds-modal__close',
								onClick: this.closeModal
							},
							_react2.default.createElement(_icon2.default, { name: 'close', category: 'utility', size: 'small' }),
							_react2.default.createElement(
								'span',
								{ className: 'slds-assistive-text' },
								'Close'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-modal__content' },
						this.props.children
					),
					_react2.default.createElement(
						'div',
						{ className: 'slds-modal__footer' },
						this.props.footer
					)
				)
			)
		);
	},
	render: function render() {
		return _react2.default.createElement(
			_reactModal2.default,
			{
				isOpen: this.state.isOpen,
				onRequestClose: this.closeModal,
				style: customStyles,
				overlayClassName: 'slds-modal-backdrop' + (this.state.revealed ? ' slds-modal-backdrop--open' : '')
			},
			this.getModal()
		);
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		if (this.state.isOpen !== prevState.isOpen) {
			this.updateBodyScroll();

			if (!this.state.isOpen) {
				if (!this.isUnmounting) {
					var el = this.getDOMNode().parentNode;
					if (el && el.getAttribute('data-slds-modal')) {
						_reactDom2.default.unmountComponentAtNode(el);
						document.body.removeChild(el);
					}
				}
			}
		}
	}
});

exports.default = Manager;