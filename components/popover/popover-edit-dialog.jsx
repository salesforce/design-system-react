/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Edit Dialog Popver Component

// Implements the [Popover design pattern](https://www.lightningdesignsystem.com/components/popovers) in React.

// ### React
import React from 'react';
import PropTypes from 'prop-types';

import { POPOVER_EDIT_DIALOG } from '../../utilities/constants';

import Button from '../../components/button';
import Popover from './popover';

export default class PopoverEditDialog extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = POPOVER_EDIT_DIALOG;

	// ### Prop Types
	static propTypes = {
		onCancel: PropTypes.func,
		onSave: PropTypes.func,
	};

	render() {
		const { onCancel, onSave, ...restProps } = this.props;
		return (
			<Popover
				classNameBody={[
					'slds-p-left_small',
					'slds-p-top_medium',
					'slds-p-right_small',
				]}
				classNameFooter={['slds-p-top_xx-small', 'slds-p-bottom_xx-small']}
				footer={
					<div className="slds-text-align_right">
						<Button label="Cancel" onClick={onCancel} />
						<Button variant="brand" label="Save" onClick={onSave} />
					</div>
				}
				{...restProps}
			/>
		);
	}
}
