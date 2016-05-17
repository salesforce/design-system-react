/* eslint-disable indent */

import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';

import chai from 'chai';

import Card, {cssClasses as CardCssClasses} from '../../components/card';
import CardFilter from '../../components/card/filter';
import {cssClasses as bodyCssClasses} from '../../components/card/body';
import {cssClasses as footerCssClasses} from '../../components/card/footer';
import {idSuffixes as emptyIdSuffixes} from '../../components/card/empty';
import {cssClasses as mediaObjectCssClasses} from '../../components/media-object';
import {idSuffixes, cssClasses as headerCssClasses} from '../../components/card/header';

import Icon from '../../components/icon';

chai.should();

describe('Card: ', function () {
	// Base defaults
	const requiredProps = {
		id: 'ExampleCard',
		heading: 'Lots of Related Items'
	};

	// Setup and takedown
	const renderCard = (instance) => {
		return function () {
			this.dom = document.createElement('div');
			document.body.appendChild(this.dom);
			this.component = ReactDOM.render(instance, this.dom);
		};
	};
	function removeCard () {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	// DOM queries, [0] present due to test framework, not because it returns a DOM collection
	const getCard = dom => dom.querySelector('.' + CardCssClasses.base);
	const getHeader = (dom) => {
		return getCard(dom).querySelectorAll('.' + headerCssClasses.base)[0];
	};
	const getHeaderActions = (dom) => {
		return getHeader(dom).querySelectorAll('#' + requiredProps.id + idSuffixes.headerActions)[0];
	};
	const getFilter = (dom) => {
		return getHeader(dom).querySelectorAll('#' + requiredProps.id + idSuffixes.filter)[0];
	};
	const getBody = (dom) => {
		return getCard(dom).querySelectorAll('.' + bodyCssClasses.base)[0];
	};
	const getFooter = (dom) => {
		return getCard(dom).querySelectorAll('.' + footerCssClasses.base)[0];
	};
	const getEmptyBodyHeading = (dom) => {
		return getBody(dom).querySelectorAll('#' + requiredProps.id + emptyIdSuffixes.heading)[0];
	};

	// Tests
	describe('Default Structure', function () {
		beforeEach(renderCard(
			<Card
				{...requiredProps}
			/>
		));

		afterEach(removeCard);

		it('has a header', function () {
			const header = getHeader(this.dom);
			header.should.not.be.undefined;
		});

		it('has a body', function () {
			const body = getBody(this.dom);
			body.should.not.be.undefined;
		});

		it('has the correct heading text', function () {
			const heading = getHeader(this.dom).querySelectorAll('#' + requiredProps.id + idSuffixes.heading)[0];
			heading.textContent = requiredProps.heading;
		});
	});

	// Optional props
	const renderFooterContents = React.createElement('span', {id: 'sampleFooter'});
	const renderHeaderActions = React.createElement('span', {id: 'sampleHeaderActions'});
	const renderFilter = React.createElement(CardFilter);
	const renderIcon = React.createElement(Icon, {
		category: 'standard',
		name: 'default',
		size: 'small'
	});

	const optionalProps = assign(requiredProps, {
		footer: renderFooterContents,
		headerActions: renderHeaderActions,
		filter: renderFilter,
		icon: renderIcon
	});

	describe('Optional Structure', function () {

		beforeEach(renderCard(
			<Card
				{...optionalProps}
			/>
		));

		afterEach(removeCard);

		it('has a header', function () {
			const header = getHeader(this.dom);
			header.should.not.be.undefined;
		});

		it('has a body', function () {
			const body = getBody(this.dom);
			body.should.not.be.undefined;
		});

		it('has an icon', function () {
			const header = getHeader(this.dom);
			const icon = header.querySelectorAll('.' + mediaObjectCssClasses.figure)[0];
			icon.should.not.be.undefined;
		});

		it('has the default filter and correct ID', function () {
			const filter = getFilter(this.dom);
			filter.should.not.be.undefined;
		});

		it('has a footer and correct child ID', function () {
			const footer = getFooter(this.dom);
			footer.should.not.be.undefined;
			const footerChildren = footer.querySelectorAll('#sampleFooter')[0]
			footerChildren.should.not.be.undefined;
		});

		it('has header actions and correct child ID', function () {
			const headerActions = getHeaderActions(this.dom);
			headerActions.should.not.be.undefined;
			const headerActionsChildren = headerActions.querySelectorAll('#sampleHeaderActions')[0]
			headerActionsChildren.should.not.be.undefined;
		});

	});

	describe('Empty Structure', function () {
		let props = assign(optionalProps, {
			empty: true
		});

		beforeEach(renderCard(
			<Card
				{...props}
			/>
		));

		afterEach(removeCard);

		it('has a header', function () {
			const header = getHeader(this.dom);
			header.should.not.be.undefined;
		});

		it('has a body', function () {
			const body = getBody(this.dom);
			body.should.not.be.undefined;
		});

		it('does NOT have a footer', function () {
			const footer = getFooter(this.dom);
			(typeof footer).should.equal('undefined');
		});

		it('has body heading based on heading of Card', function () {
			const emptyBodyheading = getEmptyBodyHeading(this.dom);
			emptyBodyheading.should.not.be.undefined;
			emptyBodyheading.textContent.should.equal(requiredProps.heading);
		});

	});

});
