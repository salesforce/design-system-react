import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

// `this.wrapper` and `this.dom` is set in the helpers file
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

// sample props and children
import {
	dropdownCollection,
	propSets,
} from '../../../utilities/sample-data/global-navigation-bar';

import IconSettings from '../../icon-settings';
import GlobalNavigationBar from '../../global-navigation-bar';
import GlobalNavigationBarRegion from '../../global-navigation-bar/region';
import GlobalNavigationBarDropdown from '../../global-navigation-bar/dropdown';
import GlobalNavigationBarDropdownTrigger from '../../global-navigation-bar/dropdown-trigger';
import GlobalNavigationBarLink from '../../global-navigation-bar/link';
import GlobalNavigationBarLabel from '../../global-navigation-bar/label';
import GlobalNavigationBarButton from '../../global-navigation-bar/button';

chai.use(chaiEnzyme());

const COMPONENT_CSS_CLASSES = {
	base: 'slds-context-bar',
	themePrefix: 'slds-context-bar_theme-',
};

const REGION_CSS_CLASSES = {
	primary: 'slds-context-bar__primary',
	secondary: 'slds-context-bar__secondary',
	tertiary: 'slds-context-bar__tertiary',
	appName: 'slds-context-bar__app-name',
};

describe('Global Navigation Bar: ', () => {
	// Base defaults
	// no required props

	/*
		Tests
	 */
	describe('Default Structure', () => {
		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar>
						<GlobalNavigationBarRegion region="primary" />
					</GlobalNavigationBar>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('has wrapping div and one primary region', function () {
			expect(
				this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`)
			).to.be.present();
			expect(
				this.wrapper.find(`.${REGION_CSS_CLASSES.primary}`)
			).to.be.present();
		});

		it('Primary region DOES NOT have divider on right', function () {
			const primary = this.wrapper.find(`.${REGION_CSS_CLASSES.primary}`);
			expect(primary).to.not.have.className(
				'slds-context-bar__item_divider-right'
			);
		});
	});

	describe('Optional Properties', () => {
		const customCloudProps = propSets.customCloud.props;
		const customThemeProps = propSets.lightTheme.props;

		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar {...customCloudProps} {...customThemeProps} />
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('has custom cloud and theme CSS', function () {
			const component = this.wrapper.find(`.${COMPONENT_CSS_CLASSES.base}`);
			expect(component).to.have.className(
				`${COMPONENT_CSS_CLASSES.themePrefix}${customCloudProps.cloud}`
			);
			expect(component).to.have.className(
				`${COMPONENT_CSS_CLASSES.themePrefix}${customThemeProps.theme}`
			);
		});
	});

	describe('Optional Region Structure', () => {
		const { props } = propSets.base;

		const buttonClicked = () => {};
		const linkClicked = () => {};
		const dropdownItemClicked = () => {};

		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBar {...props}>
						<GlobalNavigationBarRegion region="primary" />
						<GlobalNavigationBarRegion
							region="secondary"
							navigation
							dividerPosition="right"
						>
							<GlobalNavigationBarLink
								label="Home"
								id="home-link"
								onClick={linkClicked('Home link clicked')}
							/>
							<GlobalNavigationBarDropdown
								assistiveText={{ icon: 'Open Menu' }}
								id="primaryDropdown"
								label="Global Navigation Menu Item 1"
								onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
								options={dropdownCollection}
							/>
							<GlobalNavigationBarLink
								active
								id="menu-item-2"
								label="Global Navigation Menu Item 2"
								onClick={linkClicked('Link clicked')}
							/>
							<GlobalNavigationBarDropdown
								active
								assistiveText={{ icon: 'Open Menu' }}
								id="primaryDropdownActive"
								label="Global Navigation Menu Item 3"
								onSelect={dropdownItemClicked('Dropdown Menu Item clicked')}
								options={dropdownCollection}
							/>
						</GlobalNavigationBarRegion>
						<GlobalNavigationBarRegion region="tertiary">
							<GlobalNavigationBarLink
								label="Actions"
								onClick={linkClicked('Link clicked')}
							/>
							<GlobalNavigationBarButton
								active
								label="Button"
								id="global-nav__button"
								onClick={buttonClicked('Button clicked')}
							/>
							<GlobalNavigationBarLabel
								dividerPosition="left"
								label="Vandelay Enterprises"
							/>
						</GlobalNavigationBarRegion>
					</GlobalNavigationBar>
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('has 1 primary, 1 secondary, and 1 tertiary region', function () {
			expect(
				this.wrapper.find(`.${REGION_CSS_CLASSES.primary}`)
			).to.be.present();
			expect(
				this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`)
			).to.be.present();
			expect(
				this.wrapper.find(`.${REGION_CSS_CLASSES.tertiary}`)
			).to.be.present();
		});

		it('Secondary region application is a nav HTML element and has divider on right side', function () {
			const nav = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.type()).to.equal('nav');
			expect(nav).to.have.className('slds-context-bar__item_divider-right');
		});

		it('displays active items as active', function () {
			const activeItems = this.wrapper.find('.slds-is-active');
			expect(activeItems).to.have.length(3);
		});
	});

	describe('Secondary Region', () => {
		beforeEach(
			mountComponent(
				<IconSettings iconPath="/assets/icons">
					<GlobalNavigationBarRegion region="secondary" />
				</IconSettings>
			)
		);

		afterEach(unmountComponent);

		it('Secondary region application is div and not a nav', function () {
			const nav = this.wrapper.find(`.${REGION_CSS_CLASSES.secondary}`);
			expect(nav.type()).to.equal('div');
		});
	});

	describe('GlobalNavigationDropdown child component', () => {
		let dropdown;
		let eventTest;

		const eventHandler = (option, moreData) => {
			eventTest = { option, moreData };
		};

		beforeEach(function () {
			mountComponent(
				<GlobalNavigationBarDropdown
					dividerPosition="left"
					label="Test"
					onSelect={eventHandler}
					options={dropdownCollection}
				/>
			).call(this);

			dropdown = this.wrapper.find('.slds-context-bar__dropdown-trigger');
			eventTest = null;
		});

		afterEach(unmountComponent);

		it('calls onSelect handler properly', function () {
			dropdown.find('button.slds-context-bar__button').simulate('click');
			this.wrapper
				.find('.slds-dropdown ul.dropdown__list')
				.childAt(0)
				.find('a')
				.simulate('click');
			expect(typeof eventTest.option).to.eql('object');
			expect(typeof eventTest.moreData).to.eql('object');
		});

		it('renders divider as expected', function () {
			expect(dropdown.hasClass('slds-context-bar__item_divider-left')).to.eql(
				true
			);
		});
	});

	describe('GlobalNavigationDropdownTrigger child component', () => {
		let dropdownTrigger;
		let eventTest;

		const eventHandler = (event, data) => {
			eventTest = { event, data };
		};

		beforeEach(function () {
			mountComponent(
				<GlobalNavigationBarDropdownTrigger
					dividerPosition="left"
					label="Test"
					onBlur={eventHandler}
					onClick={eventHandler}
					onFocus={eventHandler}
					onKeyDown={eventHandler}
					onMouseDown={eventHandler}
					onMouseEnter={eventHandler}
					onMouseLeave={eventHandler}
				/>
			).call(this);

			dropdownTrigger = this.wrapper.find(
				'.slds-context-bar__dropdown-trigger'
			);
			eventTest = null;
		});

		afterEach(unmountComponent);

		it('has appropriate attributes', function () {
			expect(dropdownTrigger.text()).to.equal('TestOpen menu item submenu');
		});

		it('calls onClick handler properly', function () {
			dropdownTrigger.simulate('click');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onBlur handler properly', function () {
			dropdownTrigger.simulate('blur');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onFocus handler properly', function () {
			dropdownTrigger.simulate('focus');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onKeyDown handler properly', function () {
			dropdownTrigger.simulate('keydown', { keyCode: 13 });
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onMouseDown handler properly', function () {
			dropdownTrigger.simulate('mousedown');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onMouseEnter handler properly', function () {
			dropdownTrigger.simulate('mouseenter');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onMouseLeave handler properly', function () {
			dropdownTrigger.simulate('mouseleave');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('renders divider as expected', function () {
			expect(
				dropdownTrigger.hasClass('slds-context-bar__item_divider-left')
			).to.eql(true);
		});
	});

	describe('GlobalNavigationLink child component', () => {
		let aTag;
		let eventTest;
		let link;

		const eventHandler = (event, data) => {
			eventTest = { event, data };
		};

		beforeEach(function () {
			mountComponent(
				<GlobalNavigationBarLink
					dividerPosition="left"
					href="http://google.com"
					label="Home"
					id="home-link"
					onBlur={eventHandler}
					onClick={eventHandler}
					onFocus={eventHandler}
					onKeyDown={eventHandler}
					onKeyPress={eventHandler}
					onKeyUp={eventHandler}
					onMouseEnter={eventHandler}
					onMouseLeave={eventHandler}
				/>
			).call(this);

			link = this.wrapper.find('li#home-link');
			aTag = link.find('a');
			eventTest = null;
		});

		afterEach(unmountComponent);

		it('has appropriate attributes', function () {
			expect(link.text()).to.equal('Home');
		});

		it('calls onClick handler properly', function () {
			aTag.simulate('click');
			expect(typeof eventTest.event).to.eql('object');
			expect(typeof eventTest.data.href).to.eql('string');
		});

		it('calls onBlur handler properly', function () {
			aTag.simulate('blur');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onFocus handler properly', function () {
			aTag.simulate('focus');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onKeyDown handler properly', function () {
			aTag.simulate('keydown', { keyCode: 13 });
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onKeyPress handler properly', function () {
			aTag.simulate('keypress', { keyCode: 13 });
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onKeyUp handler properly', function () {
			aTag.simulate('keyup', { keyCode: 13 });
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onMouseEnter handler properly', function () {
			aTag.simulate('mouseenter');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('calls onMouseLeave handler properly', function () {
			aTag.simulate('mouseleave');
			expect(typeof eventTest.event).to.eql('object');
		});

		it('renders href if passed', () => {
			expect(link.find('a')).to.have.attr('href', 'http://google.com');
		});

		it('renders divider as expected', function () {
			expect(link.hasClass('slds-context-bar__item_divider-left')).to.eql(true);
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
			this.wrapper = mount(instance, {
				attachTo: document.body.appendChild(document.createElement('div')),
			});
			const link = this.wrapper.find('button#global-nav__button');
			expect(link.text()).to.equal('Button');
			link.simulate('click');
			expect(buttonClicked.calledOnce).to.be.true;

			this.wrapper.unmount();
		});
	});

	describe('GlobalNavigationLabel child component', () => {
		it('GlobalNavigationBarLabel has attributes and renders dividerPosition correctly', function () {
			const instance = (
				<GlobalNavigationBarLabel
					dividerPosition="right"
					label="Text"
					id="test-text"
				/>
			);
			this.wrapper = mount(instance, {
				attachTo: document.body.appendChild(document.createElement('div')),
			});
			const item = this.wrapper.find('span#test-text');

			expect(
				this.wrapper
					.find('span.slds-context-bar__label-action')
					.hasClass('slds-context-bar__item_divider-right')
			).to.eql(true);
			expect(item.text()).to.equal('Text');

			this.wrapper.unmount();
		});
	});
});
