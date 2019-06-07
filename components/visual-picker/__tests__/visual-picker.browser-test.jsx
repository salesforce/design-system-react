import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import IconSettings from '../../icon-settings';
import Icon from '../../icon';
import VisualPicker from '../../visual-picker';
import Radio from '../../radio';
// import Checkbox from '../../checkbox';

describe('SLDS Visual Picker', () => {
	const handles = {
		visualPicker: null,
	};

	describe('Coverable Visual Picker with Radio', () => {
		// eslint-disable-next-line no-unused-vars
		let changeObject;

		beforeEach(() => {
			handles.visualPicker = mount(
				<IconSettings iconPath="/assets/icons">
					<VisualPicker
						label="Select any one"
						coverable
						id="visual-picker-event-test-1"
					>
						<Radio
							labels={{
								label: 'Connected App',
							}}
							id="visual-picker-test-radio-1"
							onChange={(data, event) => {
								changeObject = { event, data };
							}}
							onRenderVisualPickerSelected={
								<Icon
									assistiveText={{ label: 'Selected Icon' }}
									category="utility"
									name="check"
									colorVariant="base"
									size="large"
								/>
							}
							onRenderVisualPickerNotSelected={
								<Icon
									assistiveText={{ label: 'Connected App Icon' }}
									category="utility"
									name="connected_apps"
									size="large"
								/>
							}
						/>
					</VisualPicker>
				</IconSettings>
			);
		});
		it('renders visual picker', () => {
			expect(handles.visualPicker.length).to.equal(1);
		});
		it('options are selected on click', () => {
			handles.visualPicker.find({ type: 'radio' }).simulate('change');
			expect(changeObject !== undefined).to.eql(true);
		});
	});
});
