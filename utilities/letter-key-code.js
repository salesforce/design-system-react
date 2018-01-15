define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var keys = {};

	// Helpful for interaction/event tests. Use with simulate:
	// `nodes.input.simulate('keyDown', keyObjects.DOWN);`
	var keyObjects = {};

	for (var i = 65; i <= 122; i++) {
		keys[String.fromCharCode(i)] = i;
		keyObjects["" + String.fromCharCode(i)] = {
			key: "" + String.fromCharCode(i),
			keyCode: i,
			which: i
		};
	}

	exports.default = keys;
	exports.keyObjects = keyObjects;
});