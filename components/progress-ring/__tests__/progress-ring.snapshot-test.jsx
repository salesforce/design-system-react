/* eslint-env jest */
import React from 'react';
import { renderMarkup } from '../../../tests/snapshot-helpers';
import IconSettings from '../../../components/icon-settings';
import * as ProgressRing from '../__examples__/examples';

Object.keys(ProgressRing).forEach((name) => {
	const wrapper = (element) => () => (
		<IconSettings iconPath="/assets/icons">{element()}</IconSettings>
	);

	test(`${name} DOM Snapshot`, () => {
		expect(renderMarkup(wrapper(ProgressRing[name]))).toMatchSnapshot();
	});
});
