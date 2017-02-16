/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import { SLDSNotification } from '../../components';

describe('SLDSNotification: ', () => {
	const generateNotification = function (notificationInstance) {
		const reactCmp = TestUtils.renderIntoDocument(notificationInstance);
		return ReactDOM.findDOMNode(reactCmp);
	};

	describe('component renders', () => {
		it('notification renders', () => {
			const notification = generateNotification(<SLDSNotification variant="toast" theme="success" isOpen />);
			expect(notification).to.not.equal(undefined);
		});
	});

	describe('component basic props render', () => {
		it('renders variant', () => {
			const notification = generateNotification(<SLDSNotification variant="toast" theme="success" icon="notification" isOpen texture animated />);
			const alert = notification.getElementsByTagName('div')[0];
			expect(alert.className).to.include('slds-notify--toast');
		});

		it('renders theme', () => {
			const notification = generateNotification(<SLDSNotification variant="toast" theme="error" isOpen />);
			const alert = notification.getElementsByTagName('div')[0];
			expect(alert.className).to.include('slds-theme--error');
		});

		it('renders icon', (done) => {
			const notification = generateNotification(<SLDSNotification variant="alert" theme="success" iconName="notification" isOpen texture content={'hi'} />);
			setTimeout(() => {
				const svgs = notification.querySelectorAll('svg');
				expect(svgs[0].getAttribute('name')).to.equal('close');
				expect(svgs[1].getAttribute('name')).to.equal('notification');
				done();
			}, 400);
		});
	});

	describe('dismiss notification click', () => {
		it('button onClick invokes method from props', (done) => {
			const onClick = sinon.spy();
			const notification = generateNotification(<SLDSNotification variant="toast" theme="success" iconName="notification" onDismiss={onClick} isOpen />);
			setTimeout(() => {
				const dismissBtn = notification.getElementsByTagName('button')[0];
				TestUtils.Simulate.click(dismissBtn);
				expect(onClick.calledOnce).to.be.true;
				done();
			}, 400);
		});
	});
});
