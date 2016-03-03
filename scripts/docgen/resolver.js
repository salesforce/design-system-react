/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/*  This is a custom resolver for react-docgen that takes an abstract syntax tree 
 * (AST) path and detects if it is the following pattern:
 * 
 * const ComponentObject = {
 * 	render: function () {
 *  }
 * };
 *
 * For more information, visit https://github.com/reactjs/react-docgen#resolver
 *
 */

var isExportsOrModuleAssignment = require('react-docgen/dist/utils/isExportsOrModuleAssignment');
var isReactComponentClass = require('react-docgen/dist/utils/isReactComponentClass');
var isReactCreateClassCall = require('react-docgen/dist/utils/isReactCreateClassCall');
var isStatelessComponent = require('react-docgen/dist/utils/isStatelessComponent');
var normalizeClassDefinition = require('react-docgen/dist/utils/normalizeClassDefinition');
var resolveExportDeclaration = require('react-docgen/dist/utils/resolveExportDeclaration');
var resolveToValue = require('react-docgen/dist/utils/resolveToValue');

// Custom AST path/node detecting function
var isObjectWithRenderMethod = require('./isObjectWithRenderMethod');

var ERROR_MULTIPLE_DEFINITIONS =
	'Multiple exported component definitions found.';

function ignore() {
	return false;
}

function isComponentDefinition(path) {
	return isReactCreateClassCall(path) || 
		isReactComponentClass(path) || 
		isStatelessComponent(path) || 
		isObjectWithRenderMethod(path);
}

function resolveDefinition(definition, types) {
	var newDefinition = null;
	if (isObjectWithRenderMethod(definition)) {
		newDefinition = definition;
	} else if (isReactCreateClassCall(definition)) {
		var resolvedPath = resolveToValue(definition.get('arguments', 0));
		if (types.ObjectExpression.check(resolvedPath.node)) {
			newDefinition = resolvedPath;
		}
	} else if (isReactComponentClass(definition)) {
		normalizeClassDefinition(definition);
		newDefinition = definition;
	} else if (isStatelessComponent(definition)) {
		newDefinition = definition;
	}

	return newDefinition;
}

// `findExportedComponentDefinition` is specified by the API of react-docgen

module.exports = function findExportedComponentDefinition(ast, recast) {
	var types = recast.types.namedTypes;
	var definition;

	function exportDeclaration(path) {
		var definitions = resolveExportDeclaration(path, types)
			.filter(isComponentDefinition);

		if (definitions.length === 0) {
			return false;
		}
		if (definitions.length > 1 || definition) {
			// If a file exports multiple components, ... complain!
			throw new Error(ERROR_MULTIPLE_DEFINITIONS);
		}
		definition = resolveDefinition(definitions[0], types);
		return false;
	}

	// The following callbacks inspect their AST type. We only care about `visitAssignmentExpression`.

	recast.visit(ast, {
		visitFunctionDeclaration: ignore,
		visitFunctionExpression: ignore,
		visitClassDeclaration: ignore,
		visitClassExpression: ignore,
		visitIfStatement: ignore,
		visitWithStatement: ignore,
		visitSwitchStatement: ignore,
		visitCatchCause: ignore,
		visitWhileStatement: ignore,
		visitDoWhileStatement: ignore,
		visitForStatement: ignore,
		visitForInStatement: ignore,

		visitExportDeclaration: exportDeclaration,
		visitExportNamedDeclaration: exportDeclaration,
		visitExportDefaultDeclaration: exportDeclaration,

		visitAssignmentExpression: function(path) {
			// Ignore anything that is not `exports.X = ...;` or
			// `module.exports = ...;`
			if (!isExportsOrModuleAssignment(path)) {
				return false;
			}
			// Resolve the value of the right hand side. It should resolve to a call
			// expression, something like React.createClass
			path = resolveToValue(path.get('right'));
			if (!isComponentDefinition(path)) {
				return false;
			}
			if (definition) {
				// If a file exports multiple components, ... complain!
				throw new Error(ERROR_MULTIPLE_DEFINITIONS);
			}
			definition = resolveDefinition(path, types);
			return false;
		},
	});

	return definition;
}
