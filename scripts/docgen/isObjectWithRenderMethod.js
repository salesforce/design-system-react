/* This module takes an abstract syntax tree (AST) path and detects 
 * if it is the following pattern:
 * 
 * const ComponentObject = {
 * 	render: function () {
 *  }
 * };
 *
 * For more information, visit https://github.com/reactjs/react-docgen
 *
 */

var isReactModuleName = require('react-docgen/dist/utils/isReactModuleName');
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
