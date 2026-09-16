/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

export const DISPLAY_NAME = 'SLDSSplitViewListItemContent';

export interface SplitViewListItem {
	label?: string;
	topRightText?: string;
	bottomLeftText?: string;
	bottomRightText?: string;
}

export interface SplitViewListItemContentProps {
	/**
	 * **Item to be displayed**
	 * * `label`: The main label displayed on the top left.
	 * * `topRightText`: The text displayed on the top right.
	 * * `bottomLeftText`: The text displayed on the bottom left.
	 * * `bottomRightText`: The text displayed on the bottom right.
	 */
	item?: SplitViewListItem;
}

const SplitViewListItemContent = ({
	item = {},
}: SplitViewListItemContentProps) => (
	<div>
		<div className="slds-grid slds-wrap">
			<span
				className="slds-truncate slds-text-body_regular slds-text-color_default"
				title={item.label}
			>
				{item.label}
			</span>
			<span
				className="slds-truncate slds-col_bump-left"
				title={item.topRightText}
			>
				{item.topRightText}
			</span>
		</div>
		<div className="slds-grid slds-wrap">
			<span className="slds-truncate" title={item.bottomLeftText}>
				{item.bottomLeftText}
			</span>
			<span
				className="slds-truncate slds-col_bump-left"
				title={item.bottomLeftText}
			>
				{item.bottomRightText}
			</span>
		</div>
	</div>
);

SplitViewListItemContent.displayName = DISPLAY_NAME;

export default SplitViewListItemContent;
