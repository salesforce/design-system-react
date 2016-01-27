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

import DateWeek from './datepicker-week';

export const CONTROL = 'datepicker-calendar';

const Calendar = React.createClass({
	displayName: CONTROL,

	propTypes: {
		calendarData: React.PropTypes.array,
		selectDate: React.PropTypes.func
	},

	render () {
		const self = this;

		return (
				<table className="datepicker__month" role="grid" aria-labelledby="month">
					<thead>
					<tr id="weekdays">
						<th id="Sunday">
							<abbr title="Sunday">S</abbr>
						</th>
						<th id="Monday">
							<abbr title="Monday">M</abbr>
						</th>
						<th id="Tuesday">
							<abbr title="Tuesday">T</abbr>
						</th>
						<th id="Wednesday">
							<abbr title="Wednesday">W</abbr>
						</th>
						<th id="Thursday">
							<abbr title="Thursday">T</abbr>
						</th>
						<th id="Friday">
							<abbr title="Friday">F</abbr>
						</th>
						<th id="Saturday">
							<abbr title="Saturday">S</abbr>
						</th>
					</tr>
					</thead>
					<tbody>
						{ this.props.calendarData.map(function (week, i) {
							return <DateWeek key={i} week={week} onSelectDay={self._handleDateClicked} multiSelect={self.props.multiSelect}/>;
						}) }
					</tbody>
				</table>
		);
	},

	_handleDateClicked (day) {
		this.props.selectDate(day);
	}
});

export default Calendar;
