/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # TabItem Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { TAB } from '../../../utilities/constants';
import { findDOMNode } from 'react-dom';

// Temporary hack until included in SLDS
import '!style!css!../../../styles/tabs/tab.css'; // eslint-disable-line import/no-unresolved

const Tab = React.createClass({
	displayName: TAB,

	propTypes: {
		/**
		 * CSS classes to be added to the tab.
		 */
		className: PropTypes.string,

		/**
		 * The HTML ID of this tab. Also used by the `<TabPanel />` it controls as `tabId`.
		 */
		id: PropTypes.string,

		/**
		 * Whether to apply focus to this tab.
		 */
		focus: PropTypes.bool,

		/**
		 * When `true`, the class `.slds-active` is applied.
		 */
		selected: PropTypes.bool,

		/**
		 * When `true`, the HTML attribute `aria-disabled` will be applied.
		 */
		disabled: PropTypes.bool,

		/**
		 * The CSS class to be applied when this tab is selected. Defaults to `.slds-active`. If another class is desired, it should be passed in _along with_ `.slds-active`, not _instead_ of it.
		 */
		activeTabClassName: PropTypes.string,

		/**
		 * The CSS class to be applied when this tab is disabled. Defaults to `.slds-disabled`. If another class is desired, it should be passed in _along with_ `.slds-disabled`, not _instead_ of it.
		 */
		disabledTabClassName: PropTypes.string,

		/**
		 * The HTML ID of `<TabPanel />` this tab controls.
		 */
		panelId: PropTypes.string,

		/**
		 * The string or element that is shown as both the title and the label for this tab.
		 */
		children: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element
		]),

		/**
		 * If the Tabs should be scopped, defaults to false
		 */
		variant: PropTypes.oneOf(['default', 'scoped'])
	},

	getDefaultProps () {
		return {
			focus: false,
			selected: false,
			activeTabClassName: 'slds-active',
			disabledTabClassName: 'slds-disabled',
			variant: 'default'
		};
	},

	componentDidMount () {
		this.checkFocus();
	},

	componentDidUpdate () {
		this.checkFocus();
	},

	checkFocus () {
		if (this.props.selected && this.props.focus) {
			findDOMNode(this).focus();
		}
	},

	render () {
		const {
			selected,
			disabled,
			panelId,
			activeTabClassName,
			disabledTabClassName,
			className,
			children,
			id,
			variant,
			...attributes } = this.props;

		return (
			<li
				className={classNames(
					'slds-text-title--caps',
					className,
					{
						[activeTabClassName]: selected,
						[disabledTabClassName]: disabled,
						'slds-tabs--default__item': variant === 'default',
						'slds-tabs--scoped__item': variant === 'scoped'
					}
				)}
				role="tab"
				aria-selected={selected ? 'true' : 'false'}
				aria-disabled={disabled}
				aria-controls={panelId}
				tabIndex={selected ? '0' : disabled ? '-1' : null}
				id={id}
				title={typeof children === 'string' ? children : null}
			>
				<a
					className={classNames(
						{
							[activeTabClassName]: selected,
							[disabledTabClassName]: disabled,
							'slds-tabs--default__link': variant === 'default',
							'slds-tabs--scoped__link': variant === 'scoped'
						}
					)}
					href="javascript:void(0);" // eslint-disable-line no-script-url
					role="presentation"
					tabIndex="-1"
					aria-disabled={disabled}
				>
					{children}
				</a>
			</li>
		);
	}
});

export default Tab;
