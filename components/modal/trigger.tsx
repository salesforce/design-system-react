/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { createRoot } from 'react-dom/client';
import { type ReactNode } from 'react';

import componentIsDeprecated from '../../utilities/warning/component-is-deprecated';

import Modal from './index';

import { canUseDOM } from '../../utilities/execution-environment';

export interface ModalTriggerConfig {
	/** Modal heading text. */
	title?: ReactNode;
	/** Modal footer content. */
	footer?: ReactNode | ReactNode[];
	/** Modal body content. */
	content?: ReactNode;
}

// This component should be deprecated and appears to have
// been created in order to do modals in portals.

const ModalTrigger = {
	open: (cfg: ModalTriggerConfig) => {
		componentIsDeprecated(
			'components/modal/trigger.jsx',
			// The legacy call passes a message string in the `props` slot; the
			// deprecation helper only reads `props.silenceDeprecationWarning`, so
			// this is a harmless no-op guard. Preserved for backwards behavior.
			{} as Record<string, unknown>,
			'This component is deprecated and appears to have been created in order to do modals in portals which is what current Modal has done for years.'
		);

		let el;
		if (canUseDOM) {
			el = document.createElement('span');
			el.setAttribute('data-slds-modal', 'true');
			document.body.appendChild(el);
		}
		const comp = (
			<Modal heading={cfg.title} footer={cfg.footer} isOpen>
				{cfg.content}
			</Modal>
		);

		if (el) {
			// React 18+ root API. `ReactDOM.render` was removed in React 19.
			const root = createRoot(el);
			root.render(comp);
		}
	},
};

export default ModalTrigger;
