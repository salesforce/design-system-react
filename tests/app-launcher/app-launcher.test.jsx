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

import { AppLauncher, Icon } from '../../components';
import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';

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

	// const createAppLauncher = (props) => React.createElement(
	// 	AppLauncher,
	// 	assign({}, defaultAppLauncherProps, props),
	// 	<AppLauncherSection title="All Items">
	// 		<AppLauncherTile title="asdf" />
	// 	</AppLauncherSection>
	// );

	const createAppLauncher = (props) => (
		<AppLauncher
			onSearch={mockCallback}
			isOpen
		>
			<AppLauncherSection title="All Items">
				<AppLauncherTile title="asdf" />
			</AppLauncherSection>
		</AppLauncher>
	);

	const renderAppLauncher = (props) => renderInstance(createAppLauncher(props));

	// /////

	// const getTileWrapper = dom => dom.querySelector('.slds-app-launcher__tile');

	// const getTileIcon = dom => dom.querySelector('.slds-app-launcher__tile-figure');

	// const getTileBody = dom => dom.querySelector('.slds-app-launcher__tile-body');

	// const getSectionWrapper = dom => dom.querySelector('.slds-section');

	// const getSectionContent = dom => dom.querySelector('.slds-section__content');

	// const getAppLauncherWrapper = dom => dom.querySelector('.app-launcher');

	// const getAppLauncherIconWrapper = dom => dom.querySelector('.slds-context-bar__icon-action');

	// const getModalHeader = dom => dom.querySelector('.slds-modal__header');

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

/*///////////////////////
//////// T O D O ////////
///////////////////////*/
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
		// small tiles inclues slds-size--xx-small class on section

/*///////////////////////
//////// N O P E ////////
///////////////////////*/
	// IN MODAL
		// app launcher wrapper has attr: aria-hidden="false"
		// app launcher wrapper has attr: role="dialog"
		// app launcher wrapper has classes: slds-modal slds-fade-in-open slds-modal--large


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
				description: 'The key to call center and contact center is not to use too many words! And we will add some more words until we reach the limit. And then we will add some more words just to make sure this works on all screensizes. What I should have done is wrap this in a class to set the widht, but this is faster.',
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
		const icon = <Icon name="map" category="action" className="slds-m-around--x-small" />;

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
			expect(iconWrapper.getElementsByTagName('span')[0].className).to.include('slds-icon__container slds-icon-action-map');
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
		let component;
		let AppLauncherIcon;
		let AppLauncherWrapper;
		// let AppLauncherHeader;

		beforeEach(() => {
			component = renderAppLauncher();

			AppLauncherWrapper = findRenderedDOMComponentWithClass(component, 'app-launcher-wrapper');
			AppLauncherIcon = findRenderedDOMComponentWithClass(component, 'slds-button');
			// AppLauncherIcon = findRenderedDOMComponentWithClass(component, 'slds-context-bar__icon-action');


			// AppLauncherHeader = findRenderedDOMComponentWithClass(component, 'slds-app-launcher__header');
		});

		afterEach(() => {
			cleanDom();
		});

	// APP LAUNCHER -----
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

		it('modal header has proper classes', (done) => {
			// console.log(AppLauncherIcon.innerHTML);
			TestUtils.Simulate.click(AppLauncherIcon);
			console.log(AppLauncherIcon.innerHTML);
			console.log('-----------------------');
			setTimeout(() => {
				console.log('TIMEOUT');
				console.log(AppLauncherWrapper.innerHTML);
				done();
			}, 600);
			// console.log(AppLauncherWrapper.innerHTML);
			// debugger;
			// expect(AppLauncherHeader.className).to.include('slds-app-launcher__header slds-grid slds-grid--align-spread slds-grid--vertical-align-center');
		});
	});
});

