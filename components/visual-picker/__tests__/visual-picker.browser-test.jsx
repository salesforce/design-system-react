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
		it('legend is correctly rendered', () => {
			const legend = handles.visualPicker.find(
				'#visual-picker-event-test-1 legend'
			);
			expect(legend.text()).to.equal('Select any one');
		});
		it('options are covered on selection', () => {
			expect(
				handles.visualPicker
					.find('#visual-picker-event-test-1 label div')
					.hasClass('slds-visual-picker__icon')
			).to.equal(true);
		});
	});
});
