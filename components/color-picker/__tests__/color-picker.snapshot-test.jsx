import React from 'react';
import renderer from 'react-test-renderer';

import ColorPicker from '../../color-picker';

test('ColorPicker Base DOM Snapshot', () => {
	const domTree = renderer
		.create(<ColorPicker id='color-picker' className="test_class_name" />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Menu Open DOM Snapshot', () => {
	const domTree = renderer
		.create(<ColorPicker id='color-picker' classNameMenu="test_class_name_menu" isOpen />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Menu Disabled DOM Snapshot', () => {
	const domTree = renderer.create(<ColorPicker id='color-picker' disabled />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Error Text', () => {
	const domTree = renderer
		.create(<ColorPicker id='color-picker' errorText="Outer input in error mode" />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Custom Variant', () => {
	const domTree = renderer.create(<ColorPicker id='color-picker' variant="custom" />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Swatches Variant', () => {
	const domTree = renderer.create(<ColorPicker id='color-picker' variant="swatches" />).toJSON();
	expect(domTree).toMatchSnapshot();
});
