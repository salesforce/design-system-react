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
import { selectlist as componentFacadeTestLib } from '../tests-api';

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/selectlist';
import SelectlistCore from '../../src/core/selectlist';
const Core = SelectlistCore;

const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

const defaultOptions = {
	collection: [
		{ _itemType: 'header', text: 'One thing' },
		{ id: 0, text: 'One', value: '1'  },
		{ _itemType: 'divider' },
		{ _itemType: 'header', text: 'All the things' },
		{ id: 1, text: 'Two', value: '2'  },
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
		'getSelection'
	]);

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createControl',
		'getControlElement',
		'destroyControl',
		'disableControl',
		'enableControl',
		'getSelection'
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
					testingBehaviorHandlers.disableControl(control);
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(true);
					testingBehaviorHandlers.enableControl(control);
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(false);
					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: []
				}, controlContainer, rendered );
			});

			it(controlName + ' should initialize disabled, THEN enable, THEN disabled', function (done) {
				function rendered (renderedControlContainer, control) {
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(true);
					testingBehaviorHandlers.enableControl(control);
					expect(testingBehaviorHandlers.getControlElement(renderedControlContainer, control).classList.contains(Core.cssClasses.DISABLED)).to.equal(false);
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
				const id = 1;
				// search for object with this id
				const defaultSelection = $.grep(defaultOptions.collection, function (e) { return e.id === id; } );

				function rendered (renderedControlContainer, control) {
					expect(testingBehaviorHandlers.getSelection(control)).to.equal(defaultSelection[0]);
					done();
				}

				testingBehaviorHandlers.createControl( {
					collection: defaultOptions.collection,
					selection: { id: id }
				}, controlContainer, rendered);
			});
		});

// 	it('should set the default selection', function () {
// 		const options = $.extend( defaultOptions, { selection: { id: 4 } } );
// 		const selectlist = new Selectlist( $( html ).find( '#mainSelectlist' ), options );
// 		const expectedItem = { id: 4, text: 'Item Five', value: 'Item Five', fizz: 'buzz', foo: 'bar' };

// 		console.log(selectlist.getSelection());

// 		assert.deepEqual( selectlist.getSelection(), expectedItem, 'default item selected' );

// 		selectlist.elements.wrapper.empty();
// 	});

		// TODO expectDOM tests
	});
});
