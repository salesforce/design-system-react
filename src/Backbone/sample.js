import {Selectlist} from "./selectlist";

// Framework specific
import $ from 'jquery';
import Backbone from 'backbone';

var $element = $('#selectlist');

var collection = new Backbone.Collection([
	{ id: 0, name: 'tacos', type: 'mexican' },
	{ id: 1, name: 'burrito', type: 'mexican' },
	{ id: 2, name: 'tostada', type: 'mexican' },
	{ id: 3, name: 'hush puppies', type: 'southern' }
]);

var view = new Selectlist({
	collection: collection,
	disabled: false,
	selection: collection[0]
});

$element.append(view.render().el);