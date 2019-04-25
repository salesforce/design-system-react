import React from 'react';

import BuilderHeaderToolbar from './toolbar';
import Icon from '../icon';

import {
	BUILDER_HEADER,
	BUILDER_HEADER_NAV,
	BUILDER_HEADER_TOOLBAR,
} from '../../utilities/constants';

// TODO propTypes

const defaultProps = {
	assistiveText: { icon: 'Builder', actions: 'Document Actions' },
	labels: {
		back: 'Back',
		help: 'Help',
		pageType: 'Page Type',
		title: 'App Name',
	},
};

/**
 * Header for use in builder tools.
 */
const BuilderHeader = (props) => {
	const assistiveText = {
		...defaultProps.assistiveText,
		...props.assistiveText,
	};
	const labels = {
		...defaultProps.labels,
		...props.labels,
	};

	let builderHeaderNav;
	let builderHeaderToolbarProps;
	React.Children.forEach(props.children, (child) => {
		switch (child.type.displayName) {
			case BUILDER_HEADER_NAV:
				builderHeaderNav = child;
				break;
			case BUILDER_HEADER_TOOLBAR:
				builderHeaderToolbarProps = {
					...child.props,
					...{ assistiveText, onRenderActions: props.onRenderActions },
				};
				break;
			default:
		}
	});

	return (
		<div style={{ position: 'relative', height: '100px' }}>
			<div className="slds-builder-header_container">
				<header className="slds-builder-header">
					<div className="slds-builder-header__item">
						<div className="slds-builder-header__item-label slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: assistiveText.icon }}
									category="utility"
									containerClassName="slds-icon_container slds-icon-utility-builder slds-current-color"
									name="builder"
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">{labels.title}</div>
						</div>
					</div>
					{builderHeaderNav}
					<div className="slds-builder-header__item slds-has-flexi-truncate">
						<h1 className="slds-builder-header__item-label">
							<span className="slds-truncate" title={labels.pageType}>
								{labels.pageType}
							</span>
						</h1>
					</div>
					<div className="slds-builder-header__item slds-builder-header__utilities">
						<div className="slds-builder-header__utilities-item">
							<a
								href="javascript:void(0);"
								className="slds-builder-header__item-action slds-media slds-media_center"
							>
								<div className="slds-media__figure">
									<Icon
										assistiveText={{ label: labels.back }}
										category="utility"
										containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
										name="back"
										size="x-small"
									/>
								</div>
								<div className="slds-media__body">{labels.back}</div>
							</a>
						</div>
						<div className="slds-builder-header__utilities-item">
							<a
								href="javascript:void(0);"
								className="slds-builder-header__item-action slds-media slds-media_center"
							>
								<div className="slds-media__figure">
									<Icon
										assistiveText={{ label: labels.help }}
										category="utility"
										containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
										name="help"
										size="x-small"
									/>
								</div>
								<div className="slds-media__body">{labels.help}</div>
							</a>
						</div>
					</div>
				</header>
				{builderHeaderToolbarProps ? <BuilderHeaderToolbar {...builderHeaderToolbarProps} /> : null}
			</div>
		</div>
	);
};

BuilderHeader.defaultProps = defaultProps;
BuilderHeader.displayName = BUILDER_HEADER;
export default BuilderHeader;
