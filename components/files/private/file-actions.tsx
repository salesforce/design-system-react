/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FileActions Component

// Implements the [FileActions design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

import React, { type ReactElement } from 'react';

import { FILES_ACTIONS } from '../../../utilities/constants';
import Button from '../../button';
import Icon from '../../icon';

export interface FileActionsAssistiveText {
	download?: string;
	moreActions?: string;
}

export interface FileActionsProps {
	/**
	 *  Assistive text for the file component
	 */
	assistiveText?: FileActionsAssistiveText;
	/**
	 *  Controls whether the file's title should be visible
	 */
	hasNoVisibleTitle?: boolean;
	/**
	 *  Dropdown for More Actions; doesn't show More actions button if empty
	 */
	moreActionsDropdown?: ReactElement<Record<string, unknown>>;
	/**
	 *  Action to be done on clicking download button; doesnt show download button if empty
	 */
	onClickDownload?: (event: React.MouseEvent) => void;
}

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const FileActions = (props: FileActionsProps) => {
	const assistiveText = props.assistiveText ?? {};
	const actions = (
		<div className="slds-file__actions-menu">
			<div className="slds-button-group" role="group">
				{typeof props.onClickDownload === 'function' ? (
					<Button
						type="button"
						variant="icon"
						iconSize="x-small"
						onClick={props.onClickDownload}
						title="Download"
						className="slds-button_icon-inverse"
					>
						<Icon
							assistiveText={{ label: assistiveText.download }}
							category="utility"
							name="download"
							size="xx-small"
							inverse={props.hasNoVisibleTitle}
						/>
					</Button>
				) : null}
				{props.moreActionsDropdown
					? React.cloneElement(props.moreActionsDropdown, {
							assistiveText: { icon: assistiveText.moreActions },
							overlay: false,
							buttonVariant: 'icon',
							buttonInverse: props.hasNoVisibleTitle,
							className: 'dsr-file__more-actions-dropdown ',
							triggerClassName: 'dsr-file__more-actions',
						})
					: null}
			</div>
		</div>
	);
	if (
		typeof props.onClickDownload === 'function' ||
		props.moreActionsDropdown
	) {
		if (!props.hasNoVisibleTitle) {
			return actions;
		}
		return (
			<div className="slds-file__title slds-file__title_scrim">{actions}</div>
		);
	}
	return null;
};

FileActions.displayName = FILES_ACTIONS;

export default FileActions;
