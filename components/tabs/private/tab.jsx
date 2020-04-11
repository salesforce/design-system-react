/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */

// # TabItem Component

// ## Dependencies

// ### React
import React from 'react';

import PropTypes from 'prop-types';

// ### classNames
import classNames from 'classnames';

// ## Constants
import { TAB } from '../../../utilities/constants';

/*
 * Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler.
 */
// import '!style-loader!css-loader!../../../styles/tabs/tab.css'; // eslint-disable-line import/no-unresolved

class Tab extends React.Component {
	static displayName = TAB;

	static propTypes = {
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
		 * When `true`, the HTML attribute `aria-disabled` will be applied. Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler. `import 'css-loader!/node_modules/design-system-react/styles/tabs/tab.css';` This feature may be removed in the future due to disabled tabs being inaccessible.
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
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

		/**
		 * If the Tabs should be scopped, defaults to false
		 */
		variant: PropTypes.oneOf(['default', 'scoped']),
	};

	static defaultProps = {
		focus: false,
		selected: false,
		activeTabClassName: 'slds-active',
		disabledTabClassName: 'slds-disabled',
		variant: 'default',
	};

	componentDidMount() {
		this.checkFocus();
	}

	componentDidUpdate() {
		this.checkFocus();
	}

	checkFocus = () => {
		if (this.props.selected && this.props.focus && this.node) {
			this.node.focus();
		}
	};

	render() {
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
		} = this.props;
		let tabIndex;

		if (selected) {
			tabIndex = '0';
		} else if (disabled) {
			tabIndex = '-1';
		} else {
			tabIndex = null;
		}

		return (
			<li
				className={classNames(className, {
					[activeTabClassName]: selected,
					[disabledTabClassName]: disabled,
					'slds-tabs_default__item': variant === 'default',
					'slds-tabs_scoped__item': variant === 'scoped',
				})}
				role="presentation"
				ref={(node) => {
					this.node = node;
				}}
				tabIndex={tabIndex}
				id={id}
				title={typeof children === 'string' ? children : null}
			>
				<a
					className={classNames({
						[activeTabClassName]: selected,
						[disabledTabClassName]: disabled,
						'slds-tabs_default__link': variant === 'default',
						'slds-tabs_scoped__link': variant === 'scoped',
					})}
					href="javascript:void(0);" // eslint-disable-line no-script-url
					role="tab"
					tabIndex="-1"
					aria-controls={panelId}
					aria-disabled={disabled}
					aria-selected={selected ? 'true' : 'false'}
				>
					{children}
				</a>
			</li>
		);
	}
}

export default Tab;
