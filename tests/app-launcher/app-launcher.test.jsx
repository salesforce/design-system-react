/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable max-len */

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, render, shallow, ReactWrapper } from 'enzyme';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const should = chai.should();

import { Icon } from '../../components';
import AppLauncher from '../../components/app-launcher';
import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';
import Search from '../../components/forms/input/search';
import Button from '../../components/button';
import Modal from '../../components/modal';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe.only('SLDS APP LAUNCHER *******************************************', () => {
	const mockCallback = sinon.spy();

	const defaultAppLauncherProps = {
		onSearch: mockCallback,
		isOpen: true
	};

	// const defaultTileProps = {
	// 	title: 'Marketing Cloud'
	// };

	// let body;

	// const renderInstance = instance => {
	// 	body = document.createElement('div');
	// 	document.body.appendChild(body);
	// 	return ReactDOM.render(instance, body);
	// };

	// function cleanDom () {
	// 	ReactDOM.unmountComponentAtNode(body);
	// 	document.body.removeChild(body);
	// }

	const createAppLauncher = (props) => React.createElement(
		AppLauncher,
		assign({}, defaultAppLauncherProps, props),
		<AppLauncherSection title="All Items">
			<AppLauncherTile title="Marketing Cloud" />
			<AppLauncherTile title="Support Cloud" />
		</AppLauncherSection>
	);

/* eslint-disable spaced-comment */
/*///////////////////////
//////// D O N E ////////
///////////////////////*/
// TILE -----
	// textIcon is wrapped in class '.slds-app-launcher__tile-figure'
	// tileBody span has class '.slds-text-link'
	// you can set the tile's title (equals)
	// tile body has app description (equals)
	// you can add a onClick callback
	// you can pass custom classNames to tile
	// you can pass a search string (equals)
	// tile name highlights search string
// TRUNCATED TILE
	// long tile body description has '…'
	// you can set the "more" link label
	// long tile body tooltip
	// tile tooltip highlights search string
// TEXT ICON ------
	// textIcon has classes: slds-avatar slds-avatar--large slds-align--absolute-center
	// textIcon text "MC" is equal to "MC"
// ICON -----
	// tile can be passed an icon node
// SMALL TILE -------
	// small tile has class '.slds-app-launcher__tile--small'
	// small tile textIcon has class '.slds-app-launcher__tile-figure--small'
	// small tile body has class '.slds-app-launcher__tile-body--small'
	// small tileBody span has class 'slds-truncate'
	// small tile search highlights title
	// small tile body only has app title
// APP LAUNCHER -----
	// can set modal header title (prop: title)
	// modal header has h2 with class '.slds-text-heading--medium'
	// app launcher search has id '#app-launcher-search'
	// modal header has search bar with class ".slds-app-launcher__header-search"
	// modal header has button with classes: slds-button slds-button--neutral
// SECTION ------
	// open section has class '.slds-is-open'
	// section title has class '.slds-section__title'
	// section content has <ul> with classes: slds-grid slds-grid--pull-padded slds-wrap
/*///////////////////////
//////// T O D O ////////
///////////////////////*/
	// APP LAUNCHER -----
		// you can pass a Button `node` (prop: modalHeaderButton)
		// modalHeaderButton HAS to be a Button
		// you can pass a callback to App Launcher Icon (prop: triggerOnClick)
		// triggeronClick callback receives original event as an arg
		// you can pass a callback for when the modal is closed (prop: onClose)
		// onClose callback receives original event as an arg
		// modal header has classes: slds-app-launcher__header slds-grid slds-grid--align-spread slds-grid--vertical-align-center
		// you can pass a onSearch callback (prop: onSearch)
		// you can pass the initial open state (prop: isOpen)
		// if you pass a isOpen prop, you must control the component with it (this.state.isOpen will now work)
		// modal content has classes: slds-modal__content slds-app-launcher__content slds-p-around--medium
		// openAppLauncher callback
		// you can pass the app launcher's children (prop: children)
		// you can set the search input's assistive text (prop: triggerAssistiveText)
		// you can set the search input's placeholder text (prop: searchPlaceholderText)
	// SECTION ------
		// each tile is wrapped in <li> with classes: slds-col--padded slds-grow-none slds-size--1-of-1 slds-medium-size--1-of-3
		// closed section has class '.slds-is-close'
		// section has title has h3 with text (equals)
		// section has 'toggle' button with classes: slds-button slds-button--icon slds-m-right--small
		// section toggle button has assistive text '.slds-assistive-text' (equals)
		// section can be passed children
		// you can pass an onClick callback to section toggle
		// you can pass initial open state (prop: isOpen)
	// APP LAUNCHER ICON -----
		// waffle icon has class slds-context-bar__icon-action
		// waffle icon link has classes: slds-button slds-button--icon slds-context-bar__button
		// waffle icon svg has classes: lds-button__icon slds-button__icon--large
		// you can set the assistive text for waffle icon (prop: triggerAssistiveText)
		// you can pass a callback for icon click
		// small tiles inclues slds-size--xx-small class on section

/* eslint-enable spaced-comment */

	describe('App Launcher', () => {
		let appLauncher;
		let modal;

		beforeEach(() => {
			appLauncher = mount(createAppLauncher({
				search: <Search assistiveText="Find an app" />,
				modalHeaderButton: <Button label="App Exchange" />,
				title: 'App Launcher',
				triggerAssistiveText: 'Custom Icon Assistive Text'
			}));

			// https://www.dropbox.com/s/0a5lukwoxbatx8l/Screenshot%202016-08-10%2012.57.59.png?dl=0
			const portal = appLauncher.node._reactInternalInstance._renderedComponent._renderedChildren['.1']._renderedComponent._instance.portal; // eslint-disable-line no-underscore-dangle

			// Wrap the modal portal in an Enzyme wrapper
			modal = new ReactWrapper(portal, portal);
		});

		afterEach(() => {
			// Removes the modal container element from the bottom of the DOM, this will prevent the 'setState' errors
			// modal.parentNode.removeChild(modalWrapper);
			// cleanDom();
		});

		it('modal exists', () => {
			console.log(modal.find(Search));
			should.exist(modal);
		});

		// it('modal renders `modalHeaderButton`', () => {
		// 	console.log(modal.find(Button));
		// });

		// it('app launcher title can be set', () => {
			// console.log(document);
// console.log(modal.contains(<h2 className="slds-text-heading--medium">App Rocket</h2>));
// console.log(wrapper.html());
// console.log(modal.html());
// debugger;
			// const appLauncherTitle = modal.find('h2');
			// expect(appLauncherTitle.className).to.include('slds-text-heading--medium');
			// expect(appLauncherTitle.textContent).to.equal('App Rocket');
		// });

// 		it('app laucher search bar exists', () => {
// 			should.exist(document.querySelectorAll('.slds-app-launcher__header-search'));
// 		});

// 		it('renders app launcher header button', () => {
// 			should.exist(document.querySelectorAll('.slds-button'));
// 		});

// 		it('modal content exists', () => {
// 			should.exist(document.querySelectorAll('.slds-modal__content'));
// 		});

// 		it('app laucher button has proper classes', () => {
// 			should.exist(document.querySelectorAll('.slds-button .slds-button--neutral'));
// 		});

		// it('enzyme shallow works', () => {
		// 	// const wrapper = shallow(modalWrapper);
		// 	const wrapper = shallow(createAppLauncher({
		// 		search: <Search assistiveText="Find an app" />,
		// 		modalHeaderButton: <Button label="App Exchange" />,
		// 		title: 'App Rocket',
		// 		triggerAssistiveText: 'Custom Icon Assistive Text'
		// 	}));

		// 	console.log(wrapper.find(Modal));
		// 	// const wrapper = shallow(createAppLauncher());
		// 	// console.log(wrapper);
		// });

		// it('enzyme mount works', () => {
		// 	const wrapper = mount(createAppLauncher({
		// 		search: <Search assistiveText="Find an app" />,
		// 		modalHeaderButton: <Button label="App Exchange" />,
		// 		title: 'App Rocket',
		// 		triggerAssistiveText: 'Custom Icon Assistive Text'
		// 	}));

		// 	// const wrapper = shallow(createAppLauncher());
		// 	console.log(wrapper.html());
		// });
	});
});
