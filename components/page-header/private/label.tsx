/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type CSSProperties, type ReactNode } from 'react';

import Breadcrumb from '../../breadcrumb';

const displayName = 'PageHeaderLabel';

export interface PageHeaderLabelProps {
	/**
	 * Contents of label section
	 */
	content?: ReactNode;
	/**
	 * An array of react elements, presumably anchor <a> elements.
	 */
	trail?: ReactNode[];
	/**
	 * Style applied to the breadcrumb container.
	 */
	style?: CSSProperties;
}

const Label = (props: PageHeaderLabelProps) => {
	if (props.trail && props.trail.length > 0) {
		return <Breadcrumb styleContainer={props.style} trail={props.trail} />;
	}

	if (props.content) {
		if (typeof props.content === 'string') {
			return <span>{props.content}</span>;
		}

		return <>{props.content}</>;
	}

	return null;
};

Label.displayName = displayName;

export default Label;
