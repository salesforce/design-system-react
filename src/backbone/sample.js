import Selectlist from './selectlist';

// Framework specific
import Backbone from 'backbone';

var $mySelectlist1 = $('#mySelectlist1');
var $mySelectlist2 = $('#mySelectlist2');

var collection = new Backbone.Collection([
	{ id: 0, name: 'One', value: '1'  },
	{ id: 1, name: 'Two', value: '2'  },
	{ id: 2, name: 'Three', value: '3'  },
	{ id: 3, name: 'Buzz', value: '4'  },
	{ id: 4, name: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
	{ id: 5, name: 'A Disabled Item', disabled: true, value: 'disabled' }
]);

var mySelectlist1 = new Selectlist({
	collection: collection,
	disabled: false,
	resize: 'auto'
});

$mySelectlist1.append(mySelectlist1.render().el);

// sample method buttons
$('.enabled .btnSelectlistGetSelectedItem').on('click', function () {
	console.log(mySelectlist1.getSelection());
});
$('.enabled .btnSelectlistSelectByValue').on('click', function () {
	mySelectlist1.setSelection({ value : '2' });
});
$('.enabled .btnSelectlistEnableSelectlist').on('click', function () {
	mySelectlist1.enable();
});
$('.enabled .btnSelectlistDisableSelectlist').on('click', function () {
	mySelectlist1.disable();
});

var mySelectlist2 = new Selectlist({
	collection: collection,
	disabled: true,
	selection: collection.at(0),
	resize: 'auto'
});

$mySelectlist2.append(mySelectlist2.render().el);

// sample method buttons
$('.disabled .btnSelectlistGetSelectedItem').on('click', function () {
	console.log(mySelectlist2.getSelection());
});
$('.disabled .btnSelectlistSelectByObject').on('click', function () {
	mySelectlist2.setSelection(collection.at(3));
});
$('.disabled .btnSelectlistEnableSelectlist').on('click', function () {
	mySelectlist2.enable();
});
$('.disabled .btnSelectlistDisableSelectlist').on('click', function () {
	mySelectlist2.disable();
});