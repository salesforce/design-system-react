import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Card from '../';
import CardFilter from '../filter';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';

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

describe('Card', () => {
	// Base defaults
	const requiredProps = {
		id: 'ExampleCard',
		heading: 'Lots of Related Items',
	};

	// DOM queries
	const getCard = (container) => container.querySelector(`.${cssClasses.base}`);
	const getHeader = (container) =>
		getCard(container).querySelector(`.${headerCssClasses.base}`);
	const getHeaderActions = (container) =>
		getHeader(container).querySelector(
			`#${requiredProps.id}${headerIdSuffixes.headerActions}`
		);
	const getFilter = (container) =>
		getHeader(container).querySelector('.slds-form-element');
	const getBody = (container) =>
		getCard(container).querySelector(
			`#${requiredProps.id}${cardIdSuffixes.body}`
		);
	const getFooter = (container) =>
		getCard(container).querySelector(`.${footerCssClasses.base}`);
	const getEmptyBodyHeading = (container) => getBody(container).querySelector('h3');

	describe('Default Structure', () => {
		it('has a header', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...requiredProps} />
				</IconSettings>
			);

			const header = getHeader(container);
			expect(header).toBeInTheDocument();
		});

		it('has a body', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...requiredProps} />
				</IconSettings>
			);

			const body = getBody(container);
			expect(body).toBeInTheDocument();
		});

		it('has the correct heading text', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...requiredProps} />
				</IconSettings>
			);

			const heading = getHeader(container).querySelector(
				`#${requiredProps.id}${cardIdSuffixes.heading}`
			);
			expect(heading).toBeInTheDocument();
			expect(heading.textContent).toContain(requiredProps.heading);
		});
	});

	describe('Optional Structure', () => {
		const renderFooterContents = <span id="sampleFooter" />;
		const renderHeaderActions = <span id="sampleHeaderActions" />;
		const renderFilter = <CardFilter />;
		const renderIcon = <Icon category="standard" name="default" size="small" />;
		const ariaLabel = 'aria-label';
		const dataLabel = 'data-label';

		const optionalProps = {
			...requiredProps,
			bodyClassName: 'this-is-a-custom-body-class',
			className: 'this-is-a-custom-card-class',
			footer: renderFooterContents,
			headerActions: renderHeaderActions,
			filter: renderFilter,
			icon: renderIcon,
			style: { background: 'rgb(18, 49, 35)' },
			'aria-label': ariaLabel,
			'data-label': dataLabel,
		};

		it('has a header', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const header = getHeader(container);
			expect(header).toBeInTheDocument();
		});

		it('renders custom styles', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const card = getCard(container);
			expect(card).toHaveStyle({ backgroundColor: 'rgb(18, 49, 35)' });
		});

		it('renders custom classes on card', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const card = getCard(container);
			expect(card).toHaveClass('this-is-a-custom-card-class');
		});

		it('renders custom classes on body', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const body = getBody(container);
			expect(body).toHaveClass('this-is-a-custom-body-class');
		});

		it('has a body', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const body = getBody(container);
			expect(body).toBeInTheDocument();
		});

		it('has an icon', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const header = getHeader(container);
			const icon = header.querySelector('.slds-media__figure');
			expect(icon).toBeInTheDocument();
		});

		it('has the default filter and correct ID', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const filter = getFilter(container);
			expect(filter).toBeInTheDocument();
		});

		it('has a footer and correct child ID', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const footer = getFooter(container);
			expect(footer).toBeInTheDocument();
			const footerChildren = footer.querySelector('#sampleFooter');
			expect(footerChildren).toBeInTheDocument();
		});

		it('has header actions and correct child ID', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const headerActions = getHeaderActions(container);
			expect(headerActions).toBeInTheDocument();
			const headerActionsChildren = headerActions.querySelector(
				'#sampleHeaderActions'
			);
			expect(headerActionsChildren).toBeInTheDocument();
		});

		it('correctly destructures `aria-` props', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const card = getCard(container);
			expect(card).toHaveAttribute('aria-label', ariaLabel);
		});

		it('correctly destructures `data-` props', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...optionalProps} />
				</IconSettings>
			);

			const card = getCard(container);
			expect(card).toHaveAttribute('data-label', dataLabel);
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

		it('has header with unique ID', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...props} />
				</IconSettings>
			);

			const heading = getCard(container).querySelector('#custom-heading');
			expect(heading).toBeInTheDocument();
			expect(heading).toHaveAttribute('id', 'custom-heading');
		});
	});

	describe('Empty Structure', () => {
		const props = {
			...requiredProps,
			bodyClassName: 'this-is-a-custom-body-class',
			className: 'this-is-a-custom-card-class',
			empty: true,
		};

		it('has a header', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...props} />
				</IconSettings>
			);

			const header = getHeader(container);
			expect(header).toBeInTheDocument();
		});

		it('has a body', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...props} />
				</IconSettings>
			);

			const body = getBody(container);
			expect(body).toBeInTheDocument();
		});

		it('has body heading based on heading of Card', () => {
			const { container } = render(
				<IconSettings iconPath="/assets/icons">
					<Card {...props} />
				</IconSettings>
			);

			const emptyBodyheading = getEmptyBodyHeading(container);
			expect(emptyBodyheading).toBeInTheDocument();
			expect(emptyBodyheading.textContent).toBe(requiredProps.heading);
		});
	});
});
