/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable max-len */

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const should = chai.should();

import { Icon } from '../../components';
import AppLauncher from '../../components/app-launcher';
import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe('SLDS APP LAUNCHER *******************************************', () => {
	const mockCallback = sinon.spy();

	const defaultAppLauncherProps = {
		onSearch: mockCallback,
		isOpen: true
	};

	const defaultTileProps = {
		title: 'Marketing Cloud'
	};

	let body;

	const renderInstance = instance => {
		body = document.createElement('div');
		document.body.appendChild(body);
		return ReactDOM.render(instance, body);
	};

	function cleanDom () {
		ReactDOM.unmountComponentAtNode(body);
		document.body.removeChild(body);
	}

	const createTile = (props) => React.createElement(AppLauncherTile, assign({}, defaultTileProps, props));
	const renderTile = (props) => renderInstance(createTile(props));

	const createAppLauncher = (props) => React.createElement(
		AppLauncher,
		assign({}, defaultAppLauncherProps, props),
		<AppLauncherSection title="All Items">
			<AppLauncherTile title="Marketing Cloud" />
			<AppLauncherTile title="Support Cloud" />
		</AppLauncherSection>
	);

	const renderAppLauncher = (props) => renderInstance(createAppLauncher(props));


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
		// you can set the search input's placeholder text (prop: searchPlaceholderText)
		// you can set the search input's assistive text (prop: triggerAssistiveText)
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

	describe('Default App Launcher Tile', () => {
		let component;
		let tileWrapper;
		let tileBody;
		let tileBodyTitle;
		let tileBodyDescription;

		beforeEach(() => {
			component = renderTile({
				title: 'Support Cloud',
				description: 'Fluffy support',
				onClick: mockCallback,
				className: 'this-is-a-custom-class',
				search: 'upport'
			});
			tileWrapper = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile');
			tileBody = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile-body');
			tileBodyTitle = tileBody.getElementsByTagName('span')[0];
			tileBodyDescription = tileBody.getElementsByTagName('div')[0];
		});

		afterEach(() => {
			cleanDom();
		});

		it('tile wrapper has proper classes', () => {
			should.exist(tileWrapper);
			expect(tileWrapper.className).to.include('slds-text-link--reset');
		});

		it('tile body exists', () => {
			should.exist(tileBody);
		});

		it('tile body has title span with proper classes', () => {
			expect(tileBodyTitle.className).to.include('slds-text-link');
		});

		it('tile body title can be set', () => {
			expect(tileBodyTitle.textContent).to.equal('Support Cloud');
		});

		it('app description can be set', () => {
			expect(tileBodyDescription.textContent).to.equal('Fluffy support');
		});

		it('onClick callback can be passed', () => {
			TestUtils.Simulate.click(tileWrapper);
			/* eslint-disable no-unused-expressions */
			expect(mockCallback.calledOnce).to.be.true;
			/* eslint-enable no-unused-expressions */
		});

		it('tile can be passed custom className', () => {
			expect(tileWrapper.className).to.include('this-is-a-custom-class');
		});

		it('tile can be passed a search string', () => {
			expect(component.props.search).to.equal('upport');
		});

		it('search string highlights title', () => {
			const mark = tileBody.getElementsByTagName('mark')[0];

			expect(mark.textContent).to.equal('upport');
		});
	});

	describe('App Launcher Tile with Truncated Text', () => {
		let component;
		let tileBody;
		let tileBodyDescription;
		let moreTooltipButton;

		beforeEach(() => {
			component = renderTile({
				title: 'Call Center',
				description: 'The key to call center and contact center is not to use too many words! And we will add some more words until we reach the limit. And then we will add some more words just to make sure this works on all screensizes. What I should have done is wrap this in a class to set the width, but this is faster. The key to call center and contact center is not to use too many words! And we will add some more words until we reach the limit. And then we will add some more words just to make sure this works on all screensizes. What I should have done is wrap this in a class to set the width, but this is faster.',
				moreLabel: 'MORE!',
				search: 'enter'
			});
			tileBody = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile-body');
			tileBodyDescription = tileBody.getElementsByTagName('div')[0];
			moreTooltipButton = findRenderedDOMComponentWithClass(component, 'slds-button');
		});

		afterEach(() => {
			cleanDom();
		});

		it('long descriptions get truncated', () => {
			const etcIndex = tileBodyDescription.textContent.indexOf('…');
			expect(etcIndex).to.not.equal(-1);
		});

		it('tile can be passed a label for expanding truncation', () => {
			const moreText = moreTooltipButton.getElementsByTagName('span')[0];
			expect(moreText.textContent).to.equal('MORE!');
		});

		it('long descriptions use Tooltip activated by hover', () => {
			Simulate.mouseEnter(moreTooltipButton, {});
			/* eslint-disable no-unused-expressions */
			expect(findRenderedDOMComponentWithClass(component, 'drop-target')).to.be.ok;
			/* eslint-enable no-unused-expressions */
		});

		it('search string highlights tooltip content', () => {
			const mark = moreTooltipButton.getElementsByTagName('mark')[0];
			expect(mark.textContent).to.equal('enter');
		});
	});

	describe('App Launcher Tile with Text Icon', () => {
		let component;
		let iconWrapper;

		beforeEach(() => {
			component = renderTile({
				title: 'Call Center',
				iconText: 'CC',
				description: 'Call center and contact center.'
			});
			iconWrapper = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile-figure');
		});

		afterEach(() => {
			cleanDom();
		});

		it('text icon wrapper has proper classes', () => {
			expect(iconWrapper.getElementsByTagName('span')[0].className).to.include('slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27');
		});

		it('tile can be passed a custon text icon', () => {
			expect(iconWrapper.textContent).to.equal('CC');
		});
	});

	describe('App Launcher Tile with Icon Node', () => {
		let component;
		let iconWrapper;
		const icon = <Icon name="campaign" category="standard" size="large" />;

		beforeEach(() => {
			component = renderTile({
				title: 'Call Center',
				iconNode: icon,
				description: 'Call center and contact center.'
			});
			iconWrapper = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile-figure');
		});

		afterEach(() => {
			cleanDom();
		});

		it('tile can be passed <Icon> node for icon', () => {
			expect(iconWrapper.getElementsByTagName('span')[0].className).to.include('slds-icon_container slds-icon-standard-campaign');
		});
	});

	describe('Small App Launcher Tile', () => {
		let component;
		let tileWrapper;
		let iconWrapper;
		let tileBody;

		beforeEach(() => {
			component = renderTile({
				title: 'Support Cloud',
				iconText: 'SC',
				size: 'small',
				description: 'This is the app description',
				search: 'upport'
			});
			tileWrapper = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile');
			iconWrapper = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile-figure');
			tileBody = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__tile-body');
		});

		afterEach(() => {
			cleanDom();
		});

		it('small tile wrapper has proper classes', () => {
			expect(tileWrapper.className).to.include('slds-app-launcher__tile--small');
		});

		it('small tile icon wrapper has proper classes', () => {
			expect(iconWrapper.className).to.include('slds-app-launcher__tile-figure--small');
		});

		it('small tile body has proper classes', () => {
			expect(tileBody.className).to.include('slds-app-launcher__tile-body--small');
		});

		it('small tile body has <p> tag with truncate class', () => {
			expect(tileBody.getElementsByTagName('p')[0].className).to.include('slds-truncate');
		});

		it('search string highlights title', () => {
			const mark = tileBody.getElementsByTagName('mark')[0];
			expect(mark.textContent).to.equal('upport');
		});

		it('small tile does not have app description', () => {
			expect(tileBody.textContent.indexOf('This is the app description')).to.equal(-1);
		});
	});

	describe('App Launcher', () => {
		let modalWrapper;

		beforeEach(() => {
			renderAppLauncher({
				title: 'App Rocket',
				triggerAssistiveText: 'Custom Icon Assistive Text'
			});
			modalWrapper = document.documentElement.querySelectorAll('.ReactModalPortal .slds-modal')[0];
		});

		afterEach(() => {
			cleanDom();
		});

		it('modal exists', () => {
			should.exist(modalWrapper);
		});

		it('app launcher title can be set', () => {
			const appLauncherTitle = modalWrapper.getElementsByTagName('h2')[0];
			expect(appLauncherTitle.className).to.include('slds-text-heading--medium');
			expect(appLauncherTitle.textContent).to.equal('App Rocket');
		});

		it('app laucher search bar exists', () => {
			should.exist(document.querySelectorAll('.slds-app-launcher__header-search'));
		});

		it('app laucher search bar has proper id', () => {
			should.exist(document.getElementById('app-launcher-search'));
		});

		it('modal content exists', () => {
			should.exist(document.querySelectorAll('.slds-modal__content'));
		});

		it('app laucher button has proper classes', () => {
			should.exist(document.querySelectorAll('.slds-button .slds-button--neutral'));
		});
	});

	describe('App Launcher Section', () => {
		let modalSection;

		beforeEach(() => {
			renderAppLauncher({
				title: 'App Rocket',
				triggerAssistiveText: 'Custom Icon Assistive Text'
			});
			modalSection = document.documentElement.querySelectorAll('.slds-section')[0];
		});

		afterEach(() => {
			cleanDom();
		});

		it('modal section exists', () => {
			should.exist(modalSection);
		});

		it('modal section has "slds-is-open" class when open', () => {
			expect(modalSection.className).to.include('slds-is-open');
		});

		it('section has a title', () => {
			should.exist(document.querySelectorAll('.slds-section__title'));
		});

		it('ul has proper classes', () => {
			const ul = modalSection.getElementsByTagName('ul')[0];
			should.exist(ul);
			expect(ul.className).to.include('slds-grid slds-grid--pull-padded slds-wrap');
		});

		it('li exists', () => {
			const li = modalSection.getElementsByTagName('li')[0];
			should.exist(li);
		});
	});
});
