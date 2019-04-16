/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import IconSettings from '~/components/icon-settings';
import Default from '../__examples__/default';

import { PUBLISHER } from '../../../utilities/constants';

class PublisherExample extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Default {...this.props} />
			</IconSettings>
		);
	}
}
storiesOf(PUBLISHER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => (
		<PublisherExample
			label="To: My followers"
			placeholder="Write something..."
			onChange={() => {}}
			onSubmit={() => {}}
		/>
	))
	.add('Comment', () => (
		<PublisherExample
			variant="comment"
			placeholder="Write a comment.."
			onChange={() => {}}
			onSubmit={() => {}}
		/>
	));
