/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Popover - tooltip variant

// Implements the [Popover design pattern](https://core-204.lightningdesignsystem.com/components/popovers#flavor-tooltips) in React.
// Based on SLDS v2.1.0-rc3


import React, { PropTypes } from "react";
import ReactDOM from "react-dom";

import { POPOVER_TOOLTIP } from '../../utilities/constants';


// ### Children
import tooltip from "./tooltip";

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Util helpers
import flatten from "lodash.flatten";
import compact from "lodash.compact";


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';


// ### Display Name
// Always use the canonical component name as the React display name.
const displayName = POPOVER_TOOLTIP;


const propTypes = {
	/**
	 * Alignment of the Tooltip relative to the element that triggers it.
	 */
	align: PropTypes.oneOf(["top", "top left", "top right", "right", "right top", "right bottom", "bottom", "bottom left", "bottom right", "left", "left top", "left bottom"]).isRequired,
	/**
	 * Pass the element that triggers Tooltip as a child of the Tooltip component. It must be either an anchor or button so keyboard users can tab to it.
	 */
	children: PropTypes.node,
	/**
	 * Content inside Tooltip.
	 */
	content: PropTypes.node.isRequired,
	/**
	 * Delay on Tooltip closing.
	 */
	hoverCloseDelay: PropTypes.number,
		/**
		* A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the popover to the triggering element.
		*/
	id: PropTypes.string,
	openByDefault: PropTypes.bool
};

const defaultProps = {
	align: "top",
	content: <span>Tooltip</span>,
	hoverCloseDelay: 50,
	openByDefault: false,
};

/**
 * The PopoverTooltip component is variant of the Lightning Design System Popover component. This component wraps an element that triggers it to open. It must be a focusable child element (either a button or anchor) so that keyboard users can navigate to it.
 */
class PopoverTooltip extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isClosing: false,
			isOpen: false
		};
	}

	componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(POPOVER_TOOLTIP, this.props);

		this.generatedId = shortid.generate();
	}

	componentDidMount() {
		this.setState({
			el: ReactDOM.findDOMNode(this)
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.target && this.props.target !== prevProps.target){
			this.setState({
				tooltipTarget: this.getTooltipTarget()
			})
		}
	}

	componentWillUnmount() {
		this.isUnmounting = true;
	}

	getId () {
		return this.props.id || this.generatedId;
	}

	getTooltipTarget() {
		return this.props.target ? this.props.target : this.state.el;
	}

	handleMouseEnter() {
		this.setState({
			isOpen: true,
			isClosing: false
		});
	}

	handleMouseLeave() {
		this.setState({ isClosing: true });

		setTimeout(()=>{
			if(!this.isUnmounting && this.state.isClosing){
				this.setState({
					isOpen: false,
					isClosing: false
				});
			}
		},this.props.hoverCloseDelay);
	}

	getTooltipContent() {
		return <div className="slds-popover__body">{this.props.content}</div>;
	}

	handleCancel() {
		this.setState({
			isOpen: false,
			isClosing: false
		});
	}

	getTooltip() {
		const isOpen = this.props.openByDefault !== undefined ? this.state.isOpen : this.props.openByDefault;
		const id = this.getId();
		return isOpen
			? tooltip.getTooltip(id, this.props, this.getTooltipContent(), this.getTooltipTarget(), this.handleCancel.bind(this))
			: <span></span>;
	}

	renderAssistantText() {
		return <span className="slds-assistive-text">{this.props.content}</span>;
	}

	decorateGrandKidsWithKeyToSilenceWarning(grandKids) {
		return React.Children.map(grandKids, (c, i) => React.isValidElement(c) ? React.cloneElement(c, {key: i}) : c)
	}

	grandKidsWithAsstText(child) {
		const {props={}} = child;
		const grandKids = compact(flatten([this.renderAssistantText()].concat(props.children)));
		return this.decorateGrandKidsWithKeyToSilenceWarning(grandKids);
	}

	getContent() {
		return React.Children.map(this.props.children, (child, i) => {
			return React.cloneElement(child, {
				key: i,
				'aria-describedby': this.getId(),
				onBlur: this.handleMouseLeave.bind(this),
				onFocus: this.handleMouseEnter.bind(this),
				onMouseEnter: this.handleMouseEnter.bind(this),
				onMouseLeave: this.handleMouseLeave.bind(this),
			}, this.grandKidsWithAsstText(child));
		 });
	}

	render(){
		const containerStyles = { display: "inline" };
		return (
			<div
				style={containerStyles}
				ref="tooltipTarget"
				>
				{ this.getContent() }
				{ this.getTooltip() }
			</div>
		);
	}

}


PopoverTooltip.displayName = displayName;
PopoverTooltip.propTypes = propTypes;
PopoverTooltip.defaultProps = defaultProps;

module.exports = PopoverTooltip;

