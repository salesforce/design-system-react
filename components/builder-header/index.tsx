/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode, type ReactElement, type CSSProperties, type MouseEvent } from 'react';
import classNames from 'classnames';
import EventUtil from '../../utilities/event';
import BuilderHeaderUtilities from './utilities';
import BuilderHeaderNavLink from './nav-link';
import Icon from '../icon';
import type { IconCategory } from '../../types/common';
import {
	BUILDER_HEADER,
	BUILDER_HEADER_NAV,
	BUILDER_HEADER_TOOLBAR,
	BUILDER_HEADER_MISC,
	BUILDER_HEADER_UTILITIES,
} from '../../utilities/constants';

/**
 * Assistive text for BuilderHeader
 */
export interface BuilderHeaderAssistiveText {
	/** Back icon assistive text */
	backIcon?: string;
	/** Help icon assistive text */
	helpIcon?: string;
	/** Main icon assistive text */
	icon?: string;
}

/**
 * Event handlers for BuilderHeader
 */
export interface BuilderHeaderEvents {
	/** Called when Back link is clicked */
	onClickBack?: (event: MouseEvent) => void;
	/** Called when Help link is clicked */
	onClickHelp?: (event: MouseEvent) => void;
}

/**
 * Text labels for BuilderHeader
 */
export interface BuilderHeaderLabels {
	/** Back link label */
	back?: string;
	/** Help link label */
	help?: string;
	/** Page type label */
	pageType?: string;
	/** Title label */
	title?: string;
}

/**
 * Props for the BuilderHeader component
 */
export interface BuilderHeaderProps {
	/** Assistive text for accessibility */
	assistiveText?: BuilderHeaderAssistiveText;
	/** BuilderHeaderNav, BuilderHeaderToolbar, BuilderHeaderMisc children */
	children?: ReactNode;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Event handlers */
	events?: BuilderHeaderEvents;
	/** Icon category */
	iconCategory?: string;
	/** Icon CSS classes */
	iconClassName?: string | string[] | Record<string, boolean>;
	/** Icon name */
	iconName?: string;
	/** Icon path (overrides global settings) */
	iconPath?: string;
	/** Text labels */
	labels?: BuilderHeaderLabels;
	/** Custom styles */
	style?: CSSProperties;
}

const defaultAssistiveText: BuilderHeaderAssistiveText = {
	backIcon: 'Back',
	helpIcon: 'Help',
	icon: 'Builder',
};

const defaultLabels: BuilderHeaderLabels = {
	back: 'Back',
	help: 'Help',
	pageType: 'Page Type',
	title: 'App Name',
};

/**
 * Every builder needs a builder header, which contains basic navigation elements.
 * It also shows the builder type and content name.
 */
const BuilderHeader = ({
	assistiveText: propAssistiveText,
	children,
	className,
	events: propEvents,
	iconCategory = 'utility',
	iconClassName,
	iconName = 'builder',
	iconPath,
	labels: propLabels,
	style,
}: BuilderHeaderProps): React.ReactElement => {
	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const events = { ...propEvents };
	const labels = { ...defaultLabels, ...propLabels };

	let nav: ReactElement | undefined;
	let toolbar: ReactElement | undefined;
	let utilities: ReactElement = (
		<BuilderHeaderUtilities>
			<BuilderHeaderNavLink
				assistiveText={{ icon: assistiveText.backIcon }}
				iconCategory="utility"
				iconName="back"
				label={labels.back}
				onClick={EventUtil.trappedHandler(events.onClickBack)}
			/>
			<BuilderHeaderNavLink
				assistiveText={{ icon: assistiveText.helpIcon }}
				iconCategory="utility"
				iconName="help"
				label={labels.help}
				onClick={EventUtil.trappedHandler(events.onClickHelp)}
			/>
		</BuilderHeaderUtilities>
	);
	const misc: ReactElement[] = [];

	React.Children.forEach(children, (child) => {
		if (child && React.isValidElement(child)) {
			const displayName = (child.type as { displayName?: string }).displayName;
			switch (displayName) {
				case BUILDER_HEADER_NAV:
					nav = child;
					break;
				case BUILDER_HEADER_TOOLBAR:
					toolbar = child;
					break;
				case BUILDER_HEADER_MISC:
					misc.push(child);
					break;
				case BUILDER_HEADER_UTILITIES:
					utilities = child;
					break;
				default:
					break;
			}
		}
	});

	const resolvedIconPath = iconPath || undefined;
	const resolvedIconCategory = (iconPath ? undefined : iconCategory) as IconCategory | undefined;
	const resolvedIconName = iconPath ? undefined : iconName;

	return (
		<div style={{ position: 'relative', height: '100px' }}>
			<div
				className={classNames('slds-builder-header_container', className as string)}
				style={style}
			>
				<header className="slds-builder-header">
					<div className="slds-builder-header__item">
						<div className="slds-builder-header__item-label slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: assistiveText.icon }}
									category={resolvedIconCategory}
									containerClassName={classNames(
										'slds-icon_container',
										'slds-icon-utility-builder',
										'slds-current-color',
										iconClassName as string
									)}
									name={resolvedIconName}
									path={resolvedIconPath}
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">{labels.title}</div>
						</div>
					</div>
					{nav}

					{misc.length > 0 ? (
						misc
					) : (
						<div className="slds-builder-header__item slds-has-flexi-truncate">
							<h1 className="slds-builder-header__item-label">
								<span className="slds-truncate" title={labels.pageType}>
									{labels.pageType}
								</span>
							</h1>
						</div>
					)}

					{utilities}
				</header>
				{toolbar}
			</div>
		</div>
	);
};

BuilderHeader.displayName = BUILDER_HEADER;

export default BuilderHeader;

