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

import Icon from '../../icon';

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
		 * When `true`, the class `.slds-is-active` is applied.
		 */
		selected: PropTypes.bool,

		/**
		 * When `true`, the HTML attribute `aria-disabled` will be applied. Disabled Tab CSS has been removed. If you'd like to use the styling, please import it in your module bundler. `import 'css-loader!/node_modules/design-system-react/styles/tabs/tab.css';` This feature may be removed in the future due to disabled tabs being inaccessible.
		 */
		disabled: PropTypes.bool,

		/**
		 * The CSS class to be applied when this tab is selected. Defaults to `.slds-is-active`. If another class is desired, it should be passed in _along with_ `.slds-is-active`, not _instead_ of it.
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
		 * If the Tabs should be scoped, vertical, or default (default value)
		 */
		variant: PropTypes.oneOf(['default', 'scoped', 'vertical']),

		/**
		 * Show an icon that can be used to communicate when a tab contains a validation error that needs attention
		 */
		hasError: PropTypes.bool,

		/**
		 * **Assistive text for accessibility**
		 * This object is merged with the default props object on every render.
		 * * `withErrorIcon`: This text is for the error icon that will be placed next to the `<Tab />` title
		 */
		assistiveText: PropTypes.shape({
			withErrorIcon: PropTypes.string,
		}),
	};

	static defaultProps = {
		focus: false,
		selected: false,
		activeTabClassName: 'slds-is-active',
		disabledTabClassName: 'slds-disabled',
		variant: 'default',
		hasError: false,
		assistiveText: {
			withErrorIcon: 'This item has an error',
		},
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
			hasError,
		} = this.props;
		let tabIndex;

		/**
		 * Desired a11y behaviour: The active Tab should get focus when the user presses the
		 * Tab key. After that, Arrow keys should be used to change the focus from one tab
		 * to another. Pressing the Tab key one more time should move the focus away from the
		 * Tab group.
		 *
		 * Here, we put the selected Tab in the navigation path (tabIndex = 0) and remove other
		 * tabs from navigation path (tabIndex = -1).
		 */
		if (selected) {
			tabIndex = '0';
		} else {
			tabIndex = '-1';
		}

		return (
			<li
				className={classNames(className, {
					[activeTabClassName]: selected,
					[disabledTabClassName]: disabled,
					'slds-tabs_default__item': variant === 'default',
					'slds-tabs_scoped__item': variant === 'scoped',
					'slds-vertical-tabs__nav-item': variant === 'vertical',
				})}
				role="presentation"
				id={id}
				title={typeof children === 'string' ? children : null}
			>
				<a
					className={classNames({
						[activeTabClassName]: selected,
						[disabledTabClassName]: disabled,
						'slds-tabs_default__link': variant === 'default',
						'slds-tabs_scoped__link': variant === 'scoped',
						'slds-vertical-tabs__link': variant === 'vertical',
					})}
					href="#"
					role="tab"
					ref={(node) => {
						this.node = node;
					}}
					tabIndex={tabIndex}
					aria-controls={panelId}
					aria-disabled={disabled}
					aria-selected={selected ? 'true' : 'false'}
					onClick={(event) => event.preventDefault()}
				>
					{children}
					{hasError && (
						<span
							className={classNames({
								'slds-tabs__right-icon': variant !== 'vertical',
								'slds-vertical-tabs__right-icon': variant === 'vertical',
							})}
						>
							<Icon
								assistiveText={{
									label: this.props.assistiveText.withErrorIcon,
								}}
								category="utility"
								containerClassName="slds-icon_container slds-icon-utility-error"
								size="x-small"
								name="error"
								colorVariant="error"
								title={this.props.assistiveText.withErrorIcon}
							/>
						</span>
					)}
				</a>
			</li>
		);
	}
}

export default Tab;
