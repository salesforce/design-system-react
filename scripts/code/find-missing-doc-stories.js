// Just run this with node to find storybook files that don't import
// all of the examples from __examples__
const glob = require('glob');
const fs = require('fs');
const babel = require('@babel/core');
const babelRC = JSON.parse(fs.readFileSync('.babelrc'));
delete babelRC.ignore;
const babelOpts = babel.loadOptions(babelRC);

babelOpts.ast = true;

const path = require('path');

const componentStories = p => fs.readFileSync(path.join(p, '__docs__/storybook-stories.jsx'));
const siteStories = p => fs.readFileSync(path.join(p, '__docs__/site-stories.js'));
const componentExamples = p => glob.sync(path.join(p, '__examples__/*.jsx'));
const astFromBuffer = buffer => babel.parse(buffer.toString(), babelOpts);
const importsFromAST = ast => ast.program.body.filter(code => code.type === 'ImportDeclaration');
const isExampleImport = i => i.source.value.match(/__examples__/);

// The component storybook files
const components = glob.sync('components/*/');

components.forEach(cmp => {
	try {
		siteStories(cmp); // Run to see if it blows up
		const code = componentStories(cmp);
		const ast = astFromBuffer(code);
		const imports = importsFromAST(ast).filter(isExampleImport);

		const isExampleImported = ex => imports.some(i => ex.includes(path.basename(i.source.value)));

		const examples = componentExamples(cmp);
		const isValid = examples.every(isExampleImported);
		if (!isValid) {
			const missing = examples.filter(e => !isExampleImported(e)).map(e => path.basename(e));
			console.log(`Invalid component: ${cmp} is missing ${missing.join(', ')}`);
		}
	} catch(error) {
		if (error.code === 'ENOENT' && error.path && error.path.match(/storybook-stories/)) {
			// console.log(`No stories for: ${cmp}`);
		} else if (error.code === 'ENOENT' && error.path && error.path.match(/site-stories/)) {
			// console.log(`No site stories for: ${cmp}`);
		} else {
			console.log(`In component: ${cmp}`);
			console.log(error);
		}
	}
})
