import React from 'react';

import {
	BUILDER_HEADER_TOOLBAR,
	BUTTON_GROUP,
} from '../../utilities/constants';

const BuilderHeaderToolbar = (props) => (
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
			aria-label={props.assistiveText && props.assistiveText.actions}
		>
			{props.onRenderActions && props.onRenderActions()}
		</div>
	</div>
);

BuilderHeaderToolbar.displayName = BUILDER_HEADER_TOOLBAR;
export default BuilderHeaderToolbar;
