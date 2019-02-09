/* eslint-disable filenames/match-regex */
import * as React from 'react';
import Alert from '../alert';

export default (
	<Alert
		dismissible
		labels={{
			heading: 'Logged in as John Smith (johnsmith@acme.com).',
			headingLink: 'Log out',
		}}
		uxpId="0"
		style={{ fontFamily: 'Salesforce Sans' }}
	/>
);
