/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FileActions Component

// Implements the [FileActions design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

import React from 'react';
import PropTypes from 'prop-types';

import { FILES_ACTIONS } from '../../../utilities/constants';
import Button from '../../button';
import Icon from '../../icon';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const FileActions = (props) => {
	const actions = (
		<div className="slds-file__actions-menu">
			<div className="slds-button-group" role="group">
				{typeof props.onClickDownload === 'function' ? (
					<Button
						type="button"
						variant="icon"
						iconSize="x-small"
						onClick={
							typeof props.onClickDownload === 'function'
								? props.onClickDownload
								: null
						}
						title="Download"
					>
						<Icon
							assistiveText={{ label: 'download' }}
							category="utility"
							name="download"
							size="xx-small"
							inverse={!props.title}
						/>
					</Button>
				) : null}
				{typeof props.onClickMoreActions === 'function' ? (
					<Button
						type="button"
						variant="icon"
						iconSize="x-small"
						onClick={
							typeof props.onClickMoreActions === 'function'
								? props.onClickMoreActions
								: null
						}
						title="More Actions"
					>
						<Icon
							assistiveText={{ label: 'More Actions' }}
							category="utility"
							name="down"
							size="xx-small"
							inverse={!props.title}
						/>
					</Button>
				) : null}
			</div>
		</div>
	);
	if (
		typeof props.onClickDownload === 'function' ||
		typeof props.onClickMoreActions
	) {
		if (props.title) {
			return actions;
		}
		return (
			<div className="slds-file__title slds-file__title_scrim">{actions}</div>
		);
	}
	return null;
};

FileActions.displayName = FILES_ACTIONS;

FileActions.propTypes = {
	/**
	 *  Action to be done on clicking download button; doesnt show download button if empty
	 */
	onClickDownload: PropTypes.func,
	/**
	 *  Action to be done on clicking more actions button; doesn't show More actions button if empty
	 */
	onClickMoreActions: PropTypes.func,
	/**
	 *  Title for the File
	 */
	title: PropTypes.string,
};

export default FileActions;
