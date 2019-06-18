/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// ### onClickOutside
// Listen for clicks that occur somewhere in the document, outside of the element itself
import onClickOutside from 'react-onclickoutside';
import LanguageDirection from '../utilities/UNSAFE_direction/private/language-direction';
import Combobox from './combobox';

export default LanguageDirection(
	onClickOutside(Combobox, {
		excludeScrollbar: true,
	})
);
