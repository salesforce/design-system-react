// PICKER CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Openable from '../traits/openable';

require('../../less/picker.less');


export const CONTROL = 'picker';

const PickerCore = Lib.merge({}, Base, Openable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},
	
	_defaultState: {
		popupCss: {
			visibility: 'hidden'
		}
	},
	
	_getPositionAbove (element) {
		const position = element.offset();
		
		position.top = position.top - this.elements.popup.outerHeight(true);
		return position;
	},

	_getPositionBelow (element) {
		const position = element.offset();
		
		position.top = position.top + element.outerHeight(true);
		return position;
	},
	
	_getCenteredPosition () {
		// TO-DO: Implement this to support modals
	},
	
	_setPosition (position, popupCss) {
		popupCss.top = position.top + 'px';
		popupCss.left = position.left + 'px';
		
		this.setState({ popupCss });
		if (Lib.isFunction(this._onPopupCssUpdated)) this._onPopupCssUpdated();
	},
	
	_positionAt (element) {
		const popupCss = getState('popupCss');
		
		popupCss.visibility = 'hidden';
		this.setState({ popupCss });

		const positionBelow = this._getPositionBelow(element);
		this._setPosition(positionBelow, popupCss);

		if (this.elements.popup.isOffscreen()) {
			this._setPosition(this._getPositionAbove(element), popupCss);
			
			if (this.elements.popup.isOffscreen()) {
				this._setPosition(positionBelow, popupCss);
			}
		}

		popupCss.visibility = 'visible';
		this.setState({ popupCss });

		if (Lib.isFunction(this._onPopupCssUpdated)) this._onPopupCssUpdated();
	}
});

export default PickerCore;
