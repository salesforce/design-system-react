/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import Breadcrumb from '../breadcrumb';
import componentHasMoved from '../../utilities/warning/component-has-moved';
import { BREADCRUMB } from '../../utilities/constants';

componentHasMoved(BREADCRUMB, {
	oldFileLocation: 'components/bread-crumb',
	newFileLocation: 'components/breadcrumb',
});

export default Breadcrumb;
