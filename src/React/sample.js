var React = require('react');
import {Selectlist} from "./selectlist";

var collection = [
		{ id: 1, name: 'tacos', type: 'mexican' },
		{ id: 2, name: 'burrito', type: 'mexican' },
		{ id: 3, name: 'tostada', type: 'mexican' },
		{ id: 4, name: 'hush puppies', type: 'southern' }
	];
var options = {};
var Samplelist = new Selectlist(collection, options);
React.render(<Samplelist.component/>, document.body, () => {});