/*
 * JQUERY FACADE API FOR SELECTLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/selectlist';
import SelectlistCore from '../../src/core/selectlist';
import * as Lib from '../../src/lib/lib';
const Core = SelectlistCore;

// Run in legacy plugin mode
import '../../src/helpers/create-jquery-plugin';
import Selectlist from '../../src/jquery/selectlist/selectlist';

const $ = Lib.global.jQuery || Lib.global.$;

export const behaviorHandlers = {
	createComponentDeclarative: {
		default: function (initData) {
			const declarativeMarkup = `<div id="mySelectlist" class="btn-group selectlist" data-resize="auto">
				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					<span class="selected-label">&nbsp;</span>
					<span class="caret"></span>
					<span class="sr-only">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu" role="menu">
					<li data-value="1"><a href="#">One</a></li>
					<li data-value="2" data-selected="true"><a href="#">Two</a></li>
					<li data-value="3"><a href="#">Three</a></li>
					<li class="dropdown-header">Dropdown header</li>
					<li data-value="4" data-foo="bar" data-fizz="buzz"><a href="#">Buzz</a></li>
					<li data-value="Item Five"><a href="#">Item Five</a></li>
					<li class="disabled"><a href="#">Disabled item</a>
					</li>
				</ul>
				<input class="hidden hidden-field" name="my-selectlist" readonly="readonly" aria-hidden="true" type="text"/>
			</div>`;

			// initialize
			$(initData.container).append(declarativeMarkup);
			const $selectlist = $(initData.container).find('.' + Core.cssClasses.CONTROL).selectlist();
			return $selectlist;
		}
	},

	createComponent: {
		default: function (initData, rendered) {
			const imperativeMarkup = '<div id="my-selectlist"></div>';
			$(initData.container).append(imperativeMarkup);
			const $selectlist = new Selectlist( $('#my-' + controlName), initData );

			$('#my-selectlist').on('rendered.fu.selectlist', function () {
				rendered($selectlist);
			});

			return $selectlist;
		}
	},

	getComponentElement: {
		default: function (createdComponent) {
			return createdComponent.options.container.find('.' + Core.cssClasses.CONTROL)[0];
		}
	},

	destroyComponent: {
		default: function (createdComponent) {
			createdComponent.destroy();
		}
	},

	destroyComponentDeclarative: {
		default: function (createdComponent) {
			createdComponent.selectlist('destroy');
		}
	}
};


/* original tests */

/* FOR DEV TESTING */
// var html = require('text!dev.html!strip');
// html = $('<div><div id="mainSelectlist"></div></div>');
// const $testFixture = $('body #test-fixture');
// $testFixture.append(html);

// const defaultOptions = {
// 	collection: [
// 		{ _itemType: 'header', text: 'One thing' },
// 		{ id: 0, text: 'One', value: '1'  },
// 		{ _itemType: 'divider' },
// 		{ _itemType: 'header', text: 'All the things' },
// 		{ id: 1, text: 'Two', value: '2'  },
// 		{ id: 2, text: 'Three', value: '3' },
// 		{ id: 3, text: 'Buzz', value: '4' },
// 		{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar' },
// 		{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
// 	]
// };

// describe('Fuel UX Selectlist - jQuery facade', function () {
// 	after(function () {
// 		$testFixture.empty();
// 	});

// 	it('should be disablable and then re-enableable', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		selectlist.disable();
// 		assert.equal(selectlist.elements.wrapper.hasClass('disabled'), true, 'element disabled');

// 		selectlist.enable();
// 		assert.equal(selectlist.elements.wrapper.hasClass('disabled'), false, 'element re-enabled');

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should set the default selection', function () {
// 		const options = $.extend( defaultOptions, { selection: { id: 4 } } );
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), options );
// 		const expectedItem = { id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar' };

// 		console.log(selectlist.getSelection());

// 		assert.deepEqual( selectlist.getSelection(), expectedItem, 'default item selected' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should select by value', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 1, text: 'Two', value: '2' };
// 		selectlist.setSelection( { value: '2' } );

// 		assert.deepEqual( selectlist.getSelection(), selectingItem, 'selected by value' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should select by value with whitespace', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  };
// 		selectlist.setSelection( { value: 'Item Five' } );

// 		assert.deepEqual( selectlist.getSelection(), selectingItem, 'selected by value with whitespace' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should select by text', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 2, text: 'Three', value: '3'  };
// 		selectlist.setSelection( { text: 'Three' } );

// 		assert.deepEqual( selectlist.getSelection(), selectingItem, 'selected by name' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should select by text with whitespace', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  };
// 		selectlist.setSelection( { text: 'Item Five' } );

// 		assert.deepEqual( selectlist.getSelection(), selectingItem, 'selected by text with whitespace' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should select by index', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 3, text: 'Buzz', value: '4'  };
// 		selectlist.setSelectionByIndex( 6 );

// 		assert.deepEqual( selectlist.getSelection(), selectingItem, 'selected by index' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should select by any arbitrary property on an item', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  };
// 		selectlist.setSelection( { fizz: 'buzz' } );

// 		assert.deepEqual( selectlist.getSelection(), selectingItem, 'selected by arbitrary property' );

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should fire change event', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		const selectingItem = { id: 0, text: 'One', value: '1' };
// 		let eventFired = false;
// 		let selectedText;
// 		let selectedValue;

// 		selectlist.elements.wrapper.on( 'changed.fu.selectlist', function ( $event, data ) {
// 			eventFired = true;
// 			selectedText = data.text;
// 			selectedValue = data.value;
// 		});

// 		// simulate changed event
// 		selectlist.elements.dropdownMenu.find('a:first').click();

// 		assert.equal(eventFired, true, 'change event fired');
// 		assert.equal(selectedText, selectingItem.text, 'text passed in from change event');
// 		assert.equal(selectedValue, selectingItem.value, 'value passed in from change event');

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should not fire changed event on disabled items', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );
// 		let eventFired = false;

// 		selectlist.elements.wrapper.on('changed.fu.selectlist', function (/* $event, data */) {
// 			eventFired = true;
// 		});

// 		// simulate changed event
// 		selectlist.elements.dropdownMenu.find('.disabled a').click();

// 		assert.equal(eventFired, false, 'change event not fired');

// 		selectlist.elements.wrapper.empty();
// 	});

// 	it('should destroy control', function () {
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), defaultOptions );

// 		assert.equal( typeof( selectlist.destroy() ), 'string', 'returns string (markup)');
// 		assert.equal( $( html ).find( '#mainSelectlist' ).length, 0, 'control has been removed from DOM');
// 	});
// });
