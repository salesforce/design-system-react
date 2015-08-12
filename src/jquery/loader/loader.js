// LOADER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import LoaderCore, {CONTROL} from '../../core/loader';

// Framework specific
import createPlugin from '../createPlugin';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

const Loader = function Loader (element, options) {
	this.options = $.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this.isIElt9 = false;
	if (this.ieVer !== false && this.ieVer < 9) {
		this.elements.wrapper.addClass('iefix');
		this.isIElt9 = true;
	}
	
	this.__constructor(this.options);
};

const methods = {
	onInitialized () {
		this.render();
	},

	ieRepaint () {
		if (this.isIElt9) {
			this.elements.wrapper.addClass('iefix_repaint').removeClass('iefix_repaint');
		}
	},

	msieVersion () {
		const ua = Lib.global.navigator.userAgent;
		const msie = ua.indexOf('MSIE ');

		if (msie > 0) {
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}
		return false;
	},

	render () {
		this.elements.wrapper.empty();
		this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
		this._play();
	},

	_play () {
		const self = this;
		clearTimeout(this._timeout);

		this._timeout = setTimeout(function () {
			self._next();
			self._play();
		}, this.delay);
	},

	_next () {
		var frame = this.__getState('frame');
		
		frame++;

		if (frame > this.__getState('end')) {
			frame = this.__getState('begin');
		}

		this.__setState({ frame });

		this.elements.wrapper.attr('data-frame', frame + '');
		this.ieRepaint();
	},

	_pause () {
		clearTimeout(this._timeout);
	},

	_reset () {
		this.__setState({ frame: this.__getState('begin') });
	},

	destroy () {
		// clear timeout
		this._pause();

		this.elements.wrapper.remove();
	}
};

Lib.extend(Loader.prototype, LoaderCore, methods);

const legacyMethods = {
	play: methods._play,
	next: methods._next,
	pause: methods._pause,
	reset: methods._reset
};

createPlugin(CONTROL, Loader, legacyMethods);

export default Loader;
