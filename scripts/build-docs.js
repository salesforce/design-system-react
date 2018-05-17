/* eslint-disable no-console, max-len */
import { parse } from 'react-docgen';
import fs from 'fs';
import path from 'path';
import kebabCase from 'lodash.kebabcase';
import isEmpty from 'lodash.isempty';
import filter from 'lodash.filter';
import util from 'util';
import { parse as bParse } from 'babylon';
import { components } from '../package.json';

console.log(
	'# Generating docs based on `components` object in `package.json`. Please add any public components to this object.'
);

const output = {};
const outputAst = {};

/* eslint-disable no-console */
components.map((node) => {
	let dirName = __dirname.split('/');
	dirName.pop();
	dirName = dirName.join('/');

	let inputPath = path.join(__dirname, '../components', node.component);

	// If index.jsx is just a wrapping of the component, then use the [COMPONENT_NAME].jsx file for props.

	const inputPathUnwrapped = path.join(
		__dirname,
		'../components',
		node.component,
		'/',
		`${node.component}.jsx`
	);

	try {
		if (fs.lstatSync(inputPathUnwrapped).isFile()) {
			inputPath = inputPathUnwrapped;
		}
	} catch (error1) {
		try {
			if (fs.lstatSync(inputPath).isDirectory()) {
				inputPath = path.join(inputPath, 'index.jsx');
			}
		} catch (error2) {
			inputPath = `${inputPath}.jsx`;
		}
	}

	console.log(
		`\n================================================================================\n[ ${inputPath.replace(
			dirName,
			'.'
		)} ] `
	);

	const src = fs.readFileSync(inputPath, 'utf8');
	const doc = parse(src);
	const ast = bParse(src, {
		// parse in strict mode and allow module declarations
		sourceType: 'module',
		plugins: [
			// enable jsx and flow syntax
			'jsx',
			'objectRestSpread',
			'classProperties',
		],
	});
	const cleanRoute = kebabCase(node['display-name']);

	let dependencies = {};
	if (node.dependencies) {
		dependencies = node.dependencies.map((dependency) => {
			const toReturn = {};

			const depInputPathToUse = path.join(
				__dirname,
				'../components',
				node.component,
				'/',
				`${dependency.component}.jsx`
			);

			const depSrc = fs.readFileSync(depInputPathToUse, 'utf8');

			console.log(
				'  dependency input path:\n  ',
				util.inspect(depInputPathToUse.replace(dirName, '.'), {
					showHidden: true,
					depth: null,
					colors: true,
				})
			);

			let depDoc = {};
			try {
				depDoc = parse(depSrc);
				depDoc.name = dependency.component;
				depDoc.source = depInputPathToUse.replace(`${dirName}`, '');
				toReturn[dependency.component] = depDoc;
			} catch (err) {
				if (err) {
					console.log(
						'\n\n  ERROR: ./scripts/build-docs.js:106\n ',
						util.inspect(err.message, {
							showHidden: true,
							depth: null,
							colors: true,
						}),
						`\n  ${depInputPathToUse.replace(
							dirName,
							'.'
						)} is apparently not a valid JSX file...? This library uses https://github.com/reactjs/react-docgen to create its documentation. Please conform to code that is compatible with that library.\n\n`
					);
					process.exit(1);
				}
			}
			return toReturn;
		});
	}

	doc.route = cleanRoute;
	doc['display-name'] = node['display-name'];
	doc['SLDS-component-path'] = node['SLDS-component-path'];

	// Clean the dependencies
	const cleanDependencies = filter(dependencies, (object) => !isEmpty(object));

	doc.dependencies = cleanDependencies;

	ast.route = cleanRoute;
	ast['display-name'] = node['display-name'];
	ast['SLDS-component-path'] = node['SLDS-component-path'];
	ast.dependencies = dependencies;

	output[node.component.replace('forms/', '')] = doc;
	outputAst[node.component.replace('forms/', '')] = ast;
	return true;
});

const outputPath = path.join(__dirname, '../components/component-docs.json');

fs.writeFile(outputPath, JSON.stringify(output, null, 4), (err) => {
	if (err) {
		console.log(
			'  [ ERROR AT ./scripts/build-docs.js:139 ] err: ',
			util.inspect(err, { showHidden: true, depth: null, colors: true })
		);
	}
});

// FOR DEBUGGING

// const outputAstPath = path.join(__dirname, '../examples/components-ast.json');
// fs.writeFile(outputAstPath, JSON.stringify(outputAst, null, 4), (err) => {
// 	if (err) {
// 		console.log('  [ ERROR AT ./scripts/build-docs.js:145 ] err: ', util.inspect(err, { showHidden: true, depth: null, colors: true }));
// 	}
// });
