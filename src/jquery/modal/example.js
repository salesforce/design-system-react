import * as Lib from '../../lib/lib';
import Modal from './modal';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const modal = new Modal($('#modal-jquery-control'), {});
});
