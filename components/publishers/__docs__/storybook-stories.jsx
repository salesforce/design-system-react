/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import IconSettings from '~/components/icon-settings';
import Default from '../__examples__/default';

import { PUBLISHERS } from '../../../utilities/constants';

class PublisherExample extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Default {...this.props} />
			</IconSettings>
		);
	}
}
storiesOf(PUBLISHERS, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => (
		<PublisherExample
			id="AAA111"
			label="To: My followers"
			placeholder="Write something..."
			onChange={() => {}}
			onSubmit={() => {}}
		/>
	))
	.add('Comment', () => (
		<PublisherExample
			id="AAA2211"
			variant="comment"
			placeholder="Write a comment.."
			onChange={() => {}}
			onSubmit={() => {}}
		/>
	));
