import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';

import chai from 'chai';

import Card from '../../card';
import CardFilter from '../../card/filter';
import { cssClasses as mediaObjectCssClasses } from '../../media-object';

import Icon from '../../icon';
import IconSettings from '../../icon-settings';

chai.should();

const headerIdSuffixes = {
	headerActions: '__header-actions',
	heading: '__heading',
	filter: '__filter-input',
};

const cardIdSuffixes = {
	body: '__body',
	headerActions: '__header-actions',
	heading: '__heading',
	filter: '__filter-input',
};

const cssClasses = {
	base: 'slds-card',
};

const footerCssClasses = {
	base: 'slds-card__footer',
};

const headerCssClasses = {
	base: 'slds-card__header',
};

describe('Card: ', () => {
	// Base defaults
	const requiredProps = {
		id: 'ExampleCard',
		heading: 'Lots of Related Items',
	};

	const renderCard = (instance) =>
		function renderCardFunction() {
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

	function removeCard() {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	// DOM queries, [0] present due to test framework, not because it returns a DOM collection
	const getCard = (dom) => dom.querySelector(`.${cssClasses.base}`);
	const getHeader = (dom) =>
		getCard(dom).querySelectorAll(`.${headerCssClasses.base}`)[0];
	const getHeaderActions = (dom) =>
		getHeader(dom).querySelectorAll(
			`#${requiredProps.id}${headerIdSuffixes.headerActions}`
		)[0];
	const getFilter = (dom) =>
		getHeader(dom).querySelectorAll('.slds-form-element')[0];
	const getBody = (dom) =>
		getCard(dom).querySelectorAll(
			`#${requiredProps.id}${cardIdSuffixes.body}`
		)[0];
	const getFooter = (dom) =>
		getCard(dom).querySelectorAll(`.${footerCssClasses.base}`)[0];
	const getEmptyBodyHeading = (dom) => getBody(dom).querySelectorAll('h3')[0];

	// Tests
	describe('Default Structure', () => {
		beforeEach(renderCard(<Card {...requiredProps} />));

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
			const heading = getHeader(this.dom).querySelectorAll(
				`#${requiredProps.id}${cardIdSuffixes.heading}`
			)[0];
			heading.textContent = requiredProps.heading;
		});
	});

	// Optional props
	const renderFooterContents = React.createElement('span', {
		id: 'sampleFooter',
	});
	const renderHeaderActions = React.createElement('span', {
		id: 'sampleHeaderActions',
	});
	const renderFilter = React.createElement(CardFilter);
	const renderIcon = React.createElement(Icon, {
		category: 'standard',
		name: 'default',
		size: 'small',
	});
	const ariaLabel = 'aria-label';
	const dataLabel = 'data-label';

	const optionalProps = assign(requiredProps, {
		bodyClassName: 'this-is-a-custom-body-class',
		className: 'this-is-a-custom-card-class',
		footer: renderFooterContents,
		headerActions: renderHeaderActions,
		filter: renderFilter,
		icon: renderIcon,
		style: { background: 'rgb(18, 49, 35)' },
		[ariaLabel]: ariaLabel,
		[dataLabel]: dataLabel,
	});

	describe('Optional Structure', () => {
		beforeEach(renderCard(<Card {...optionalProps} />));

		afterEach(removeCard);

		it('has a header', function () {
			const header = getHeader(this.dom);
			header.should.not.be.undefined;
		});

		it('renders custom styles', function () {
			const card = getCard(this.dom);
			card.style.backgroundColor.should.equal('rgb(18, 49, 35)');
		});

		it('renders custom classes on card', function () {
			const card = getCard(this.dom);
			card.className.should.contain('this-is-a-custom-card-class');
		});

		it('renders custom classes on body', function () {
			const body = getBody(this.dom);
			body.className.should.contain('this-is-a-custom-body-class');
		});

		it('has a body', function () {
			const body = getBody(this.dom);
			body.should.not.be.undefined;
		});

		it('has an icon', function () {
			const header = getHeader(this.dom);
			const icon = header.querySelectorAll(
				`.${mediaObjectCssClasses.figure}`
			)[0];
			icon.should.not.be.undefined;
		});

		it('has the default filter and correct ID', function () {
			const filter = getFilter(this.dom);
			filter.should.not.be.undefined;
		});

		it('has a footer and correct child ID', function () {
			const footer = getFooter(this.dom);
			footer.should.not.be.undefined;
			const footerChildren = footer.querySelectorAll('#sampleFooter')[0];
			footerChildren.should.not.be.undefined;
		});

		it('has header actions and correct child ID', function () {
			const headerActions = getHeaderActions(this.dom);
			headerActions.should.not.be.undefined;
			const headerActionsChildren = headerActions.querySelectorAll(
				'#sampleHeaderActions'
			)[0];
			headerActionsChildren.should.not.be.undefined;
		});

		it('correctly destructures `aria-` props', function () {
			const card = getCard(this.dom);
			card.getAttribute(ariaLabel).should.equal(ariaLabel);
		});

		it('correctly destructures `data-` props', function () {
			const card = getCard(this.dom);
			card.dataset.label.should.equal(dataLabel);
		});
	});

	describe('Accepts a custom node as heading', () => {
		const props = {
			id: 'ExampleCard',
			heading: (
				<span
					id="custom-heading"
					className="slds-text-heading_small slds-truncate"
					style={{ color: 'red' }}
				>
					To Wanda! This is custom!
				</span>
			),
		};

		beforeEach(renderCard(<Card {...props} />));

		afterEach(removeCard);

		it('has header with unique ID', function () {
			const heading = getCard(this.dom).querySelectorAll('#custom-heading')[0];
			heading.id.should.not.be.undefined;
		});
	});

	describe('Empty Structure', () => {
		const props = assign(optionalProps, {
			empty: true,
		});

		beforeEach(renderCard(<Card {...props} />));

		afterEach(removeCard);

		it('has a header', function () {
			const header = getHeader(this.dom);
			header.should.not.be.undefined;
		});

		it('has a body', function () {
			const body = getBody(this.dom);
			body.should.not.be.undefined;
		});

		it('has body heading based on heading of Card', function () {
			const emptyBodyheading = getEmptyBodyHeading(this.dom);
			emptyBodyheading.should.not.be.undefined;
			emptyBodyheading.textContent.should.equal(requiredProps.heading);
		});
	});
});
