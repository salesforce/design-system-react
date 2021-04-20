import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { COMBOBOX } from '../../../utilities/constants';

import Base from '../__examples__/base';
import BaseCustomMenuItem from '../__examples__/base-custom-menu-item';
import BaseCustomMenuItemDisabled from '../__examples__/base-custom-menu-item-disabled';
import BaseInheritMenuWidth from '../__examples__/base-inherit-menu-width.jsx';
import BaseInheritMenuWidthRTL from '../__examples__/base-inherit-menu-width-RTL';
import BaseInlineHelpTooltip from '../__examples__/base-inline-help-tooltip';
import BaseMenuSubHeader from '../__examples__/base-menu-subheader';
import BaseMenuSeparator from '../__examples__/base-menu-separator';
import BaseMenuItemDisabled from '../__examples__/base-menu-item-disabled';
import BaseMenuItemDisabledTooltipOpen from '../__examples__/base-menu-item-disabled-tooltip-open';
import BaseMenuItemDisabledTooltip from '../__examples__/base-menu-item-disabled-tooltip';
import BaseWithScroll from '../__examples__/base-with-scroll';
import BaseWithInput from '../__examples__/base-with-input';
import Dialog from '../__examples__/dialog.jsx';
import InlineSingle from '../__examples__/inline-single';
import InlineSinglePredefinedOnly from '../__examples__/inline-single-predefined-options-only';
import InlineSingleWithCustomOpenState from '../__examples__/inline-single-with-custom-open-state';
import InlineSingleEntityCombobox from '../__examples__/inline-single-entity-combobox';
import InlineSingleSearchAddEntities from '../__examples__/inline-single-search-add-entities';
import InlineMultiple from '../__examples__/inline-multiple';
import InlineMultipleLoading from '../__examples__/inline-multiple-loading';
import InputProp from '../__examples__/input-prop';
import PredefinedOptionsOnly from '../__examples__/base-predefined-options-only';
import ReadOnly from '../__examples__/readonly-single';
import ReadOnlyDeselect from '../__examples__/readonly-single-deselect';
import ReadOnlyRTL from '../__examples__/readonly-single-RTL';
import ReadOnlyDisabled from '../__examples__/readonly-single-disabled';
import ReadOnlyMenuItemDisabled from '../__examples__/readonly-menu-item-disabled';
import ReadOnlySingleSelectionCustomMenuItem from '../__examples__/readonly-single-selection-custom-menu-item';
import ReadOnlyMultiple from '../__examples__/readonly-multiple';
import ReadOnlyMultipleDeselect from '../__examples__/readonly-multiple-deselect';
import RequiredInputErrorState from '../__examples__/required-input-error-state';

import SnapshotBaseOpen from '../__examples__/snapshot/base-open';
import SnapshotBaseOpenMenuSubHeaderSeparator from '../__examples__/snapshot/base-open-menu-sub-header';
import SnapshotBaseOpenMenuInheritWidthOf from '../__examples__/snapshot/base-open-menu-inheritWidthOf';
import SnapshotBaseCustomMenuItemOpen from '../__examples__/snapshot/base-custom-menu-item-open';
import SnapshotBaseLabelRequired from '../__examples__/snapshot/base-label-required';
import SnapshotBaseSelected from '../__examples__/snapshot/base-selected';
import SnapshotDialogOpen from '../__examples__/snapshot/dialog-open';
import SnapshotInlineMultipleOpenLoading from '../__examples__/snapshot/inline-multiple-open-loading';
import SnapshotInlineMultipleSelection from '../__examples__/snapshot/inline-multiple-selection';
import SnapshotInlineMultipleSelectionSelected from '../__examples__/snapshot/inline-multiple-selection-selected';
import SnapshotInlineSingleEntityCombobox from '../__examples__/snapshot/inline-single-entity-combobox';
import SnapshotInlineSingleSelection from '../__examples__/snapshot/inline-single-selection';
import SnapshotInlineSingleSelectionSelected from '../__examples__/snapshot/inline-single-selection-selected';
import SnapshotInlineSingleSearchAddEntitiesOpen from '../__examples__/snapshot/inline-single-search-add-entities-open';
import SnapshotReadonlyMultipleSelection from '../__examples__/snapshot/readonly-multiple-selection';
import SnapshotReadonlyMultipleSelectionMultipleItemsSelected from '../__examples__/snapshot/readonly-multiple-selection-multiple-items-selected';
import SnapshotReadonlyMultipleSelectionSingleItemSelected from '../__examples__/snapshot/readonly-multiple-selection-single-item-selected';
import SnapshotReadonlySingleSelection from '../__examples__/snapshot/readonly-single-selection';
import SnapshotReadonlySingleSelectionDisabled from '../__examples__/snapshot/readonly-single-selection-disabled';
import SnapshotReadonlySingleSelectionCustomMenuItemOpen from '../__examples__/snapshot/readonly-single-selection-custom-menu-item';
import SnapshotReadonlySingleSelectionSelected from '../__examples__/snapshot/readonly-single-selection-selected';
import SnapshotReadonlySingleSelectionSelectedOpen from '../__examples__/snapshot/readonly-single-selection-selected-open';

storiesOf(COMBOBOX, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">{getStory()}</div>
	))
	.add('Base', () => <Base action={action} />)
	.add('Base Pre-defined Options Only', () => (
		<PredefinedOptionsOnly action={action} />
	))
	.add('Base Inline Help', () => (
		<section>
			<h1 className="slds-text-title_caps slds-p-vertical_medium">
				Field Level Help Tooltip
			</h1>
			<BaseInlineHelpTooltip action={action} />
		</section>
	))
	.add('Base Menu Item Disabled', () => (
		<BaseMenuItemDisabled action={action} />
	))
	.add('Base Menu Item Disabled With Tooltip', () => (
		<BaseMenuItemDisabledTooltip action={action} />
	))
	.add('Base Menu Item Disabled With Tooltip Open', () => (
		<BaseMenuItemDisabledTooltipOpen action={action} />
	))
	.add('Inline Single Selection', () => <InlineSingle action={action} />)
	.add('Inline Single Selection Predefined Options Only', () => (
		<InlineSinglePredefinedOnly action={action} />
	))
	.add('Inline Single Selection With Custom Open State', () => (
		<InlineSingleWithCustomOpenState action={action} />
	))
	.add('Inline Single Entity Selection', () => (
		<InlineSingleEntityCombobox action={action} />
	))
	.add('Inline Single Search/Add Entities', () => (
		<InlineSingleSearchAddEntities action={action} />
	))
	.add('Inline Single Search/Add Entities - Open', () => (
		<InlineSingleSearchAddEntities isOpen action={action} />
	))
	.add('Inline Multiple Selection', () => <InlineMultiple action={action} />)
	.add('Inline Multiple Selection Loading', () => (
		<InlineMultipleLoading action={action} />
	))
	.add('Base Custom Menu Item', () => <BaseCustomMenuItem action={action} />)
	.add('Base Custom Menu Item Disabled', () => (
		<BaseCustomMenuItemDisabled action={action} />
	))
	.add('Base Menu Sub Headers', () => <BaseMenuSubHeader action={action} />)
	.add('Base Menu Separator', () => <BaseMenuSeparator action={action} />)
	.add('Base Inherit Menu Width', () => (
		<BaseInheritMenuWidth action={action} />
	))
	.add('Base Inherit Menu Width - Right to Left (RTL)', () => (
		<BaseInheritMenuWidthRTL action={action} />
	))
	.add('Base With Scroll', () => <BaseWithScroll action={action} />)
	.add('Base With Input', () => <BaseWithInput action={action} />)
	.add('Dialog', () => <Dialog action={action} />)
	.add('Readonly Single Selection', () => <ReadOnly action={action} />)
	.add('Readonly Single Selection Deselect', () => (
		<ReadOnlyDeselect action={action} />
	))
	.add('Readonly Single Selection - Right to Left (RTL)', () => (
		<ReadOnlyRTL action={action} />
	))
	.add('Readonly Single Selection Disabled', () => (
		<ReadOnlyDisabled action={action} />
	))
	.add('Readonly Single Menu Item Disabled', () => (
		<ReadOnlyMenuItemDisabled action={action} />
	))
	.add('Readonly Multiple Selection', () => (
		<ReadOnlyMultiple action={action} />
	))
	.add('Readonly Multiple Selection Deselect', () => (
		<ReadOnlyMultipleDeselect action={action} />
	))
	.add('Readonly Single Selection Custom Menu Item', () => (
		<ReadOnlySingleSelectionCustomMenuItem action={action} />
	))
	.add('Required Input in Error State', () => (
		<RequiredInputErrorState action={action} />
	))
	.add('Input Component as a Prop', () => <InputProp action={action} />)
	.add('Snapshot Base Open', () => <SnapshotBaseOpen action={action} />)
	.add('Snapshot Base Custom Menu Item Open', () => (
		<SnapshotBaseCustomMenuItemOpen action={action} />
	))
	.add('Snapshot Base Selected', () => <SnapshotBaseSelected action={action} />)
	.add('Snapshot Base Label Required', () => (
		<SnapshotBaseLabelRequired action={action} />
	))
	.add('Snapshot Base Open Menu Sub Header Separator', () => (
		<SnapshotBaseOpenMenuSubHeaderSeparator action={action} />
	))
	.add('Snapshot Base Open Menu inheritWidthOf prop', () => (
		<SnapshotBaseOpenMenuInheritWidthOf action={action} />
	))
	.add('Snapshot Dialog Open', () => <SnapshotDialogOpen action={action} />)
	.add('Snapshot Inline Single Selection', () => (
		<SnapshotInlineSingleSelection action={action} />
	))
	.add('Snapshot Inline Single Selection Selected', () => (
		<SnapshotInlineSingleSelectionSelected action={action} />
	))
	.add('Snapshot Inline Multiple Selection', () => (
		<SnapshotInlineMultipleSelection action={action} />
	))
	.add('Snapshot Inline Multiple Selection Selected', () => (
		<SnapshotInlineMultipleSelectionSelected action={action} />
	))
	.add('Snapshot Readonly Single Selection', () => (
		<SnapshotReadonlySingleSelection action={action} />
	))
	.add('Snapshot Readonly Single Selection Disabled', () => (
		<SnapshotReadonlySingleSelectionDisabled action={action} />
	))
	.add('Snapshot Readonly Single Selection Selected', () => (
		<SnapshotReadonlySingleSelectionSelected action={action} />
	))
	.add('Snapshot Readonly Single Selection Selected Open', () => (
		<SnapshotReadonlySingleSelectionSelectedOpen action={action} />
	))
	.add('Snapshot Readonly Multiple Selection', () => (
		<SnapshotReadonlyMultipleSelection action={action} />
	))
	.add('Snapshot Readonly Multiple Selection Single Item Selected', () => (
		<SnapshotReadonlyMultipleSelectionSingleItemSelected action={action} />
	))
	.add('Snapshot Readonly Multiple Selection Multiple Items Selected', () => (
		<SnapshotReadonlyMultipleSelectionMultipleItemsSelected action={action} />
	))
	.add('Snapshot Readonly Single Selection Custom Menu Item', () => (
		<SnapshotReadonlySingleSelectionCustomMenuItemOpen action={action} />
	))
	.add('Snapshot Inline Single Search/Add Entities Open', () => (
		<SnapshotInlineSingleSearchAddEntitiesOpen action={action} />
	))
	.add('Snapshot Inline Single Entity Selection', () => (
		<SnapshotInlineSingleEntityCombobox action={action} />
	))
	.add('Snapshot Inline Multiple Open Loading', () => (
		<SnapshotInlineMultipleOpenLoading action={action} />
	));
