/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */
/* global sinon */

// TODO: Enzyme 2.3 does not support React components containing SVGs
// https://github.com/airbnb/enzyme/issues/375

import React from 'react';

import { mount } from 'enzyme';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

// `this.wrapper` and `this.dom` is set in the helpers file
import { mountComponent, unmountComponent } from '../enzyme-helpers';

// sample props and children
import { dropdownCollection, propSets } from '../../utilities/sample-data/global-navigation-bar';

import GlobalNavigationBar from '../../components/global-navigation-bar';
import GlobalNavigationBarRegion from '../../components/global-navigation-bar/region';
import GlobalNavigationBarDropdown from '../../components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '../../components/global-navigation-bar/link';
import GlobalNavigationBarButton from '../../components/global-navigation-bar/button';

chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	base: 'slds-context-bar',
	themePrefix: 'slds-context-bar--theme-'
};

const REGION_CSS_CLASSES = {
	primary: 'slds-context-bar__primary',
	secondary: 'slds-context-bar__secondary',
	tertiary: 'slds-context-bar__tertiary',
	appName: 'slds-context-bar__app-name'
};

describe('Global Navigation Bar: ', () => {
	// Base defaults
	// no required props

	/*
		Tests
	 */
	describe('Default Structure', () => {
		beforeEach(mountComponent(
			<GlobalNavigationBar />
		));

		afterEach(unmountComponent);

		it('has wrapping div', function () {
			const component = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(component).to.have.length(1);
		});
	});

	describe('Optional Properties', () => {
		const customCloudProps = propSets.customCloud.props;
		const customThemeProps = propSets.lightTheme.props;

		beforeEach(mountComponent(
			<GlobalNavigationBar {...customCloudProps} {...customThemeProps} />
		));

		afterEach(unmountComponent);

		it('has custom cloud and theme CSS', function () {
			const component = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(component.hasClass(`${COMPONENT_CSS_CLASSES.themePrefix}${customCloudProps.cloud}`)).to.be.true;
			expect(component.hasClass(`${COMPONENT_CSS_CLASSES.themePrefix}${customThemeProps.theme}`)).to.be.true;
		});
	});

	describe('Optional Region Structure', () => {
		const props = propSets.base.props;

		const buttonClicked = () => {};
		const linkClicked = () => {};
		const dropdownItemClicked = () => {};

		beforeEach(mountComponent(
			<GlobalNavigationBar {...props}>
				<GlobalNavigationBarRegion
					region="primary"
				/>
				<GlobalNavigationBarRegion
					region="primary"
					dividerPosition={null}
				/>
				<GlobalNavigationBarRegion region="secondary" navigation dividerPosition="right">
					<GlobalNavigationBarLink
						href="#"
						label="Home"
						id="home-link"
						onClick={linkClicked('Home link clicked')}
					/>
					<GlobalNavigationBarDropdown
						id="primaryDropdown"
						label="Global Navigation Menu Item 1"
						onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
						options={dropdownCollection}
					/>
					<GlobalNavigationBarLink
						active
						href="#"
						id="menu-item-2"
						label="Global Navigation Menu Item 2"
						onClick={linkClicked('Link clicked')}
					/>
					<GlobalNavigationBarDropdown
						active
						id="primaryDropdownActive"
						label="Global Navigation Menu Item 3"
						onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
						options={dropdownCollection}
					/>
				</GlobalNavigationBarRegion>
				<GlobalNavigationBarRegion region="tertiary">
					<GlobalNavigationBarLink
						href="#"
						label="Actions"
						onClick={linkClicked('Link clicked')}
					/>
					<GlobalNavigationBarButton
						label="Button"
						id="global-nav__button"
						onClick={buttonClicked('Button clicked')}
					/>
					<GlobalNavigationBarButton
						active
						label="Button"
						id="global-nav__button_active"
						onClick={buttonClicked('Button clicked')}
					/>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		));

		afterEach(unmountComponent);

		it('has 2 primary, 1 secondary, and 1 tertiary region', function () {
			const primary = this.wrapper.find(`.${REGION_CSS_CLASSES.primary}`);
			expect(primary).to.have.length(2);

			const secondary = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(secondary).to.have.length(1);

			const tertiary = this.wrapper.find(`.${REGION_CSS_CLASSES.tertiary}`);
			expect(tertiary).to.have.length(1);
		});

		it('First primary region in example has divider on right by default, second primary region does not', function () {
			const primary = this.wrapper.find(`.${REGION_CSS_CLASSES.primary}`);
			expect(primary.nodes[0].className).to.include('slds-context-bar__item--divider-right');
			expect(primary.nodes[1].className).to.not.include('slds-context-bar__item--divider-right');
		});

		it('Secondary region application is a nav HTML element and has divider on right side', function () {
			const nav = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.type()).to.equal('nav');
			expect(nav.node.className).to.include('slds-context-bar__item--divider-right');
		});

		it('displays active items as active', function () {
			const activeItems = this.wrapper.find('.slds-is-active');
			expect(activeItems).to.have.length(3);
		});
	});

	describe('Secondary Region', () => {
		beforeEach(mountComponent(
			<GlobalNavigationBarRegion region="secondary" />
		));

		afterEach(unmountComponent);

		it('Secondary region application is div and not a nav', function () {
			const nav = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.type()).to.equal('div');
		});
	});

	// TODO still need Dropdown covered. Should be added to Dropdown tests, once special context bar dropdown features are merged into Dropdown

	describe('GlobalNavigationLink child component', () => {
		let linkClicked;
		let link;

		beforeEach(function () {
			linkClicked = sinon.spy();
			const instance = (
				<GlobalNavigationBarLink
					href="http://google.com"
					label="Home"
					id="home-link"
					onClick={linkClicked('Home link clicked')}
				/>
			);
			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			link = this.wrapper.find('#home-link');
		});

		afterEach(function () {
			this.wrapper.unmount();
		});

		it('GlobalNavigationBarLink has attributes and onClick runs callback', function () {
			expect(link.text()).to.equal('Home');
			link.simulate('click');
			expect(linkClicked.calledOnce).to.be.true;
		});

		it('renders href if passed', () => {
			expect(link).to.have.attr('href', 'http://google.com');
		});
	});

	describe('GlobalNavigationButton child component', () => {
		it('GlobalNavigationBarButton has attributes and onClick runs callback', function () {
			const buttonClicked = sinon.spy();
			const instance = (
				<GlobalNavigationBarButton
					label="Button"
					id="global-nav__button"
					onClick={buttonClicked('Button clicked')}
				/>
			);
			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			const link = this.wrapper.find('#global-nav__button');
			expect(link.text()).to.equal('Button');
			link.simulate('click');
			expect(buttonClicked.calledOnce).to.be.true;

			this.wrapper.unmount();
		});
	});
});
