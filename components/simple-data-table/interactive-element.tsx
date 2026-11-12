/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { Component, ComponentType } from 'react';
import Mode from './private/mode';
import CellContext from './private/cell-context';
import TableContext, { TableContextValue } from './private/table-context';

import generateId from '../../utilities/generate-id';

const FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

// `forwardRef` components take a `ref` to their DOM node instead of the `requestFocus` props
const forwardsRef = (component: unknown): boolean =>
	typeof component === 'object' &&
	component !== null &&
	(component as { $$typeof?: symbol }).$$typeof === FORWARD_REF_TYPE;

/**
 * Wrapper for interactive elements in the table.
 *
 * The Advanced Data Table implements keyboard navigation as described in Data Tables.
 * This wrapper controls an element's focus and `tabIndex` behavior.
 *
 * The wrapped element must accept the props:
 *  `onFocus`: Callback for when the element is focused.
 *  `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
 *
 * The wrapper focuses the element when it becomes the table's active element. A `forwardRef`
 * component (Button, Checkbox) is focused through its `ref`, which must point at the focusable
 * node. Any other component instead receives `requestFocus` (`true` when it should take focus)
 * and `onRequestFocus(node)`, which it calls with the node to focus. `onRequestFocus` passed to
 * the wrapper is called after the element is focused.
 */
export default function createInteractiveElement(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	WrappedElement: ComponentType<any>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	class InteractiveElement extends Component<any> {
		elementId: string;

		usesRef = forwardsRef(WrappedElement);

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

		onRequestFocus(
			tableContext: TableContextValue,
			node: HTMLElement,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			...args: any[]
		) {
			if (tableContext.tableHasFocus) {
				node.focus();
				if (this.props.onRequestFocus) {
					this.props.onRequestFocus(...args);
				}
			}
		}

		// A new callback each render, so React calls it after every render, like the
		// `requestFocus` effect the wrapped components used to run.
		getFocusRef(tableContext: TableContextValue, requestFocus: boolean) {
			return (node: HTMLElement | null) => {
				if (node && requestFocus) {
					this.onRequestFocus(tableContext, node);
				}
			};
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
								const tabIndex = tableContext.mode === Mode.ACTIONABLE ? 0 : -1;
								const focusProps = this.usesRef
									? { ref: this.getFocusRef(tableContext, requestFocus) }
									: {
											onRequestFocus: onRequestFocus.bind(this, tableContext),
											requestFocus,
										};
								const keyboardNavProps = tableContext.allowKeyboardNavigation
									? {
											onFocus: onFocus.bind(this, tableContext),
											...focusProps,
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
