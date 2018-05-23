/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './index';

// This component should be deprecated and appears to have
// been created in order to do modals in portals.

const ModalTrigger = {
	open: (cfg) => {
		const el = document.createElement('span');
		el.setAttribute('data-slds-modal', true);
		document.body.appendChild(el);
		const comp = (
			<Modal title={cfg.title} footer={cfg.footer} isOpen>
				{cfg.content}
			</Modal>
		);
		ReactDOM.render(comp, el);
	},
};

export default ModalTrigger;
