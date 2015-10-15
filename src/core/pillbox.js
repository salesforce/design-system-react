// PILLBOX CONTROL

import * as Lib from '../lib/lib';
import Base from './base';

// Traits
import Disableable from '../traits/disableable';
import Multiselectable from '../traits/multiselectable';

require('../../scss/components/buttons/flavors/base/index.scss');
require('../../scss/components/buttons/flavors/icon/index.scss');
require('../../scss/components/pills/flavors/base/index.scss');
require('../../scss/components/pills/flavors/portrait/index.scss');


export const CONTROL = 'pillbox';

const PickerCore = Lib.merge({}, Base, Disableable, Multiselectable, {
	// CSS classes used within this control
	cssClasses: {
		CONTROL: CONTROL
	},

	_defaultProperties: {
		multiSelect: true,
		selection: [],
		acceptKeyCodes: [13, 188]
	},

	accessors: {
		getText (item) {
			return item.get('text');
		},

		getValue (item) {
			return item.get('value');
		}
	},

	_canSelect (item, select) {
		if (Lib.isFunction(this._onAdd)) {
			Promise.resolve(this._onAdd(item)).then(canSelect => {
				if (canSelect !== false) {
					select();
				}
			}, error => {
				Lib.log(error);
			});
		} else {
			select();
		}
	},

	_canDeselect (item, deselect) {
		if (Lib.isFunction(this._onRemove)) {
			Promise.resolve(this._onRemove(item)).then(canDeselect => {
				if (canDeselect !== false) {
					deselect();
				}
			}, error => {
				Lib.log(error);
			});
		} else {
			deselect();
		}
	},

	_isAcceptKeyCode (keyCode) {
		const acceptKeys = this.getProperty('acceptKeyCodes');
		let isAccepted;

		acceptKeys.forEach( (key) => {
			if (key === keyCode) {
				isAccepted = true;
			}
		});

		return isAccepted;
	}
});

export default PickerCore;
