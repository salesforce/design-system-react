/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import SLDSNotification from '../../notification';
import IconSettings from '../../icon-settings';

describe('SLDSNotification: ', () => {
	const generateNotification = function (notificationInstance) {
		const reactCmp = TestUtils.renderIntoDocument(
			<div>
				<IconSettings iconPath="/assets/icons">
					{notificationInstance}
				</IconSettings>
			</div>
		);
		return ReactDOM.findDOMNode(reactCmp);
	};

	describe('component renders', () => {
		it('notification renders', () => {
			const notification = generateNotification(
				<SLDSNotification
					variant="toast"
					theme="success"
					isOpen
					content="hi"
					silenceDeprecationWarning
				/>
			);
			expect(notification).to.not.equal(undefined);
		});
	});

	describe('component basic props render', () => {
		it('renders variant', () => {
			const notification = generateNotification(
				<SLDSNotification
					variant="toast"
					theme="success"
					icon="notification"
					isOpen
					texture
					animated
					content="hi"
					silenceDeprecationWarning
				/>
			);
			const alert = notification.getElementsByTagName('div')[1];
			expect(alert.className).to.include('slds-notify_toast');
		});

		it('renders theme', () => {
			const notification = generateNotification(
				<SLDSNotification
					variant="toast"
					theme="error"
					isOpen
					content="hi"
					silenceDeprecationWarning
				/>
			);
			const alert = notification.getElementsByTagName('div')[1];
			expect(alert.className).to.include('slds-theme_error');
		});

		it('renders icon', () => {
			const notification = generateNotification(
				<SLDSNotification
					variant="alert"
					theme="success"
					iconName="notification"
					isOpen
					texture
					content="hi"
					silenceDeprecationWarning
				/>
			);

			const close = notification.querySelectorAll('button');
			const svgs = notification.querySelectorAll(
				'[*|href="/assets/icons/utility-sprite/svg/symbols.svg#notification"]'
			);
			expect(close[0].className).to.include('slds-notify__close');
			expect(svgs[0]).to.exist;
		});
	});

	describe('dismiss notification click', () => {
		it('button onClick invokes method from props', () => {
			const onClick = sinon.spy();
			const notification = generateNotification(
				<SLDSNotification
					variant="toast"
					theme="success"
					iconName="notification"
					onDismiss={onClick}
					isOpen
					content="hi"
					silenceDeprecationWarning
				/>
			);
			const dismissBtn = notification.getElementsByTagName('button')[0];
			TestUtils.Simulate.click(dismissBtn);
			expect(onClick.calledOnce).to.be.true;
		});
	});
});
