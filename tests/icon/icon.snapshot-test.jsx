/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup } from '../snapshot-helpers';

import Icon from '../../components/icon';
import download from '../../icons/utility/download';

import Standard from '../../examples/icon/standard';
import Utility from '../../examples/icon/utility';
import Action from '../../examples/icon/action';
import Doctype from '../../examples/icon/doctype';
import Custom from '../../examples/icon/custom';
import ExternalPath from '../../examples/icon/external-path';

import ColorBase from '../../examples/icon/color-base';
import ColorDefault from '../../examples/icon/color-default';
import ColorError from '../../examples/icon/color-error';
import ColorWarning from '../../examples/icon/color-warning';

import SizesExtraSmall from '../../examples/icon/sizes-extra-small';
import SizesSmall from '../../examples/icon/sizes-small';
import SizesMedium from '../../examples/icon/sizes-medium';
import SizesLarge from '../../examples/icon/sizes-large';

test('Icon Category Standard HTML Snapshot', () => {
	expect(renderMarkup(Standard)).toMatchSnapshot();
});

test('Icon Category Utility HTML Snapshot', () => {
	expect(renderMarkup(Utility)).toMatchSnapshot();
});

test('Icon Category Action HTML Snapshot', () => {
	expect(renderMarkup(Action)).toMatchSnapshot();
});

test('Icon Category Doctype HTML Snapshot', () => {
	expect(renderMarkup(Doctype)).toMatchSnapshot();
});

test('Icon Category Custom HTML Snapshot', () => {
	expect(renderMarkup(Custom)).toMatchSnapshot();
});

test('Icon Category External Path HTML Snapshot', () => {
	expect(renderMarkup(ExternalPath)).toMatchSnapshot();
});

test('Icon Size X-Small HTML Snapshot', () => {
	expect(renderMarkup(SizesExtraSmall)).toMatchSnapshot();
});

test('Icon Size Small HTML Snapshot', () => {
	expect(renderMarkup(SizesSmall)).toMatchSnapshot();
});

test('Icon Size Medium HTML Snapshot', () => {
	expect(renderMarkup(SizesMedium)).toMatchSnapshot();
});

test('Icon Size Large HTML Snapshot', () => {
	expect(renderMarkup(SizesLarge)).toMatchSnapshot();
});

