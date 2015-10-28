// SVG HELPER METHODS - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

// Third party
import classNames from 'classnames';

export const SvgObject = {

	_getSVGPath (iconString) {
		// TODO: Evaluate best way to do this and clean this up more
		const iconPaths = Lib.getIconPaths();
		const icon = Lib.isString(iconString) && iconString.split('.');
		
		if (icon.length === 2) {
			const iconPath = iconPaths[icon[0]];
			
			if (iconPath) {
				return [iconPath, icon[1]].join('#');
			}
		}
	},

	_getIconClassNames (extraClasses) {
		let iconBaseClass;

		if (this.getProperty('view')) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		return classNames(iconBaseClass, extraClasses,
			!!this.getProperty('text') && this.childIconStyles[ this.getProperty('iconPosition') ]);
	},

	_renderIcon (iconString, extraClasses) {
		let $icon = undefined;
		const icon = iconString || this.getProperty('icon');

		if (icon) {
			$icon = $('<svg class="' + this._getIconClassNames(extraClasses) + '"><use xlink:href="' + this._getSVGPath(icon) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon || '';
	}
};

export default SvgObject;
