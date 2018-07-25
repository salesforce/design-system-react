/* eslint-env node */
const express = require('express');
const path = require('path');

const expressMiddleWare = (router) => {
	router.use(
		'/assets',
		express.static(
			path.join(
				__dirname,
				'../node_modules/@salesforce-ux/design-system/assets/'
			)
		)
	);
	router.use(
		'/assets',
		express.static(
			path.join(
				__dirname,
				'../assets/'
			)
		)
	);
};

module.exports = expressMiddleWare;
