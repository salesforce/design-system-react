import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Button from '~/components/button';
import { TRIAL_BAR_BUTTON } from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility.**
	 * This object is merged with the default props object on every render.
	 * * `icon`: Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means. If the button has an icon and a visible label, you can omit the <code>assistiveText.icon</code> prop and use the <code>label</code> prop.
	 */
	assistiveText: PropTypes.shape({
		icon: PropTypes.string,
	}),

	/**
	 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
	 */
	buttonRef: PropTypes.func,
	/**
	 * CSS classes to be added to button.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Disables the button and adds disabled styling.
	 */
	disabled: PropTypes.bool,
	/**
	 * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
	 */
	hint: PropTypes.bool,
	/**
	 * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
	 */
	iconCategory: requiredIf(
		PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
		(props) => !!props.iconName
	),
	/**
	 * CSS classes to be added to icon.
	 */
	iconClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * Path to the icon. This will override any global icon settings.
	 */
	iconPath: PropTypes.string,
	/**
	 * If omitted, icon position is centered.
	 */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/**
	 * Determines the size of the icon.
	 */
	iconSize: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	/**
	 * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
	 */
	iconVariant: PropTypes.oneOf([
		'bare',
		'container',
		'border',
		'border-filled',
		'brand',
		'more',
		'global-header',
	]),
	/**
	 * Id string applied to button node.
	 */
	id: PropTypes.string,
	/**
	 * If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
	 */
	inverse: PropTypes.bool,
	/**
	 * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText.icon</code> prop.
	 */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/**
	 * Triggered when focus is removed.
	 */
	onBlur: PropTypes.func,
	/**
	 * Triggered when the button is clicked.
	 */
	onClick: PropTypes.func,
	/**
	 * Triggered when component is focused.
	 */
	onFocus: PropTypes.func,
	/**
	 * Triggered when a key is pressed down
	 */
	onKeyDown: PropTypes.func,
	/**
	 * Triggered when a key is pressed and released
	 */
	onKeyPress: PropTypes.func,
	/**
	 * Triggered when a key is released
	 */
	onKeyUp: PropTypes.func,
	/**
	 * Triggered when a mouse button is pressed down
	 */
	onMouseDown: PropTypes.func,
	/**
	 * Triggered when a mouse arrow hovers
	 */
	onMouseEnter: PropTypes.func,
	/**
	 * Triggered when a mouse arrow no longer hovers
	 */
	onMouseLeave: PropTypes.func,
	/**
	 * Triggered when a mouse button is released
	 */
	onMouseUp: PropTypes.func,
	/**
	 * If true, button scales to 100% width on small form factors.
	 */
	responsive: PropTypes.bool,
	/**
	 * Write <code>"-1"</code> if you don't want the user to tab to the button.
	 */
	tabIndex: PropTypes.string,
	/**
	 * Button type
	 */
	type: PropTypes.oneOf(['reset', 'submit', 'button']),
	/**
	 * HTML title attribute
	 */
	title: PropTypes.string,
	/**
	 * [Deprecated] Tooltip on button. Button should be a child of `Tooltip` instead.
	 */
	tooltip: PropTypes.node,
	/**
	 * Different types of buttons
	 */
	variant: PropTypes.oneOf([
		'base',
		'link',
		'neutral',
		'brand',
		'outline-brand',
		'destructive',
		'success',
		'text-destructive',
		'icon',
	]),
	/**
	 * Custom styles to be passed to the component
	 */
	style: PropTypes.object,
};

class TrialBarButton extends React.Component {
	render() {
		return (
			<Button
				{...this.props}
				inverse
				style={{ border: 0, padding: 0 }}
				className="slds-m-right_small"
			/>
		);
	}
}

TrialBarButton.propTypes = propTypes;
TrialBarButton.displayName = TRIAL_BAR_BUTTON;

export default TrialBarButton;
