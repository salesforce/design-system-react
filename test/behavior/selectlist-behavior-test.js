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


// For jQuery facade, "declarative" implies jQuery plugin usage

describe(controlName + ' component', function () {
	verifyFacadeProvidesBehaviorCallbacks(componentFacadeTestLib, [
		'createComponent',
		'getComponentElement',
		'destroyComponent'
	]);

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createComponent',
		'getComponentElement',
		'destroyComponent'
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

				testingBehaviorHandlers.createComponent( {
					container: container,
					collection: []
				}, rendered );
			});

			it('should return an object representing the component', function () {
				function rendered (component) {
					expect(component).to.be.an('object');
					testingBehaviorHandlers.destroyComponent(component);
				}

				testingBehaviorHandlers.createComponent( {
					container: container,
					collection: []
				}, rendered );
			});

			it('destroy should remove ' + controlName + ' from container', function () {
				function rendered (component) {
					testingBehaviorHandlers.destroyComponent(component);
					expect(component.options.container.find('.' + Core.cssClasses.CONTROL).length).to.equal(0);
				}

				testingBehaviorHandlers.createComponent( {
					container: container,
					collection: []
				}, 	rendered );
			});
		});
		// TODO expectDOM tests
	});
});
