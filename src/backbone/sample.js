import Selectlist from "./selectlist";

// Framework specific
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
	selection: collection.at(0),
	resize: 'auto'
});

$element.append(view.render().el);