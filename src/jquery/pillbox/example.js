import * as Lib from '../../lib/lib';
import Pillbox from './pillbox';

const $ = Lib.global.jQuery || Lib.global.$;

$(function () {
	const pillbox = new Pillbox($('#pillbox1'), {
		selection: [
			{
				text: 'test1',
				value: 'test1'
			},
			{
				text: 'test2',
				value: 'test1'
			}
		]
	});

	void(pillbox);

	$('#pillbox-jquery-control .pillbox1').pillbox({
		selection: [
			{
				text: 'test1',
				value: 'test1'
			},
			{
				text: 'test2',
				value: 'test1'
			}
		],

		onAdd: function (item, callback) {
			setTimeout( function () {
				console.log(item);
				callback(item);
			}, 0);
		},

		onRemove: function (item, callback) {
			setTimeout( function () {
				console.log(item);
				callback(item);
			}, 0);
		}
	});
});

