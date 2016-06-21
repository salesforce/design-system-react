import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import { SLDSInput } from '../../components';
const {
	// Simulate,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe('SLDS INPUT **************************************************', () => {
	const defaultProps = {
		id: 'unique-id-2',
		placeholder: 'Placeholder Text'
	};

	let body;

	const renderInput = instance => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(instance, body);
	};

	function removeInput () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createInput = (props) => React.createElement(SLDSInput, assign({}, defaultProps, props));
	const getInput = (props) => renderInput(createInput(props));

	describe('Standard Input with Label', () => {
		let component;
		let wrapper;
		let input;
		let label;

		beforeEach(() => {
			component = getInput({ label: 'Input Label' });
			wrapper = findRenderedDOMComponentWithClass(component, 'slds-form-element');
			input = findRenderedDOMComponentWithTag(component, 'input');
			label = findRenderedDOMComponentWithClass(component, 'slds-form-element__label');
		});

		afterEach(() => {
			removeInput();
		});

		it('is wrapped in div with class "slds-form-element"', () => {
			expect(wrapper.className).to.include('slds-form-element');
		});

		it('renders label', () => {
			expect(label.textContent).to.equal('Input Label');
		});

		it('renders input element with class "slds-input"', () => {
			expect(input.className).to.include('slds-input');
		});

		it('has an id', () => {
			expect(input.getAttribute('id')).to.be.ok;
		});

		it('renders placeholder text', () => {
			expect(input.getAttribute('placeholder')).to.equal('Placeholder Text');
		});
	});

	describe('Input without Label', () => {
		let component;
		let label;

		beforeEach(() => {
			component = getInput({ assistiveText: 'Assistive Label' });
			label = findRenderedDOMComponentWithClass(component, 'slds-form-element__label');
		});

		afterEach(() => {
			removeInput();
		});

		it('renders label (assitive)', () => {
			expect(label.textContent).to.equal('Assistive Label');
		});

		it('label has class "slds-assistive-text"', () => {
			expect(label.className).to.include('slds-assistive-text');
		});
	});

	describe('Read Only Input', () => {
		let component;
		let label;
		let input;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', readOnly: true });
			label = scryRenderedDOMComponentsWithTag(component, 'span')[0];
			input = scryRenderedDOMComponentsWithTag(component, 'span')[1];
		});

		afterEach(() => {
			removeInput();
		});

		it('label is a span and has class "slds-form-element__label"', () => {
			expect(label.className).to.include('slds-form-element__label');
		});

		it('input is a span and has class "slds-form-element__static"', () => {
			expect(input.className).to.include('slds-form-element__static');
		});
	});

	describe('Required Input in Error State', () => {
		let component;
		let wrapper;
		let error;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', required: true, errorText: 'Error Message' });
			wrapper = findRenderedDOMComponentWithClass(component, 'slds-form-element');
			error = findRenderedDOMComponentWithClass(component, 'slds-form-element__help');
		});

		afterEach(() => {
			removeInput();
		});

		it('input wrapper has class "is-required"', () => {
			expect(wrapper.className).to.include('is-required');
		});

		it('input wrapper has class "slds-has-error"', () => {
			expect(wrapper.className).to.include('slds-has-error');
		});

		it('renders error message', () => {
			expect(error.textContent).to.equal('Error Message');
		});
	});


	// describe('Input with Clickable Icon', () => {
	// 	let component;
	// 	let input;
	// 	let label;
	// 	let icon;

	// 	beforeEach(() => {
	// 		component = getInput({ label: 'Input Label' });
	// 		input = findRenderedDOMComponentWithTag(component, 'input');
	// 		inputWrapper = findRenderedDOMComponentWithClass(component, 'slds-form-element__control');
	// 		label = findRenderedDOMComponentWithClass(component, 'slds-form-element__label');
	// 		icon = findRenderedDOMComponentWithTag(component, 'svg');
	// 	});

	// 	afterEach(() => {
	// 		removeInput();
	// 	});

	// 	// input wrapper has class "slds-input-has-icon"
	// 	// icon has class "slds-input__icon"
	// 	// icon can be clicked (Simulate)
	// });
});
