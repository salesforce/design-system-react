import fs from 'fs';
import path from 'path';

console.log('\n\n=========================================================');
console.log('Checking component docs JSON for empty strings');
console.log('=========================================================\n');

const rootRelative = (filename) => path.resolve(__dirname, '../', filename);
const parseJSON = (filename) =>
	JSON.parse(fs.readFileSync(rootRelative(filename)).toString());
const docs = parseJSON('components/component-docs.json');

const mapObject = (obj, callback) =>
	Object.keys(obj).reduce((accumulator, key) => {
		accumulator[key] = callback(obj[key]);
		return accumulator;
	}, {});

const deepMap = (obj, callback) => {
	const deepMapper = (val) => {
		if (val !== undefined && val !== null) {
			typeof val === 'object' ? deepMap(val, callback) : callback(val);
		}
	};

	if (Array.isArray(obj)) {
		return obj.map(deepMapper);
	} else if (typeof obj === 'object') {
		return mapObject(obj, deepMapper);
	}

	return obj;
};

deepMap(docs, (value) => {
	if (value === '') {
		console.log('EMPTY STRING FOUND!');
		console.log(
			'`components/component-docs.json` has a an empty string in it. All component and component PropTypes should have a description. Please `npm run build-docs` and review `components/component-docs.json` for empty strings, "".'
		);
		console.log(
			'* All descriptions must start with `/**` and be placed directly above a PropType or the class declaration.'
		);
		console.log(
			'* For top-level components, please review the component description at https://www.lightningdesignsystem.com/.'
		);
		process.exit(1);
	}
});
