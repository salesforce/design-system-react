var React = require('react');
import {Selectlist} from './selectlist';

var element = document.getElementById('sampleSelectlist');
var collection = [
		{ id: 0, name: 'tacos', type: 'mexican' },
		{ id: 1, name: 'burrito', type: 'mexican' },
		{ id: 2, name: 'tostada', type: 'mexican' },
		{ id: 3, name: 'hush puppies', type: 'southern' }
	];
var options = {};
	
var rendered = new Selectlist(element, collection, options);