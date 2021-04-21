/* eslint-disable max-lines */
import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
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

// Import your internal dependencies (for example):
import ColorPicker from '../index';
import KEYS from '../../../utilities/key-code';

// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

chai.use(chaiEnzyme());

const selectors = {
	cancel: '.slds-color-picker__selector-cancel',
	customError: '.slds-color-picker__input-custom-error',
	customHex: '.slds-color-picker__input-custom-hex',
	customRed: '.slds-color-picker__input-custom-r',
	gridPoint: '.slds-color-picker__range-indicator',
	hueSlider: '.slds-color-picker__hue-slider',
	popover: '.slds-color-picker__selector',
	summaryInput: '.slds-color-picker__summary-input input',
	submit: '.slds-color-picker__selector-submit',
	svGrid: '.slds-color-picker__custom-range',
	swatch: '.slds-color-picker__swatch-trigger',
	toggle: '.slds-color-picker__summary-button',
};

describe('SLDSColorPicker', function describeFunction() {
	let mountNode;
	let wrapper;

	beforeEach(() => {
		mountNode = createMountNode({ context: this });
	});

	afterEach(() => {
		destroyMountNode({ wrapper, mountNode });
	});

	describe('Summary input', () => {
		it('fires onChange with value and isValid set to true when valid', function () {
			wrapper = mount(
				<ColorPicker
					events={{
						onChange: (event, { color, isValid }) => {
							expect(color).to.equal('#ff0000');
							expect(isValid).to.be.true;
						},
					}}
				/>,
				{ attachTo: mountNode }
			);

			const input = wrapper.find(selectors.summaryInput).first();

			input.simulate('change', {
				target: {
					value: '#ff0000',
				},
			});
		});

		it('fires onChange with named value and isValid set to true when valid', function () {
			wrapper = mount(
				<ColorPicker
					events={{
						onChange: (event, { color, isValid }) => {
							expect(color).to.equal('red');
							expect(isValid).to.be.true;
						},
					}}
				/>,
				{ attachTo: mountNode }
			);

			const input = wrapper.find(selectors.summaryInput).first();

			input.simulate('change', {
				target: {
					value: 'red',
				},
			});
		});

		it('fires onChange with value and isValid set to false when invalid', function () {
			wrapper = mount(
				<ColorPicker
					events={{
						onChange: (event, { color, isValid }) => {
							expect(color).to.equal('invalid');
							expect(isValid).to.be.false;
						},
					}}
				/>,
				{ attachTo: mountNode }
			);

			const input = wrapper.find(selectors.summaryInput).first();

			input.simulate('change', {
				target: {
					value: 'invalid',
				},
			});
		});

		it('fires onValidateColor when input changes', function () {
			const customValidator = sinon.spy();

			wrapper = mount(
				<ColorPicker
					events={{
						onValidateColor: (hex) => {
							customValidator(hex);
						},
					}}
				/>,
				{ attachTo: mountNode }
			);

			const input = wrapper.find(selectors.summaryInput).first();

			input.simulate('change', {
				target: {
					value: '#FFFFFF',
				},
			});

			expect(customValidator.calledWithExactly('#FFFFFF')).to.be.true;
		});

		it('value prop is set in input', () => {
			wrapper = mount(<ColorPicker value="#FFFFFF" />, { attachTo: mountNode });

			const input = wrapper.find(selectors.summaryInput).first();
			expect(input.instance().value).to.equal('#FFFFFF');
		});
	});

	describe('Swatch toggle button', () => {
		it('opens popover when clicked and expects onRequestOpen and onOpen to be fired once', function describeFunction2() {
			const onRequestOpenSpy = sinon.spy();
			const onOpenSpy = sinon.spy();

			wrapper = mount(
				<ColorPicker onRequestOpen={onRequestOpenSpy} onOpen={onOpenSpy} />,
				{ attachTo: mountNode }
			);

			const button = wrapper.find(selectors.toggle).first();
			button.simulate('click');

			expect(wrapper.find(selectors.popover).exists()).to.be.true;
			expect(onRequestOpenSpy.calledOnce).to.be.true;
			expect(onOpenSpy.calledOnce).to.be.true;
		});

		it('closes popover when clicked and popover is open', function () {
			const onCloseSpy = sinon.spy();
			wrapper = mount(<ColorPicker isOpen onClose={onCloseSpy} />, {
				attachTo: mountNode,
			});

			const button = wrapper.find(selectors.toggle).first();
			button.simulate('click');
			expect(onCloseSpy.calledOnce).to.be.true;
		});
	});

	describe('Popover', function describeFunction2() {
		const clickSubmit = (el) => {
			el.find(selectors.submit).first().simulate('click');
		};

		describe('Swatch tab', function describeFunction3() {
			it('clicking a swatch sets that working color', function (done) {
				wrapper = mount(
					<ColorPicker
						isOpen
						value="#000000"
						swatchColors={['#ff0000']}
						events={{
							onWorkingColorChange: (event, { color }) => {
								expect(color.hex).to.equal('#ff0000');
								done();
							},
						}}
					/>,
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('click');
			});
		});

		describe('Swatch keyboard navigation', function describeFunction3() {
			it('pressing right will move the color to the next one', function (done) {
				wrapper = mount(
					<ColorPicker
						isOpen
						value="#ff0000"
						swatchColors={['#ff0000', '#0000ff']}
						events={{
							onWorkingColorChange: (event, { color }) => {
								expect(color.hex).to.equal('#0000ff');
								done();
							},
						}}
					/>,
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('keyDown', {
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});
			});

			it('pressing left will move the color to the previous one', function (done) {
				wrapper = mount(
					<ColorPicker
						isOpen
						value="#0000ff"
						swatchColors={['#ff0000', '#0000ff']}
						events={{
							onWorkingColorChange: (event, { color }) => {
								expect(color.hex).to.equal('#ff0000');
								done();
							},
						}}
					/>,
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('keyDown', {
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});
			});

			it('pressing right in RTL will move the color to the previous one', function (done) {
				wrapper = mount(
					makeRtl(
						<ColorPicker
							isOpen
							value="#0000ff"
							swatchColors={['#ff0000', '#0000ff']}
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.hex).to.equal('#ff0000');
									done();
								},
							}}
						/>
					),
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('keyDown', {
					keyCode: KEYS.RIGHT,
					which: KEYS.RIGHT,
				});
			});

			it('pressing left in RTL will move the color to the next one', function (done) {
				wrapper = mount(
					makeRtl(
						<ColorPicker
							isOpen
							value="#ff0000"
							swatchColors={['#ff0000', '#0000ff']}
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.hex).to.equal('#0000ff');
									done();
								},
							}}
						/>
					),
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('keyDown', {
					keyCode: KEYS.LEFT,
					which: KEYS.LEFT,
				});
			});
		});

		describe('Submit button', function describeFunction3() {
			it('sets the input color', function () {
				wrapper = mount(
					<ColorPicker isOpen value="#000000" swatchColors={['#ff0000']} />,
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('click');
				clickSubmit(wrapper);

				const input = wrapper.find(selectors.summaryInput).first();
				expect(input.props().value).to.equal('#ff0000');
			});

			it('triggers onChange with value and isValid set to true', function (done) {
				wrapper = mount(
					<ColorPicker
						isOpen
						value="#000000"
						swatchColors={['#ff0000']}
						events={{
							onChange: (event, { color, isValid }) => {
								expect(color).to.equal('#ff0000');
								expect(isValid).to.be.true;
								done();
							},
						}}
					/>,
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('click');
				clickSubmit(wrapper);
			});
		});

		describe('Cancel button', function describeFunction3() {
			it('does not trigger onChange but triggers onRequestClose', function () {
				const onRequestCloseSpy = sinon.spy();
				wrapper = mount(
					<ColorPicker
						isOpen
						value="#000000"
						swatchColors={['#ff0000']}
						events={{
							onChange: () => {
								expect().fail();
							},
						}}
						onRequestClose={onRequestCloseSpy}
					/>,
					{ attachTo: mountNode }
				);

				const swatch = wrapper.find(selectors.swatch).first();
				swatch.simulate('click');

				const cancel = wrapper.find(selectors.cancel).first();
				cancel.simulate('click');

				expect(
					onRequestCloseSpy.calledWithExactly(sinon.match.any, {
						trigger: 'cancel',
					})
				).to.be.true;
			});
		});

		describe('Custom tab', function describeFunction3() {
			describe('HSV', function describeFunction4() {
				describe('hue slider', function describeFunction5() {
					it('change causes color hue to update', function (done) {
						wrapper = mount(
							<ColorPicker
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.hue).to.equal(50);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const hue = wrapper.find(selectors.hueSlider).first();
						hue.simulate('change', {
							target: {
								value: 50,
							},
						});
					});
				});

				describe('saturation-value grid', function describeFunction5() {
					// it('click sets color using coordinates', function() {
					// 	this.skip('too dependent on browser calculations');
					// });

					it('up key causes color value to go up', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#000000"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.value).to.equal(1);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});
					});

					it('down key causes color value to go down', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#ffffff"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.value).to.equal(99);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							keyCode: KEYS.DOWN,
							which: KEYS.DOWN,
						});
					});

					it('left key causes color sat. to go down 1', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#ff0000"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.saturation).to.equal(99);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							keyCode: KEYS.LEFT,
							which: KEYS.LEFT,
						});
					});

					it('right key causes color sat. to go up 1', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#000000"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.saturation).to.equal(1);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							keyCode: KEYS.RIGHT,
							which: KEYS.RIGHT,
						});
					});

					it('shift-up causes color value to go up 10', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#000000"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.value).to.equal(10);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							shiftKey: true,
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});
					});

					it('up key at value 100 causes no change', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#ffffff"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.value).to.equal(100);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});
					});

					it('shift-up at value > 90 causes value to be 100', function (done) {
						wrapper = mount(
							<ColorPicker
								value="#EBEBEB"
								isOpen
								events={{
									onWorkingColorChange: (event, { color }) => {
										expect(color.hsv.value).to.equal(100);
										done();
									},
								}}
							/>,
							{ attachTo: mountNode }
						);

						const point = wrapper.find(selectors.gridPoint).first();
						point.simulate('keyDown', {
							shiftKey: true,
							keyCode: KEYS.UP,
							which: KEYS.UP,
						});
					});
				});
			});

			describe('Hex input', function describeFunction4() {
				it('invalid value sets error message', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.errors.hex).to.be.true;
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const hexInput = wrapper.find(selectors.customHex).first();
					hexInput.find('input').simulate('change', {
						target: {
							value: 'invalid',
						},
					});
				});

				it('valid value updates color', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.hex).to.equal('#00ff00');
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const hexInput = wrapper.find(selectors.customHex).first();
					hexInput.find('input').simulate('change', {
						target: {
							value: '#00ff00',
						},
					});
				});

				it('fires onValidateWorkingColor when set', () => {
					const spyCustomColorValidator = sinon.spy();
					const customColorValidator = (hex) => {
						spyCustomColorValidator(hex);
						return true;
					};

					wrapper = mount(
						<ColorPicker
							isOpen
							events={{ onValidateWorkingColor: customColorValidator }}
						/>,
						{ attachTo: mountNode }
					);

					const hexInput = wrapper.find(selectors.customHex).first();
					hexInput.find('input').simulate('change', {
						target: {
							value: '#00ff00',
						},
					});

					expect(spyCustomColorValidator.calledWith('#00ff00')).to.be.true;
				});

				it('valueWorking is set in custom tab inner input', () => {
					wrapper = mount(<ColorPicker isOpen valueWorking="#00ff00" />, {
						attachTo: mountNode,
					});

					const hexInput = wrapper.find(selectors.customHex).first();
					expect(hexInput.find('input').instance().value).to.equal('#00ff00');
				});
			});

			describe('RGB input', function describeFunction4() {
				it('non-number causes error message', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.errors.red).to.be.true;
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const redInput = wrapper.find(selectors.customRed).first();
					redInput.find('input').simulate('change', {
						target: {
							value: 'abc',
						},
					});
				});

				it('non-integer number causes error message', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.errors.red).to.be.true;
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const redInput = wrapper.find(selectors.customRed).first();
					redInput.find('input').simulate('change', {
						target: {
							value: 123.45,
						},
					});
				});

				it('number greater than 255 causes error message', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.errors.red).to.be.true;
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const redInput = wrapper.find(selectors.customRed).first();
					redInput.find('input').simulate('change', {
						target: {
							value: 500,
						},
					});
				});

				it('negative number causes error message', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.errors.red).to.be.true;
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const redInput = wrapper.find(selectors.customRed).first();
					redInput.find('input').simulate('change', {
						target: {
							value: -123,
						},
					});
				});

				it('valid number updates color', function (done) {
					wrapper = mount(
						<ColorPicker
							isOpen
							events={{
								onWorkingColorChange: (event, { color }) => {
									expect(color.rgb.red).to.eql(123);
									done();
								},
							}}
						/>,
						{ attachTo: mountNode }
					);

					const redInput = wrapper.find(selectors.customRed).first();
					redInput.find('input').simulate('change', {
						target: {
							value: 123,
						},
					});
				});
			});
		});
	});
});
