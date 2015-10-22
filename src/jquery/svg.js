// SVG HELPER METHODS - JQUERY FACADE

// Core
import * as Lib from '../lib/lib';

// Framework specific
const $ = Lib.global.jQuery || Lib.global.$;

export const SvgObject = {

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
