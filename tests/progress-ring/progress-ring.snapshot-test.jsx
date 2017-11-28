/* eslint-env jest */
import React from 'react';
import { renderMarkup } from '../snapshot-helpers';
import IconSettings from '../../components/icon-settings';
import * as ProgressRing from '../../examples/progress-ring/examples';

Object.keys(ProgressRing).forEach((name) => {
	const wrapper = (element) => () => (<IconSettings iconPath="/assets/icons">{element()}</IconSettings>);

	test(`${name} DOM Snapshot`, () => {
		expect(renderMarkup(wrapper(ProgressRing[name]))).toMatchSnapshot();
	});
});

