const keys = {};

// Helpful for interaction/event tests. Use with simulate:
// `nodes.input.simulate('keyDown', keyObjects.DOWN);`
const keyObjects = {};

// eslint-disable-next-line fp/no-loops
for (let i = 65; i <= 122; i += 1) {
	keys[String.fromCharCode(i)] = i;
	keyObjects[`${String.fromCharCode(i)}`] = {
		key: `${String.fromCharCode(i)}`,
		keyCode: i,
		which: i,
	};
}

export default keys;
export { keyObjects };
