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
import { dropdownCollection, propSets } from '../../utilities/sample-data/context-bar';

import ContextBar, { cssClasses as componentCssClasses } from '../../components/context-bar';
import ContextBarRegion, { cssClasses as regionCssClasses } from '../../components/context-bar/region';
import ContextBarDropdown from '../../components/context-bar/dropdown';
import ContextBarLink from '../../components/context-bar/link';

chai.use(chaiEnzyme());

describe('Context Bar: ', () => {
	// Base defaults
	// no required props

	/*
		Tests
	 */
	describe('Default Structure', () => {
		beforeEach(mountComponent(
			<ContextBar />
		));

		afterEach(unmountComponent);

		it('has wrapping div', function () {
			const component = this.wrapper.find(`.${componentCssClasses.base}`);
			expect(component).to.have.length(1);
		});
	});

	describe('Optional Properties', () => {
		const customCloudProps = propSets.customCloud.props;
		const customThemeProps = propSets.lightTheme.props;

		beforeEach(mountComponent(
			<ContextBar {...customCloudProps} {...customThemeProps} />
		));

		afterEach(unmountComponent);

		it('has custom cloud and theme CSS', function () {
			const component = this.wrapper.find(`.${componentCssClasses.base}`);
			expect(component.hasClass(`${componentCssClasses.themePrefix}${customCloudProps.cloud}`)).to.be.true;
			expect(component.hasClass(`${componentCssClasses.themePrefix}${customThemeProps.theme}`)).to.be.true;
		});
	});

	describe('Optional Region Structure', () => {
		const props = propSets.base.props;
		const primaryRegionProps = propSets.base.primaryRegionProps;

		const applicationNameClicked = () => {};
		const linkClicked = () => {};
		const dropdownItemClicked = () => {};
		
		beforeEach(mountComponent(
			<ContextBar {...props}>
				<ContextBarRegion
					region="primary"
					applicationNameOnClick={applicationNameClicked('Application name clicked (Open Application Switcher).')}
					{...primaryRegionProps}
				/>
				<ContextBarRegion region="secondary" navigation>
					<ContextBarLink
						href="#"
						label="Home"
						id="home-link"
						onClick={linkClicked('Home link clicked')}
					/>
					<ContextBarDropdown
						id="primaryDropdown"
						label="Context Menu Item 1"
						onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
						options={dropdownCollection}
					/>
					<ContextBarLink
						href="#"
						label="Context Menu Item 2"
						onClick={linkClicked('Link clicked')}
					/>
				</ContextBarRegion>
				<ContextBarRegion region="tertiary">
					<ContextBarLink
						href="#"
						label="Actions"
						onClick={linkClicked('Link clicked')}
					/>
				</ContextBarRegion>
			</ContextBar>
		));

		afterEach(unmountComponent);

		it('has a primary, secondary, and tertiary region', function () {
			const primary = this.wrapper.find(`.${regionCssClasses.primary}`);
			expect(primary).to.have.length(1);

			const secondary = this.wrapper.find(`.${regionCssClasses.secondary}`);
			expect(secondary).to.have.length(1);

			const tertiary = this.wrapper.find(`.${regionCssClasses.tertiary}`);
			expect(tertiary).to.have.length(1);
		});

		it('Secondary region application is a nav HTML element', function () {
			const nav = this.wrapper.find(`.${regionCssClasses.secondary}`);
			expect(nav.type()).to.equal('nav');
		});

		it('primary has an application switcher and correct application name', function () {
			const appSwitcher = this.wrapper.find('#app-switcher');
			expect(appSwitcher).to.have.length(1);

			const appName = this.wrapper.find(`.${regionCssClasses.appName}`);
			expect(appName.text()).to.equal(primaryRegionProps.applicationName);
		});
	});

	// TODO `truncate` prop is a style hack right now and should be revisited

	describe('Primary Region', () => {
		it('Primary region application name onClick runs callback', function () {
			const primaryRegionProps = propSets.base.primaryRegionProps;

			const applicationNameClicked = sinon.spy();
			const instance = (
				<ContextBarRegion
					region="primary"
					applicationNameOnClick={applicationNameClicked('Application name clicked (Open Application Switcher).')}
					{...primaryRegionProps}
				/>
			);
			this.wrapper = mount(instance, { attachTo: document.body.appendChild(document.createElement('div')) });
			const appName = this.wrapper.find(`.${regionCssClasses.appName}`);
			appName.simulate('click');
			expect(applicationNameClicked.calledOnce).to.be.true;

			this.wrapper.unmount();
		});
	});

	describe('Secondary Region', () => {
		beforeEach(mountComponent(
			<ContextBarRegion region="secondary" />
		));

		afterEach(unmountComponent);

		it('Secondary region application is div and not a nav', function () {
			const nav = this.wrapper.find(`.${regionCssClasses.secondary}`);
			expect(nav.type()).to.equal('div');
		});
	});

	// you'd never actually do this, it's for code coverage
	describe('Empty Region', () => {
		beforeEach(mountComponent(
			<ContextBarRegion />
		));

		afterEach(unmountComponent);

		it('Empty region returns null', function () {
			const region = this.wrapper;
			expect(region.html()).to.equal(null);
		});
	});

	// TODO still need Dropdown covered. Should be added to Dropdown tests, once special context bar dropdown features are merged into Dropdown

	describe('ContextLink child component', () => {
		it('ContextBarLink has attributes and onClick runs callback', function () {
			const linkClicked = sinon.spy();
			const instance = (
				<ContextBarLink
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
