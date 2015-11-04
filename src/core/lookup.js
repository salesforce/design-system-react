// COMBOBOX CORE

import * as Lib from '../lib/lib';
import PicklistCore from './picklist';

export const CONTROL = 'slds-lookup';

const LookupCore = Lib.merge({}, PicklistCore, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL,
		INPUT: 'slds-input',
		MENU: 'slds-lookup__menu',
		LIST: 'slds-lookup__list'
	}
});

export default LookupCore;
