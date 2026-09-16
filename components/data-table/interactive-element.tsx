/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, ComponentType } from 'react';
import Mode from './private/mode';
import CellContext from './private/cell-context';
import TableContext, { TableContextValue } from './private/table-context';

import generateId from '../../utilities/generate-id';

/**
 * Wrapper for interactive elements in the table.
 *
 * The Advanced Data Table implements keyboard navigation as described in Data Tables.
 * This wrapper controls an element's focus and `tabIndex` behavior.
 *
 * The wrapped element must accept the props:
 *  `onFocus`: Callback for when the element is focused.
 *  `onRequestFocus`: Trigger to indicate that this element should be focused.
 *  `requestFocus`: This wrapper overrides the `requestFocus` prop and provides its own value.
 *  `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createInteractiveElement(WrappedElement: ComponentType<any>): any {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	class InteractiveElement extends Component<any> {
		elementId: string;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		constructor(props: any) {
			super(props);
			this.elementId = generateId();
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onFocus(tableContext: TableContextValue, ...args: any[]) {
			if (tableContext.activeElement !== this.elementId) {
				tableContext.changeActiveElement(this.elementId);
			}
			if (this.props.onFocus) {
				this.props.onFocus(...args);
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onRequestFocus(tableContext: TableContextValue, node: HTMLElement, ...args: any[]) {
			if (tableContext.tableHasFocus) {
				node.focus();
				if (this.props.onRequestFocus) {
					this.props.onRequestFocus(...args);
				}
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onOpen(tableContext: TableContextValue, ...args: any[]) {
			tableContext.setAllowKeyboardNavigation(false);
			if (this.props.onOpen) {
				this.props.onOpen(...args);
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onClose(tableContext: TableContextValue, ...args: any[]) {
			tableContext.setAllowKeyboardNavigation(true);
			if (this.props.onClose) {
				this.props.onClose(...args);
			}
		}

		override render() {
			const { onFocus, onRequestFocus, onOpen, onClose } = this;
			return (
				<TableContext.Consumer>
					{(tableContext) => (
						<CellContext.Consumer>
							{(cellContext) => {
								tableContext.registerInteractiveElement(
									cellContext.rowIndex,
									cellContext.columnIndex,
									this.elementId
								);
								const requestFocus =
									tableContext.mode === Mode.ACTIONABLE &&
									tableContext.activeElement === this.elementId;
								const tabIndex =
									tableContext.mode === Mode.ACTIONABLE ? 0 : -1;
								const keyboardNavProps = tableContext.allowKeyboardNavigation
									? {
											onFocus: onFocus.bind(this, tableContext),
											onRequestFocus: onRequestFocus.bind(this, tableContext),
											requestFocus,
											tabIndex,
									  }
									: {};
								return (
									<WrappedElement
										{...{
											...this.props,
											...{
												onOpen: onOpen.bind(this, tableContext),
												onClose: onClose.bind(this, tableContext),
											},
											...keyboardNavProps,
										}}
									/>
								);
							}}
						</CellContext.Consumer>
					)}
				</TableContext.Consumer>
			);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(InteractiveElement as any).displayName = `InteractiveElement${
		WrappedElement.displayName || 'Unknown'
	}`;

	return InteractiveElement;
}
