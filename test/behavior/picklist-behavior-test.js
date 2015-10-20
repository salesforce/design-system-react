/*
 * SELECTLIST TESTS
 * Imports all the facades-specific implementations of the tests listed below and runs them
 * Do not run facade (framework) specific tests directly. Use this file.
 * View at http://localhost:8080/test/
 */

// Library allowing DOM elements to be checked for
// Not used ESLint error -> import * as expectDom from '../lib/expect-dom';
// Confirm that the API test libraries export ALL the behaviors and approaches
import { verifyFacadeProvidesBehaviorCallbacks, registerBehaviorTestCombinations } from '../lib/behavior-test-runner';
// import the needed component and all it's facade-specific functions
// (ex.- jQuery-specific implementation of createComponent)
import { picklist as componentFacadeTestLib } from '../tests-api';

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/picklist';
import PicklistCore from '../../src/core/picklist';
const Core = PicklistCore;

const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

const defaultSelection = { id: 1, text: 'Two', value: '2'  };
const itemToClick = { id: 0, text: 'One', value: '1'  };

const defaultOptions = {
	collection: [
		{ _itemType: 'header', text: 'One thing' },
		itemToClick,
		{ _itemType: 'divider' },
		{ _itemType: 'header', text: 'All the things' },
		defaultSelection,
		{ id: 2, text: 'Three', value: '3' },
		{ id: 3, text: 'Buzz', value: '4' },
		{ id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar' },
		{ id: 5, text: 'A Disabled Item', disabled: true, value: 'disabled' }
	]
};

// For jQuery facade, "declarative" implies jQuery plugin usage

describe(controlName + ' component', function () {
	verifyFacadeProvidesBehaviorCallbacks(componentFacadeTestLib, [
		'createControl',
		'getControlElement',
		'destroyControl',
		'disableControl',
		'enableControl',
		'getSelection',
		'createEventListener'
	]);

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createControl',
		'getControlElement',
		'destroyControl',
		'disableControl',
		'enableControl',
		'getSelection',
		'createEventListener'
	], [
		// other behaviors required for tests
	], function (testingBehaviorHandlers) {
		let controlContainer = null;

		beforeEach(function () {
			controlContainer = $('<div id="container" />');
			$('body').append(controlContainer); // Container must be on the body and visible for tests to work
		});

		afterEach(function () {
			controlContainer.remove(); // Clean up container
			controlContainer = null;
		});

		describe('create and destroy control', function () {
			it('should create a ' + controlName + ' on the DOM within the container', function (done) {
				function rendered (renderedControlContainer) {
					expect(renderedControlContainer.find('.' + Core.cssClasses.CONTROL).length).to.equal(1);
					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: []
				}, controlContainer, rendered );
			});

			it('should return an object representing the component', function (done) {
				function rendered (renderedControlContainer, control) {
					expect(control).to.be.an('object');
					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: []
				}, controlContainer, rendered );
			});

			it('destroy should remove ' + controlName + ' from container', function (done) {
				function rendered (renderedControlContainer, control) {
					testingBehaviorHandlers.destroyControl(control);
					expect(renderedControlContainer.find('.' + Core.cssClasses.CONTROL).length).to.equal(0);
					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: []
				}, controlContainer, rendered );
			});
		});

		describe('disable and enable control', function () {
			it(controlName + ' should disable, THEN enable', function (done) {
				function rendered (renderedControlContainer, control) {
					// DISABLE
					testingBehaviorHandlers.disableControl(control);
					// has disabled appearance
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(true);
					// control's button as disabled attribute
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).querySelector('button').disabled).to.equal(true);

					// ENABLE
					testingBehaviorHandlers.enableControl(control);
					// has enabled appearance
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(false);
					// control's button as disabled attribute
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).querySelector('button').disabled).to.equal(false);

					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: []
				}, controlContainer, rendered );
			});

			it(controlName + ' should initialize disabled, THEN enable, THEN disabled', function (done) {
				function rendered (renderedControlContainer, control) {
					// has disabled appearance
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(true);
					// control's button as disabled attribute
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).querySelector('button').disabled).to.equal(true);

					// ENABLE
					testingBehaviorHandlers.enableControl(control);
					// has enabled appearance
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(false);
					// control's button as disabled attribute
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).querySelector('button').disabled).to.equal(false);

					testingBehaviorHandlers.disableControl(control);
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(true);

					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: defaultOptions.collection,
					disabled: true
				}, controlContainer, rendered);
			});
		});

		describe('should set the default selection', function () {
			it(controlName + ' should set the default selection', function (done) {
				function rendered (renderedControlContainer, control) {
					expect(testingBehaviorHandlers.getSelection(control).id).to.equal(defaultSelection.id);

					done();
				}

				$('#my-' + controlName).on('rendered', function () {
					rendered(controlContainer, control);
				});

				testingBehaviorHandlers.createControl( {
					collection: defaultOptions.collection,
					selection: { id: defaultSelection.id }
				}, controlContainer, rendered);
			});
		});

		describe('should fire events', function () {
			this.timeout(3000);
			it(controlName + ' should fire event: changed', function (done) {
				let eventFired = false;

				function changed () {
					eventFired = true;
					expect(eventFired).to.equal(true);
					done();
				}

				function rendered (renderedControlContainer, control) {
					// simulate UI interaction
					testingBehaviorHandlers.createEventListener('changed', changed);

					renderedControlContainer[0].querySelector('a').click();
					expect(testingBehaviorHandlers.getSelection(control)).to.equal(itemToClick);
				}

				testingBehaviorHandlers.createControl( {
					collection: defaultOptions.collection
				}, controlContainer, rendered);
			});
		});
	});
});
