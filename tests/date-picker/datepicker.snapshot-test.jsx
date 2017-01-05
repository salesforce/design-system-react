/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import DatepickerDefault from '../../examples/date-picker/default';

function createNodeMock () {
	return {
		focus () {}
	};
}

const options = { createNodeMock };

test('Datepicker Default Snapshot', () => {
	const domTree = renderer.create(
		<DatepickerDefault />,
		options
	).toJSON();
	expect(domTree).toMatchSnapshot();
});
