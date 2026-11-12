/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';

const renamedProps = [
	['containerClassName', 'classNameContainer'],
	['contentClassName', 'classNameContent'],
	['contentStyle', 'styleContent'],
	['footerClassName', 'classNameFooter'],
	['headerClassName', 'classNameHeader'],
	['portalClassName', 'classNamePortal'],
];

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props = {}, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);

		renamedProps.forEach(([oldProp, newProp]) => {
			deprecatedProperty(
				COMPONENT,
				props[oldProp],
				oldProp,
				newProp,
				createDocUrl(newProp)
			);
		});
	};
}

export default checkProps;
