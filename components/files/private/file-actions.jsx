/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # FileActions Component

// Implements the [FileActions design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '~/components/icon';

import { FILES_ACTIONS } from '../../../utilities/constants';

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const FileActions = (props) => {
	const actions = (
		<div className="slds-file__actions-menu">
			<div className="slds-button-group" role="group">
				<a
					className={classNames(
						'slds-button',
						'slds-button_icon',
						'slds-button_icon',
						'slds-button_icon-x-small',
						props.title ? null : 'slds-button_icon-inverse'
					)
					}
					href={props.downloadLink}
					title="Download">
					<Icon
						assistiveText={{ label: "download" }}
						category="utility"
						name="download"
						size="xx-small"
						inverse={!props.title}
					/>
					<span className="slds-assistive-text">Download</span>
				</a>
			</div>
		</div>
	);
	if(props.downloadLink)
	{
		if(props.title) {
			return (actions);
		}
		return(<div className="slds-file__title slds-file__title_scrim">
			{actions}
		</div>);
	}
	return null;
};

FileActions.displayName = FILES_ACTIONS;

FileActions.propTypes = {
	/**
	 *  Link in the download action button; doesnt show download button if empty
	 */
	downloadLink: PropTypes.PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	/**
	 *  Title for the File
	 */
	title: PropTypes.string,
};

export default FileActions;
