/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import Input from '../../input';
import Icon from '../../icon';
import InputIcon from '../../icon/input-icon';
import IconSettings from '../../icon-settings';

const {
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass,
} = TestUtils;

describe('SLDSInput', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text',
	};

	let body;

	const renderInput = (instance) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(
			<IconSettings iconPath="/assets/icons">{instance}</IconSettings>,
			body
		);
	};

	function removeInput () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createInput = (props) =>
		React.createElement(Input, assign({}, defaultProps, props));
	const getInput = (props) => renderInput(createInput(props));

	describe('Standard Input with Label', () => {
		let component;
		let wrapper;
		let input;
		let label;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', id: 'custom-id' });
			wrapper = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element'
			);
			input = findRenderedDOMComponentWithTag(component, 'input');
			label = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__label'
			);
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

		it('can pass custom id', () => {
			expect(input.getAttribute('id')).to.equal('custom-id');
		});

		it('renders placeholder text', () => {
			expect(input.getAttribute('placeholder')).to.equal('Placeholder Text');
		});

		it('has associated label for tag pointing to id of input', () => {
			const labelForTag = label.getAttribute('for');
			const inputId = input.getAttribute('id');
			expect(labelForTag).to.equal(inputId);
		});
	});

	describe('Input without Assistive Text Label', () => {
		let component;
		let label;
		let input;

		beforeEach(() => {
			component = getInput({ assistiveText: { label: 'Assistive Label' } });
			label = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__label'
			);
			input = findRenderedDOMComponentWithTag(component, 'input');
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

		it('has associated label for tag pointing to id of input', () => {
			const labelForTag = label.getAttribute('for');
			const inputId = input.getAttribute('id');
			expect(labelForTag).to.equal(inputId);
		});
	});

	describe('Read Only Input', () => {
		let component;
		let label;
		let input;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', readOnly: true });
			label = findRenderedDOMComponentWithTag(component, 'label');
			input = findRenderedDOMComponentWithTag(component, 'input');
		});

		afterEach(() => {
			removeInput();
		});

		it('label has class "slds-form-element__label"', () => {
			expect(label.className).to.include('slds-form-element__label');
		});

		it('input has attribute "readonly"', () => {
			expect(input.getAttribute('readonly')).to.equal('');
		});
	});

	describe('Static Input', () => {
		let component;
		let label;
		let input;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', isStatic: true });
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

	describe('Disabled Input', () => {
		let component;
		let input;

		beforeEach(() => {
			component = getInput({ label: 'Input Label', disabled: true });
			input = findRenderedDOMComponentWithTag(component, 'input');
		});

		afterEach(() => {
			removeInput();
		});

		it('input has attribute "disabled"', () => {
			expect(input.getAttribute('disabled')).to.equal('');
		});
	});

	describe('Multiple Inputs', () => {
		let component1;
		let component2;
		let input1;
		let input2;

		beforeEach(() => {
			component1 = getInput({ label: 'Input One' });
			component2 = getInput({ label: 'Input Two' });
			input1 = findRenderedDOMComponentWithTag(component1, 'input');
			input2 = findRenderedDOMComponentWithTag(component2, 'input');
		});

		afterEach(() => {
			removeInput();
		});

		it('each input has unique generated id', () => {
			expect(input1.getAttribute('id')).to.not.equal(input2.getAttribute('id'));
		});
	});

	describe('Required Input in Error State', () => {
		let component;
		let wrapper;
		let error;
		let input;

		beforeEach(() => {
			component = getInput({
				label: 'Input Label',
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
			input = findRenderedDOMComponentWithTag(component, 'input');
		});

		afterEach(() => {
			removeInput();
		});

		it('input wrapper contains an <abbr> that has class "slds-required"', () => {
			expect(
				findRenderedDOMComponentWithTag(component, 'abbr').className
			).to.include('slds-required');
		});

		it('input wrapper has class "slds-has-error"', () => {
			expect(wrapper.className).to.include('slds-has-error');
		});

		it('renders error message', () => {
			expect(error.textContent).to.equal('Error Message');
		});

		it('has associated aria-describedby pointing to id of error message', () => {
			const inputDescribedby = input.getAttribute('aria-describedby');
			const errorId = error.getAttribute('id');
			expect(inputDescribedby).to.equal(errorId);
		});
	});

	describe('Input with Left Clickable Icon', () => {
		let component;
		let elementControl;
		let leftButton;
		let iconAssistiveText;

		const clickCallback = sinon.spy();

		beforeEach(() => {
			component = getInput({
				iconLeft: (
					<InputIcon
						assistiveText="Passed assistive text to icon"
						name="search"
						category="utility"
						onClick={clickCallback}
					/>
				),
			});
			leftButton = findRenderedDOMComponentWithTag(component, 'button');
			iconAssistiveText = findRenderedDOMComponentWithClass(
				component,
				'slds-assistive-text'
			);
			elementControl = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__control'
			);
		});

		afterEach(() => {
			removeInput();
		});

		it('element control has class "slds-input-has-icon"', () => {
			expect(elementControl.className).to.include('slds-input-has-icon');
		});

		it('passes "assitiveText" down to icon', () => {
			expect(iconAssistiveText.textContent).to.equal(
				'Passed assistive text to icon'
			);
		});

		it('icon renders button BEFORE input in DOM', () => {
			const render = elementControl.innerHTML;
			expect(render.indexOf('<button')).to.be.below(render.indexOf('<input'));
		});

		it('icon can be clicked', () => {
			TestUtils.Simulate.click(leftButton);
			expect(clickCallback.calledOnce).to.be.true;
		});
	});

	describe('Input with Right Clickable Icon', () => {
		let component;
		let elementControl;
		let leftButton;

		const clickCallback = sinon.spy();

		beforeEach(() => {
			component = getInput({
				iconRight: (
					<InputIcon
						assistiveText="Passed assistive text to icon"
						name="search"
						category="utility"
						onClick={clickCallback}
					/>
				),
			});
			leftButton = findRenderedDOMComponentWithTag(component, 'button');
			elementControl = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__control'
			);
		});

		afterEach(() => {
			removeInput();
		});

		it('element control has class "slds-input-has-icon"', () => {
			expect(elementControl.className).to.include('slds-input-has-icon');
		});

		it('icon renders button AFTER input in DOM', () => {
			const render = elementControl.innerHTML;
			expect(render.indexOf('<button')).to.be.above(render.indexOf('<input'));
		});

		it('icon can be clicked', () => {
			TestUtils.Simulate.click(leftButton);

			expect(clickCallback.calledOnce).to.be.true;
		});
	});

	describe('Input with Non-Clickable Icon', () => {
		let component;
		let elementControl;

		beforeEach(() => {
			component = getInput({
				iconRight: <Icon name="search" category="utility" />,
			});
			elementControl = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__control'
			);
		});

		afterEach(() => {
			removeInput();
		});

		it('button tag does not exist', () => {
			expect(elementControl.getElementsByTagName('button')[0]).to.not.be.ok;
		});
	});

	describe('Input with Loading Spinner Icon', () => {
		let component;
		let spinner;
		let input;

		beforeEach(() => {
			component = getInput({
				assistiveText: { label: 'Passed assistive text to icon' },
				hasSpinner: true,
				iconRight: (
					<InputIcon
						assistiveText="Passed assistive text to icon"
						name="search"
						category="utility"
					/>
				),
				id: 'unique-id-4',
				label: 'Input Label',
			});
			spinner = findRenderedDOMComponentWithClass(component, 'slds-spinner');
			input = findRenderedDOMComponentWithTag(component, 'input');
		});

		afterEach(() => {
			removeInput();
		});

		it('renders loading spinner icon', () => {
			expect(spinner).to.be.ok;
		});

		it('input aria-describedby points to id of spinner)', () => {
			const spinnerId = spinner.getAttribute('id');
			const inputDescribedby = input.getAttribute('aria-describedby');
			expect(inputDescribedby).to.include(spinnerId);
		});

		it('input aria-describedby points to id of spinner AND id of error message)', () => {
			const spinnerId = spinner.getAttribute('id');
			const inputDescribedby = input.getAttribute('aria-describedby');
			expect(inputDescribedby).to.include(spinnerId);
		});
	});

	describe('Input with Loading Spinner Icon & Error', () => {
		let component;
		let spinner;
		let input;
		let error;

		beforeEach(() => {
			component = getInput({
				assistiveText: { label: 'Passed assistive text to icon' },
				required: true,
				errorText: 'Error Message',
				hasSpinner: true,
				iconRight: (
					<InputIcon
						assistiveText="Passed assistive text to icon"
						name="search"
						category="utility"
					/>
				),
				id: 'unique-id-4',
				label: 'Input Label',
			});
			spinner = findRenderedDOMComponentWithClass(component, 'slds-spinner');
			input = findRenderedDOMComponentWithTag(component, 'input');
			error = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__help'
			);
		});

		afterEach(() => {
			removeInput();
		});

		it('input aria-describedby points to id of spinner AND id of error message)', () => {
			const errorId = error.getAttribute('id');
			const spinnerId = spinner.getAttribute('id');
			const inputDescribedby = input.getAttribute('aria-describedby');
			expect(inputDescribedby).to.equal(`${spinnerId} ${errorId}`);
		});
	});

	describe('Input with Fixed Left Text', () => {
		let component;
		let fixedTextLeft;

		beforeEach(() => {
			component = getInput({
				fixedTextLeft: '$',
				id: 'unique-id-5',
				label: 'Input Label',
			});
			fixedTextLeft = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__addon'
			);
		});

		afterEach(() => {
			removeInput();
		});

		it('renders fixed text node', () => {
			expect(fixedTextLeft).to.be.ok;
		});

		it('renders fixed text node content', () => {
			expect(fixedTextLeft.textContent).to.equal('$');
		});
	});
});
