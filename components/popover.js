'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tetherDrop = require('tether-drop');

var _tetherDrop2 = _interopRequireDefault(_tetherDrop);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({

	displayName: 'Popover',

	mixins: [require('react-onclickoutside')],

	handleClickOutside: function handleClickOutside() {
		this.handleClose();
	},
	handleClose: function handleClose() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	},


	propTypes: {
		//		targetAttachment: React.PropTypes.string,
	},

	getDefaultProps: function getDefaultProps() {
		return {
			verticalAlign: 'bottom',
			horizontalAlign: 'left',
			className: 'slds-dropdown',
			closeOnTabKey: false,
			marginTop: '0.20rem',
			marginBottom: '0.35rem',
			marginLeft: 0,
			marginRight: 0,
			flippable: true,
			constrainToScrollParent: false,
			inheritTargetWidth: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			isOpen: false
		};
	},
	componentWillMount: function componentWillMount() {
		this.popoverElement = document.createElement('span');
		document.querySelector('body').appendChild(this.popoverElement);
	},
	componentDidMount: function componentDidMount() {
		this.renderPopover();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.renderPopover();
	},
	handleClick: function handleClick(event) {
		if (event.nativeEvent) {
			event.nativeEvent.preventDefault();
			event.nativeEvent.stopPropagation();
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode === _utilities.KEYS.TAB) {
			if (this.props.closeOnTabKey) {
				_utilities.EventUtil.trap(event);
				this.handleClose();
			}
		}
	},
	popoverComp: function popoverComp() {
		if (!this.state.isOpen) {
			return _react2.default.createElement('span', null);
		}

		var style = {
			transform: 'none',
			WebkitTransform: 'none',
			'marginTop': this.props.marginTop,
			'marginBottom': this.props.marginBottom,
			'marginLeft': this.props.marginLeft,
			'marginRight': this.props.marginRight,
			'float': 'inherit',
			'position': 'inherit'
		};

		if (this.props.inheritTargetWidth) {
			style.width = this.target().getBoundingClientRect().width;
		}

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('ignore-react-onclickoutside', this.props.className),
				style: style,
				onKeyDown: this.handleKeyDown,
				onMouseEnter: this.props.onMouseEnter,
				onMouseLeave: this.props.onMouseLeave
			},
			this.props.children
		);
	},
	beforeClose: function beforeClose() {},
	getHorizontalAlign: function getHorizontalAlign(align) {
		if (align.indexOf('left') > -1) {
			return 'left';
		} else if (align.indexOf('right') > -1) {
			return 'right';
		}
		return 'center';
	},
	getVerticalAlign: function getVerticalAlign(align) {
		if (align.indexOf('bottom') > -1) {
			return 'bottom';
		} else if (align.indexOf('top') > -1) {
			return 'top';
		}
		return 'middle';
	},
	isHorizontalAlign: function isHorizontalAlign(align) {
		return align === 'left' || align === 'right' || align === 'center';
	},
	isVerticalAlign: function isVerticalAlign(align) {
		return align === 'bottom' || align === 'top' || align === 'middle';
	},
	getPosition: function getPosition() {
		if (this.props.align) {
			var align = [];
			if (this.props.align) {
				var splits = this.props.align.split(' ');
				if (this.isHorizontalAlign(splits[0])) {
					var verticalAlign = splits.length > 1 ? this.getVerticalAlign(splits[1]) : this.getVerticalAlign('');
					align = [this.getHorizontalAlign(splits[0]), verticalAlign];
				} else {
					var horizontalAlign = splits.length > 1 ? this.getHorizontalAlign(splits[1]) : this.getHorizontalAlign('');
					align = [this.getVerticalAlign(splits[0]), horizontalAlign];
				}
			}

			return align.join(' ');
		}

		var positions = [];
		if (this.props.verticalAlign === 'top' || this.props.verticalAlign === 'bottom') {
			positions.push(this.props.verticalAlign);
			positions.push(this.props.horizontalAlign);
		} else {
			positions.push(this.props.horizontalAlign);
			positions.push(this.props.verticalAlign);
		}

		return positions.join(' ');
	},
	target: function target() {
		return this.props.targetElement ? _reactDom2.default.findDOMNode(this.props.targetElement) : _reactDom2.default.findDOMNode(this).parentNode;
	},
	dropOptions: function dropOptions() {
		var position = this.getPosition();

		return {
			beforeClose: this.beforeClose,
			classes: this.props.dropClass,
			constrainToWindow: this.props.flippable,
			constrainToScrollParent: this.props.constrainToScrollParent,
			content: this.popoverElement,
			openOn: 'always',
			position: position,
			remove: true,
			target: this.target()
		};
	},
	handleOpen: function handleOpen() {
		this.setState({ isOpen: true });
	},
	renderPopover: function renderPopover() {
		_reactDom2.default.render(this.popoverComp(), this.popoverElement);

		if (this.popoverElement && this.popoverElement.parentNode && this.popoverElement.parentNode.parentNode && this.popoverElement.parentNode.parentNode.className && this.popoverElement.parentNode.parentNode.className.indexOf('drop ') > -1) {
			this.popoverElement.parentNode.parentNode.style.zIndex = 10001;
		}

		if (this.drop != null) {
			if (this.drop && this.drop) {
				this.drop.position();
			}
		} else if (window && document) {
			this.drop = new _tetherDrop2.default(this.dropOptions());
			this.drop.once('open', this.handleOpen);
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		this.drop.destroy();
		_reactDom2.default.unmountComponentAtNode(this.popoverElement);

		if (this.popoverElement.parentNode) {
			this.popoverElement.parentNode.removeChild(this.popoverElement);
		}

		if (this.props.onClose) {
			this.props.onClose();
		}
	},
	render: function render() {
		return _react2.default.createElement('noscript', null);
	}
}); /*
    Copyright (c) 2015, salesforce.com, inc. All rights reserved.
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */