import React, { useEffect, type ReactNode } from 'react';

import {
	BUILDER_HEADER_TOOLBAR,
	BUTTON_GROUP,
} from '../../utilities/constants';
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
	 */
	children?: ReactNode;
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
				if (
					React.isValidElement(child) &&
					(child.type as { displayName?: string }).displayName === BUTTON_GROUP
				) {
					return (
						<div
							className="slds-builder-toolbar__item-group"
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
