/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
import onClickOutside from 'react-onclickoutside';
import DefaultFooter from './menu/default-footer';
import DefaultHeader from './menu/default-header';
import DefaultSectionDivider from './menu/default-section-divider';
import Lookup from './lookup';

export default onClickOutside(Lookup, {
	excludeScrollbar: true,
});

export { DefaultHeader };
export { DefaultSectionDivider };
export { DefaultFooter };
