/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import assign from 'lodash.assign';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */

import {
	createMountNode,
	destroyMountNode,
} from '../../../tests/enzyme-helpers';

import Slider from '../../slider';

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const {
	findRenderedDOMComponentWithTag,
	findRenderedDOMComponentWithClass,
} = TestUtils;

describe('SLDSSlider', () => {
	const defaultProps = {};

	let body;
	let body2;

	const renderSlider = (instance) => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(instance, body); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE
	};

	const renderSecondSlider = (instance) => {
		body2 = document.createElement('div');
		document.body.appendChild(body2);
		return ReactDOM.render(instance, body2); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE
	};

	function removeSlider() {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
		if (body2 && body2.firstChild) {
			ReactDOM.unmountComponentAtNode(body2);
			document.body.removeChild(body2);
		}
	}

	const createSlider = (props) =>
		React.createElement(Slider, assign({}, defaultProps, props));
	const getSlider = (props) => renderSlider(createSlider(props));
	const getSecondSlider = (props) => renderSecondSlider(createSlider(props));

	describe('Standard Slider with Label', () => {
		let component;
		let wrapper;
		let slider;
		let label;
		let labelText;

		beforeEach(() => {
			component = getSlider({ label: 'Slider Label', id: 'custom-id' });
			wrapper = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element'
			);
			slider = findRenderedDOMComponentWithTag(component, 'input');
			label = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__label'
			);
			labelText = findRenderedDOMComponentWithClass(
				component,
				'slds-slider-label__label'
			);
		});

		afterEach(() => {
			removeSlider();
		});

		it('has type of "range"', () => {
			expect(slider.getAttribute('type')).to.equal('range');
		});

		it('is wrapped in div with class "slds-form-element"', () => {
			expect(wrapper.className).to.include('slds-form-element');
		});

		it('renders label', () => {
			expect(labelText.textContent).to.equal('Slider Label');
		});

		it('renders slider element with class "slds-slider"', () => {
			expect(slider.className).to.include('slds-slider');
		});

		it('has an id', () => {
			expect(slider.getAttribute('id')).to.be.ok;
		});

		it('can pass custom id', () => {
			expect(slider.getAttribute('id')).to.equal('custom-id');
		});

		it('has associated label for tag pointing to id of slider', () => {
			const labelForTag = label.getAttribute('for');
			const sliderId = slider.getAttribute('id');
			expect(labelForTag).to.equal(sliderId);
		});
	});

	describe('Component basic props', () => {
		let component;
		let slider;
		let labelRange;
		let sliderValue;

		beforeEach(() => {
			component = getSlider({
				label: 'Slider Label',
				id: 'custom-id',
				value: 200,
				min: 0,
				max: 400,
				step: 100,
			});
			slider = findRenderedDOMComponentWithTag(component, 'input');
			labelRange = findRenderedDOMComponentWithClass(
				component,
				'slds-slider-label__range'
			);
			sliderValue = findRenderedDOMComponentWithClass(
				component,
				'slds-slider__value'
			);
		});

		afterEach(() => {
			removeSlider();
		});

		it('has min', () => {
			expect(slider.getAttribute('min')).to.equal('0');
		});

		it('has max', () => {
			expect(slider.getAttribute('max')).to.equal('400');
		});

		it('min/max matches label range', () => {
			expect(labelRange.textContent).to.equal('0 - 400');
		});

		it('has step', () => {
			expect(slider.getAttribute('step')).to.equal('100');
		});

		it('has value', () => {
			expect(slider.getAttribute('value')).to.equal('200');
		});

		it('value matches slider value label', () => {
			expect(slider.value).to.equal(sliderValue.textContent);
		});
	});

	describe('onInput, onChange callbacks are set', function () {
		let mountNode;
		let wrapper;

		beforeEach(() => {
			mountNode = createMountNode({ context: this });
		});

		afterEach(() => {
			destroyMountNode({ wrapper, mountNode });
		});

		it('onChange trigged callback', function (done) {
			wrapper = mount(
				<Slider
					value={200}
					min={0}
					max={400}
					step={100}
					onChange={(e, { value }) => {
						expect(value).to.equal(300);
						done();
					}}
				/>,
				{ attachTo: mountNode }
			);
			const trigger = wrapper.find('input');
			trigger.simulate('change', { target: { value: 300 } });
		});

		it('onInput trigged callback', function (done) {
			wrapper = mount(
				<Slider
					value={200}
					min={0}
					max={400}
					step={100}
					onInput={(e, { value }) => {
						expect(value).to.equal(300);
						done();
					}}
				/>,
				{ attachTo: mountNode }
			);
			const trigger = wrapper.find('input');
			trigger.simulate('input', { target: { value: '300' } });
		});
	});

	describe('Slider with Assistive Text Label', () => {
		let component;
		let slider;
		let label;
		let labelText;

		beforeEach(() => {
			component = getSlider({ assistiveText: { label: 'Assistive Label' } });
			slider = findRenderedDOMComponentWithTag(component, 'input');
			label = findRenderedDOMComponentWithClass(
				component,
				'slds-form-element__label'
			);
			labelText = findRenderedDOMComponentWithClass(
				component,
				'slds-slider-label__label'
			);
		});

		afterEach(() => {
			removeSlider();
		});

		it('renders label (assitive)', () => {
			expect(labelText.textContent).to.equal('Assistive Label');
		});

		it('label has class "slds-assistive-text"', () => {
			expect(label.className).to.include('slds-assistive-text');
		});

		it('has associated label for tag pointing to id of slider', () => {
			const labelForTag = label.getAttribute('for');
			const sliderId = slider.getAttribute('id');
			expect(labelForTag).to.equal(sliderId);
		});
	});

	describe('Disabled slider', () => {
		let component;
		let slider;

		beforeEach(() => {
			component = getSlider({ label: 'Slider Label', disabled: true });
			slider = findRenderedDOMComponentWithTag(component, 'input');
		});

		afterEach(() => {
			removeSlider();
		});

		it('slider has attribute "disabled"', () => {
			expect(slider.getAttribute('disabled')).to.exist;
		});
	});

	describe('Slider size', () => {
		let component;
		let container;

		beforeEach(() => {
			component = getSlider({
				id: 'custom-id',
				label: 'Slider Label',
				size: 'medium',
			});
			container = findRenderedDOMComponentWithClass(component, 'slds-slider');
		});

		afterEach(() => {
			removeSlider();
		});

		it('renders size class', () => {
			expect(container.className).to.include('slds-size_medium');
		});
	});

	describe('Multiple sliders', () => {
		let component1;
		let component2;
		let slider1;
		let slider2;

		beforeEach(() => {
			component1 = getSlider({ label: 'Slider One' });
			component2 = getSecondSlider({ label: 'Slider Two' });
			slider1 = findRenderedDOMComponentWithTag(component1, 'input');
			slider2 = findRenderedDOMComponentWithTag(component2, 'input');
		});

		afterEach(() => {
			removeSlider();
		});

		it('each slider has unique generated id', () => {
			expect(slider1.getAttribute('id')).to.not.equal(
				slider2.getAttribute('id')
			);
		});
	});

	describe('Required slider in Error State', () => {
		let component;
		let wrapper;
		let error;
		let slider;

		beforeEach(() => {
			component = getSlider({
				label: 'Slider Label',
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
			slider = findRenderedDOMComponentWithTag(component, 'input');
		});

		afterEach(() => {
			removeSlider();
		});

		it('slider wrapper has class "slds-has-error"', () => {
			expect(wrapper.className).to.include('slds-has-error');
		});

		it('renders error message', () => {
			expect(error.textContent).to.equal('Error Message');
		});

		it('has associated aria-describedby pointing to id of error message', () => {
			const sliderDescribedBy = slider.getAttribute('aria-describedby');
			const errorId = error.getAttribute('id');
			expect(sliderDescribedBy).to.equal(errorId);
		});
	});

	describe('Vertical slider', () => {
		let component;
		let container;

		beforeEach(() => {
			component = getSlider({ label: 'Slider Label', vertical: true });
			container = findRenderedDOMComponentWithClass(component, 'slds-slider');
		});

		afterEach(() => {
			removeSlider();
		});

		it('slider has class "slds-slider_vertical"', () => {
			expect(container.className).to.include('slds-slider_vertical');
		});
	});
});
