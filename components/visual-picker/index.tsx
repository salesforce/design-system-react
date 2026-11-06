/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { useId, type ReactNode, type ReactElement } from 'react';
import classNames from 'classnames';
import { VISUAL_PICKER } from '../../utilities/constants';
import type { ChildrenOf } from '../../types/common';
import type { CheckboxProps } from '../checkbox';
import type { RadioProps } from '../radio';
import type { VisualPickerLinkProps } from './link';

/**
 * Visual picker size options
 */
export type VisualPickerSize = 'medium' | 'large';

/** Props the picker passes to each option when the option doesn't set them */
interface VisualPickerOptionProps {
	coverable?: boolean;
	variant?: string;
	name?: string;
	size?: VisualPickerSize;
	vertical?: boolean;
}

interface VisualPickerOptionsProps {
	/**
	 * `Checkbox` or `Radio` elements. Each option gets `variant: 'visual-picker'`, a shared `name`,
	 * and the picker's `coverable`, `size` and `vertical`, unless the option sets them itself.
	 */
	children?: ChildrenOf<CheckboxProps | RadioProps>;
	/** CSS classes for the `fieldset` */
	className?: string | string[] | Record<string, boolean>;
	/** Whether items are coverable on selection */
	coverable?: boolean;
	/** HTML id */
	id?: string;
	/** Label for the visual picker */
	label?: string;
	/** Whether the picker has links as children */
	links?: false;
	/** Size of the picker */
	size?: VisualPickerSize;
	/** Whether layout is vertical */
	vertical?: boolean;
}

/**
 * A picker of `VisualPickerLink` elements. It renders a bare container with no
 * `fieldset`, legend, `id` or class, so none of the options props apply.
 */
interface VisualPickerLinksProps {
	/** `VisualPickerLink` elements */
	children?: ChildrenOf<VisualPickerLinkProps>;
	/** Whether the picker has links as children */
	links: true;
	className?: never;
	coverable?: never;
	id?: never;
	label?: never;
	size?: never;
	vertical?: never;
}

/**
 * Props for the VisualPicker component: a union on `links`, because the links
 * picker renders a different, bare container.
 */
export type VisualPickerProps =
	VisualPickerOptionsProps | VisualPickerLinksProps;

/**
 * Visual Picker allows users to select an option from a set of visual choices.
 */
const VisualPicker = (props: VisualPickerProps): React.ReactElement => {
	const {
		children,
		className,
		coverable,
		id: propId,
		label,
		links = false,
		size = 'medium',
		vertical,
	} = props as VisualPickerOptionsProps & { links?: boolean };
	const generatedId = useId();
	const id = propId || generatedId;

	if (links) {
		return <div className="slds-form-element__control">{children}</div>;
	}

	// Clone the picker props onto each real option element. When an option is a
	// `React.Fragment` (e.g. children grouped with `<>...</>`), the injected props
	// must NOT land on the Fragment — it only accepts `key`/`children` — so recurse
	// into its children instead.
	const decorateOption = (
		option: ReactNode,
		index: number | string
	): ReactNode => {
		if (!React.isValidElement(option)) return option;

		if (option.type === React.Fragment) {
			const fragmentProps = option.props as { children?: ReactNode };
			return React.cloneElement(
				option as ReactElement<{ children?: ReactNode }>,
				undefined,
				React.Children.map(fragmentProps.children, (child, childIndex) =>
					decorateOption(child, `${index}-${childIndex}`)
				)
			);
		}

		const optionProps = option.props as VisualPickerOptionProps;
		return React.cloneElement(option as ReactElement<VisualPickerOptionProps>, {
			coverable: optionProps.coverable ?? coverable,
			variant: optionProps.variant ?? 'visual-picker',
			name: optionProps.name ?? `${id}_options`,
			size: optionProps.size ?? size,
			vertical: optionProps.vertical ?? vertical,
		});
	};

	const options = React.Children.map(children, (option, index) =>
		decorateOption(option, index)
	);

	return (
		<fieldset id={id} className={classNames('slds-form-element', className)}>
			<legend className="slds-form-element__legend slds-form-element__label">
				{label}
			</legend>
			<div className="slds-form-element__control">{options}</div>
		</fieldset>
	);
};

VisualPicker.displayName = VISUAL_PICKER;

export default VisualPicker;
