/* eslint-disable no-console, max-len */

import async from 'async';
import fs from 'fs-extra';
import path from 'path';
import xml2js from 'xml2js';
import omit from 'lodash.omit';

console.log('# Building the inline SVG icons');

const outputFile = (filename, data, done) => {
	const outputPath = path.join(__dirname, '../icons/', `${filename}.js`);

	fs.outputFile(outputPath, data.join('\n'), done);
};

const parseXml = (string, done) => {
	xml2js.parseString(
		string,
		{
			emptyTag: {},
			explicitArray: false,
			mergeAttrs: true,
		},
		done
	);
};

const inlineIcons = (spriteType, done) => {
	const inputPath = path.join(
		__dirname,
		'../node_modules/@salesforce-ux/icons/dist/salesforce-lightning-design-system-icons',
		`${spriteType}-sprite`,
		'svg/symbols.svg'
	);

	const text = fs.readFileSync(inputPath, 'utf8');

	const license = `/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

`;

	// This string replacement includes icons in the bundle. The default condition is an equality comparison of two constants, `'__EXCLUDE_SLDS_ICONS__' === '__INCLUDE_SLDS_ICONS__'`, which will allow minification to remove the inline icons and save 100KBs in size when bundling for production.
	const index = [
		license,
		"let icons = {}; if ('__EXCLUDE_SLDS_ICONS__' === '__INCLUDE_SLDS_ICONS__') { icons = {",
	];

	parseXml(text, (error, sprite) => {
		if (error) throw error;

		let viewBox;
		async.each(
			sprite.svg.symbol,
			(symbol, iconDone) => {
				let data = omit(symbol, ['id']);
				const iconName = symbol.id.toLowerCase();

				const icon = [license, `export default ${JSON.stringify(data)};`, ''];

				outputFile(`${spriteType}/${iconName}`, icon, iconDone);

				if (!viewBox) viewBox = data.viewBox;
				data = omit(data, ['viewBox']);
				index.push(`${iconName}:${JSON.stringify(data)},`);
			},
			(err) => {
				if (err) console.error(err);
			}
		);

		index.push(`viewBox:'${viewBox}'`);
		index.push('}; } export default icons;');
		index.push('');
		outputFile(`${spriteType}/index`, index, done);
	});
};

async.each(
	['utility', 'action', 'custom', 'doctype', 'standard'],
	inlineIcons,
	(err) => {
		if (err) console.error(err);
	}
);
