/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */

// # TabItem Component

// ## Dependencies

// ### React
import React, {
	forwardRef,
	useEffect,
	useRef,
	type ReactNode,
} from 'react';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { TAB } from '../../../utilities/constants';

import Icon from '../../icon';
import { type TabsVariant } from '../index';

/*
 * Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler.
 */

export interface TabProps {
	/**
	 * The CSS class to be applied when this tab is selected. Defaults to `.slds-is-active`. If another class is desired, it should be passed in _along with_ `.slds-is-active`, not _instead_ of it.
	 */
	activeTabClassName?: string;
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `withErrorIcon`: This text is for the error icon that will be placed next to the `<Tab />` title
	 */
	assistiveText?: {
		withErrorIcon?: string;
	};
	/**
	 * The string or element that is shown as both the title and the label for this tab.
	 */
	children?: ReactNode;
	/**
	 * CSS classes to be added to the tab.
	 */
	className?: string;
	/**
	 * When `true`, the HTML attribute `aria-disabled` will be applied.
	 */
	disabled?: boolean;
	/**
	 * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
	 */
	disabledTabClassName?: string;
	/**
	 * Whether to apply focus to this tab.
	 */
	focus?: boolean;
	/**
	 * Show an icon that can be used to communicate when a tab contains a validation error that needs attention
	 */
	hasError?: boolean;
	/**
	 * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
	 */
	id?: string;
	/**
	 * The HTML ID of `<TabPanel />` this tab controls.
	 */
	panelId?: string;
	/**
	 * When `true`, the class `.slds-is-active` is applied.
	 */
	selected?: boolean;
	/**
	 * If the Tabs should be scoped, vertical, or default (default value)
	 */
	variant?: TabsVariant;
}

const Tab = forwardRef<HTMLElement, TabProps>((props, ref) => {
	const {
		selected = false,
		disabled,
		panelId,
		activeTabClassName = 'slds-is-active',
		disabledTabClassName = 'slds-disabled',
		className,
		children,
		id,
		variant = 'default',
		hasError = false,
		focus = false,
		assistiveText = { withErrorIcon: 'This item has an error' },
	} = props;

	const nodeRef = useRef<HTMLAnchorElement | null>(null);

	const setRefs = (node: HTMLAnchorElement | null) => {
		nodeRef.current = node;
		if (typeof ref === 'function') {
			ref(node);
		} else if (ref) {
			(ref as React.MutableRefObject<HTMLElement | null>).current = node;
		}
	};

	useEffect(() => {
		if (selected && focus && nodeRef.current) {
			nodeRef.current.focus();
		}
	});

	/**
	 * Desired a11y behaviour: The active Tab should get focus when the user presses the
	 * Tab key. After that, Arrow keys should be used to change the focus from one tab
	 * to another. Pressing the Tab key one more time should move the focus away from the
	 * Tab group.
	 *
	 * Here, we put the selected Tab in the navigation path (tabIndex = 0) and remove other
	 * tabs from navigation path (tabIndex = -1).
	 */
	const tabIndex = selected ? 0 : -1;

	return (
		<li
			className={classNames(className, {
				[activeTabClassName]: selected,
				[disabledTabClassName]: disabled,
				'slds-tabs_default__item': variant === 'default',
				'slds-tabs_scoped__item': variant === 'scoped',
				'slds-vertical-tabs__nav-item': variant === 'vertical',
			})}
			role="presentation"
			id={id}
			title={typeof children === 'string' ? children : undefined}
		>
			<a
				className={classNames({
					[activeTabClassName]: selected,
					[disabledTabClassName]: disabled,
					'slds-tabs_default__link': variant === 'default',
					'slds-tabs_scoped__link': variant === 'scoped',
					'slds-vertical-tabs__link': variant === 'vertical',
				})}
				href="#"
				role="tab"
				ref={setRefs}
				tabIndex={tabIndex}
				aria-controls={panelId}
				aria-disabled={disabled}
				aria-selected={selected ? 'true' : 'false'}
				onClick={(event) => event.preventDefault()}
			>
				{children}
				{hasError && (
					<span
						className={classNames({
							'slds-tabs__right-icon': variant !== 'vertical',
							'slds-vertical-tabs__right-icon': variant === 'vertical',
						})}
					>
						<Icon
							assistiveText={{
								label: assistiveText.withErrorIcon,
							}}
							category="utility"
							containerClassName="slds-icon_container slds-icon-utility-error"
							size="x-small"
							name="error"
							colorVariant="error"
							title={assistiveText.withErrorIcon}
						/>
					</span>
				)}
			</a>
		</li>
	);
});

Tab.displayName = TAB;

export default Tab;
