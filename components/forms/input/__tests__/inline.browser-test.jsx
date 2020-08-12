import React from 'react';
import ReactDOM from 'react-dom';

import chai from 'chai';

import InlineEdit from '../../../forms/input/inline';
import IconSettings from '../../../icon-settings';

const should = chai.should();

describe('Inline Edit: ', function describeFunction() {
	const sampleValue = 'Sample value';

	const renderInlineEdit = (instance) =>
		function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			/* deepscan-disable REACT_ASYNC_RENDER_RETURN_VALUE */
			// eslint-disable-next-line react/no-render-return-value
			this.component = ReactDOM.render(
				<IconSettings iconPath="/assets/icons">{instance}</IconSettings>,
				this.dom
			);
			/* deepscan-enable REACT_ASYNC_RENDER_RETURN_VALUE */
		};

	function removeInlineEdit() {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getWrapper = (dom) => dom.querySelector('.slds-form-element');

	const getInput = (dom) => dom.querySelector('.slds-input');

	const getStatic = (dom) => dom.querySelector('.slds-form-element__static');

	const getTrigger = (dom) => getStatic(dom).querySelector('.slds-button');

	describe('Structure', function describeFunction2() {
		beforeEach(
			renderInlineEdit(
				<InlineEdit
					id="inline-edit-standard"
					value={sampleValue}
					silenceDeprecationWarning
				/>
			)
		);

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
			const value = staticElement.textContent;

			value.should.equal('Sample valueEdit text');
		});
	});

	// describe('Editable', function () {
	// 	beforeEach(renderInlineEdit(
	// 		<InlineEdit id="inline-edit-standard" value={sampleValue} />
	// 	));

	// 	afterEach(removeInlineEdit);

	// 	it('becomes editable on click', function () {
	// 		const trigger = getTrigger(this.dom);

	// 		should.exist(trigger);

	// 		Simulate.click(trigger, {});

	// 		setTimeout(() => {
	// 			const input = getInput(this.dom);
	// 			const staticElement = getStatic(this.dom);

	// 			should.exist(input);
	// 			should.not.exist(staticElement);
	// 		}, 100);
	// 	});
	// });

	// describe('Custom Handler Function', function () {
	// 	const enterEditModeHanlder = sinon.spy();
	// 	const leaveEditModeHanlder = sinon.spy();
	// 	const keyDownHandler = sinon.spy();
	// 	const keyUpHandler = sinon.spy();

	// 	beforeEach(renderInlineEdit(<InlineEdit id="inline-edit-standard" value={sampleValue} onEnterEditMode={enterEditModeHanlder} onLeaveEditMode={leaveEditModeHanlder} onKeyDown={keyDownHandler} onKeyUp={keyUpHandler} />
	// 	));

	// 	afterEach(removeInlineEdit);

	// 	it('enterEditMode and leaveEditMode handler get called', function () {
	// 		const trigger = getTrigger(this.dom);

	// 		should.exist(trigger);

	// 		Simulate.click(trigger, {});

	// 		setTimeout(() => {
	// 			const input = getInput(this.dom);

	// 			should.exist(input);

	// 			expect(enterEditModeHanlder.callCount).to.equal(1);

	// 			Simulate.keyDown(input, { key: 'Escape', keyCode: 27, which: 27 });

	// 			setTimeout(() => {
	// 				const input2 = getInput(this.dom);

	// 				should.not.exist(input2);

	// 				expect(leaveEditModeHanlder.callCount).to.equal(1);
	// 				expect(leaveEditModeHanlder).to.have.been.called.with(undefined, { cancel: true });
	// 			}, 100);
	// 		}, 100);
	// 	});

	// 	it('keyup and keydown handler get called', function () {
	// 		const trigger = getTrigger(this.dom);

	// 		should.exist(trigger);

	// 		Simulate.click(trigger, {});

	// 		setTimeout(() => {
	// 			const input = getInput(this.dom);

	// 			should.exist(input);

	// 			input.value = '1';

	// 			Simulate.change(input);

	// 			Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });

	// 			setTimeout(() => {
	// 				const input2 = getInput(this.dom);

	// 				should.not.exist(input2);

	// 				expect(keyUpHandler.callCount).to.equal(1);
	// 				expect(keyDownHandler.callCount).to.equal(1);
	// 			}, 100);
	// 		}, 100);
	// 	});
	// });
});
