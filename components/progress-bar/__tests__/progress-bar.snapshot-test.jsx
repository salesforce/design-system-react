/* eslint-env jest */
import React from 'react';
import { renderMarkup } from '../../../tests/snapshot-helpers';
import * as ProgressBar from '../__examples__/examples';

Object.keys(ProgressBar).forEach((name) => {
	test(`${name} DOM Snapshot`, () => {
		expect(renderMarkup(ProgressBar[name])).toMatchSnapshot();
	});
});
