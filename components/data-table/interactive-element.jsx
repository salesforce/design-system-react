import React from 'react';
import shortid from 'shortid';
import { Mode } from './index';
import CellContext from './private/cell-context';

/**
 * Wrapper for interactive elements in the table. The wrapped element must accept the props:
 *  `onFocus`: Callback for when the element is focused.
 *  `onRequestFocus`: Trigger to indicate that this element should be focused.
 *  `requestFocus`: This wrapper overrides the `requestFocus` prop and provides its own value.
 *  `tabIndex`: This wrapper overrides the `tabIndex` prop and provides its own value.
 */
export default (WrappedElement) => class InteractiveElement extends React.Component {
	componentWillMount() {
		this.elementId = shortid.generate();
	}

	onFocus(context, ...args) {
		if (context.activeElement !== this.elementId) {
			context.changeActiveElement(this.elementId);
		}
		if (this.props.onFocus) {
			this.props.onFocus(context, ...args);
		}
	}

	onRequestFocus(node, ...args) {
		node.focus();
		if (this.props.onRequestFocus) {
			this.props.onRequestFocus(node, ...args);
		}
	}

	render() {
		const onFocus = this.onFocus;
		const onRequestFocus = this.onRequestFocus;
		return (
			<CellContext.Consumer>
				{(context) => {
					context.registerInteractiveElement(context.rowIndex, context.columnIndex, this.elementId);

					let requestFocus = false;
					if (context.mode === Mode.ACTIONABLE && context.activeElement === this.elementId) {
						requestFocus = true;
					}
					let tabIndex = '-1';
					if (context.mode === Mode.ACTIONABLE) {
						tabIndex = '0';
					}

					return <WrappedElement {
						...{
							...this.props,
							...{
								onFocus: onFocus.bind(this, context),
								onRequestFocus: onRequestFocus.bind(this),
								requestFocus,
								tabIndex
							}
						}
					} />;
				}}
			</CellContext.Consumer>
		);
	}
}
