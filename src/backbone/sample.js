import Selectlist from './selectlist';

// Framework specific
import Backbone from 'backbone';

var $element = $('#selectlist');

var collection = new Backbone.Collection([
	{ id: 0, name: 'One', value: '1'  },
	{ id: 1, name: 'Two', value: '2'  },
	{ id: 2, name: 'Three', value: '3'  },
	{ id: 3, name: 'Buzz', value: '4'  },
	{ id: 4, name: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
	{ id: 5, name: 'Disabled item', disabled: true, value: 'disabled' }
]);

var view = new Selectlist({
	collection: collection,
	disabled: false,
	selection: collection.at(0),
	resize: 'auto'
});

$element.append(view.render().el);