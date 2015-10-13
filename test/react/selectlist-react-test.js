/*
 * REACT FACADE API FOR SELECTLIST TESTS
 * Facade (or framework specific) implementation of tests defined in behaviors folder
 */

// Core file for helpful things like CSS class names
import { CONTROL as controlName } from '../../src/core/selectlist';
import * as Lib from '../../src/lib/lib';

import React from 'react';
import SelectList from '../../src/react/selectlist/selectlist';

void(React);

export const behaviorHandlers = {
	createControl: {
		default: function (initData, el, rendered) {
			const TestSelectList = React.createClass({
				getInitialState () {
					return Lib.merge({
						disabled: false,
						selection: [],
						onChanged: this.handleChanged
					}, initData);
				},

				render () {
					return (<SelectList {...this.state} />);
				},

				handleChanged (item, selection) {
					this.setState({selection});
				}
			});
			const theList = React.render(<TestSelectList/>, el[0]);
			rendered(el, theList);
			return theList;
		}
	},

	getControlElement: {
		default: function (container, control) {
			return React.findDOMNode(control);
		}
	},

	destroyControl: {
		default: function (control) {
			return this.getControlElement(null, control).remove();
		}
	},

	disableControl: {
		default: function (control) {
			control.setState({
				disabled: true
			});
		}
	},

	enableControl: {
		default: function (control) {
			control.setState({
				disabled: false
			});
		}
	},

	getSelection: {
		default: function (control) {
			return control.state.selection;
		}
	},

	createEventListener: {
		default: function (eventName, callback)  {
			callback();
		}
	}

};


/* original tests */

// const chai = require('chai');
// const domSelectList = require('../dom/selectlist');
// const React = require('react/addons');
// const TestUtils = React.addons.TestUtils;
// const SelectList = require('../../src/react/selectlist/selectlist');
// require('bootstrap');

// describe('Selectlist React Facade', function () {
// 	const targetElement = document.body.querySelector('#test-fixture');
// 	afterEach(function () {
// 		targetElement.innerHTML = '';
// 	});

// 	describe('dom tests', function () {
// 		describe('default options', function () {
// 			beforeEach(function () {
// 				const component = React.createElement(SelectList, domSelectList.defaultArrayModel());
// 				React.render(component, targetElement);
// 			});
// 			domSelectList.initializedWithDefaultArray(targetElement);
// 		});

// 		describe('disabled', function () {
// 			beforeEach(function () {
// 				const options = domSelectList.defaultArrayModel();
// 				options.disabled = true;
// 				const component = React.createElement(SelectList, options);
// 				React.render(component, targetElement);
// 			});

// 			domSelectList.initializedDisabled(targetElement);
// 		});
// 	});

// 	describe('react tests', function () {
// 		beforeEach(function () {
// 			this.options = domSelectList.defaultArrayModel();
// 			const component = React.createElement(SelectList, this.options);
// 			this.rendered = React.render(component, targetElement);
// 		});

// 		it('should fire the onChanged callback on an item click.', function () {
// 			const options = this.options;
// 			let called = false;
// 			options.onChanged = function (item) {
// 				called = true;
// 				chai.expect(item).to.equal(options.collection[4]); // Fourth option is the second clickable.
// 			};
// 			const component = React.createElement(SelectList, options);
// 			this.rendered = React.render(component, targetElement);
// 			TestUtils.Simulate.click(this.rendered.getDOMNode().querySelectorAll('li a')[1]);
// 			chai.expect(called).to.be.true;
// 		});

// 		it('should not change it\'s selected value if a selection prop is passed without an onChanged.', function () {
// 			const options = this.options;
// 			const component = React.createElement(SelectList, options);
// 			this.rendered = React.render(component, targetElement);
// 			expect(targetElement.querySelector('.selected-label').textContent).to.equal(options.selection.text);
// 			const clickableElements = targetElement.querySelectorAll('li a');
// 			TestUtils.Simulate.click(clickableElements[clickableElements.length - 2]);
// 			expect(targetElement.querySelector('.selected-label').textContent).to.equal(options.selection.text);
// 		});
// 	});
// });
