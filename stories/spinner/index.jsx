/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { SPINNER } from '../../utilities/constants';
import Spinner from '../../components/spinner';

const getSpinner = props => (
	<Spinner {...props} />
);

const inverseContainer = {
  backgroundColor: '#4bca81',
  position: 'absolute',
  width: '100%',
  height: '100%'
};

storiesOf(SPINNER, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Small', () => getSpinner({ size: 'small', variant: 'base' }))
	.add('Medium', () => getSpinner({ size: 'medium', variant: 'base' }))
	.add('Large', () => getSpinner({ size: 'large', variant: 'base' }))
	.add('Brand Small', () => getSpinner({ size: 'small', variant: 'brand' }))
	.add('Brand Medium', () => getSpinner({ size: 'medium', variant: 'brand' }))
	.add('Brand Large', () => getSpinner({ size: 'large', variant: 'brand', containerClassName: 'my-custom-classname' }))

	.addDecorator(getStory => <div className="slds-p-around--medium" style={inverseContainer}>{getStory()}</div>)
	.add('Inverse Small', () => getSpinner({ size: 'small', variant: 'inverse' }))
	.add('Inverse Medium', () => getSpinner({ size: 'medium', variant: 'inverse' }))
	.add('Inverse Large', () => getSpinner({ size: 'large', variant: 'inverse' }))
