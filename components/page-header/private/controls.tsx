/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component, type ReactNode } from 'react';
import classnames from 'classnames';

import PageHeaderControl from '../control';
import isElementOfType from '../../../utilities/is-element-of-type';

const displayName = 'PageHeaderControls';

export interface PageHeaderControlsProps {
	/**
	 * Optional class name
	 */
	className?: unknown[] | Record<string, unknown> | string;
	/**
	 * Type of this controls component ('actions' or 'controls')
	 */
	type?: 'actions' | 'controls';
	/**
	 * Content for the actions column.
	 */
	actions?: ReactNode;
	/**
	 * Content for the controls column.
	 */
	controls?: ReactNode;
}

class Controls extends Component<PageHeaderControlsProps> {
	static displayName = displayName;

	render() {
		const controls =
			this.props.type === 'actions' ? this.props.actions : this.props.controls;
		let vettedControls: ReactNode;

		if (controls) {
			const controlsElement = controls as React.ReactElement & {
				props?: { children?: ReactNode };
			};
			if (isElementOfType(controls, PageHeaderControl)) {
				vettedControls = controls;
			} else if (controlsElement.props && controlsElement.props.children) {
				const collected: ReactNode[] = [];

				React.Children.forEach(controlsElement.props.children, (child) => {
					if (isElementOfType(child, PageHeaderControl)) {
						collected.push(child);
					}
				});
				vettedControls = collected;
			}

			return (
				<div
					className={classnames(
						`slds-page-header__col-${this.props.type}`,
						this.props.className
					)}
				>
					<div className="slds-page-header__controls">{vettedControls}</div>
				</div>
			);
		}

		return null;
	}
}

export default Controls;
