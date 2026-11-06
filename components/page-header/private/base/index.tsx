/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactElement } from 'react';
import classnames from 'classnames';

import Controls from '../controls';
import Info from '../info';
import MediaObject from '../../../media-object';
import Title from '../title';

import { type PageHeaderVariantProps } from '../types';

const displayName = 'PageHeaderBase';

const Base = (props: PageHeaderVariantProps) => {
	let icon;

	if (props.icon) {
		let iconClasses = 'slds-page-header__icon';

		if (props.icon.props) {
			iconClasses = classnames(
				(props.icon.props as { className?: string }).className,
				iconClasses
			);
		}

		icon = React.cloneElement(
			props.icon as ReactElement,
			{
				className: iconClasses,
			} as { className: string }
		);
	}

	return (
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-title">
				<MediaObject
					body={
						<React.Fragment>
							<div className="slds-page-header__name">
								<Title content={props.title} level={props.titleLevel} />
							</div>
							<Info content={props.info} variant={props.variant} />
						</React.Fragment>
					}
					figure={icon}
				/>
			</div>
			<Controls
				className="slds-align-middle"
				controls={props.controls}
				type="controls"
			/>
		</div>
	);
};
Base.displayName = displayName;

export default Base;
