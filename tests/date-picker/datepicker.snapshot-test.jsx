/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import SnapshotDefault from '../../examples/date-picker/snapshot-default';

test('Datepicker Default Snapshot', () => {
	const domTree = renderer.create(
		<SnapshotDefault />,
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
