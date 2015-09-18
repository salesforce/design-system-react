const _ = require('underscore');
const $ = require('jquery');
const chai = require('chai');
const expect = chai.expect;

export function matches (getElement, selector) {
	it('should match: ' + selector, function () {
		const el = getElement();
		expect($(el).is(selector)).to.be.true;
	});
}

export function found (getContainingElement, selector, inputLowCount, inputHighCount) {
	let lowCount = 1;
	if (_.isNumber(inputLowCount) && inputLowCount >= 0) {
		lowCount = inputLowCount;
	}

	let highCount = lowCount;
	if (_.isNumber(inputHighCount) && inputHighCount > lowCount) {
		highCount = inputHighCount;
	}

	let message = 'should have between ' + lowCount + ' and ' + highCount + ' elements matching: ' + selector;
	if (lowCount === highCount) {
		if (lowCount === 1) {
			message = 'should have exactly 1 element matching: ' + selector;
		} else {
			message = 'should have exactly ' + lowCount + ' elements matching: ' + selector;
		}
	}

	it(message, function () {
		const containerEl = getContainingElement();
		const foundCount = $(selector, containerEl).length;
		expect(foundCount).to.be.at.least(lowCount);
		expect(foundCount).to.be.at.most(highCount);
	});
}

export function text (getContainingElement, selector, compareText) {
	it('should have an element matching "' + selector + '" which has the inner text "' + compareText + '"', function () {
		const containerEl = getContainingElement();
		const foundText = $(selector, containerEl).text();
		expect(foundText).to.equal(compareText);
	});
}
