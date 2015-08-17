// LOADER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../core/lib';
import LoaderCore, {CONTROL} from '../../core/loader';

// Framework specific
import createPlugin from '../createPlugin';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

const Loader = function Loader (element, options) {
	this.options = Lib.extend({}, options);
	this.elements = {
		wrapper: $(element)
	};

	this.isIElt9 = false;
	if (this.ieVer !== false && this.ieVer < 9) {
		this.elements.wrapper.addClass('iefix');
		this.isIElt9 = true;
	}

	this._initializeState();
	this._initialize(this.options);
};

const methods = {
	_onInitialized () {
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
		this.elements.wrapper.attr('data-frame', this.getState('frame') + '');
		this._play();
	},

	_play () {
		const self = this;
		clearTimeout(this._timeout);

		this._timeout = setTimeout(function () {
			self._next();
			self._play();
		}, this.getState('delay'));
	},

	_next () {
		let frame = this.getState('frame');

		frame++;

		if (frame > this.getState('end')) {
			frame = this.getState('begin');
		}

		this.setState({ frame });

		this.elements.wrapper.attr('data-frame', frame + '');
		this.ieRepaint();
	},

	_previous: function () {
		let frame = this.getState('frame');

		frame--;

		if (frame < this.getState('begin')) {
			frame = this.getState('end');
		}

		this.setState({ frame });

		this.elements.wrapper.attr('data-frame', frame + '');
		this.ieRepaint();
	},

	_pause () {
		clearTimeout(this._timeout);
	},

	_reset () {
		this.setState({ frame: this.getState('begin') });
		this.elements.wrapper.attr('data-frame', this.getState('begin') + '');
	},

	destroy () {
		// clear timeout
		this._pause();

		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	}
};

Lib.merge(Loader.prototype, LoaderCore, State, methods);

const legacyMethods = {
	play: methods._play,
	next: methods._next,
	previous: methods._previous,
	pause: methods._pause,
	reset: methods._reset
};

createPlugin(CONTROL, Loader, legacyMethods);

export default Loader;
