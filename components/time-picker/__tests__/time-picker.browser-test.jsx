/* eslint-disable react/no-string-refs */

import React, { createFactory } from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

import SLDSTimepicker from '../../time-picker';
import IconSettings from '../../icon-settings';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass,
} = TestUtils;

const mockCallback = sinon.spy();

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

			const TestTimepicker = createFactory(
				createReactClass({
					getInitialState () {
						// force the state to have a future dateTime...
						return {
							isOpen: false,
							value: futureDateTime,
							strValue: formatter(futureDateTime),
						};
					},
					render () {
						return (
							<IconSettings iconPath="/assets/icons">
								<SLDSTimepicker ref="timePicker" {...defaultProps} />
							</IconSettings>
						);
					},
				})
			);

			const parent = TestUtils.renderIntoDocument(TestTimepicker());
			parent.refs.timePicker.state.strValue.should.eql(defaultStrValue);
		});
	});
});
