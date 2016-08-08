/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable max-len */

import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;
const should = chai.should();

import { Icon } from '../../components';
import AppLauncherTile from '../../components/app-launcher/tile';

const {
	Simulate,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe('SLDS APP LAUNCHER TILE *******************************************', () => {
	const mockCallback = sinon.spy();

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
			expect(mockCallback.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
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
			expect(findRenderedDOMComponentWithClass(component, 'drop-target')).to.be.ok; // eslint-disable-line no-unused-expressions
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

		it('tile can be passed a custom text icon', () => {
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
			expect(iconWrapper.getElementsByTagName('span')[0].className).to.include('slds-icon_container');
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
});
