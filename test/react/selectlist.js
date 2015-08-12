const $ = require('jquery');
window.$ = window.jQuery = $;

const chai = require('chai');
const expect = chai.expect;
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

		it('should keep the selection state in sync with the props.', function () {
			const self = this;
			expect(this.rendered.state.selection).to.equal(this.options.selection);
			this.rendered.setProps({selection: this.options.collection[1]}, function () {
				expect(self.rendered.state.selection).to.equal(self.options.collection[1]);
			});
		});

		it('should keep the disabled state in sync with the props.', function () {
			const self = this;
			expect(this.rendered.state.disabled).to.equal(this.options.disabled);
			this.rendered.setProps({disabled: !this.options.disabled}, function () {
				expect(self.rendered.state.disabled).to.equal(!self.options.disabled);
			});
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
