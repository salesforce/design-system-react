/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import warning from 'warning';
import Settings from '../../components/settings';
import { canUseDOM } from '../execution-environment';

let checkAppElementIsSet = function checkAppElementIsSetFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkAppElementIsSet = function checkAppElementIsSetFunction() {
		const appElement = Settings.getAppElement();
		/* eslint-disable max-len */
		warning(
			canUseDOM && Boolean(appElement),
			'[Design System React] App element is not defined. Please use Settings.setAppElement(el).' +
				' By default, `Modal` will add `aria-hidden=true` to the `body` tag, but this disables some assistive technologies.' +
				' To prevent this you can add Settings.setAppElement(el) to your application with `el` being the root node of your application' +
				' that you would like to hide from assistive technologies when the `Modal` is open.'
		);
	};
}

export default checkAppElementIsSet;
