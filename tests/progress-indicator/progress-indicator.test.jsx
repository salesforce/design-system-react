// /* eslint-disable react/no-render-return-value */
// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
// import { expect } from 'chai';
// import assign from 'lodash.assign';

// const { Simulate,
// 	findRenderedDOMComponentWithTag,
// 	findRenderedDOMComponentWithClass } = TestUtils;

// import { SLDSProgressIndicator } from '../../components';

// const mockCallback = sinon.spy();

// describe('SLDSProgressIndicator: ', () => {
// 	let body;

// 	const defaultProps = {
// 		onStepClick: mockCallback,
		
// 	};

// 	const renderPI = (inst) => {
// 		body = document.createElement('div');
// 		document.body.appendChild(body);
// 		return ReactDOM.render(inst, body);
// 	};

// 	function removePI () {
// 		ReactDOM.unmountComponentAtNode(body);
// 		document.body.removeChild(body);
// 	}

// 	const createPI = (props) => React.createElement(SLDSProgressIndicator, assign({}, defaultProps, props));
// 	const getPI = (props) => renderPI(createPI(props));

// 	describe('Basic Progress Indicator Props Render', () => {
// 		let cmp;
// 		let pi; // progress indicator

// 		beforeEach(() => {
// 			cmp = getPI({
// 				id: 'custom-id',
// 				s
// 			});
// 			btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
// 		});

// 		afterEach(() => {
// 			removeButton(btn);
// 		});

// 	});

// });
