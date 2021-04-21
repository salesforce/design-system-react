import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';
import IconSettings from '../../icon-settings';

import AppLauncherTile from '../../app-launcher/tile';
import Icon from '../../icon';

const { expect } = chai;
const should = chai.should();

describe('SLDS APP LAUNCHER TILE *******************************************', () => {
	let div;

	const handles = {
		body: null,
		description: null,
		icon: null,
		more: null,
		tile: null,
		title: null,
	};

	const defaultTileProps = {
		title: 'Marketing Cloud',
	};

	const createTile = (props) =>
		React.createElement(AppLauncherTile, assign({}, defaultTileProps, props));

	function mountTile(props) {
		// This div is needed for Truncate to properly determine the description width
		div = document.createElement('div');
		div.style.cssText = 'width: 300px';
		document.body.appendChild(div);

		handles.tile = mount(
			<IconSettings iconPath="/assets/icons">{createTile(props)}</IconSettings>,
			{ attachTo: div }
		);

		handles.body = handles.tile.find('.slds-app-launcher__tile-body');
		handles.description = handles.body.find('div').at(1);
		handles.icon = handles.tile.find('.slds-app-launcher__tile-figure');
		handles.more = handles.tile.find(
			'.slds-app-launcher__tile-body button.slds-button_reset'
		);
		handles.title = handles.tile
			.find('.slds-app-launcher__tile-body')
			.childAt(0);
	}

	function cleanDom() {
		document.body.removeChild(div);
	}

	describe('Default App Launcher Tile', () => {
		let onClick;

		beforeEach(() => {
			onClick = sinon.spy();

			mountTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				href: 'https://www.salesforce.com/',
				onClick,
				search: 'upport',
				title: 'Support Cloud',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders tile', () => {
			should.exist(handles.tile);
		});

		it('renders tile with proper classes', () => {
			should.exist(
				handles.tile.find('.slds-app-launcher__tile.slds-text-link_reset')
			);
		});

		it('renders tile body', () => {
			should.exist(handles.body);
		});

		it('renders tile title', () => {
			should.exist(handles.title);
		});

		it('renders custom title', () => {
			expect(handles.title.text()).to.equal('Support Cloud');
		});

		it('renders custom app description', () => {
			// the .at(1) would only apply when descriptionHeading is set
			expect(handles.description.find('span').at(1).text()).to.equal(
				'Fluffy support'
			);
		});

		it('has an href attribute', () => {
			expect(handles.tile.find('a')).to.have.attr(
				'href',
				'https://www.salesforce.com/'
			);
		});

		it('clicking tile fires callback', () => {
			handles.tile.simulate('click');
			expect(onClick.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('clicking tile title link fires callback and ignores href', () => {
			handles.body.find('a').at(0).simulate('click');
			expect(onClick.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('tile can be passed custom className', () => {
			should.exist(handles.tile.find('.this-is-a-custom-class'));
		});

		it('tile can be passed a search string', () => {
			const searchStr = handles.tile;
			const childrenProps = searchStr.props().children.props;
			expect(childrenProps.search).to.equal('upport');
		});

		it('search string highlights title', () => {
			expect(
				handles.title.containsAllMatchingElements(
					// eslint-disable-line no-unused-expressions
					[<span>S</span>, <mark>upport</mark>, <span> Cloud</span>]
				)
			).to.be.true;
		});

		it('search string highlights description', () => {
			expect(
				handles.description.containsAllMatchingElements(
					// eslint-disable-line no-unused-expressions
					[<span>Fluffy s</span>, <mark>upport</mark>]
				)
			).to.be.true;
		});
	});

	describe('App Launcher Tile (truncated)', () => {
		const description =
			'The key to call center and contact center management is more simple than you think with this amazing application!';

		const moreLabel = 'MORE!';

		beforeEach(() => {
			mountTile({
				title: 'Call Center',
				description,
				isOpenTooltip: true,
				moreLabel,
				search: 'enter',
			});
		});

		afterEach((done) => {
			setTimeout(function timeoutFunction() {
				cleanDom();
				done();
			}, 100);
		});

		it('renders more link', () => {
			should.exist(handles.more);
		});

		it('renders custom more link', () => {
			// Enzyme is unable to find React inserted `<span>` tags due to text wrapping. Therefore the DOM transversal.
			// const clonedNode = handles.more.node.cloneNode();
			// const clonedNodeWithoutSpan = clonedNode.firstChild.remove();
			// console.log(clonedNode);

			expect(handles.more.text()).to.equal(`${moreLabel}`);
		});

		it('long descriptions use Tooltip activated by hover', () => {
			// this test causes the tooltip to 'flash' on the testing page http://localhost:8001/
			handles.more.simulate('mouseenter');
			// uses portal mount
			should.exist(document.querySelector('.slds-popover_tooltip'));
			handles.more.simulate('mouseleave');
		});

		it('search string highlights tooltip content', () => {
			// this is a hack that waits for the tooltip to render through PopperJS
			setTimeout(function timeoutFunction() {
				expect(
					handles.tile.find('.slds-popover__body mark').at(0).text()
				).to.equal('enter');
			}, 100);
		});
	});

	describe('App Launcher Tile (text icon)', () => {
		beforeEach(() => {
			mountTile({
				description: 'Call center and contact center.',
				iconBackgroundColor: 'rgb(115, 192, 123)',
				iconText: 'CC',
				title: 'Call Center',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders text icon with proper classes', () => {
			const icon = handles.icon.find('span').at(0);
			const iconAbbr = icon.find('abbr');
			expect(icon).to.have.className('slds-avatar');
			expect(icon).to.have.className('slds-avatar_large');
			expect(iconAbbr).to.have.className('slds-avatar__initials');
			expect(iconAbbr).to.have.className('slds-icon-custom-27');
		});

		it('tile can be passed a custom text icon', () => {
			expect(handles.icon.find('abbr').text()).to.equal('CC');
		});

		it('tile can be passed a custom text icon background color', () => {
			expect(handles.icon.find('abbr')).to.have.attr(
				'style',
				'background-color: rgb(115, 192, 123);'
			);
		});
	});

	describe('App Launcher Tile (icon node)', () => {
		const iconNode = <Icon name="campaign" category="standard" size="large" />;

		beforeEach(() => {
			mountTile({
				description: 'Call center and contact center.',
				iconNode,
				title: 'Call Center',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders <Icon>', () => {
			expect(handles.icon.find('span').at(0)).to.have.className(
				'slds-icon_container'
			);
		});

		it('renders <svg>', () => {
			should.exist(handles.icon.find('svg'));
		});
	});
});
