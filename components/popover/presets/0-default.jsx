/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Popover from '../popover.jsx';
import Button from '../../button/button.jsx';

export default (
	<Popover
		uxpId="0"
		body="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		heading="Header Title"
	>
		<Button label="Trigger Popover" uxpId="1" />
	</Popover>
);
