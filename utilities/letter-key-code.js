const keys = {};

// Helpful for interaction/event tests. Use with simulate:
// `nodes.input.simulate('keyDown', keyObjects.DOWN);`
const keyObjects = {};

for (let i = 65; i <= 122; i++) {
	keys[String.fromCharCode(i)] = i;
	keyObjects[`${String.fromCharCode(i)}`] = { key: `${String.fromCharCode(i)}`, keyCode: i, which: i };
}

export default keys;
export { keyObjects };
