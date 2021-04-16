/* eslint-disable react/no-string-refs */

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import SLDSTimepicker from '../../time-picker';
import IconSettings from '../../icon-settings';

const formatter = (date) =>
	date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
const dateTimeNow = new Date();
const defaultStrValue = formatter(dateTimeNow);

const defaultProps = {
	onDateChange: () => {},
	value: dateTimeNow,
	strValue: defaultStrValue,
};

describe('SLDSTimepicker: ', () => {
	describe('Timepicker Value Prop Change', () => {
		it('displays a modified state upon changing props', () => {
			const futureDateTime = new Date(
				new Date().getTime() + 24 * 60 * 60 * 1000
			);

			const TestTimepicker = class extends React.Component {
				state = {
					isOpen: false,
					value: futureDateTime,
					strValue: formatter(futureDateTime),
				};

				render() {
					return (
						<IconSettings iconPath="/assets/icons">
							<SLDSTimepicker ref="timePicker" {...defaultProps} />
						</IconSettings>
					);
				}
			};
			const parent = TestUtils.renderIntoDocument(<TestTimepicker />);
			parent.refs.timePicker.state.strValue.should.eql(defaultStrValue);
		});
	});
});
