/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';
import Svg from '../svg';

export const COMPONENT = 'datepicker-input';

const DateInput = React.createClass({
	displayName: COMPONENT,

	propTypes: {
		selectedDate: React.PropTypes.any,
		strings: React.PropTypes.object.isRequired,
		ariaLabel: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired
	},

	componentWillMount () {
		this.setState({
			selectedDate: this.props.selectedDate
		});
	},

	componentWillReceiveProps (nextProps) {
		if (nextProps.selectedDate) {
			this.setState({
				selectedDate: nextProps.selectedDate
			});
		}
	},

	render () {
		return (
			<div className="slds-form-element">
				<div className="slds-form-element__control">
					<div className="slds-input-has-icon slds-input-has-icon--right">
						<Svg className="slds-input__icon slds-icon-text-default" category="utility" name="event" />
						<input
							className="slds-input"
							type="text"
							placeholder={this.props.strings.DATE_FORMAT}
							aria-label={this.props.ariaLabel}
							aria-haspopup="true"
							value={this.state.selectedDate}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
							onBlur={this.callOnChange} />
					</div>
				</div>
			</div>
		);
	},

	handleChange (event) {
		this.setState({
			selectedDate: event.target.value
		});
	},

	handleKeyPress (e) {
		if (e.key === 'Enter') {
			this.callOnChange();
		}
	},

	callOnChange () {
		if (this.state.selectedDate !== this.props.selectedDate) {
			this.props.onChange(this.state.selectedDate);
		}
	}
});

export default DateInput;
