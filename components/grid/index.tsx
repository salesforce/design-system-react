/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, type ReactNode } from 'react';
import classNames from 'classnames';

/** SLDS grid modifiers, applied as `slds-grid_{flavor}`. */
export type GridFlavor =
	| 'align-center'
	| 'align-end'
	| 'align-space'
	| 'align-spread'
	| 'frame'
	| 'pull-padded'
	| 'pull-padded-large'
	| 'pull-padded-medium'
	| 'pull-padded-small'
	| 'pull-padded-x-large'
	| 'pull-padded-x-small'
	| 'pull-padded-xx-large'
	| 'pull-padded-xx-small'
	| 'reverse'
	| 'vertical'
	| 'vertical-align-center'
	| 'vertical-align-end'
	| 'vertical-align-start'
	| 'vertical-reverse'
	| 'vertical-stretch';

export interface GridColumnProps {
	/** Additional class names applied to the column. */
	className?: string;
	/** Column content. */
	children?: ReactNode;
}

export class Column extends Component<GridColumnProps> {
	getClassName() {
		return classNames(this.props.className, 'slds-col');
	}

	render() {
		return <div className={this.getClassName()}>{this.props.children}</div>;
	}
}

export interface GridProps {
	/** Additional class names applied to the grid. */
	className?: string;
	/** Grid flavor, appended as `slds-grid_{flavor}`. */
	flavor?: GridFlavor;
	/** Grid content, typically `Grid.Column` elements. */
	children?: ReactNode;
}

class Grid extends Component<GridProps> {
	static Column = Column;

	getClassName() {
		const { flavor } = this.props;
		return classNames(this.props.className, 'slds-grid', {
			[`slds-grid_${flavor}`]: flavor,
		});
	}

	render() {
		return <div className={this.getClassName()}>{this.props.children}</div>;
	}
}

export default Grid;
