/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId } from 'react';
import classNames from 'classnames';
import { FILES } from '../../utilities/constants';
import type { FileProps } from './file';
import type { ChildrenOf } from '../../types/common';

/**
 * Crop ratio options for file preview
 */
export type FilesCropRatio = '16-by-9' | '4-by-3' | '1-by-1';

/** @deprecated Use `FileProps` from `files/file`. */
export type FileChildProps = Pick<FileProps, 'crop'>;

/**
 * Props for the Files component
 */
export interface FilesProps {
	/** `File` elements */
	children?: ChildrenOf<FileProps>;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/** Column class names for each file */
	columnClassName?: string;
	/** Crop ratio for files that don't set their own `crop`. Defaults to `4-by-3`. */
	crop?: FilesCropRatio;
	/** HTML id */
	id?: string;
}

/**
 * Files is a component that wraps multiple file components that represent attachments.
 */
const Files = ({
	children,
	className,
	columnClassName,
	crop = '4-by-3',
	id: propId,
}: FilesProps): React.ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const files = React.Children.map(children, (option) => {
		if (!React.isValidElement<FileProps>(option)) return null;
		return (
			<li
				className={classNames(
					'slds-p-horizontal_xx-small slds-size_1-of-3 slds-medium-size_1-of-4',
					columnClassName
				)}
			>
				{React.cloneElement(option, {
					crop: option.props.crop ?? crop,
				})}
			</li>
		);
	});

	return (
		<ul
			className={classNames(
				'slds-grid slds-grid_pull-padded',
				className as string
			)}
			id={id}
		>
			{files}
		</ul>
	);
};

Files.displayName = FILES;

export default Files;
