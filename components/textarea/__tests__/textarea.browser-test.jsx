/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';

import Textarea from '../';

const {
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass,
} = TestUtils;

describe('SLDS TEXTAREA **************************************************', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text',
	};

	let body;

	const renderTextarea = (instance) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(instance, body); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE
	};

	function removeTextarea() {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createTextarea = (props) =>
		React.createElement(Textarea, assign({}, defaultProps, props));
	const getTextarea = (props) => renderTextarea(createTextarea(props));

	describe('Standard Textarea with Label', () => {
		let component;
		let wrapper;
		let textarea;
		let label;

		beforeEach(() => {
			component = getTextarea({ label: 'Textarea Label', id: 'custom-id' });
			wrapper = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element'
			);
			textarea = findRenderedDOMComponentWithTag(component, 'textarea');
			label = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__label'
			);
		});

		afterEach(() => {
			removeTextarea();
		});

		it('is wrapped in div with class "slds-form-element"', () => {
			expect(wrapper.className).to.include('slds-form-element');
		});

		it('renders label', () => {
			expect(label.textContent).to.equal('Textarea Label');
		});

		it('renders textarea element with class "slds-textarea"', () => {
			expect(textarea.className).to.include('slds-textarea');
		});

		it('has an id', () => {
			expect(textarea.getAttribute('id')).to.be.ok;
		});

		it('can pass custom id', () => {
			expect(textarea.getAttribute('id')).to.equal('custom-id');
		});

		it('renders placeholder text', () => {
			expect(textarea.getAttribute('placeholder')).to.equal('Placeholder Text');
		});
	});

	describe('Textarea without Label', () => {
		let component;
		let label;

		beforeEach(() => {
			component = getTextarea({ assistiveText: { label: 'Assistive Label' } });
			label = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__label'
			);
		});

		afterEach(() => {
			removeTextarea();
		});

		it('renders label (assitive)', () => {
			expect(label.textContent).to.equal('Assistive Label');
		});

		it('label has class "slds-assistive-text"', () => {
			expect(label.className).to.include('slds-assistive-text');
		});
	});

	describe('Multiple Textareas', () => {
		let component1;
		let component2;
		let textarea1;
		let textarea2;

		beforeEach(() => {
			component1 = getTextarea({ label: 'Textarea One' });
			component2 = getTextarea({ label: 'Textarea Two' });
			textarea1 = findRenderedDOMComponentWithTag(component1, 'textarea');
			textarea2 = findRenderedDOMComponentWithTag(component2, 'textarea');
		});

		afterEach(() => {
			const inputNodes = document.querySelectorAll('.slds-form-element');
			inputNodes[0].parentNode.remove(inputNodes[0]);
			inputNodes[1].parentNode.remove(inputNodes[1]);
		});

		it('each textarea has unique generated id', () => {
			expect(textarea1.getAttribute('id')).to.not.equal(
				textarea2.getAttribute('id')
			);
		});
	});

	describe('Required Textarea in Error State', () => {
		let component;
		let wrapper;
		let error;

		beforeEach(() => {
			component = getTextarea({
				label: 'Textarea Label',
				required: true,
				errorText: 'Error Message',
			});
			wrapper = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element'
			);
			error = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__help'
			);
		});

		afterEach(() => {
			removeTextarea();
		});

		it('textarea wrapper contains an <abbr> that has class "slds-required"', () => {
			expect(
				findRenderedDOMComponentWithTag(component, 'abbr').className
			).to.include('slds-required');
		});

		it('textarea wrapper has class "slds-has-error"', () => {
			expect(wrapper.className).to.include('slds-has-error');
		});

		it('renders error message', () => {
			expect(error.textContent).to.equal('Error Message');
		});
	});
});
