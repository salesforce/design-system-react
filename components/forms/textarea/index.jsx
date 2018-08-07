/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import TextArea from '../../textarea';
import componentHasMoved from '../../../utilities/warning/component-has-moved';
import { TEXTAREA } from '../../../utilities/constants';

componentHasMoved(TEXTAREA, {
	oldFileLocation: 'components/forms/textarea',
	newFileLocation: 'components/textarea',
});

export default TextArea;
