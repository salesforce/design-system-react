/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # App Launcher Expandable Section Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from 'classnames';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

// ## Children
import ExpandableSection from '../expandable-section';

// ## Constants
import {
	APP_LAUNCHER_EXPANDABLE_SECTION,
	APP_LAUNCHER_TILE,
} from '../../utilities/constants';

/**
 * App Launcher Sections allow users to categorize App Tiles & Links as well as toggle their display. It is a superset of components/expandable-section with content formatting.
 * All Expandable Section props are compatible with props passed to this component.
 */
class AppLauncherExpandableSection extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = APP_LAUNCHER_EXPANDABLE_SECTION;

	// ### Prop Types
	static propTypes = {
		/**
		 * **Assistive text for accessibility.**
		 * * `toggleSection`: Label for the icon that expands / collapses the section
		 */
		assistiveText: PropTypes.shape({
			toggleSection: PropTypes.string,
		}),
		/**
		 * Contents of the section
		 */
		children: PropTypes.node,
		/**
		 * Class names to be added to the `slds-section` classed node
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * Unique identifier for the expandable section. The id is automatically generated if not provided
		 */
		id: PropTypes.string,
		/**
		 * Specifies whether the section is expanded or collapsed. If not provided, component will use its own state to manage this itself
		 */
		isOpen: PropTypes.bool,
		/**
		 * Specifies whether the section can be expanded or collapsed. Defaults to `false`
		 */
		nonCollapsible: PropTypes.bool,
		/**
		 * Callback for when the section is expanded or collapsed. Passes event object and data object with `isOpen` bool.
		 */
		onToggleOpen: PropTypes.func,
		/**
		 * The title for the section
		 */
		title: PropTypes.string.isRequired,
	};

	state = {
		isOpen: true,
	};

	constructor(props) {
		super(props);

		checkProps(APP_LAUNCHER_EXPANDABLE_SECTION, props, componentDoc);
	}

	toggleOpen = (event, data) => {
		if (this.props.onToggleOpen) {
			this.props.onToggleOpen(event, data);
		} else {
			this.setState((prevState) => ({
				isOpen: !prevState.isOpen,
			}));
		}
	};

	render() {
		const expandableSectionProps = {
			...this.props,
			...{
				isOpen:
					this.props.isOpen !== undefined
						? this.props.isOpen
						: this.state.isOpen,
				onToggleOpen: this.toggleOpen,
			},
		};
		let ulChildrenType = 'tiles';

		const ulContent = React.Children.map(this.props.children, (child) => {
			let liClasses =
				'slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3';

			if (
				(child && child.type && child.type.displayName !== APP_LAUNCHER_TILE) ||
				(child && !child.type)
			) {
				ulChildrenType = 'links';
			}

			if (ulChildrenType === 'links') {
				liClasses = 'slds-col_padded slds-p-vertical_xx-small slds-size_1-of-5';
			}

			return <li className={liClasses}>{child}</li>;
		});

		return (
			<ExpandableSection {...expandableSectionProps}>
				<ul
					className={classNames('slds-grid slds-wrap', {
						'slds-grid_pull-padded': ulChildrenType === 'tiles',
					})}
				>
					{ulContent}
				</ul>
			</ExpandableSection>
		);
	}
}

export default AppLauncherExpandableSection;
