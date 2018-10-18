import React from 'react';
import renderer from 'react-test-renderer';

import ColorPicker from '../../color-picker';

test('ColorPicker Base DOM Snapshot', () => {
	const domTree = renderer
		.create(<ColorPicker className="test_class_name" />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Menu Open DOM Snapshot', () => {
	const domTree = renderer
		.create(<ColorPicker classNameMenu="test_class_name_menu" isOpen />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Menu Disabled DOM Snapshot', () => {
	const domTree = renderer.create(<ColorPicker disabled />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Error Text', () => {
	const domTree = renderer
		.create(<ColorPicker errorText="Outer input in error mode" />)
		.toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Custom Variant', () => {
	const domTree = renderer.create(<ColorPicker variant="custom" />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('ColorPicker Swatches Variant', () => {
	const domTree = renderer.create(<ColorPicker variant="swatches" />).toJSON();
	expect(domTree).toMatchSnapshot();
});
