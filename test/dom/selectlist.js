const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

const sampleData = require('../../sample-data/selectlist');
const defaultArray = sampleData.defaultArray;

module.exports = {
	defaultArrayModel: function () {
		const clonedArray = JSON.parse(JSON.stringify(defaultArray));
		return {
			collection: clonedArray,
			disabled: false,
			selection: clonedArray[0],
			resize: 'auto'
		};
	},
	initializedWithDefaultArray: function (element) {
		it('should have ' + defaultArray.length + ' list items.', function () {
			expect(element.querySelectorAll('li').length).to.equal(9);
		});

		it('should not be disabled.', function () {
			expect(element.classList.contains('disabled')).to.equal(false);
		});

		it('should not have a disabled button.', function () {
			expect(element.querySelector('button').classList.contains('disabled')).to.equal(false);
		});

		it('should respect the _itemType field on options.', function () {
			const listItems = element.querySelectorAll('li');
			expect(listItems[2].classList.contains('divider')).to.equal(true);
			expect(listItems[3].classList.contains('dropdown-header')).to.equal(true);
			expect(listItems[3].textContent).to.equal(defaultArray[3].text);
		});

		it('should mark the default selection as selected.', function () {
			expect(element.querySelector('.selected-label').textContent).to.equal(defaultArray[0].text);
		});

		it('should be closed by default', function () {
			const innerElement = element.querySelector('.selectlist');
			expect(innerElement.classList.contains('open')).to.equal(false);
		});

		it('should open when clicked.', function () {
			const innerElement = element.querySelector('.selectlist');
			$(innerElement.querySelector('button')).click();
			expect(innerElement.classList.contains('open')).to.equal(true);
		});
	},
	initializedDisabled: function (element) {
		it('should be disabled.', function () {
			expect(element.querySelector('.selectlist').classList.contains('disabled')).to.equal(true);
		});

		it('should have a disabled button.', function () {
			expect(element.querySelector('button').classList.contains('disabled')).to.equal(true);
		});

		it('should mark the default selection as selected.', function () {
			expect(element.querySelector('.selected-label').textContent).to.equal(defaultArray[0].text);
		});

		it('should be closed by default', function () {
			const innerElement = element.querySelector('.selectlist');
			expect(innerElement.classList.contains('open')).to.equal(false);
		});

		it('should not open when clicked.', function () {
			const innerElement = element.querySelector('.selectlist');
			$(innerElement.querySelector('button')).click();
			expect(innerElement.classList.contains('open')).to.equal(false);
		});
	}
};
