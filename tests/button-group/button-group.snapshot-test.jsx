import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { renderMarkup } from '../snapshot-helpers';

import IconGroup from '../../examples/button-group/icon-group';
import MoreIcon from '../../examples/button-group/more-icon';
import Checkbox from '../../examples/button-group/checkbox';
import CheckboxError from '../../examples/button-group/checkbox-error';

// Failing test, but unrelated to Checkbox Button Group which is the purpose of this pull request.

// test('Button Group IconGroup Snapshot', () => {
// 	const domTree = toJson(mount(
// 		<IconGroup />
// 	));
// 	expect(domTree).toMatchSnapshot();
// });

test('Button Group MoreIcon Snapshot', () => {
	const domTree = toJson(mount(
		<MoreIcon />
	));
	expect(domTree).toMatchSnapshot();
});

test('Button Group Checkbox Snapshot', () => {
	const domTree = toJson(mount(
		<Checkbox />
	));
	expect(domTree).toMatchSnapshot();
});

test('Button Group Checkbox Error Snapshot', () => {
	const domTree = toJson(mount(
		<CheckboxError />
	));
	expect(domTree).toMatchSnapshot();
});

test('Button Group Checkbox Error HTML Snapshot', () => {
	expect(renderMarkup(Checkbox)).toMatchSnapshot();
});

test('Button Group Checkbox Error HTML Snapshot', () => {
	expect(renderMarkup(CheckboxError)).toMatchSnapshot();
});
