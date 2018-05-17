import React from 'react';
import { mount } from 'enzyme';
import chai from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import IconSettings from '../../icon-settings';

import AppLauncherTile from '../../app-launcher/tile';
import Icon from '../../icon';

const expect = chai.expect;
const should = chai.should();

const { Simulate } = TestUtils;

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

	function mountTile (props) {
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
			'.slds-app-launcher__tile-body .slds-app-launcher__tile-more'
		);
		handles.title = handles.tile
			.find('.slds-app-launcher__tile-body')
			.childAt(0);
	}

	function cleanDom () {
		document.body.removeChild(div);
	}

	describe('Default App Launcher Tile', () => {
		const onClick = sinon.spy();

		beforeEach(() => {
			mountTile({
				className: 'this-is-a-custom-class',
				description: 'Fluffy support',
				descriptionHeading: 'Sub Heading',
				href: 'https://www.marketingcloud.com/',
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
				handles.tile.find('.slds-app-launcher__tile .slds-text-link--reset')
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

		it('renders description heading', () => {
			expect(handles.tile.find('.slds-text-heading--label').text()).to.equal(
				'Sub Heading '
			);
		});

		it('renders custom app description', () => {
			// the .at(1) would only apply when descriptionHeading is set
			expect(
				handles.description
					.find('span')
					.at(1)
					.text()
			).to.equal('Fluffy support');
		});

		it('has an href attribute', () => {
			expect(handles.tile.find('a').node.href).to.equal(
				'https://www.marketingcloud.com/'
			);
		});

		it('clicking tile fires callback', () => {
			Simulate.click(handles.tile.find('a').node);
			expect(onClick.calledOnce).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('tile can be passed custom className', () => {
			should.exist(handles.tile.find('.this-is-a-custom-class'));
		});

		it('tile can be passed a search string', () => {
			const searchStr = handles.tile;
			const childrenProps = searchStr.component.props.props.children.props;
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
			'The key to call center and contact center is not to use too many words! And we will add some more words until we reach the limit.';

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

		afterEach(() => {
			cleanDom();
		});

		it('renders more link', () => {
			should.exist(handles.more);
		});

		it('renders custom more link', () => {
			// Enzyme is unable to find React inserted `<span>` tags due to text wrapping. Therefore the DOM transversal.
			// const clonedNode = handles.more.node.cloneNode();
			// const clonedNodeWithoutSpan = clonedNode.firstChild.remove();
			// console.log(clonedNode);

			expect(handles.more.node.textContent).to.equal(`${moreLabel}`);
		});

		it('long descriptions use Tooltip activated by hover', () => {
			// this test causes the tooltip to 'flash' on the testing page http://localhost:8001/
			Simulate.mouseEnter(handles.more.node, {});
			// uses portal mount
			should.exist(document.querySelector('.slds-popover--tooltip'));
			Simulate.mouseLeave(handles.more.node, {});
		});

		it('search string highlights tooltip content', () => {
			// this is a hack that waits for the tooltip to render through PopperJS
			setTimeout(function () {
				expect(
					handles.more
						.find('mark')
						.at(0)
						.text()
				).to.equal('enter');
			}, 500);
		});
	});

	describe('App Launcher Tile (text icon)', () => {
		beforeEach(() => {
			mountTile({
				title: 'Call Center',
				iconText: 'CC',
				description: 'Call center and contact center.',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders text icon with proper classes', () => {
			expect(handles.icon.find('span').node.className).to.include(
				'slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27'
			);
		});

		it('tile can be passed a custom text icon', () => {
			expect(handles.icon.text()).to.equal('CC');
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

		it('renders <Icon> node', () => {
			expect(handles.icon.find('span').node.className).to.include(
				'slds-icon_container'
			);
		});

		it('renders <svg>', () => {
			should.exist(handles.icon.find('svg'));
		});
	});

	describe('App Launcher Tile (small)', () => {
		beforeEach(() => {
			mountTile({
				title: 'Support Cloud',
				iconText: 'SC',
				size: 'small',
				description: 'This is the app description',
				search: 'upport',
			});
		});

		afterEach(() => {
			cleanDom();
		});

		it('renders small tile with proper classes', () => {
			should.exist(handles.tile.find('.slds-app-launcher__tile--small'));
		});

		it('renders small icon with proper classes', () => {
			should.exist(handles.tile.find('.slds-app-launcher__tile-figure--small'));
		});

		it('small tile body has proper classes', () => {
			should.exist(handles.body.find('.slds-app-launcher__tile-body--small'));
		});

		it('small tile body has <p> tag with truncate class', () => {
			should.exist(handles.body.find('p.slds-truncate'));
		});

		it('search string highlights title', () => {
			expect(
				handles.title.containsAllMatchingElements(
					// eslint-disable-line no-unused-expressions
					[<span>S</span>, <mark>upport</mark>, <span> Cloud</span>]
				)
			).to.be.true;
		});

		it('small tile does not have app description', () => {
			expect(
				handles.tile.text().indexOf('This is the app description')
			).to.equal(-1);
		});
	});
});
