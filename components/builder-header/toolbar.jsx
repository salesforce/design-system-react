import React from 'react';
import PropTypes from 'prop-types';

import {
	BUILDER_HEADER_TOOLBAR,
	BUTTON_GROUP,
} from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `actions`: Used for the aria-label for the actions section of the toolbar.
	 * * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		actions: PropTypes.string,
	}),
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
	children: PropTypes.node,
	/**
	 * Renders the actions section of the header.
	 */
	onRenderActions: PropTypes.func,
};

const defaultProps = {
	assistiveText: {
		actions: 'Actions',
	},
};

/**
 * The toolbar section of the header.
 */
const BuilderHeaderToolbar = (props) => {
	const assistiveText = {
		...defaultProps.assistiveText,
		...props.assistiveText,
	};
	return (
		<div className="slds-builder-toolbar" role="toolbar">
			{React.Children.map(props.children, (child) => {
				if (child.type.displayName === BUTTON_GROUP) {
					return (
						<div
							className="slds-builder-toolbar__item-group"
							aria-label={child.props.label}
						>
							{child}
						</div>
					);
				}
				return null;
			})}
			<div
				className="slds-builder-toolbar__actions"
				aria-label={assistiveText.actions}
			>
				{props.onRenderActions && props.onRenderActions()}
			</div>
		</div>
	);
};

BuilderHeaderToolbar.displayName = BUILDER_HEADER_TOOLBAR;
BuilderHeaderToolbar.propTypes = propTypes;
BuilderHeaderToolbar.defaultProps = defaultProps;
export default BuilderHeaderToolbar;
