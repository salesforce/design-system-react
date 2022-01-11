import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EventUtil from '../../utilities/event';

import BuilderHeaderUtilities from './utilities';
import BuilderHeaderNavLink from './nav-link';

import Icon from '../icon';

import {
	BUILDER_HEADER,
	BUILDER_HEADER_NAV,
	BUILDER_HEADER_TOOLBAR,
	BUILDER_HEADER_MISC,
	BUILDER_HEADER_UTILITIES,
} from '../../utilities/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `backIcon`: Used for the back icon.
	 * * `helpIcon`: Used for the help icon.
	 * * `icon`: Used for the main icon next to the header title.
	 * * _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		backIcon: PropTypes.string,
		helpIcon: PropTypes.string,
		icon: PropTypes.string,
	}),
	/**
	 * Provide children of the types `<BuilderHeaderNav />`, `<BuilderHeaderToolbar />`, or `<BuilderHeaderMisc />` to define the structure of the header.
	 * ```
	 * <BuilderHeader>
	 *   <BuilderHeaderNav />
	 *   <BuilderHeaderToolbar />
	 *   <BuilderHeaderMisc />
	 * </BuilderHeader>
	 * ```
	 */
	children: PropTypes.node,
	/**
	 * CSS classes to be added to tag with `.slds-builder-header_container`. Uses `classNames` [API](https://github.com/JedWatson/classnames). _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Event Callbacks
	 * * `onClickBack`: Called when the Back link is clicked.
	 * * `onClickHelp`: Called when the Help link is clicked.
	 * _Tested with Mocha testing._
	 */
	events: PropTypes.shape({
		onClickBack: PropTypes.func,
		onClickHelp: PropTypes.func,
	}),
	/**
	 * Category of the title icon from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
	 */
	iconCategory: PropTypes.string,
	/**
	 * CSS classes that are applied to the title icon.
	 */
	iconClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Name of the title icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
	 */
	iconName: PropTypes.string,
	/**
	 * Path to the title icon. This will override any global icon settings.
	 */
	iconPath: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `back`: The label for the Back link.
	 * * `help`: The label for the Help link.
	 * * `pageType`: The label that describes the page type.
	 * * `title`: The label for the page title.
	 * _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		back: PropTypes.string,
		help: PropTypes.string,
		pageType: PropTypes.string,
		title: PropTypes.string,
	}),
	/**
	 * Custom styles applied to the `.slds-builder-header_container` element.
	 */
	style: PropTypes.object,
};

const defaultProps = {
	assistiveText: {
		backIcon: 'Back',
		helpIcon: 'Help',
		icon: 'Builder',
	},
	iconCategory: 'utility',
	iconName: 'builder',
	labels: {
		back: 'Back',
		help: 'Help',
		pageType: 'Page Type',
		title: 'App Name',
	},
};

/**
 * Every builder needs a builder header, which contains basic navigation elements. It also shows the builder type and content name.
 */
const BuilderHeader = (props) => {
	const assistiveText = {
		...defaultProps.assistiveText,
		...props.assistiveText,
	};
	const events = {
		...{},
		...props.events,
	};
	const labels = {
		...defaultProps.labels,
		...props.labels,
	};

	let nav;
	let toolbar;
	// Default utilities includes Back and Help links
	let utilities = (
		<BuilderHeaderUtilities>
			<BuilderHeaderNavLink
				assistiveText={{ icon: assistiveText.backIcon }}
				iconCategory="utility"
				iconName="back"
				label={labels.back}
				onClick={EventUtil.trappedHandler(events.onClickBack)}
			/>
			<BuilderHeaderNavLink
				assistiveText={{ icon: assistiveText.helpIcon }}
				iconCategory="utility"
				iconName="help"
				label={labels.help}
				onClick={EventUtil.trappedHandler(events.onClickHelp)}
			/>
		</BuilderHeaderUtilities>
	);
	const misc = [];
	React.Children.forEach(props.children, (child) => {
		if (child) {
			switch (child.type.displayName) {
				case BUILDER_HEADER_NAV:
					nav = child;
					break;
				case BUILDER_HEADER_TOOLBAR:
					toolbar = child;
					break;
				case BUILDER_HEADER_MISC:
					// eslint-disable-next-line fp/no-mutating-methods
					misc.push(child);
					break;
				case BUILDER_HEADER_UTILITIES:
					utilities = child;
					break;
				default:
			}
		}
	});

	let iconCategory;
	let iconName;
	let iconPath;
	if (props.iconPath) {
		({ iconPath } = props);
	} else {
		({ iconCategory, iconName } = props);
	}

	return (
		<div style={{ position: 'relative', height: '100px' }}>
			<div
				className={classNames('slds-builder-header_container', props.className)}
				style={props.style}
			>
				<header className="slds-builder-header">
					<div className="slds-builder-header__item">
						<div className="slds-builder-header__item-label slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: assistiveText.icon }}
									category={iconCategory}
									containerClassName={classNames(
										'slds-icon_container',
										'slds-icon-utility-builder',
										'slds-current-color',
										props.iconClassName
									)}
									name={iconName}
									path={iconPath}
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">{labels.title}</div>
						</div>
					</div>
					{nav}

					{misc.length > 0 ? (
						misc
					) : (
						<div className="slds-builder-header__item slds-has-flexi-truncate">
							<h1 className="slds-builder-header__item-label">
								<span className="slds-truncate" title={labels.pageType}>
									{labels.pageType}
								</span>
							</h1>
						</div>
					)}

					{utilities}
				</header>
				{toolbar}
			</div>
		</div>
	);
};

BuilderHeader.displayName = BUILDER_HEADER;
BuilderHeader.propTypes = propTypes;
BuilderHeader.defaultProps = defaultProps;
export default BuilderHeader;
