// LOADER CONTROL - JQUERY FACADE

// Core
import * as Lib from '../../lib/lib';
import SpinnerCore, {CONTROL} from '../../core/spinner';

// Framework specific
import DOM from '../dom';
import State from '../state';

const $ = Lib.global.jQuery || Lib.global.$;

let Spinner = function Spinner () {
	const options = this._getOptions(arguments);
	
	this._initialize(options);
};

// Prototype extension object
const SpinnerObject = {
	_initializer () {
		this.element = this.$el = this.elements.control = $('<div />', {
			class: this.sizes[this.getProperty('size')]
		});
	},
	
	_render () {
		const strings = this.getState('strings');
		
		this.element
			.append(
			$('<img />', {
				src: this.fileNames[this.getProperty('theme')],
				alt: strings.LOADING
			})
		);
		
		return this.element;
	}
};

// Merging into prototype
Lib.merge(Spinner.prototype, SpinnerCore, DOM, State, SpinnerObject);

// Framework setup
Spinner = Lib.runHelpers('jquery', CONTROL, Spinner);

// Exporting
export default Spinner;
