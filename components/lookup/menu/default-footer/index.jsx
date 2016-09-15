/*
	 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
	 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
	 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */

// Implements the [Lookup design pattern](https://latest-204.lightningdesignsystem.com/components/lookups) in React.
// Based on SLDS v2.1.0-dev

import React from 'react';
import Icon from "../../../icon";
import { EventUtil } from '../../../../utilities';

const displayName = "LookupDefaultFooter";
const propTypes = {};
const defaultProps = {};

class DefaultFooter extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isActive !== this.props.isActive && nextProps.isActive === true) {
			this.props.setFocus('newItem');
		}
	}

	handleClick(){
		if(this.props.onClose){
			this.props.onClose();
		}
	}

	handleMouseDown(event) {
		EventUtil.trapImmediate(event);
	}

	render(){
		let className = 'slds-lookup__item-action slds-lookup__item-action--label';
		if(this.props.isActive) className += ' slds-theme--shade'

		return (
			<div className="js-slds-lookup__item" onClick={this.handleClick.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
				<a id="newItem" href="javascript:void(0);" className={className}>
					<span className="lookup__item-action-label">
						<Icon name='add' category="utility" size="x-small" className="slds-icon-text-default" />
						<span className="slds-truncate">
							{this.props.newItemLabel ? this.props.newItemLabel : "Add New Item" }
						</span>
					</span>
				</a>
			</div>
		)
	}
}

DefaultFooter.displayName = displayName;
DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

module.exports = DefaultFooter;
