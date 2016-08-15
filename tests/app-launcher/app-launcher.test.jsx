/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable max-len */

import React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const should = chai.should();

import AppLauncher from '../../components/app-launcher';
import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';
import Search from '../../components/forms/input/search';
import Button from '../../components/button';

const {
	Simulate
} = TestUtils;

describe('SLDS APP LAUNCHER *******************************************', () => {
	const handles = {
		appLauncher: null,
		appLauncherIcon: null,
		modal: null
	};

	const defaultAppLauncherProps = {
		isOpen: true
	};

	const createAppLauncher = (props) => React.createElement(
		AppLauncher,
		assign({}, defaultAppLauncherProps, props),
		<AppLauncherSection title="All Items">
			<AppLauncherTile title="Marketing Cloud" />
			<AppLauncherTile title="Support Cloud" />
		</AppLauncherSection>
	);

	function mountAppLauncher (props) {
		handles.appLauncher = mount(createAppLauncher(props));

		handles.appLauncherIcon = handles.appLauncher.find('.slds-context-bar__icon-action');

		// https://www.dropbox.com/s/0a5lukwoxbatx8l/Screenshot%202016-08-10%2012.57.59.png?dl=0
		const portal = handles.appLauncher.node._reactInternalInstance._renderedComponent._renderedChildren['.1']._renderedComponent._instance.portal; // eslint-disable-line no-underscore-dangle
		// Wrap the modal portal in an Enzyme wrapper
		handles.modal = new ReactWrapper(portal, portal);
	}


	function cleanDom () {
		// Removes the modal container element from the bottom of the DOM, this will prevent the 'setState' errors
		// gotta be a better way to do this..
		const modalWrapper = document.documentElement.querySelectorAll('.ReactModalPortal')[0];

		if (modalWrapper) {
			modalWrapper.parentNode.removeChild(modalWrapper);
		}
	}

// ///////////////////////
// ////// T O D O ////////
// ///////////////////////
	// APP LAUNCHER -----
		// tabs?
		// if you pass a isOpen prop, you must control the component with it (this.state.isOpen will now work)
		// (#591, waiting on #590) modal content has classes: slds-modal__content slds-app-launcher__content slds-p-around--medium

	describe('App Launcher', () => {
		let onClose;

		beforeEach(() => {
			onClose = sinon.spy();

			mountAppLauncher({
				modalHeaderButton: <Button label="App Exchange" />,
				onClose,
				search: <Search assistiveText="Find an app" />,
				title: 'App Launcher!'
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders modal', () => {
			should.exist(handles.modal);
		});

		it('renders modal header', () => {
			should.exist(handles.modal.find('.slds-app-launcher__header'));
		});

		it('app launcher title can be set', () => {
			expect(
				handles.modal.contains(<h2 className="slds-text-heading--medium">App Launcher!</h2>)
			).to.equal(true);
		});

		it('renders search bar', () => {
			should.exist(handles.modal.find(Search));
		});

		it('renders search bar with proper class', () => {
			should.exist(handles.modal.find('.slds-app-launcher__header-search'));
		});

		it('renders `modalHeaderButton`', () => {
			should.exist(handles.modal.find(Button).at(1));
		});

		it('closing modal fires callback', () => {
			Simulate.click(handles.modal.find('.slds-modal__close').node);
			expect(onClose.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('close modal callback receives original event as arg', () => {
			Simulate.click(handles.modal.find('.slds-modal__close').node);
			expect(onClose.args.length).to.equal(1);
		});

		it('renders modal content', () => {
			should.exist(handles.modal.find('.slds-modal__content .slds-app-launcher__content .slds-p-around--medium'));
		});

		it('app launcher can be passed children', () => {
			should.exist(handles.modal.find('SLDSAppLauncherSection'));
			expect(handles.modal.find('SLDSAppLauncherTile').length).to.equal(2);
		});
	});

	describe('App Launcher Icon', () => {
		let triggerOnClick;

		beforeEach(() => {
			triggerOnClick = sinon.spy();

			mountAppLauncher({
				triggerAssistiveText: 'Custom Icon Assistive Text',
				triggerOnClick
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders App Launcer icon', () => {
			should.exist(handles.appLauncherIcon);
		});

		it('renders all App Launcher dots', () => {
			expect(handles.appLauncherIcon.find('.slds-icon-waffle').containsAllMatchingElements([
				<div className="slds-r1"></div>,
				<div className="slds-r2"></div>,
				<div className="slds-r3"></div>,
				<div className="slds-r4"></div>,
				<div className="slds-r5"></div>,
				<div className="slds-r6"></div>,
				<div className="slds-r7"></div>,
				<div className="slds-r8"></div>,
				<div className="slds-r9"></div>
			])).to.equal(true);
		});

		it('App Launcher Icon link has proper classes', () => {
			expect(handles.appLauncherIcon.find('a').node.className).to.include('slds-icon-waffle_container slds-context-bar__button');
		});

		it('clicking App Launcher Icon fires callback', () => {
			Simulate.click(handles.appLauncherIcon.find('a').node);
			expect(triggerOnClick.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('App Launcher Icon callback receives original event as arg', () => {
			Simulate.click(handles.appLauncherIcon.find('a').node);
			expect(triggerOnClick.args.length).to.equal(1);
		});

		it('renders assistive text from prop', () => {
			expect(handles.appLauncherIcon.find('.slds-assistive-text').text()).to.equal('Custom Icon Assistive Text');
		});
	});
});
