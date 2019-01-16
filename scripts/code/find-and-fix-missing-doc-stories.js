// WARNING: This script modifies source code!  Inspect all of the changes it makes before you commit anything!
// Run this with node to find storybook files that don't import
// all of the examples from __examples__.
// It will rewrite insert import statements and add "add" calls to the stories
// for any that aren't imported and write out the file to "storybooks-stories.jsx".
// Be sure to run `npm run lint:fix` to clean up formatting of any files this script touched.

// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const babel = require('@babel/core');
// eslint-disable-next-line import/no-extraneous-dependencies
const t = require('babel-types');
// eslint-disable-next-line import/no-extraneous-dependencies
const generator = require('babel-generator');

const babelRC = JSON.parse(fs.readFileSync('.babelrc'));
delete babelRC.ignore;
const babelOpts = babel.loadOptions(babelRC);

babelOpts.ast = true;

const path = require('path');

// Storybook stories
const storiesFor = (p) => path.join(p, '__docs__/storybook-stories.jsx');
// Returns storybook stories in path p
const componentStories = (p) => fs.readFileSync(storiesFor(p));
// Returns site stories in path p
const siteStories = (p) =>
	fs.readFileSync(path.join(p, '__docs__/site-stories.js'));
// Returns all example JSX files in path p
const componentExamples = (p) => glob.sync(path.join(p, '__examples__/*.jsx'));
// Return parsed code in buffer
const astFromBuffer = (buffer) => babel.parse(buffer.toString(), babelOpts);

// Reporting on Component Stories
// Filters code imports from ast
const importsFromAST = (ast) =>
	ast.program.body.filter((code) => code.type === 'ImportDeclaration');
// Predicate matches an example import path
const isExampleImport = (i) => i.source.value.match(/__examples__/);

// Helper for generating new import statements
function fileToImportName(fPath) {
	return (fPath.charAt(0).toUpperCase() + fPath.slice(1)).replace(
		/(-[a-z])/g,
		($1) => $1.toUpperCase().replace('-', '')
	);
}

// Generates code for a Storybook add, with a JSX component, on the end of a node
const createCallAddExpression = (node, description, cmpName) => {
	const args = [
		t.stringLiteral(description),
		t.arrowFunctionExpression(
			[],
			t.jSXElement(
				t.jSXOpeningElement(t.jSXIdentifier(cmpName), [], true),
				null,
				[],
				true
			)
		),
	];
	return t.callExpression(t.memberExpression(node, t.identifier('add')), args);
};

// Generates a default import statement for a doc site example component
const createDefaultImportStatement = (importVar, importPath) =>
	t.importDeclaration(
		[t.importDefaultSpecifier(t.identifier(importVar))],
		t.stringLiteral(importPath)
	);

const createAddDocsImportVisitor = (names) => ({
	// Inserts imports before the "storiesOf" expression
	ExpressionStatement(ePath) {
		if (ePath.parentPath.isProgram()) {
			// Make sure this is a top-level expression statement
			names.forEach((name) => {
				const importName = name.replace('.jsx', '');
				const importPath = `..${path.sep}${importName
					.split(path.sep)
					.slice(2, 4)
					.join(path.sep)}`;
				const importVar = fileToImportName(path.basename(importName));
				const code = createDefaultImportStatement(importVar, importPath);
				ePath.insertBefore(code);
			});
		}
	},
	// The files are structured such that "add" is the last call in the chain on "storiesOf"
	CallExpression(ePath) {
		if (
			ePath.parentPath.isExpressionStatement() &&
			ePath.node.arguments &&
			ePath.node.arguments[0].extra &&
			!ePath.node.arguments[0].extra.rawValue.match(/^Docs site/)
		) {
			let prevNode = ePath.node;
			let lastCall;
			names.forEach((name) => {
				const importName = name.replace('.jsx', '');
				const importVar = fileToImportName(path.basename(importName));
				lastCall = createCallAddExpression(
					prevNode,
					`Docs site ${importVar}`,
					importVar
				);
				prevNode = lastCall;
				return prevNode;
			});

			ePath.replaceWith(lastCall);
		}
	},
});

// The component storybook files
const components = glob.sync('components/*/');

components.forEach((cmp) => {
	try {
		siteStories(cmp); // Checks for existence of this
		const cmpStoriesAST = astFromBuffer(componentStories(cmp));
		const imports = importsFromAST(cmpStoriesAST).filter(isExampleImport);

		const isExampleImported = (ex) =>
			imports.some((i) => ex.includes(path.basename(i.source.value)));

		const examples = componentExamples(cmp);
		const isValid = examples.every(isExampleImported);
		if (!isValid) {
			const missing = examples.filter((e) => !isExampleImported(e));
			babel.traverse(cmpStoriesAST, createAddDocsImportVisitor(missing));
			const newBody = generator.default(cmpStoriesAST).code; // Note, this doesn't have good formatting, run prettier on the files afterward
			// eslint-disable-next-line no-console
			console.log(
				`${cmp} will get the following files added: \n\t${missing.join(
					',\n\t'
				)}`
			);
			fs.writeFileSync(storiesFor(cmp), newBody);
		}
	} catch (error) {
		if (
			error.code === 'ENOENT' &&
			error.path &&
			error.path.match(/storybook-stories/)
		) {
			// console.log(`No stories for: ${cmp}`);
		} else if (
			error.code === 'ENOENT' &&
			error.path &&
			error.path.match(/site-stories/)
		) {
			// console.log(`No site stories for: ${cmp}`);
		} else {
			// eslint-disable-next-line no-console
			console.log(`In component: ${cmp}`);
			// eslint-disable-next-line no-console
			console.log(error);
		}
	}
});
