// SVG HELPER METHODS - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

// Third party
import classNames from 'classnames';

export const SvgObject = {

	_getSVGPath () {
		// TODO: Evaluate best way to do this and clean this up more
		const iconPaths = Lib.getIconPaths();
		const icon = Lib.isString( this.getProperty('icon') ) && this.getProperty('icon').split('.');
		
		if (icon.length === 2) {
			const iconPath = iconPaths[icon[0]];
			
			if (iconPath) {
				return [iconPath, icon[1]].join('#');
			}
		}
	},

	_getIconClassNames () {
		let iconBaseClass;

		if ( this.getProperty('view') ) {
			iconBaseClass = this.cssClasses.STATEFUL_ICON;
		} else {
			iconBaseClass = this.cssClasses.ICON;
		}

		return classNames(iconBaseClass,
			!!this.getProperty('text') && this.childIconStyles[ this.getProperty('iconPosition') ]);
	},

	_renderIcon () {
		let $icon = undefined;

		if (this.getProperty('icon')) {
			$icon = $('<svg ' + 'class="' + this._getIconClassNames() + '"><use xlink:href="' + this._getSVGPath() + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon || '';
	}
};

export default SvgObject;
