/* Adds all of the Mocha (eg `it` and `should`) and sinon testing global
 * variables to the global namespace for eslint purposes.
 */
/* eslint-env mocha */
/* global sinon */

// Additional modifiers to [eslint-config-slds](https://github.com/salesforce-ux/eslint-config-slds) for convenience
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/display-name */

// Import your external dependenciesimport React from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

import BreadCrumb from '../../components/bread-crumb';

const props = {
	assistiveText: 'docsBreadcrumb',
	trail: [
		<a href="#">Category one</a>,
		<a href="#">Child one</a>
	]
};

describe('Breadcrumb: ', function () {
	// Setup and takedown
	const renderBreadCrumb = (instance) => function () {
		this.dom = document.createElement('div');
		document.body.appendChild(this.dom);
		this.component = ReactDOM.render(instance, this.dom);
	};

	function removeBreadCrumb () {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const getBreadCrumb = dom => dom.querySelector('.slds-breadcrumb');

	// Tests
	describe('Props render', () => {
		before(renderBreadCrumb(
			<BreadCrumb {...props} />
		));

		after(removeBreadCrumb);

		it('BreadCrumb trail exists', function () {
			const breadCrumb = getBreadCrumb(this.dom);
			expect(breadCrumb.childNodes.length).to.equal(2);
		});

		it('First BreadCrumb text renders', function () {
			const breadCrumb = getBreadCrumb(this.dom);
			expect(breadCrumb.childNodes[0].textContent).to.equal('Category one');
		});
	});
});
