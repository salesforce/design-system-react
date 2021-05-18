/* eslint-disable fp/no-rest-parameters */
import React from 'react';
import shortid from 'shortid';
import Mode from './private/mode';
import CellContext from './private/cell-context';
import TableContext from './private/table-context';

/**
 * Wrapper for interactive elements in the table.
 *
 * The Advanced Data Table implements keyboard navigation as described in [Data Tables](https://www.lightningdesignsystem.com/components/data-tables/).
 * This wrapper controls an element's focus and `tabIndex` behavior so that it is consistent with the spec.
 *
 * The wrapped element must accept the props:
 *  `onFocus`: Callback for when the element is focused.
 *  `onRequestFocus`: Trigger to indicate that this element should be focused.
 *  `requestFocus`: This wrapper overrides the `requestFocus` prop and provides its own value.
 *  `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
 */
export default (WrappedElement) => {
	class InteractiveElement extends React.Component {
		constructor(props) {
			super(props);
			this.elementId = shortid.generate();
		}

		onFocus(tableContext, ...args) {
			if (tableContext.activeElement !== this.elementId) {
				tableContext.changeActiveElement(this.elementId);
			}
			if (this.props.onFocus) {
				this.props.onFocus(...args);
			}
		}

		onRequestFocus(tableContext, node, ...args) {
			if (tableContext.tableHasFocus) {
				node.focus();
				if (this.props.onRequestFocus) {
					this.props.onRequestFocus(...args);
				}
			}
		}

		onOpen(tableContext, ...args) {
			tableContext.setAllowKeyboardNavigation(false);
			if (this.props.onOpen) {
				this.props.onOpen(...args);
			}
		}

		onClose(tableContext, ...args) {
			tableContext.setAllowKeyboardNavigation(true);
			if (this.props.onClose) {
				this.props.onClose(...args);
			}
		}

		render() {
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
									tableContext.mode === Mode.ACTIONABLE ? '0' : '-1';
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
	InteractiveElement.displayName = `InteractiveElement${WrappedElement.displayName}`;
	return InteractiveElement;
};
