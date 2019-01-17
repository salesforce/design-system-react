/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { renderMarkup, testDOM } from '../../../tests/snapshot-helpers';

import Default from '../__examples__/default';
import IsReorderable from '../__examples__/is-reorderable';
import AutoHeightMinimization from '../__examples__/automatic-height-minimization';
import Disabled from '../__examples__/disabled';
import ViewOnly from '../__examples__/view-only';
import Required from '../__examples__/required';
import Responsive from '../__examples__/responsive';
import ManualHeight from '../__examples__/manual-height';
import Locked from '../__examples__/locked-options';
import Tooltip from '../__examples__/tooltip';

Object.entries({
	Default,
	IsReorderable,
	AutoHeightMinimization,
	Disabled,
	ViewOnly,
	Required,
	Responsive,
	ManualHeight,
	Locked,
	Tooltip,
}).forEach(([name, Component]) => {
	testDOM({
		name,
		test,
		Component,
	});
});
