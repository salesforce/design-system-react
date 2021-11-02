/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import hasChildrenWithoutDisplayNameof from '../../utilities/warning/has-children-without-display-name-of';
import getComponentDocFn from '../../utilities/get-component-doc';
import renderFunctionReturnContentsLackDisplayName from '../../utilities/warning/render-function-return-contents-lack-display-name';

import {
	ICON,
	PROGRESS_INDICATOR,
	SETUP_ASSISTANT,
	SETUP_ASSISTANT_STEP,
} from '../../utilities/constants';

let checkProps = () => {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = (COMPONENT, props, jsonDoc) => {
		const createDocUrl = getComponentDocFn(jsonDoc);

		if (COMPONENT === SETUP_ASSISTANT) {
			hasChildrenWithoutDisplayNameof(
				COMPONENT,
				props.children,
				SETUP_ASSISTANT_STEP,
				createDocUrl()
			);
		}

		if (COMPONENT === SETUP_ASSISTANT_STEP && props.onRenderFigure) {
			renderFunctionReturnContentsLackDisplayName(
				COMPONENT,
				'onRenderFigure',
				props.onRenderFigure(),
				[ICON, PROGRESS_INDICATOR]
			);
		}
	};
}

export default checkProps;
