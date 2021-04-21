/* eslint-disable max-lines */
/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';

import Input from '../../input';
import Icon from '../../icon';
import InputIcon from '../../icon/input-icon';
import IconSettings from '../../icon-settings';

describe('SLDSInput', () => {
	const defaultProps = {
		placeholder: 'Placeholder Text',
	};

	let body;

	const renderInput = (instance) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
		return ReactDOM.render(
			<div>
				<IconSettings iconPath="/assets/icons">{instance}</IconSettings>
			</div>,
			body
		);
		/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
	};

	function removeInput() {
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
			[wrapper] = component.getElementsByClassName('slds-form-element');
			[input] = component.getElementsByTagName('input');
			[label] = component.getElementsByClassName('slds-form-element__label');
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
			[input] = component.getElementsByTagName('input');
			[label] = component.getElementsByClassName('slds-form-element__label');
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
			[input] = component.getElementsByTagName('input');
			[label] = component.getElementsByTagName('label');
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
			[label] = component.getElementsByTagName('span');
			// eslint-disable-next-line prefer-destructuring
			input = component.getElementsByTagName('span')[1];
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
			[input] = component.getElementsByTagName('input');
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
			component1 = getInput({
				className: 'input-one',
				label: 'Input One',
			});
			component2 = getInput({ className: 'input-two', label: 'Input Two' });
			[input1] = component1.getElementsByTagName('input');
			[input2] = component2.getElementsByTagName('input');
		});

		afterEach(() => {
			const inputNodes = document.querySelectorAll('.slds-form-element');
			inputNodes[0].parentNode.remove(inputNodes[0]);
			inputNodes[1].parentNode.remove(inputNodes[1]);
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

			[wrapper] = component.getElementsByClassName('slds-form-element');
			[input] = component.getElementsByTagName('input');
			[error] = component.getElementsByClassName('slds-form-element__help');
		});

		afterEach(() => {
			removeInput();
		});

		it('input wrapper contains an <abbr> that has class "slds-required"', () => {
			expect(component.getElementsByTagName('abbr')[0].className).to.include(
				'slds-required'
			);
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
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
						onClick={clickCallback}
					/>
				),
			});
			[leftButton] = component.getElementsByTagName('button');
			[iconAssistiveText] = component.getElementsByClassName(
				'slds-assistive-text'
			);
			[elementControl] = component.getElementsByClassName(
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
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
						onClick={clickCallback}
					/>
				),
			});
			[leftButton] = component.getElementsByTagName('button');
			[elementControl] = component.getElementsByClassName(
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
			[elementControl] = component.getElementsByClassName(
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
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
					/>
				),
				id: 'unique-id-4',
				label: 'Input Label',
			});
			[spinner] = component.getElementsByClassName('slds-spinner');
			[input] = component.getElementsByTagName('input');
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
						assistiveText={{ icon: 'Passed assistive text to icon' }}
						name="search"
						category="utility"
					/>
				),
				id: 'unique-id-4',
				label: 'Input Label',
			});
			[spinner] = component.getElementsByClassName('slds-spinner');
			[input] = component.getElementsByTagName('input');
			[error] = component.getElementsByClassName('slds-form-element__help');
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
			[fixedTextLeft] = component.getElementsByClassName(
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

	describe('Counter Input', () => {
		let changeOccurred;
		let component;
		let decrement;
		let increment;
		let onChangeData;

		afterEach(() => {
			removeInput();
		});

		it('increments and decrements as expected', () => {
			component = getInput({
				onChange: (event, data) => {
					onChangeData = data;
				},
				value: 1,
				variant: 'counter',
			});
			[decrement] = component.getElementsByClassName(
				'slds-input__button_decrement'
			);
			[increment] = component.getElementsByClassName(
				'slds-input__button_increment'
			);

			onChangeData = {};
			TestUtils.Simulate.mouseDown(increment);
			TestUtils.Simulate.mouseUp(increment);
			expect(onChangeData.number === 2 && onChangeData.value === '2').to.be
				.true;

			onChangeData = {};
			TestUtils.Simulate.keyDown(increment, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			TestUtils.Simulate.keyUp(increment, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			expect(onChangeData.number === 2 && onChangeData.value === '2').to.be
				.true;

			TestUtils.Simulate.mouseDown(decrement);
			TestUtils.Simulate.mouseUp(decrement);
			expect(onChangeData.number === 0 && onChangeData.value === '0').to.be
				.true;

			onChangeData = {};
			TestUtils.Simulate.keyDown(decrement, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			TestUtils.Simulate.keyUp(decrement, {
				key: 'Enter',
				keyCode: 13,
				which: 13,
			});
			expect(onChangeData.number === 0 && onChangeData.value === '0').to.be
				.true;
		});

		it('respects min and max values', () => {
			component = getInput({
				maxValue: 1,
				minValue: 1,
				onChange: () => {
					changeOccurred = true;
				},
				value: 1,
				variant: 'counter',
			});
			[decrement] = component.getElementsByClassName(
				'slds-input__button_decrement'
			);
			[increment] = component.getElementsByClassName(
				'slds-input__button_increment'
			);

			changeOccurred = false;
			TestUtils.Simulate.mouseDown(increment);
			TestUtils.Simulate.mouseUp(increment);
			expect(changeOccurred).to.be.false;
			expect(increment.disabled).to.be.true;

			changeOccurred = false;
			TestUtils.Simulate.mouseDown(decrement);
			TestUtils.Simulate.mouseUp(decrement);
			expect(changeOccurred).to.be.false;
			expect(decrement.disabled).to.be.true;
		});

		it('acknowledges custom step values', () => {
			component = getInput({
				onChange: (event, data) => {
					onChangeData = data;
				},
				step: 0.1,
				value: 1,
				variant: 'counter',
			});
			[decrement] = component.getElementsByClassName(
				'slds-input__button_decrement'
			);
			[increment] = component.getElementsByClassName(
				'slds-input__button_increment'
			);

			onChangeData = {};
			TestUtils.Simulate.mouseDown(increment);
			TestUtils.Simulate.mouseUp(increment);
			expect(onChangeData.number === 1.1 && onChangeData.value === '1.1').to.be
				.true;

			TestUtils.Simulate.mouseDown(decrement);
			TestUtils.Simulate.mouseUp(decrement);
			expect(onChangeData.number === 0.9 && onChangeData.value === '0.9').to.be
				.true;
		});
	});
});
