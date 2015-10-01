import * as Lib from '../../lib/lib';
import Radio from './radio';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	// "declarative" controls (the others use data-initialize)
	$('#myRadio1').radio();
	$('#myRadio2').radio();

	void Radio;
});
