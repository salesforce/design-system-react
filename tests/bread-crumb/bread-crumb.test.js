/* eslint-disable indent */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import chai from 'chai';

import BreadCrumb from '../../components/bread-crumb';

chai.should();

const props = {
  assistiveText: 'docsBreadcrumb',
  trail: [
    <a href="#">Category one</a>,
    <a href="#">Child one</a>
  ]
};

describe('Breadcrumb: ', function () {
  // Setup and takedown
  const renderBreadCrumb = (instance) => {
		return function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			this.component = ReactDOM.render(instance, this.dom);
		};
	};

	function removeBreadCrumb () {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	};

	const getBreadCrumb = dom => dom.querySelector('.slds-breadcrumb');

	// Tests
  describe('Props render', () => {
		before(renderBreadCrumb(
			<BreadCrumb {...props} />
		));

		after(removeBreadCrumb);

		it('BreadCrumb trail exists', function () {
			const breadCrumb = getBreadCrumb(this.dom);
      breadCrumb.childNodes.length.should.equal(2);
		});

		it('First BreadCrumb text renders', function () {
			const breadCrumb = getBreadCrumb(this.dom);
      breadCrumb.childNodes[0].textContent.should.equal('Category one');
		});

  })

});


