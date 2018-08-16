/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

let getComponentDocFn = function () {};

if (process.env.NODE_ENV !== 'production') {
	getComponentDocFn = function (jsonDoc) {
		jsonDoc.componentUrl = `https://react.lightningdesignsystem.com/components/${
			jsonDoc['url-slug']
		}`;
		return (propName) =>
			`Please check the current documentation at: ${
				propName
					? `${jsonDoc.componentUrl}#prop-${propName}`
					: jsonDoc.componentUrl
			}`;
	};
}

export default getComponentDocFn;
