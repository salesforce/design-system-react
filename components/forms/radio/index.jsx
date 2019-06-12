/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import Radio from '../../radio';
import componentHasMoved from '../../../utilities/warning/component-has-moved';
import { RADIO } from '../../../utilities/constants';

componentHasMoved(RADIO, {
	oldFileLocation: 'components/forms/radio',
	newFileLocation: 'components/radio',
});

export default Radio;
