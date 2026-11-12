import React, { useEffect, type ReactNode } from 'react';

import { BUILDER_HEADER_TOOLBAR } from '../../utilities/constants';
import isElementOfType from '../../utilities/is-element-of-type';
import type { ChildrenOf } from '../../types/common';
import ButtonGroup, { type ButtonGroupProps } from '../button-group';
import checkProps from './check-props';
import componentDoc from './component.json';

export interface BuilderHeaderToolbarAssistiveText {
	/** Used for the aria-label for the actions section of the toolbar. */
	actions?: string;
}

export interface BuilderHeaderToolbarProps {
	/**
	 * Content rendered in the actions section of the toolbar, such as save or undo buttons.
	 */
	actions?: ReactNode;
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `actions`: Used for the aria-label for the actions section of the toolbar.
	 * * _Tested with snapshot testing._
	 */
	assistiveText?: BuilderHeaderToolbarAssistiveText;
	/**
	 * Provide children of the type `<ButtonGroup />` to define the structure of the toolbar section.
	 * ```
	 * <BuilderHeader>
	 *   <BuilderHeaderToolbar>
	 *     <ButtonGroup />
	 *     <ButtonGroup />
	 *   </BuilderHeaderToolbar>
	 * </BuilderHeader>
	 * ```
	 * Other children are ignored.
	 */
	children?: ChildrenOf<ButtonGroupProps>;
	/** @deprecated Use `actions` instead. */
	onRenderActions?: () => ReactNode;
}

const defaultAssistiveText: BuilderHeaderToolbarAssistiveText = {
	actions: 'Actions',
};

/**
 * The toolbar section of the header.
 */
const BuilderHeaderToolbar = ({
	actions,
	assistiveText = defaultAssistiveText,
	children,
	onRenderActions,
}: BuilderHeaderToolbarProps): React.ReactElement => {
	useEffect(() => {
		checkProps(BUILDER_HEADER_TOOLBAR, { onRenderActions }, componentDoc);
	}, [onRenderActions]);

	const mergedAssistiveText = {
		...defaultAssistiveText,
		...assistiveText,
	};
	return (
		<div className="slds-builder-toolbar" role="toolbar">
			{React.Children.map(children, (child) => {
				if (isElementOfType<ButtonGroupProps>(child, ButtonGroup)) {
					return (
						<div
							className="slds-builder-toolbar__item-group"
							// `label` isn't a ButtonGroup prop (ButtonGroup ignores it);
							// the toolbar reads it as the group's accessible name
							aria-label={(child.props as { label?: string }).label}
						>
							{child}
						</div>
					);
				}
				return null;
			})}
			<div
				className="slds-builder-toolbar__actions"
				aria-label={mergedAssistiveText.actions}
			>
				{actions ?? onRenderActions?.()}
			</div>
		</div>
	);
};

BuilderHeaderToolbar.displayName = BUILDER_HEADER_TOOLBAR;

export default BuilderHeaderToolbar;
