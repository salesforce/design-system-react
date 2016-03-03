var isReactModuleName = require('react-docgen/dist/utils/isReactModuleName');
var match = require('react-docgen/dist/utils/match');
var resolveToModule = require('react-docgen/dist/utils/resolveToModule');
var recast = require('recast');

var types = recast.types.namedTypes;

module.exports = function isReactRenderObject(path) {
	if (types.ExpressionStatement.check(path.node)) {
		path = path.get('expression');
	}

	function isRenderMethod(node) {
		return types.Property.check(node) && 
		!node.computed && 
		(node.kind === '' || node.kind === 'init') && 
		node.key.name === 'render';
	}

	if (!(path.node && types.ObjectExpression.check(path.node) && path.node.properties.some(isRenderMethod))) {
		return false;
	}

	var module = 'react';
	return Boolean(module && isReactModuleName(module));
}
