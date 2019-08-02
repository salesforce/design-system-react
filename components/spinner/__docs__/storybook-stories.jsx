/* eslint-disable indent */ import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '../../icon-settings';
import { SPINNER } from '../../../utilities/constants';
import Spinner from '../../spinner';
import Default from '../__examples__/default';

const getSpinner = (props) => <Spinner {...props} />;

const inverseContainerStyle = {
	backgroundColor: '#16325c',
	position: 'absolute',
	width: '100%',
	height: '100%',
};

const inverseContainer = (getStory) => (
	<div style={inverseContainerStyle}>{getStory()}</div>
);

storiesOf(SPINNER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Small', () =>
		getSpinner({
			size: 'small',
			variant: 'base',
			assistiveText: {
				label: 'Small spinner',
			},
		})
	)
	.add('Medium', () =>
		getSpinner({
			size: 'medium',
			variant: 'base',
		})
	)
	.add('Large', () =>
		getSpinner({
			size: 'large',
			variant: 'base',
		})
	)
	.add('Brand Small', () =>
		getSpinner({
			size: 'small',
			variant: 'brand',
		})
	)
	.add('Brand Medium', () =>
		getSpinner({
			size: 'medium',
			variant: 'brand',
		})
	)
	.add('Brand Large', () =>
		getSpinner({
			size: 'large',
			variant: 'brand',
			containerClassName: 'my-custom-classname',
		})
	)
	.add('Large with 300ms delay', () =>
		getSpinner({
			size: 'large',
			variant: 'base',
			isDelayed: true,
		})
	)
	.add(
		'Inverse Small',
		() =>
			getSpinner({
				size: 'small',
				variant: 'inverse',
			}),
		{ decorators: [inverseContainer] }
	)
	.add(
		'Inverse Medium',
		() =>
			getSpinner({
				size: 'medium',
				variant: 'inverse',
			}),
		{ decorators: [inverseContainer] }
	)
	.add(
		'Inverse Large',
		() =>
			getSpinner({
				size: 'large',
				variant: 'inverse',
			}),
		{ decorators: [inverseContainer] }
	)
	.add('Docs site Default', () => <Default />);
