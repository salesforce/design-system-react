const $ = require('jquery');
window.$ = window.jQuery = $;

const chai = require('chai');
const domPickList = require('../dom/picklist');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const PickList = require('../../src/react/picklist/picklist');
require('bootstrap');

describe('Picklist React Facade', function () {
	const targetElement = document.body.querySelector('#test-fixture');
	afterEach(function () {
		targetElement.innerHTML = '';
	});

	describe('dom tests', function () {
		describe('default options', function () {
			beforeEach(function () {
				const component = React.createElement(PickList, domPickList.defaultArrayModel());
				React.render(component, targetElement);
			});
			domPickList.initializedWithDefaultArray(targetElement);
		});

		describe('disabled', function () {
			beforeEach(function () {
				const options = domPickList.defaultArrayModel();
				options.disabled = true;
				const component = React.createElement(PickList, options);
				React.render(component, targetElement);
			});

			domPickList.initializedDisabled(targetElement);
		});
	});

	describe('react tests', function () {
		beforeEach(function () {
			this.options = domPickList.defaultArrayModel();
			const component = React.createElement(PickList, this.options);
			this.rendered = React.render(component, targetElement);
		});

		it('should fire the onChanged callback on an item click.', function () {
			const options = this.options;
			let called = false;
			options.onChanged = function (item) {
				called = true;
				chai.expect(item).to.equal(options.collection[4]); // Fourth option is the second clickable.
			};
			const component = React.createElement(PickList, options);
			this.rendered = React.render(component, targetElement);
			TestUtils.Simulate.click(this.rendered.getDOMNode().querySelectorAll('li a')[1]);
			chai.expect(called).to.be.true;
		});

		it('should not change it\'s selected value if a selection prop is passed without an onChanged.', function () {
			const options = this.options;
			const component = React.createElement(PickList, options);
			this.rendered = React.render(component, targetElement);
			expect(targetElement.querySelector('.selected-label').textContent).to.equal(options.selection.text);
			const clickableElements = targetElement.querySelectorAll('li a');
			TestUtils.Simulate.click(clickableElements[clickableElements.length - 2]);
			expect(targetElement.querySelector('.selected-label').textContent).to.equal(options.selection.text);
		});
	});
});
