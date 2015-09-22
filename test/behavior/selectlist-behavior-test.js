/*
 * SELECTLIST TESTS
 * Imports all the facades-specific implementations of the tests listed below and runs them
 * Do not run facade (framework) specific tests directly. Use this file.
 * View at http://localhost:8080/test/
 */

// Library allowing DOM elements to be checked for
import * as expectDom from '../lib/expect-dom';
// Confirm that the API test libraries export ALL the behaviors and approaches
import { verifyFacadeProvidesBehaviorCallbacks, registerBehaviorTestCombinations } from '../lib/behavior-test-runner';
// import the needed component and all it's facade-specific functions
// (ex.- jQuery-specific implementation of createComponent)
import { selectlist as componentFacadeTestLib } from '../tests-api';

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/selectlist';
import SelectlistCore from '../../src/core/selectlist';
const Core = SelectlistCore;

const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;


// For jQuery facade, "declarative" implies jQuery plugin usage

describe(controlName + ' component', function () {
	verifyFacadeProvidesBehaviorCallbacks(componentFacadeTestLib, [
		'createComponent',
		'createComponentDeclarative',
		'getComponentElement',
		'destroyComponent',
		'destroyComponentDeclarative'
	]);

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createComponent',
		'createComponentDeclarative',
		'getComponentElement',
		'destroyComponent',
		'destroyComponentDeclarative'
	], [
		// other behaviors required for tests
	], function (testingBehaviorHandlers) {
		let container = null;

		beforeEach(function () {
			container = $('<div />');
			$('body').append(container); // Container must be on the body and visible for tests to work
		});

		afterEach(function () {
			container.remove(); // Clean up container
			container = null;
		});

		describe('create and destroy component', function () {
			it('should create a ' + controlName + ' on the DOM within the container', function () {

				function rendered (component) {
					expect(component.options.container.find('.' + Core.cssClasses.CONTROL).length).to.equal(1);
					testingBehaviorHandlers.destroyComponent(component);
				}

				const component = testingBehaviorHandlers.createComponent( {
					container: container,
					collection: []
				}, rendered );

			});

			it('should return an object representing the component', function () {
				function rendered (component) {
					expect(component).to.be.an('object');
					testingBehaviorHandlers.destroyComponent(component);
				}

				const component = testingBehaviorHandlers.createComponent( {
					container: container,
					collection: []
				}, rendered );

			});

			it('destroy should remove ' + controlName + ' from container', function () {

				function rendered (component) {
					testingBehaviorHandlers.destroyComponent(component);
					expect(component.options.container.find('.' + Core.cssClasses.CONTROL).length).to.equal(0);
				}

				const component = testingBehaviorHandlers.createComponent( {
					container: container,
					collection: []
				}, 	rendered );

			});
		});
		
		describe('create and destroy component (declarative)', function () {
			it('should create a ' + controlName + ' on the DOM within the container', function () {
				const component = testingBehaviorHandlers.createComponentDeclarative({
					container: container
				});

				expect(container.find('.' + Core.cssClasses.CONTROL).length).to.equal(1);
				testingBehaviorHandlers.destroyComponentDeclarative(component);
			});

			it('destroy should remove ' + controlName + ' from container (declarative)', function () {
				const component = testingBehaviorHandlers.createComponentDeclarative({
					container: container
				});

				testingBehaviorHandlers.destroyComponentDeclarative(component);
				expect(container.find('.' + Core.cssClasses.CONTROL).length).to.equal(0);
			});
		});

		// async needs work

		// describe('DOM expectations', function () {
		// 	let component = null;
		// 	let componentElement = null;

		// 	const collection = [
		// 		{ _itemType: 'header', text: 'One thing' },
		// 		{ id: 0, text: 'One', value: '1' },
		// 		{ _itemType: 'divider' },
		// 		{ _itemType: 'header', text: 'All the things' },
		// 		{ id: 1, text: 'Two', value: '2' },
		// 		{ id: 2, text: 'Three', value: '3'  },
		// 		{ id: 3, text: 'Buzz', value: '4'  },
		// 		{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar'  },
		// 		{ id: 5, text: 'Disabled Item', disabled: true, value: 'disabled' }
		// 	];

		// 	const initDataTemplate = {
		// 		collection: collection,
		// 		selection: { value: '4' }
		// 	};

		// 	function rendered (component) {
		// 		expectDom.matches(getComponentElement, 'div');
		// 	}

		// 	beforeEach(function () {
		// 		const initData = JSON.parse( JSON.stringify( initDataTemplate ) );
		// 		initData.container = container;
		// 		rendered();

		// 		component = testingBehaviorHandlers.createComponent( initData, rendered );
		// 		componentElement = testingBehaviorHandlers.getComponentElement(component);

		// 	});
	
		// 	afterEach(function () {
		// 		testingBehaviorHandlers.destroyComponent(component);
		// 		component = null;
		// 		componentElement = null;
		// 	});

		// 	function getComponentElement () {
		// 		return componentElement;
		// 	}

		// 	expectDom.matches(getComponentElement, 'div');
		// 	// expectDom.matches(getComponentElement, '.' + Core.cssClasses.CONTROL);
		// 	// expectDom.found(getComponentElement,   '> ul.dropdown-menu');
		// 	// expectDom.found(getComponentElement,   'ul.dropdown-menu > li:eq(0)[data-value=1]');
		// 	// expectDom.found(getComponentElement,   'ul.dropdown-menu > li[data-value=1] > a');

		// });
	
	});
});
