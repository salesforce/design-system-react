/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

import Controls from '../controls';
import Info from '../info';
import Label from '../label';
import MediaObject from '../../../media-object';
import Title from '../title';

import { type PageHeaderVariantProps } from '../types';

const displayName = 'PageHeaderRelatedList';

const RelatedList = (props: PageHeaderVariantProps) => (
	<React.Fragment>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-title">
				<Label content={props.label} trail={props.trail} />
				<MediaObject
					body={
						<div className="slds-page-header__name">
							<Title content={props.title} label={props.label} />
						</div>
					}
				/>
			</div>
			<Controls
				contentRight={props.contentRight}
				onRenderActions={props.onRenderActions}
				type="actions"
			/>
		</div>
		<div className="slds-page-header__row">
			<div className="slds-page-header__col-meta">
				<Info content={props.info} variant={props.variant} />
			</div>
			<Controls
				navRight={props.navRight}
				onRenderControls={props.onRenderControls}
				type="controls"
			/>
		</div>
	</React.Fragment>
);

RelatedList.displayName = displayName;

export default RelatedList;
