// # Picker Control
// ### Core

// Bring in the [shared library functions](../lib/lib.html).
import * as Lib from '../lib/lib';

// Inherit from the [base control](base.html).
import Base from './base';

export const CONTROL = 'Picker';

const PickerCore = Lib.merge({}, Base, {
	CONTROL,
	
	// CSS classes used within this control
	cssClasses: {
		CONTROL: 'slds-picker'
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
		// TODO: Implement this to support modals
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
