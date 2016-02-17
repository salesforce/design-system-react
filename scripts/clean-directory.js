/* Deletes all files and folders within the path passed to it. Use with caution! */

'use strict';
const targetFolder = process.argv[2];
const fs = require('fs');
const removeDirectory = function (dirPath) {
	let files;
	try {
		files = fs.readdirSync(dirPath);
	} catch (e) {
		return;
	}
	if (files.length > 0) {
		for (let i = 0; i < files.length; i++) {
			const filePath = dirPath + '/' + files[i];
			if (fs.statSync(filePath).isFile()) {
				fs.unlinkSync(filePath);
			} else {
				removeDirectory(filePath);
			}
		}
	}
	fs.rmdirSync(dirPath);
};

removeDirectory(targetFolder);
