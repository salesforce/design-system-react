import React from 'react';
import { storiesOf } from '@storybook/react';
import { ICON } from '../../../utilities/constants';
import Icon from '../../icon';
import IconSettings from '../../icon-settings';
import download from '../../../icons/utility/download';
import Standard from '../__examples__/standard';
import Utility from '../__examples__/utility';
import Action from '../__examples__/action';
import Doctype from '../__examples__/doctype';
import Custom from '../__examples__/custom';
import ExternalPath from '../__examples__/external-path';
import ColorBase from '../__examples__/color-base';
import ColorDefault from '../__examples__/color-default';
import ColorError from '../__examples__/color-error';
import ColorWarning from '../__examples__/color-warning';
import ColorLight from '../__examples__/color-light';
import SizesExtraSmall from '../__examples__/sizes-extra-small';
import SizesSmall from '../__examples__/sizes-small';
import SizesMedium from '../__examples__/sizes-medium';
import SizesLarge from '../__examples__/sizes-large';
import Categories from '../__examples__/categories';
import Colors from '../__examples__/colors';
import Sizes from '../__examples__/sizes';
storiesOf(ICON, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Category: Standard', () => <Standard />)
	.add('Category: Utility', () => <Utility />)
	.add('Category: Action', () => <Action />)
	.add('Category: Doctype', () => <Doctype />)
	.add('Category: Custom', () => <Custom />)
	.add('Category: External Path', () => <ExternalPath />)
	.add('Size: X-Small', () => <SizesExtraSmall />)
	.add('Size: Small', () => <SizesSmall />)
	.add('Size: Medium (default)', () => <SizesMedium />)
	.add('Size: Large', () => <SizesLarge />)
	.add('Color: Base', () => (
		<div
			style={{
				backgroundColor: 'goldenrod',
				padding: '10px',
			}}
		>
			<ColorBase />
		</div>
	))
	.add('Color: Default', () => <ColorDefault />)
	.add('Color: Error', () => <ColorError />)
	.add('Color: Warning', () => <ColorWarning />)
	.add('Color: Light', () => <ColorLight />)
	.add('Base: Standard (custom styles)', () => (
		<Icon
			assistiveText={{
				label: 'Account',
			}}
			category="standard"
			name="account"
			style={{
				backgroundColor: '#aceace',
				fill: 'orangered',
			}}
			title="This is a title"
		/>
	))
	.add('Base: Imported', () => (
		<Icon
			assistiveText={{
				label: 'Download',
			}}
			category="utility"
			icon={download}
		/>
	))
	.add('Docs site Categories', () => <Categories />)
	.add('Docs site Colors', () => <Colors />)
	.add('Docs site Sizes', () => <Sizes />);
