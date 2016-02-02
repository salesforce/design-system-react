const collection = [
	{
		assistiveText: 'button-base',
		domNode: '#component-wrapper-button__button-base',
		text: 'Button Base'
	},
	{
		assistiveText: 'button-base-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-base-disabled',
		text: 'Disabled'
	},
	{
		assistiveText: 'button-neutral',
		domNode: '#component-wrapper-button__button-neutral',
		text: 'Button Neutral',
		theme: 'neutral'
	},
	{
		assistiveText: 'button-neutral-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-neutral-disabled',
		text: 'Disabled',
		theme: 'neutral'
	},
	{
		assistiveText: 'button-neutral-small',
		domNode: '#component-wrapper-button__button-neutral-small',
		size: 'small',
		text: 'Small',
		theme: 'neutral'
	},
	{
		assistiveText: 'button-neutral-icon-left',
		domNode: '#component-wrapper-button__button-neutral-icon-left',
		icon: 'utility.download',
		iconPosition: 'left',
		text: 'Download',
		theme: 'neutral'
	},
	{
		assistiveText: 'button-neutral-icon-right',
		domNode: '#component-wrapper-button__button-neutral-icon-right',
		icon: 'utility.download',
		iconPosition: 'right',
		text: 'Download',
		theme: 'neutral'
	},
	{
		assistiveText: 'button-brand',
		domNode: '#component-wrapper-button__button-brand',
		text: 'Button Brand',
		theme: 'brand'
	},
	{
		assistiveText: 'button-brand-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-brand-disabled',
		text: 'Disabled',
		theme: 'brand'
	},
	{
		assistiveText: 'button-brand-small',
		domNode: '#component-wrapper-button__button-brand-small',
		size: 'small',
		text: 'Small',
		theme: 'brand'
	},
	{
		assistiveText: 'button-destructive',
		domNode: '#component-wrapper-button__button-destructive',
		text: 'Button Destructive',
		theme: 'destructive'
	},
	{
		assistiveText: 'button-destructive-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-destructive-disabled',
		text: 'Disabled',
		theme: 'destructive'
	},
	{
		assistiveText: 'button-destructive-small',
		domNode: '#component-wrapper-button__button-destructive-small',
		size: 'small',
		text: 'Small',
		theme: 'destructive'
	},
	{
		assistiveText: 'button-inverse',
		domNode: '#component-wrapper-button__button-inverse',
		text: 'Button Inverse',
		theme: 'inverse'
	},
	{
		assistiveText: 'button-inverse-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-inverse-disabled',
		text: 'Disabled',
		theme: 'inverse'
	},
	{
		assistiveText: 'button-inverse-small',
		domNode: '#component-wrapper-button__button-inverse-small',
		size: 'small',
		text: 'Small',
		theme: 'inverse'
	},
	{
		assistiveText: 'button-stateful',
		domNode: '#component-wrapper-button__button-stateful',
		icon: 'utility.add',
		text: 'Follow',
		theme: 'neutral',
		views: [
			{
				text: 'Following',
				view: 'selected',
				icon: 'utility.check'
			},
			{
				text: 'Unfollow',
				view: 'selectedHover',
				icon: 'utility.close'
			}
		]
	},
	{
		assistiveText: 'button-stateful-inverse',
		domNode: '#component-wrapper-button__button-stateful-inverse',
		icon: 'utility.add',
		text: 'Follow',
		theme: 'inverse',
		views: [
			{
				text: 'Following',
				view: 'selected',
				icon: 'utility.check'
			},
			{
				text: 'Unfollow',
				view: 'selectedHover',
				icon: 'utility.close'
			}
		]
	},
	{
		assistiveText: 'button-icon-bare-x-small',
		domNode: '#component-wrapper-button__button-icon-bare-x-small',
		icon: 'utility.close',
		iconStyle: 'icon-bare',
		iconSize: 'x-small'
	},
	{
		assistiveText: 'button-icon-bare-small',
		domNode: '#component-wrapper-button__button-icon-bare-small',
		icon: 'utility.close',
		iconStyle: 'icon-bare',
		iconSize: 'small'
	},
	{
		assistiveText: 'button-icon-bare',
		domNode: '#component-wrapper-button__button-icon-bare',
		icon: 'utility.close',
		iconStyle: 'icon-bare'
	},
	{
		assistiveText: 'button-icon-bare-large',
		domNode: '#component-wrapper-button__button-icon-bare-large',
		icon: 'utility.close',
		iconStyle: 'icon-bare',
		iconSize: 'large'
	},
	{
		assistiveText: 'button-icon-bare-x-small--disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-bare-x-small--disabled',
		icon: 'utility.close',
		iconStyle: 'icon-bare',
		iconSize: 'x-small'
	},
	{
		assistiveText: 'button-icon-bare-small--disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-bare-small--disabled',
		icon: 'utility.close',
		iconStyle: 'icon-bare',
		iconSize: 'small'
	},
	{
		assistiveText: 'button-icon-bare--disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-bare--disabled',
		icon: 'utility.close',
		iconStyle: 'icon-bare'
	},
	{
		assistiveText: 'button-icon-bare-large--disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-bare-large--disabled',
		icon: 'utility.close',
		iconStyle: 'icon-bare',
		iconSize: 'large'
	},
	{
		assistiveText: 'button-icon-container',
		domNode: '#component-wrapper-button__button-icon-container',
		icon: 'utility.table',
		iconStyle: 'icon-container'
	},
	{
		assistiveText: 'button-icon-container-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-container-disabled',
		icon: 'utility.table',
		iconStyle: 'icon-container'
	},
	{
		assistiveText: 'button-icon-border',
		domNode: '#component-wrapper-button__button-icon-border',
		icon: 'utility.table',
		iconStyle: 'icon-border'
	},
	{
		assistiveText: 'button-icon-border-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-border-disabled',
		icon: 'utility.table',
		iconStyle: 'icon-border'
	},
	{
		assistiveText: 'button-icon-border-filled',
		domNode: '#component-wrapper-button__button-icon-border-filled',
		icon: 'utility.table',
		iconStyle: 'icon-border-filled'
	},
	{
		assistiveText: 'button-icon-border-filled-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-border-filled-disabled',
		icon: 'utility.table',
		iconStyle: 'icon-border-filled'
	},
	{
		assistiveText: 'button-icon-more',
		domNode: '#component-wrapper-button__button-icon-more',
		icon: 'utility.table',
		iconStyle: 'icon-more'
	},
	{
		assistiveText: 'button-icon-more-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-more-disabled',
		icon: 'utility.table',
		iconStyle: 'icon-more'
	},
	{
		assistiveText: 'button-icon-stateful',
		domNode: '#component-wrapper-button__button-icon-stateful',
		icon: 'utility.like',
		iconStyle: 'icon-border',
		selected: false
	},
	{
		assistiveText: 'button-icon-inverse',
		domNode: '#component-wrapper-button__button-icon-inverse',
		icon: 'utility.close',
		iconStyle: 'icon-inverse'
	},
	{
		assistiveText: 'button-icon-inverse-disabled',
		disabled: true,
		domNode: '#component-wrapper-button__button-icon-inverse-disabled',
		icon: 'utility.close',
		iconStyle: 'icon-inverse'
	},
	{
		assistiveText: 'button-icon-bare-hint',
		domNode: '#component-wrapper-button__button-icon-bare-hint',
		icon: 'utility.close',
		iconStyle: 'icon-bare-hint'
	},
	{
		assistiveText: 'button-icon-border-hint',
		domNode: '#component-wrapper-button__button-icon-border-hint',
		icon: 'utility.close',
		iconStyle: 'icon-border-hint'
	},
	{
		assistiveText: 'button-icon-border-filled-hint',
		domNode: '#component-wrapper-button__button-icon-border-filled-hint',
		icon: 'utility.close',
		iconStyle: 'icon-border-filled-hint'
	},
	{
		assistiveText: 'button-icon-container-hint',
		domNode: '#component-wrapper-button__button-icon-container-hint',
		icon: 'utility.close',
		iconStyle: 'icon-container-hint'
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
