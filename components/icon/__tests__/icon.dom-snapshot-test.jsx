/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Action from '../__examples__/action';
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

test('Default Action Icon DOM Snapshot', () => {
	const domTree = renderer.create(<Action />).toJSON();
	expect(domTree).toMatchSnapshot();
});

test('Default Action Icon Right to Left (RTL) DOM Snapshot', () => {
	const domTree = renderer.create(makeRtl(<Action />)).toJSON();
	expect(domTree).toMatchSnapshot();
});
