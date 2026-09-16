/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { Component, type ReactNode } from 'react';
import classnames from 'classnames';

// ## Constants
import { PAGE_HEADER_CONTROL } from '../../../utilities/constants';

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
	 * Render prop for the actions column.
	 */
	onRenderActions?: () => ReactNode;
	/**
	 * Render prop for the controls column.
	 */
	onRenderControls?: () => ReactNode;
	/**
	 * Legacy content for the right/actions column.
	 */
	contentRight?: ReactNode;
	/**
	 * Legacy content for the right/controls column.
	 */
	navRight?: ReactNode;
}

class Controls extends Component<PageHeaderControlsProps> {
	static displayName = displayName;

	render() {
		let controls: ReactNode;
		let isUsingLegacyProp = false;
		let legacyControls: ReactNode;
		let vettedControls: ReactNode;

		if (this.props.type === 'actions') {
			if (this.props.onRenderActions) {
				controls = this.props.onRenderActions();
			} else if (this.props.contentRight) {
				controls = this.props.contentRight;
				isUsingLegacyProp = true;
			}
		} else if (this.props.onRenderControls) {
			controls = this.props.onRenderControls();
		} else if (this.props.navRight) {
			controls = this.props.navRight;
			isUsingLegacyProp = true;
		}

		if (controls) {
			const controlsElement = controls as React.ReactElement & {
				type?: { displayName?: string };
				props?: { children?: ReactNode };
			};
			if (
				controlsElement.type &&
				controlsElement.type.displayName === PAGE_HEADER_CONTROL
			) {
				vettedControls = controls;
			} else if (controlsElement.props && controlsElement.props.children) {
				const collected: ReactNode[] = [];

				React.Children.forEach(controlsElement.props.children, (child) => {
					const childElement = child as React.ReactElement & {
						type?: { displayName?: string };
					};
					if (
						childElement &&
						childElement.type &&
						childElement.type.displayName === PAGE_HEADER_CONTROL
					) {
						collected.push(child);
					}
				});
				vettedControls = collected;
			}

			// Backward compatibility for older 'contentRight' & 'navRight' structures.
			if (
				isUsingLegacyProp &&
				(!vettedControls ||
					(Array.isArray(vettedControls) && vettedControls.length < 1))
			) {
				if (typeof controls !== 'string') {
					legacyControls = (
						<div
							className="slds-page-header__controls"
							{...controlsElement.props}
						/>
					);
				} else {
					legacyControls = (
						<div className="slds-page-header__controls">{controls}</div>
					);
				}
			}

			return (
				<div
					className={classnames(
						`slds-page-header__col-${this.props.type}`,
						this.props.className
					)}
				>
					{legacyControls || (
						<div className="slds-page-header__controls">{vettedControls}</div>
					)}
				</div>
			);
		}

		return null;
	}
}

export default Controls;
