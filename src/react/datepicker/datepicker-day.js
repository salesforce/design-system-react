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

// Third party
import classNames from 'classnames';

export const CONTROL = 'datepicker-day';

const DateDay = React.createClass({
	displayName: CONTROL,

	propTypes: {
		day: React.PropTypes.object,
		multiSelect: React.PropTypes.bool,
		onSelectDay: React.PropTypes.func
	},

	render () {
		const self = this;
		const day = this.props.day;

		return (
			<td
				onClick={this._handleDateClicked.bind(self, this.props.day)}
				className={
					classNames({
						'slds-is-today': day.today,
						'slds-disabled-text': day.outside,
						'slds-is-selected': day.selected,
						'slds-is-selected-multi': day.selected && this.props.multiSelect
					})
				}
				role="gridcell" aria-disabled="true">
				<span className="slds-day">{day.day}</span>
			</td>
		);
	},

	_handleDateClicked (day) {
		this.props.onSelectDay(day);
	}
});

export default DateDay;
