/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactElement } from 'react';
import classnames from 'classnames';

import Controls from '../controls';
import DetailRow from '../detail-row';
import MediaObject from '../../../media-object';
import Title from '../title';

import { type PageHeaderVariantProps } from '../types';

const displayName = 'PageHeaderRecordHome';

const RecordHome = (props: PageHeaderVariantProps) => {
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
		<React.Fragment>
			<div className="slds-page-header__row">
				<div className="slds-page-header__col-title">
					<MediaObject
						body={
							<React.Fragment>
								<div className="slds-page-header__name">
									<Title
										content={props.title}
										level={props.titleLevel}
										label={props.label}
									/>
								</div>
							</React.Fragment>
						}
						figure={icon}
					/>
				</div>
				<Controls actions={props.actions} type="actions" />
			</div>
			{props.details ? (
				<div className="slds-page-header__row slds-page-header__row_gutters">
					<div className="slds-page-header__col-details">
						<DetailRow details={props.details} />
					</div>
				</div>
			) : null}
		</React.Fragment>
	);
};

RecordHome.displayName = displayName;

export default RecordHome;
