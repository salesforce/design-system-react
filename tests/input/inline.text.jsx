/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import chai from 'chai';

import InlineEdit from '../../components/forms/input/inline';

const should = chai.should();

const { Simulate
			} = TestUtils;

describe('DataTable: ', function () {
	const sampleValue = 'Sample value';

	const renderInlineEdit = (instance) => function () {
		this.dom = document.createElement('div');
		document.body.appendChild(this.dom);
		this.component = ReactDOM.render(instance, this.dom);
	};

	function removeInlineEdit () {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getWrapper = dom => dom.querySelector('.slds-form-element');

	const getInput = dom => dom.querySelector('.slds-input');

	const getStatic = dom => dom.querySelector('.slds-form-element__static');

	const getTrigger = dom => getStatic(dom).querySelector('.slds-button');

	describe('Structure', function () {
		beforeEach(renderInlineEdit(
			<InlineEdit id="inline-edit-standard" value={sampleValue} />
		));

		afterEach(removeInlineEdit);

		it('renders static by default', function () {
			const wrapper = getWrapper(this.dom);
			const input = getInput(this.dom);
			const staticElement = getStatic(this.dom);
			const trigger = getTrigger(this.dom);

			should.exist(wrapper);
			should.not.exist(input);
			should.exist(staticElement);
			should.exist(trigger);
		});

		it('renders the correct value', function () {
			const staticElement = getStatic(this.dom);
			const value = staticElement.querySelector('span').innerHTML;

			value.should.be(sampleValue);
		});
	});

	describe('Editable', function () {
		beforeEach(renderInlineEdit(
			<InlineEdit id="inline-edit-standard" value={sampleValue} />
		));

		afterEach(removeInlineEdit);

		it('becomes editable on click', function () {
			const trigger = getTrigger(this.dom);

			should.exist(trigger);

			Simulate.click(trigger, {});

			setTimeout(() => {
				const input = getInput(this.dom);
				const staticElement = getStatic(this.dom);

				should.exist(input);
				should.not.exist(staticElement);
			}, 100);
		});
	});
});
