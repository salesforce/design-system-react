/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import Input from '../../input';
import componentHasMoved from '../../../utilities/warning/component-has-moved';
import { INPUT } from '../../../utilities/constants';

componentHasMoved(INPUT, {
	oldFileLocation: 'components/forms/input',
	newFileLocation: 'components/input',
});

export default Input;
