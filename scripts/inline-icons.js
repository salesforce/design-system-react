/* eslint-disable no-console, max-len */

import async from 'async';
import fs from 'fs-extra';
import path from 'path';
import xml2js from 'xml2js';

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

	const createIconFile = (symbol) => {
		const { id, ...data } = symbol;
		return [license, `export default ${JSON.stringify(data)};`, ''];
	};

	parseXml(text, (error, sprite) => {
		if (error) throw error;
		let viewBoxForOuterArray;
		async.each(
			sprite.svg.symbol,
			(symbol, iconDone) => {
				const iconName = symbol.id.toLowerCase();

				outputFile(
					`${spriteType}/${iconName}`,
					createIconFile(symbol),
					iconDone
				);

				// create sprite file of icons
				const { id, ...data } = symbol;
				if (typeof viewBoxForOuterArray === 'undefined') {
					viewBoxForOuterArray = symbol.viewBox;
				}
				const { viewBox, ...dataWithoutViewBox } = data;
				index.push(`${iconName}:${JSON.stringify(dataWithoutViewBox)},`);
			},
			(err) => {
				if (err) console.error(err);
			}
		);

		index.push(`viewBox:'${viewBoxForOuterArray}'`);
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
