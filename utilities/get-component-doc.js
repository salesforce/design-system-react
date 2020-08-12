/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

let getComponentDocFn = function getComponentDocFnEmpty() {};

const baseURL = 'https://react.lightningdesignsystem.com';

if (process.env.NODE_ENV !== 'production') {
	getComponentDocFn = function getComponentDocFnInside(jsonDoc) {
		const componentUrl = `${
			baseURL +
			(jsonDoc && jsonDoc['url-slug']
				? `/components/${jsonDoc['url-slug']}`
				: '')
		}`;
		return (propName) =>
			`Please check the current documentation at: ${
				propName ? `${componentUrl}#prop-${propName}` : componentUrl
			}`;
	};
}

export default getComponentDocFn;
