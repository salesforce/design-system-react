/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// LOOKUP ACTION - REACT FACADE

import React from 'react';
import classNames from 'classnames';

export const CONTROL = 'lookup-action';

const LookupAction = React.createClass({
	displayName: CONTROL,

	propTypes: {
		activeDescendantId: React.PropTypes.string,
		id: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		onClick: React.PropTypes.func,
		parentProps: React.PropTypes.object.isRequired,
		renderer: React.PropTypes.func.isRequired,
		numResults: React.PropTypes.number.isRequired,
		searchString: React.PropTypes.string,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		const isHighlighted = this.props.activeDescendantId === this.props.id;
		
		return (
			<div className={classNames('slds-lookup__item', {'slds-theme--shade': isHighlighted})} id={this.props.id}>
				<button className="slds-button" onClick={this.props.onClick} tabIndex="-1">
					{this.props.renderer({
						searchString: this.props.searchString,
						label: this.props.label,
						strings: this.props.strings,
						props: this.props.parentProps,
						numResults: this.props.numResults
					})}
				</button>
			</div>
		);
	}
});

export default LookupAction;
