import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

import Dropdown from '~/components/menu-dropdown'; // `~` is replaced with design-system-react at runtime
import DropdownTrigger from '~/components/menu-dropdown/button-trigger';
import Button from '~/components/button';
import { TRIAL_BAR_DROPDOWN } from '../../utilities/constants';

const propTypes = {
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
	 */
	align: PropTypes.oneOf(['left', 'right']),
	/**
	 * This prop is passed onto the triggering `Button`. Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. You can omit this prop if you are using the `label` prop.
	 */
	assistiveText: PropTypes.object,
	/**
	 * CSS classes to be added to triggering button.
	 */
	buttonClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
	 */
	buttonInverse: PropTypes.bool,
	/**
	 * This prop is passed onto the triggering `Button`. Determines variant of the Button component that triggers dropdown.
	 */
	buttonVariant: PropTypes.oneOf([
		'base',
		'neutral',
		'brand',
		'destructive',
		'icon',
	]),
	/**
	 * If true, renders checkmark icon on the selected Menu Item.
	 */
	checkmark: PropTypes.bool,
	/**
	 * If you need custom content _and_ a list, use a `<Popover>` instead.
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to dropdown menu.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * By default, these class names will be added to the absolutely-positioned `Dialog` component.
	 */
	containerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * This prop is passed onto the triggering `Button`. Prevent dropdown menu from opening. Also applies disabled styling to trigger button.
	 */
	disabled: PropTypes.bool,
	/**
	 * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * This prop is passed onto the triggering `Button`. Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
	 */
	hint: PropTypes.bool,
	/**
	 * Delay on menu closing in milliseconds.
	 */
	hoverCloseDelay: PropTypes.number,
	/**
	 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
	 */
	iconCategory: requiredIf(
		PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		(props) => !!props.iconName
	),
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * If omitted, icon position is centered.
	 */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
	 */
	iconVariant: PropTypes.oneOf([
		'bare',
		'container',
		'border',
		'border-filled',
		'small',
		'more',
	]),
	/**
	 * Determines the size of the icon.
	 */
	iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
	 */
	id: PropTypes.string,
	/**
	 * Adds inverse class to the dropdown
	 */
	inverse: PropTypes.bool,
	/**
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
	 */
	isOpen: PropTypes.bool,
	/**
	 * This prop is passed onto the triggering `Button`. Text within the trigger button.
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Custom element that overrides the default Menu Item component.
	 */
	listItemRenderer: PropTypes.func,
	/**
	 * This prop is passed into the List for the menu. Pass null to make it the size of the content, or a string with an integer from here: https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height
	 */
	length: PropTypes.oneOf([null, '5', '7', '10', 5, 7, 10]),
	/**
	 * Please select one of the following:
	 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
	 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
	 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
	 */
	menuPosition: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
	/**
	 * Style applied to menu element (that is the `.slds-dropdown` element)
	 */
	menuStyle: PropTypes.object,
	/**
	 * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling (`iconVariant="container"`). Use with `isInline` prop, since positioning is determined by CSS via absolute-relative positioning, and using an absolutely positioned menu will not position the menu correctly without manual offsets.
	 */
	nubbinPosition: PropTypes.oneOf([
		'top left',
		'top',
		'top right',
		'bottom left',
		'bottom',
		'bottom right',
	]),
	/**
	 * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
	 */
	onBlur: PropTypes.func,
	/**
	 * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
	 */
	onFocus: PropTypes.func,
	/**
	 * Determines if mouse hover or click opens or closes the dropdown menu. The default of `click` opens the menu on click, touch, or keyboard navigation and is highly recommended to comply with accessibility standards. The other options are `hover` which opens when the mouse enters the focusable area, and `hybrid` which causes the menu to open on clicking of the trigger, but closes the menu when the mouse leaves the menu and trigger area. If you are planning on using `hover` or `hybrid`, please pause a moment and reconsider.
	 */
	openOn: PropTypes.oneOf(['hover', 'click', 'hybrid']),
	/**
	 * Called when a key pressed.
	 */
	onKeyDown: PropTypes.func,
	/**
	 * Called when mouse clicks down on the trigger button.
	 */
	onMouseDown: PropTypes.func,
	/**
	 * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
	 */
	onMouseEnter: PropTypes.func,
	/**
	 * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
	 */
	onMouseLeave: PropTypes.func,
	/**
	 * Triggered when an item in the menu is clicked.
	 */
	onSelect: PropTypes.func,
	/**
	 * Triggered when the dropdown is opened.
	 */
	onOpen: PropTypes.func,
	/**
	 * Triggered when the dropdown is closed.
	 */
	onClose: PropTypes.func,
	/**
	 * An array of menu item objects. `className` and `id` object keys are applied to the `li` DOM node. `divider` key can have a value of `top` or `bottom`. `rightIcon` and `leftIcon` are not actually `Icon` components, but prop objects that get passed to an `Icon` component. The `href` key will be added to the `a` and its default click event will be prevented. Here is a sample:
	 * ```
	 * [{
	 *   className: 'custom-li-class',
	 *     divider: 'bottom',
	 *     label: 'A Header',
	 *     type: 'header'
	 *  }, {
	 *     href: 'http://sfdc.co/',
	 *     id: 'custom-li-id',
	 *     label: 'Has a value',
	 *   leftIcon: {
	 *    name: 'settings',
	 *    category: 'utility'
	 *   },
	 *   rightIcon: {
	 *    name: 'settings',
	 *    category: 'utility'
	 *   },
	 *     type: 'item',
	 *     value: 'B0'
	 *  }, {
	 *   type: 'divider'
	 * }]
	 * ```
	 */
	options: PropTypes.array,
	/**
	 * An object of CSS styles that are applied to the triggering button.
	 */
	style: PropTypes.object,
	/**
	 * Write <code>"-1"</code> if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
	/**
	 * If `true`, adds a transparent overlay when the menu is open to handle outside clicks. Allows clicks on iframes to be captured, but also forces a double-click to interact with other elements. If a function is passed, custom overlay logic may be defined by the app.
	 */
	overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	/**
	 * Current selected menu item.
	 */
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.array,
	]),
	/**
	 * This prop is passed onto the triggering `Button`. It creates a tooltip with the content of the `node` provided.
	 */
	tooltip: PropTypes.node,
	/**
	 * CSS classes to be added to wrapping trigger `div` around the button.
	 */
	triggerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Whether this dropdown supports multi select.
	 */
	multiple: PropTypes.bool,
	/**
	 *  To adjust the width of the menu dropdown
	 */
	width: PropTypes.oneOf([
		'xx-small',
		'x-small',
		'small',
		'medium',
		'bottom',
		'large',
	]),
};

class TrialBarDropdown extends React.Component {
	render() {
		return (
			<Dropdown {...this.props} inverse>
				<DropdownTrigger>
					<Button
						inverse
						style={{ border: 0, height: '100%', padding: 0 }}
						iconCategory="utility"
						iconName="right"
						iconPosition="left"
						label={this.props.label}
					/>
				</DropdownTrigger>
			</Dropdown>
		);
	}
}

TrialBarDropdown.propTypes = propTypes;
TrialBarDropdown.displayName = TRIAL_BAR_DROPDOWN;
export default TrialBarDropdown;
