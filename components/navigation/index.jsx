/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import VerticalNavigation from '../vertical-navigation';
import componentHasMoved from '../../utilities/warning/component-has-moved';
import { VERTICAL_NAVIGATION } from '../../utilities/constants';

componentHasMoved(VERTICAL_NAVIGATION, {
	oldFileLocation: 'components/navigation',
	newFileLocation: 'components/vertical-navigation',
});

export default VerticalNavigation;
