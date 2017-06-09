import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { ICON } from '../../utilities/constants';

import Icon from '../../components/icon';
import download from '../../icons/utility/download';

import Standard from './standard';
import Utility from './utility';
import Action from './action';
import Doctype from './doctype';
import Custom from './custom';
import ExternalPath from './external-path';

import ColorBase from './color-base';
import ColorDefault from './color-default';
import ColorError from './color-error';
import ColorWarning from './color-warning';

import SizesExtraSmall from './sizes-extra-small';
import SizesSmall from './sizes-small';
import SizesMedium from './sizes-medium';
import SizesLarge from './sizes-large';

import globalSettings from '../../components/settings';

globalSettings.setIconsPath('/assets/icons');

storiesOf(ICON, module)
	.addDecorator((getStory) => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Category: Standard', () => (<Standard />))
	.add('Category: Utility', () => (<Utility />))
	.add('Category: Action', () => (<Action />))
	.add('Category: Doctype', () => (<Doctype />))
	.add('Category: Custom', () => (<Custom />))
	.add('Category: External Path', () => (<ExternalPath />))
	.add('Size: X-Small', () => (<SizesExtraSmall />))
	.add('Size: Small', () => (<SizesSmall />))
	.add('Size: Medium (default)', () => (<SizesMedium />))
	.add('Size: Large', () => (<SizesLarge />))
	.add('Color: Base', () => (
		<div style={{ backgroundColor: 'goldenrod', padding: '10px' }}>
			<ColorBase />
		</div>
	))
	.add('Color: Default', () => (<ColorDefault />))
	.add('Base: Standard (custom styles)', () => (
		<Icon
			assistiveText="Account"
			category="standard"
			name="account"
			style={{ backgroundColor: '#aceace', fill: 'orangered' }}
			title="This is a title"
		/>
	))
	.add('Base: Imported', () => <Icon
		assistiveText="Download"
		category="utility"
		icon={download}
	/>);
