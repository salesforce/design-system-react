// SVG HELPER METHODS - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

// Third party
import classNames from 'classnames';

export const SvgObject = {

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
			$icon = $('<svg ' + 'class="' + this._getIconClassNames() + '"><use xlink:href="' + Lib.getSVGPath(this.getProperty('icon')) + '"></use></svg>')
				.attr('aria-hidden', 'true');
		}

		return $icon || '';
	}
};

export default SvgObject;
