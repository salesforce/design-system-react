/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import { SLDSAppLauncher } from '../../components';
import AppLauncherTile from '../../components/app-launcher/tile';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe.only('SLDS APP LAUNCHER *******************************************', () => {

	const renderInstance = (instance) => function () {
		this.dom = document.createElement('div');
		document.body.appendChild(this.dom);
		this.component = ReactDOM.render(instance, this.dom);
	};

	function cleanDom () {
		ReactDOM.unmountComponentAtNode(this.dom);
		document.body.removeChild(this.dom);
	}

	const defaultAppLauncherProps = {
		onSearch: () => { true }
	};

	const defaultTileProps = {
	};

	const createTile = (props) => React.createElement(AppLauncherTile, assign({}, defaultTileProps, props));

	const renderTile = (props) => renderInstance(createTile(props));

	const createAppLauncher = (props) => React.createElement(
		SLDSAppLauncher,
		assign({}, defaultAppLauncherProps, props),
		createTile()
	);

	const renderAppLauncher = (props) => renderInstance(createAppLauncher(props));

	const getTileWrapper = dom => dom.querySelector('.slds-app-launcher__tile');

	const getTileIcon = dom => dom.querySelector('.slds-app-launcher__tile-figure');

	const getTileBody = dom => dom.querySelector('.slds-app-launcher__tile-body');

	const getSectionWrapper = dom => dom.querySelector('.slds-section');

	const getSectionContent = dom => dom.querySelector('.slds-section__content');

	const getAppLauncherWrapper = dom => dom.querySelector('.app-launcher');

	const getAppLauncherIconWrapper = dom => dom.querySelector('.slds-context-bar__icon-action');

	const getModalHeader = dom => dom.querySelector('.slds-modal__header');

	// TEXT ICON ------
		// textIcon is wrapped in class '.slds-app-launcher__tile-figure'
		// textIcon has classes: slds-avatar slds-avatar--large slds-align--absolute-center
		// textIcon text "MC" is equal to "MC"
	// ICON -----
		// tile can be passed an icon node
	// TILE -----
		// you can set the tile's title (equals)
		// tile body has app description (equals)
		// long tile body has "more" link
		// you can set the "more" link label
		// you can pass custom classNames to tile
		// you can add a onClick callback
		// long tile body description has '...'
		// long tile body tooltip
		// you can pass a search string (equals)
		// tile name highlights search string
		// tile tooltip highlights search string
	// SMALL TILE -------
		// small tile has class '.slds-app-launcher__tile--small'
		// small tile textIcon has class '.slds-app-launcher__tile-figure--small'
		// small tile body has class '.slds-app-launcher__tile-body--small'
		// small tile body only has app title
	// APP NAME --------
		// tileBody has span with App Name
		// tileBody span has class '.slds-text-link'
		// small tileBody span has class 'slds-truncate'
	// SECTION ------
		// open section has class '.slds-is-open'
		// closed section has class '.slds-is-close'
		// section title has class '.slds-section__title'
		// section has 'toggle' button with classes: slds-button slds-button--icon slds-m-right--small
		// section has title has h3 with text (equals)
		// section toggle button has assistive text '.slds-assistive-text' (equals)
		// section content has <ul> with classes: slds-grid slds-grid--pull-padded slds-wrap
		// each tile is wrapped in <li> with classes: slds-col--padded slds-grow-none slds-size--1-of-1 slds-medium-size--1-of-3
		// section can be passed children
		// you can pass an onClick callback to section toggle
		// you can pass initial open state (prop: isOpen)
	// APP LAUNCHER ICON -----
		// waffle icon has class slds-context-bar__icon-action
		// waffle icon link has classes: slds-button slds-button--icon slds-context-bar__button
		// waffle icon svg has classes: lds-button__icon slds-button__icon--large
		// you can set the assistive text for waffle icon (prop: appLauncherIconAssistiveText)
		// you can pass a callback for icon click
	// APP LAUNCHER -----
		// app launcher wrapper has attr: aria-hidden="false"
		// app launcher wrapper has attr: role="dialog"
		// app launcher wrapper has classes: slds-modal slds-fade-in-open slds-modal--large
		// modal header has classes: slds-app-launcher__header slds-grid slds-grid--align-spread slds-grid--vertical-align-center
		// modal header has h2 with class '.slds-text-heading--medium'
		// can set modal header title (prop: title)
		// modal header has search bar with class ".slds-app-launcher__header-search"
		// you can set the search input's assistive text
		// you can set the search input's placeholder text (prop: searchPlaceholderText)
		// app launcher search has id '#app-launcher-search'
		// modal header has button with classes: slds-button slds-button--neutral
		// you can set the buttons label (prop: buttonLabel)
		// you can pass an onClick function to the button (prop: buttonOnClick)
		// you can pass the app launcher's children (prop: children)
		// you can pass a onSearch callback (prop: onSearch)
		// you can pass the initial open state (prop: isOpen)
		// openAppLauncher callback
		// modal content has classes: slds-modal__content slds-app-launcher__content slds-p-around--medium


	describe('Structure', function () {
		beforeEach(renderTile());

		afterEach(cleanDom());

		it('renders static by default', function () {
			// const wrapper = getTileWrapper(this.dom);
			// const wrapper = getWrapper(this.dom);
			// const input = getInput(this.dom);
			// const staticElement = getStatic(this.dom);
			// const trigger = getTrigger(this.dom);
			true.to.be.true;
			// should.exist(wrapper);
			// should.not.exist(input);
			// should.exist(staticElement);
			// should.exist(trigger);
		});

		// it('renders the correct value', function () {
		// 	const staticElement = getStatic(this.dom);
		// 	const value = staticElement.querySelector('span').innerHTML;

		// 	value.should.be(sampleValue);
		// });
	});
});