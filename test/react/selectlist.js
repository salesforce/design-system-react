const $ = require('jquery');
window.$ = window.jQuery = $;

const chai = require('chai');
const domSelectList = require('../dom/selectlist');
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const SelectList = require('../../src/react/selectlist/selectlist');
require('bootstrap');

describe('Selectlist React Facade', function () {
	const targetElement = document.body.querySelector('#test-fixture');
	afterEach(function () {
		targetElement.innerHTML = '';
	});

	describe('dom tests', function () {
		describe('default options', function () {
			beforeEach(function () {
				const component = React.createElement(SelectList, domSelectList.defaultArrayModel());
				React.render(component, targetElement);
			});
			domSelectList.initializedWithDefaultArray(targetElement);
		});

		describe('disabled', function () {
			beforeEach(function () {
				const options = domSelectList.defaultArrayModel();
				options.disabled = true;
				const component = React.createElement(SelectList, options);
				React.render(component, targetElement);
			});

			domSelectList.initializedDisabled(targetElement);
		});
	});

	describe('react tests', function () {
		beforeEach(function () {
			this.options = domSelectList.defaultArrayModel();
			const component = React.createElement(SelectList, this.options);
			this.rendered = React.render(component, targetElement);
		});

		it('should fire the onChanged callback on an item click.', function () {
			const options = this.options;
			let called = false;
			options.onChanged = function (item) {
				called = true;
				chai.expect(item).to.equal(options.collection[4]); // Fourth option is the second clickable.
			};
			const component = React.createElement(SelectList, options);
			this.rendered = React.render(component, targetElement);
			TestUtils.Simulate.click(this.rendered.getDOMNode().querySelectorAll('li a')[1]);
			chai.expect(called).to.be.true;
		});
	});
});
