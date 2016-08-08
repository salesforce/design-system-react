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

import AppLauncherTile from '../../components/app-launcher/tile';
import AppLauncherSection from '../../components/app-launcher/section';

const {
	Simulate,
	findRenderedDOMComponentWithTag,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithClass
} = TestUtils;

describe.only('SLDS APP LAUNCHER SECTION *******************************************', () => {
	const defaultSectionProps = {
		title: 'All Items'
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

	const createSection = (props) => React.createElement(
		AppLauncherSection,
		assign({}, defaultSectionProps, props),
		[
			<AppLauncherTile title="Marketing Cloud" />,
			<AppLauncherTile title="Support Cloud" />
		]
	);

	const renderAppLauncher = (props) => renderInstance(createSection(props));

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
