const keys = {
	A: 65,
	ENTER: 13,
	ESCAPE: 27,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	TAB: 9,
	DELETE: 46,
	BACKSPACE: 8,
	METALEFT: 91,
	METARIGHT: 93,
	CTRL: 17,
};

// Helpful for interaction/event tests. Use with simulate:
// `nodes.input.simulate('keyDown', keyObjects.DOWN);`
const keyObjects = {
	A: { key: 'A', keyCode: keys.A, which: keys.A },
	ENTER: { key: 'Enter', keyCode: keys.ENTER, which: keys.ENTER },
	ESCAPE: { key: 'Escape', keyCode: keys.ESCAPE, which: keys.ESCAPE },
	SPACE: { key: 'Space', keyCode: keys.SPACE, which: keys.SPACE },
	LEFT: { key: 'Left', keyCode: keys.LEFT, which: keys.LEFT },
	UP: { key: 'Up', keyCode: keys.UP, which: keys.UP },
	RIGHT: { key: 'Right', keyCode: keys.RIGHT, which: keys.RIGHT },
	DOWN: { key: 'Down', keyCode: keys.DOWN, which: keys.DOWN },
	TAB: { key: 'Tab', keyCode: keys.TAB, which: keys.TAB },
	DELETE: { key: 'Delete', keyCode: keys.DELETE, which: keys.DELETE },
	BACKSPACE: {
		key: 'Backspace',
		keyCode: keys.BACKSPACE,
		which: keys.BACKSPACE,
	},
	METALEFT: { key: 'Meta', keyCode: keys.METALEFT, which: keys.METALEFT },
	METARIGHT: { key: 'Meta', keyCode: keys.METARIGHT, which: keys.METARIGHT },
	CTRL: { key: 'Control', keyCode: keys.CTRL, which: keys.CTRL },
};

export default keys;
export { keyObjects };
