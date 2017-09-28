/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const displayName = 'Tooltip.Trigger';
const propTypes = {
	tooltip: PropTypes.node
};
const defaultProps = {
};

/**
 * The Trigger component
 */
class Trigger extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			isTooltipClosing: false,
			isTooltipOpen: false
		};
	}

	componentDidMount () {
		if (this.props.tooltip) {
			this.addListeners();
		}
		const openByDefault = this.props && this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.openByDefault ? this.props.tooltip.props.openByDefault : false;
		this.setState({		// eslint-disable-line react/no-did-mount-set-state
			isTooltipOpen: openByDefault,
			tooltipTarget: ReactDOM.findDOMNode(this) // eslint-disable-line react/no-find-dom-node
		});
	}

	addListeners () {
		ReactDOM.findDOMNode(this).addEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
		ReactDOM.findDOMNode(this).addEventListener('focus', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
		ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
		ReactDOM.findDOMNode(this).addEventListener('blur', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
	}

	componentWillUnmount () {
		this.isUnmounting = true;
		ReactDOM.findDOMNode(this).removeEventListener('mouseenter', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
		ReactDOM.findDOMNode(this).removeEventListener('focus', this.handleTooltipMouseEnter.bind(this)); // eslint-disable-line react/no-find-dom-node
		ReactDOM.findDOMNode(this).removeEventListener('mouseleave', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
		ReactDOM.findDOMNode(this).removeEventListener('blur', this.handleTooltipMouseLeave.bind(this)); // eslint-disable-line react/no-find-dom-node
	}

	handleTooltipMouseEnter = () => {
		this.setState({
			isTooltipOpen: true,
			isTooltipClosing: false
		});
	}

	handleTooltipMouseLeave = () => {
		if (this.isUnmounting) return;
		this.setState({ isTooltipClosing: true });
		const delay = this.props.tooltip && this.props.tooltip.props && this.props.tooltip.props.hoverCloseDelay ? this.props.tooltip.props.hoverCloseDelay : 0;
		setTimeout(() => {
			if (this.state.isTooltipClosing) {
				this.setState({
					isTooltipOpen: false,
					isTooltipClosing: false
				});
			}
		}, delay
    );
	}

	getMouseEventTarget () {
		/* eslint-disable no-script-url */
		return this.props.disabled ? <a
			key="MouseEventTarget"
			href="javascript:void(0)"
			aria-hidden
			tabIndex={-1}
      // inline style override
			style={{
				backgroundColor: 'transparent',
				width: '100%',
				height: '100%',
				position: 'absolute',
				left: '0',
				top: '0'
			}}
			onMouseOver={this.handleTooltipMouseEnter}
			onFocus={this.handleTooltipMouseEnter}
			onMouseOut={this.handleTooltipMouseLeave}
			onBlur={this.handleTooltipMouseLeave}
		><span className="slds-assistive-text">{this.props.label || this.props.assistiveText}</span></a> : null;
		/* eslint-enable no-script-url */
	}

	getTooltip () { // eslint-disable-line consistent-return
		if (this.props.tooltip) {
			if (this.state.isTooltipOpen && this.state.tooltipTarget) {
				return [this.getMouseEventTarget(), React.cloneElement(this.props.tooltip, {
					key: 'tooltip',
					target: this.state.tooltipTarget,
					openByDefault: true
				})];
			}

			return this.getMouseEventTarget();
		}
	}

	render () {
		return (
			<span />
		);
	}
}

Trigger.displayName = displayName;
Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

export default Trigger;
