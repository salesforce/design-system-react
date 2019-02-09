/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Radio from '../../radio';
import RadioButtonGroup from '../radio-button-group';

export default (
	<RadioButtonGroup
	labels="Day of week"
	uxpId="0"
	>
		<Radio
			uxpId="1"
			key="Mon"
			label="Mon"
			value="Mon"
			variant="button-group"
		/>
		<Radio
			uxpId="2"
			key="Tue"
			label="Tue"
			value="Tue"
			variant="button-group"
		/>
		<Radio
			uxpId="3"
			key="Wed"
			label="Wed"
			value="Wed"
			variant="button-group"
		/>
</RadioButtonGroup>
);
