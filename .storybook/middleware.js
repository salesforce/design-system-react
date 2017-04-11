/* eslint-env node */
const express = require('express');
const path = require('path');

const expressMiddleWare = (router) => {
	router.use('/assets/icons',
		express.static(
			path.join(__dirname,
			'../node_modules/@salesforce-ux/icons/dist/salesforce-lightning-design-system-icons/')
		)
	);
};

module.exports = expressMiddleWare;
