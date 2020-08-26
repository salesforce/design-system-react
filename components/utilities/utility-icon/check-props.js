/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import urlExists from '../../../utilities/warning/url-exists';
import { DIRECTIONS } from '../UNSAFE_direction';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props) {
		if (
			!props.context[`${props.category}Sprite`] &&
			!props.context.onRequestIconPath
		) {
			const modifiedPath = props.path || props.context.iconPath;
			const svgAssetName =
				props.direction === DIRECTIONS.RTL ? 'symbols-rtl.svg' : 'symbols.svg';
			urlExists(
				COMPONENT,
				`${modifiedPath}/${props.category}-sprite/svg/${svgAssetName}#${props.name}`
			);
		}
	};
}

export default checkProps;
