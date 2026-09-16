/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Implements the [Accordion design
// pattern](https://www.lightningdesignsystem.com/components/accordion/) in
// React. Based on SLDS v2.3.2

import React, { type ReactNode, type KeyboardEvent, type MouseEvent } from 'react';
import classNames from 'classnames';

import Button from '../button';

import { ACCORDION_PANEL } from '../../utilities/constants';

export interface AccordionPanelProps {
	/**
	 * The panel content for the Accordion component. Accordion panels should be added as <AccordionPanel />. Event handler for the accordion panels should be added to `<AccordionPanel />`. Optional `panelContentActions` component may be passed as prop. _Tested with Mocha framework and snapshot testing._
	 */
	children?: ReactNode;
	/**
	 * Indicates whether item is expanded or not, which should be handled by `onTogglePanel`. _Tested with Mocha framework and snapshot testing._
	 */
	expanded: boolean;
	/**
	 * Id of the item belonging to this panel. _Tested with snapshot testing._
	 */
	id: number | string;
	/**
	 * Component that can be passed as prop to `<Panel />`. As an example, a menu dropdown could be used here to handle additional actions for each accordion panel. _Tested with Mocha framework._
	 */
	panelContentActions?: ReactNode;
	/**
	 * Callback that will run whenever the panel summary is clicked.
	 */
	onClickSummary?: () => void;
	/**
	 * Callback that will run whenever there is a keydown on the panel button. Function doesn't change the state of the component.
	 */
	onKeyDownSummary?: (event: KeyboardEvent) => void;
	/**
	 * Callback that will run whenever a panel is toggled. Function should handle state to toggle `expanded` prop. _Tested with Mocha framework._
	 */
	onTogglePanel: (event: MouseEvent) => void;
	/**
	 * Ref callback that will pass in panel's `input` tag
	 */
	refs?: {
		summaryButton?: (component: HTMLElement | null) => void;
	};
	/**
	 * Summary in the span element in the header of this panel. The summary is truncated and so the title element should contain the full text so that it is accessible on hover. _Tested with snapshot testing._
	 */
	summary: string | ReactNode;
	/**
	 * HTML title attribute. _Tested with snapshot testing._
	 */
	title?: string;
}

/**
 * The panel content for the Accordion component.
 */
const AccordionPanel = ({
	children,
	expanded,
	id,
	panelContentActions,
	summary,
	title,
	onClickSummary,
	onKeyDownSummary,
	onTogglePanel,
	refs = {},
}: AccordionPanelProps): React.ReactElement => (
	<li className="slds-accordion__list-item">
		<section
			className={classNames('slds-accordion__section', {
				'slds-is-open': expanded,
			})}
		>
			<div className="slds-accordion__summary">
				<h3 className="slds-text-heading_small slds-accordion__summary-heading slds-has-flexi-truncate">
					<Button
						aria-controls={`${id}-accordion-panel`}
						aria-expanded={expanded}
						buttonRef={refs.summaryButton}
						className="slds-button_reset slds-accordion__summary-action"
						iconCategory="utility"
						iconClassName="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
						iconName="switch"
						id={`${id}-accordion-button`}
						onKeyDown={onKeyDownSummary}
						onClick={(e: MouseEvent) => {
							if (onClickSummary) {
								onClickSummary();
							}
							onTogglePanel(e);
						}}
						variant="base"
					>
						<span className="slds-truncate" title={title || (summary as string)}>
							{summary}
						</span>
					</Button>
				</h3>
				{panelContentActions}
			</div>
			<div
				aria-hidden={!expanded}
				className="slds-accordion__content"
				id={`${id}-accordion-panel`}
			>
				{children}
			</div>
		</section>
	</li>
);

AccordionPanel.displayName = ACCORDION_PANEL;

export default AccordionPanel;
