/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// DATEPICKER MONTH - REACT FACADE

// Framework specific
import React from 'react';
import Button from '../button';

export const CONTROL = 'datepicker-year';

const DateMonth = React.createClass({
	displayName: CONTROL,

	propTypes: {
		monthName: React.PropTypes.string,
		jumpToPreviousMonth: React.PropTypes.func,
		jumpToNextMonth: React.PropTypes.func,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
				<div className="slds-align-middle">
					<Button iconCategory="utility" iconName="left" assistiveText={this.props.strings.PREVIOUS_MONTH} iconStyle="icon-container" onClick={this.props.jumpToPreviousMonth}/>
				</div>
				<h2 id="month" className="slds-align-middle" aria-live="assertive" aria-atomic="true">{this.props.monthName}</h2>
				<div className="slds-align-middle">
					<Button iconCategory="utility" iconName="right" assistiveText={this.props.strings.NEXT_MONTH} iconStyle="icon-container" onClick={this.props.jumpToNextMonth}/>
				</div>
			</div>
		);
	}
});

export default DateMonth;
