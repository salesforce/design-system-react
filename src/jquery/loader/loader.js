// LOADER CONTROL - JQUERY FACADE

// Core
import Lib from '../../core/lib';
import LoaderCore, {CONTROL} from '../../core/loader';

// Framework specific
import createPlugin from '../createPlugin';

const $ = Lib.global.jQuery || Lib.global.Zepto || Lib.global.ender || Lib.global.$;

const Loader = function Loader (element, options) {
  this.options = $.extend({}, options);

  this.begin = this.options.begin || 1;
  this.delay = this.options.delay || 150;
  this.end = this.options.end || 8;
  this.frame = this.options.frame || 1;

  // override options with data-* properties
  this.begin = ($(element).is('[data-begin]')) ? parseInt($(element).attr('data-begin'), 10) : this.begin;
	this.delay = ($(element).is('[data-delay]')) ? parseFloat($(element).attr('data-delay')) : this.delay;
	this.end = ($(element).is('[data-end]')) ? parseInt($(element).attr('data-end'), 10) : this.end;
	this.frame = ($(element).is('[data-frame]')) ? parseInt($(element).attr('data-frame'), 10) : this.begin;

	this.isIElt9 = false;
  if (this.ieVer !== false && this.ieVer < 9) {
		this.$element.addClass('iefix');
		this.isIElt9 = true;
	}

  this.elements = {
    wrapper: $(element)
  };

  this.__constructor(this.options);
};

Lib.extend(Loader.prototype, LoaderCore, {
  onInitialized () {
    this.render();
  },

  ieRepaint: function () {
    if (this.isIElt9) {
      this.$element.addClass('iefix_repaint').removeClass('iefix_repaint');
    }
  },

  msieVersion: function () {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    return false;
  },

  render () {
    this.elements.wrapper.empty();
		this.elements.wrapper.toggleClass(this.cssClasses.CONTROL, true);
    this.play();
  },

  play () {
    const self = this;
		clearTimeout(this.timeout);

    this.timeout = setTimeout(function () {
      self.next();
      self.play();
    }, this.delay);
  },

  next () {
    this.frame++;

		if (this.frame > this.end) {
			this.frame = this.begin;
		}

		this.elements.wrapper.attr('data-frame', this.frame + '');
    this.ieRepaint();
  },

  pause: function () {
			clearTimeout(this.timeout);
	},

  reset: function () {
    this.frame = this.options.frame;
  },

  destroy () {
      // clear timeout
      this.pause();

      $(this.elements.wrapper).remove();
  }

});

createPlugin(CONTROL, Loader);
export default Loader;
