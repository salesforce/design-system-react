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
import ColorSuccess from '../__examples__/color-success';
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
// eslint-disable-next-line camelcase
import UNSAFE_DirectionSettings from '../../utilities/UNSAFE_direction';
import ProductThemes from '../__examples__/product-themes.jsx';

const makeRtl = (component) => (
	// eslint-disable-next-line
	<UNSAFE_DirectionSettings.Provider value="rtl">
		<div dir="rtl">{component}</div>
	</UNSAFE_DirectionSettings.Provider>
);

export default {
	title: 'Components/Icon',
	decorators: [
		(Story) => (
			<div className="slds-p-around_medium">
				<IconSettings iconPath="/assets/icons">{Story()}</IconSettings>
			</div>
		),
	],
};

export const CategoryStandard = {
	name: 'Category: Standard',
	render: () => <Standard />,
};

export const CategoryStandardRightToLeftRTL = {
	name: 'Category: Standard - Right to Left (RTL)',
	render: () => makeRtl(<Standard />),
};

export const CategoryUtility = {
	name: 'Category: Utility',
	render: () => <Utility />,
};

export const CategoryAction = {
	name: 'Category: Action',
	render: () => <Action />,
};

export const CategoryDoctype = {
	name: 'Category: Doctype',
	render: () => <Doctype />,
};

export const CategoryCustom = {
	name: 'Category: Custom',
	render: () => <Custom />,
};

export const CategoryExternalPath = {
	name: 'Category: External Path',
	render: () => <ExternalPath />,
};

export const SizeXSmall = {
	name: 'Size: X-Small',
	render: () => <SizesExtraSmall />,
};

export const SizeSmall = {
	name: 'Size: Small',
	render: () => <SizesSmall />,
};

export const SizeMediumDefault = {
	name: 'Size: Medium (default)',
	render: () => <SizesMedium />,
};

export const SizeLarge = {
	name: 'Size: Large',
	render: () => <SizesLarge />,
};

export const ColorBase1 = {
	name: 'Color: Base',
	render: () => (
		<div
			style={{
				backgroundColor: 'goldenrod',
				padding: '10px',
			}}
		>
			<ColorBase />
		</div>
	),
};

export const ColorDefault1 = {
	name: 'Color: Default',
	render: () => <ColorDefault />,
};

export const ColorSuccess1 = {
	name: 'Color: Success',
	render: () => <ColorSuccess />,
};

export const ColorError1 = {
	name: 'Color: Error',
	render: () => <ColorError />,
};

export const ColorWarning1 = {
	name: 'Color: Warning',
	render: () => <ColorWarning />,
};

export const ColorLight1 = {
	name: 'Color: Light',
	render: () => <ColorLight />,
};

export const BaseStandardCustomStyles = {
	name: 'Base: Standard (custom styles)',
	render: () => (
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
	),
};

export const BaseImported = {
	name: 'Base: Imported',
	render: () => (
		<Icon
			assistiveText={{
				label: 'Download',
			}}
			category="utility"
			icon={download}
		/>
	),
};

export const ProductThemes1 = {
	name: 'Product Themes',
	render: () => <ProductThemes />,
};

export const DocsSiteCategories = {
	name: 'Docs site Categories',
	render: () => <Categories />,
};

export const DocsSiteColors = {
	name: 'Docs site Colors',
	render: () => <Colors />,
};

export const DocsSiteSizes = {
	name: 'Docs site Sizes',
	render: () => <Sizes />,
};
