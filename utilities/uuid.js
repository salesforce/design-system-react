// Get a universally unique identifier
let lastId = 0;
module.exports = function uuid(prefix='id') {
	return `${prefix}-${lastId++}`;
}
