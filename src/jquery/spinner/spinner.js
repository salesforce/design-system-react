// LOADER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import SpinnerCore, {CONTROL} from '../../core/spinner';

// Framework specific
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

let Spinner = function Spinner (element, options) {
	this.options = Lib.extend(SpinnerCore._defaultProperties, options);
	this.elements = {
		wrapper: $(element)
	};

	this._initializeState();
	this._initialize(this.options);
};

// Prototype extension object
const SpinnerObject = {
	_onInitialized () {
		this.render();
	},

	render () {
		this.elements.wrapper.empty();

		$('<div />', {
			class: this.cssClasses[this.options.size]
		}).append(
			$('<img />', {
				src: this.fileNames[this.options.theme],
				alt: 'Loading...'
			})
		).appendTo(this.elements.wrapper);
	},

	destroy () {
		this.elements.wrapper.remove();
		return this.elements.wrapper[0].outerHTML;
	}
};

// Merging into prototype
Lib.merge(Spinner.prototype, SpinnerCore, State, SpinnerObject);

// Framework setup
Spinner = Lib.runHelpers('jquery', CONTROL, Spinner);

// Exporting
export default Spinner;
