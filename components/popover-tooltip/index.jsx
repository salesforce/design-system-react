/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import Tooltip from '../tooltip';

import componentHasMoved from '../../utilities/warning/component-has-moved';
import { POPOVER_TOOLTIP } from '../../utilities/constants';

componentHasMoved(POPOVER_TOOLTIP, {
	oldFileLocation: 'components/popover-tooltip',
	newFileLocation: 'components/tooltip',
});

export default Tooltip;
