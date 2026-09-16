/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactNode } from 'react';
import classnames from 'classnames';
import { MEDIA_OBJECT } from '../../utilities/constants';

/**
 * CSS classes for MediaObject parts (for external DOM queries)
 */
export const cssClasses = {
	base: 'slds-media',
	figure: 'slds-media__figure',
	body: 'slds-media__body',
};

/**
 * Props for the MediaObject component
 */
export interface MediaObjectProps {
	/** The body content (typically text like heading or paragraph) */
	body?: ReactNode;
	/** Allow body to truncate in flexbox container */
	canTruncate?: boolean;
	/** CSS classes for the container */
	className?: string | string[] | Record<string, boolean>;
	/** The figure (optional visualization, usually an icon or image) */
	figure?: ReactNode;
	/** Vertically center body with the middle of figure */
	verticalCenter?: boolean;
}

/**
 * When you need text and a figure next to each other, use a media object.
 * This is a fundamental layout pattern used throughout SLDS.
 */
const MediaObject = ({
	body,
	canTruncate,
	className,
	figure,
	verticalCenter,
}: MediaObjectProps): React.ReactElement => {
	return (
		<div
			className={classnames(
				cssClasses.base,
				{
					'slds-media_center': verticalCenter,
					'slds-has-flexi-truncate': canTruncate,
				},
				className as string
			)}
		>
			{figure && <div className={cssClasses.figure}>{figure}</div>}
			<div className={cssClasses.body}>{body}</div>
		</div>
	);
};

MediaObject.displayName = MEDIA_OBJECT;

export default MediaObject;















