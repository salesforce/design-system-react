/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactElement } from 'react';
import classnames from 'classnames';

import Controls from '../controls';
import Info from '../info';
import Label from '../label';
import MediaObject from '../../../media-object';
import Title from '../title';

import { type PageHeaderVariantProps } from '../types';

const displayName = 'PageHeaderObjectHome';

const ObjectHome = (props: PageHeaderVariantProps) => {
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
								{props.trail ? (
									<Label style={{ lineHeight: '1.3' }} trail={props.trail} />
								) : null}
								<div className="slds-page-header__name">
									<Title
										content={props.title}
										label={!props.trail ? props.label : null}
									/>
									{props.nameSwitcherDropdown ? (
										<div className="slds-page-header__name-switcher">
											{props.nameSwitcherDropdown}
										</div>
									) : null}
								</div>
							</React.Fragment>
						}
						figure={icon}
					/>
				</div>
				<Controls
					className={classnames({
						'slds-align-middle slds-p-bottom_none': !props.controls,
					})}
					actions={props.actions}
					type="actions"
				/>
			</div>
			<div className="slds-page-header__row">
				<div className="slds-page-header__col-meta">
					<Info content={props.info} variant={props.variant} />
				</div>
				<Controls
					className={classnames({
						// NOTE: the original JS referenced a misspelled `comntentRight`
						// which was always undefined, so this condition has only ever
						// depended on `actions`. Behavior preserved verbatim.
						'slds-align-middle': !props.actions,
					})}
					controls={props.controls}
					type="controls"
				/>
			</div>
		</React.Fragment>
	);
};

ObjectHome.displayName = displayName;

export default ObjectHome;
