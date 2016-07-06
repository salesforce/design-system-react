/* global describe, beforeEach, afterEach, it, sinon */
/* eslint-disable no-unused-expressions */

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
import GlobalNavigationBarAppLauncher from '../../components/global-navigation-bar/app-launcher';
import GlobalNavigationBarDropdown from '../../components/global-navigation-bar/dropdown';
import GlobalNavigationBarLink from '../../components/global-navigation-bar/link';

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
		const primaryRegionProps = propSets.base.primaryRegionProps;

		const appLauncherClicked = () => {};
		const linkClicked = () => {};
		const dropdownItemClicked = () => {};

		beforeEach(mountComponent(
			<GlobalNavigationBar {...props}>
				<GlobalNavigationBarRegion
					region="primary"
				>
					<GlobalNavigationBarAppLauncher
						{...primaryRegionProps.appLauncher}
						onClick={appLauncherClicked('Application name clicked (Open App Launcher).')}
					>
						{primaryRegionProps.appLauncher.customChild ? primaryRegionProps.appLauncher.customChild() : null}
					</GlobalNavigationBarAppLauncher>
				</GlobalNavigationBarRegion>
				<GlobalNavigationBarRegion region="secondary" navigation>
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
						href="#"
						label="Global Navigation Menu Item 2"
						onClick={linkClicked('Link clicked')}
					/>
				</GlobalNavigationBarRegion>
				<GlobalNavigationBarRegion region="tertiary">
					<GlobalNavigationBarLink
						href="#"
						label="Actions"
						onClick={linkClicked('Link clicked')}
					/>
				</GlobalNavigationBarRegion>
			</GlobalNavigationBar>
		));

		afterEach(unmountComponent);

		it('has a primary, secondary, and tertiary region', function () {
			const primary = this.wrapper.find(`.${REGION_CSS_CLASSES.primary}`);
			expect(primary).to.have.length(1);

			const secondary = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(secondary).to.have.length(1);

			const tertiary = this.wrapper.find(`.${REGION_CSS_CLASSES.tertiary}`);
			expect(tertiary).to.have.length(1);
		});

		it('Secondary region application is a nav HTML element', function () {
			const nav = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.type()).to.equal('nav');
		});

		it('primary has correct application name', function () {
			const appName = this.wrapper.find(`.${REGION_CSS_CLASSES.appName}`);
			expect(appName.text()).to.equal(primaryRegionProps.appLauncher.name);
		});
	});

	// TODO `noTruncate` prop is a style hack right now and should be revisited

	describe('AppLauncher Region', () => {
		it('AppLauncher has correct text on icon and onClick runs callback', function () {
			const primaryRegionProps = propSets.base.primaryRegionProps;

			const appLauncherClicked = sinon.spy();
			const instance = (
				<GlobalNavigationBarRegion
					region="primary"
				>
					<GlobalNavigationBarAppLauncher
						onClick={appLauncherClicked('Application name clicked (Open App Launcher).')}
						{...primaryRegionProps.appLauncher}
					/>
				</GlobalNavigationBarRegion>
			);

			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			const appLauncherIcon = this.wrapper.find(`#${primaryRegionProps.appLauncher.id}`);
			expect(appLauncherIcon.text()).to.equal(primaryRegionProps.appLauncher.assistiveText);
			appLauncherIcon.simulate('click');
			expect(appLauncherClicked.calledOnce).to.be.true;

			this.wrapper.unmount();
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

	// you'd never actually do this, it's for code coverage
	describe('Empty Region', () => {
		beforeEach(mountComponent(
			<GlobalNavigationBarRegion />
		));

		afterEach(unmountComponent);

		it('Empty region returns null', function () {
			const region = this.wrapper;
			expect(region.html()).to.equal(null);
		});
	});

	// // TODO still need Dropdown covered. Should be added to Dropdown tests, once special context bar dropdown features are merged into Dropdown

	describe('GlobalNavigationLink child component', () => {
		it('GlobalNavigationBarLink has attributes and onClick runs callback', function () {
			const linkClicked = sinon.spy();
			const instance = (
				<GlobalNavigationBarLink
					label="Home"
					id="home-link"
					onClick={linkClicked('Home link clicked')}
				/>
			);
			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			const link = this.wrapper.find('#home-link');
			expect(link.text()).to.equal('Home');
			link.simulate('click');
			expect(linkClicked.calledOnce).to.be.true;

			this.wrapper.unmount();
		});
	});
});
