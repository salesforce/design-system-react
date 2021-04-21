import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';

import Spinner from '../../spinner';

chai.should();

describe('Spinner: ', () => {
	// Setup and takedown
	const renderSpinner = (instance) =>
		function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			// eslint-disable-next-line react/no-render-return-value
			this.component = ReactDOM.render(instance, this.dom); // deepscan-disable-line REACT_ASYNC_RENDER_RETURN_VALUE
		};

	function removeSpinner() {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getSpinner = (dom) => dom.querySelector('.slds-spinner');

	// Tests
	describe('Default spinner renders properly', () => {
		before(renderSpinner(<Spinner />));

		after(removeSpinner);

		it('Spinner exists', function () {
			const spinner = getSpinner(this.dom);
			spinner.should.not.be.undefined;
		});

		it('renders default classes when no props passed in', function () {
			const spinner = getSpinner(this.dom);
			spinner.className.should.equal('slds-spinner slds-spinner_medium');
		});
	});

	describe('Props render proper css classes', () => {
		beforeEach(
			renderSpinner(<Spinner size="small" variant="brand" isDelayed />)
		);

		afterEach(removeSpinner);

		it('renders correct classes when props passed in', function () {
			const spinner = getSpinner(this.dom);
			spinner.className.should.include(
				'slds-spinner_brand slds-spinner_delayed slds-spinner_small'
			);
		});
	});
});
