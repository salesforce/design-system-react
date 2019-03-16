import React from 'react';

import ButtonGroup from '../button-group'
import Dropdown from '../menu-dropdown';
import Icon from '../icon';
import Input from '../input';
import InputIcon from '../icon/input-icon';
import Button from '../button';

/**
 * Header for use in builder tools.
 */
const BuilderHeader = () => (
	<div style={{ position: 'relative', height: '100px' }}>
		<div className="slds-builder-header_container">
			<header className="slds-builder-header">
				<div className="slds-builder-header__item">
					<div className="slds-builder-header__item-label slds-media slds-media_center">
						<div className="slds-media__figure">
							<Icon
								assistiveText={{ label: 'Builder' }}
								category="utility"
								containerClassName="slds-icon_container slds-icon-utility-builder slds-current-color"
								name="builder"
								size="x-small"
							/>
						</div>
						<div className="slds-media__body">Einstein Data Manager</div>
					</div>
				</div>
				<div className="slds-builder-header__item slds-has-flexi-truncate">
					<h1 className="slds-builder-header__item-label">
						<span className="slds-truncate" title="Opportunities for Accounts">Opportunities for Accounts</span>
					</h1>
					<Input
						iconLeft={
							<InputIcon
								assistiveText={{ icon: 'Search' }}
								category="utility"
								name="search"
								/>
							}
						placeholder="Search"
						styleContainer={{ width: '50%', marginRight: '16px' }}
						styleInput={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(221, 219, 218, 0.2)' }}
				/>
				</div>
				<div className="slds-builder-header__item slds-builder-header__utilities">
					<div className="slds-builder-header__utilities-item">
						<a href="javascript:void(0);" className="slds-builder-header__item-action slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: 'Builder' }}
									category="utility"
									containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
									name="back"
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">Back to Analytics Studio</div>
						</a>
					</div>
					<div className="slds-builder-header__utilities-item">
						<a href="javascript:void(0);" className="slds-builder-header__item-action slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: 'Builder' }}
									category="utility"
									containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
									name="help"
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">Help</div>
						</a>
					</div>
				</div>
			</header>
			<div className="slds-builder-toolbar" role="toolbar">
				<div className="slds-builder-toolbar__item-group" aria-label="Canvas Actions">
					<ButtonGroup>
						<Button
							assistiveText={{ icon: 'Undo' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="undo"
							variant="icon"
						/>
						<Button
							assistiveText={{ icon: 'Redo' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="redo"
							variant="icon"
						/>
					</ButtonGroup>
				</div>
				<div className="slds-builder-toolbar__item-group" aria-label="Edit actions">
					<Button
						assistiveText={{ icon: 'Undo' }}
						className="slds-button_icon-border"
						iconCategory="utility"
						iconName="comments"
						variant="icon"
					/>
				</div>
				<div className="slds-builder-toolbar__item-group" aria-label="Canvas Actions">
					<ButtonGroup>
						<Button
							assistiveText={{ icon: 'Undo' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="upload"
							variant="icon"
						/>
						<Button
							assistiveText={{ icon: 'Redo' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="download"
							variant="icon"
						/>
					</ButtonGroup>
				</div>
				<div className="slds-builder-toolbar__actions" aria-label="Document actions">
					<ButtonGroup>
						<Button label="Save" />
						<Dropdown
							assistiveText={{ icon: 'Menu' }}
							buttonVariant="icon"
							iconCategory="utility"
							iconName="down"
							iconVariant="border-filled"
							openOn="click"
							options={[
								{ label: 'Save As', value: 'saveas' },
								{ label: 'Clone', value: 'clone' },
								{ label: 'Delete', value: 'delete' },
							]}
						/>
					</ButtonGroup>
					<Button
						iconCategory="utility"
						iconName="right"
						iconPosition="left"
						label="Run Dataflow"
						variant="brand"
					/>
				</div>
			</div>
		</div>
	</div>
	/*<div style={{ position: 'relative', height: '100px' }}>
		<div className="slds-builder-header_container">
			<header className="slds-builder-header">
				<div className="slds-builder-header__item">
					<div className="slds-builder-header__item-label slds-media slds-media_center">
						<div className="slds-media__figure">
							<Icon
								assistiveText={{ label: 'Builder' }}
								category="utility"
								containerClassName="slds-icon_container slds-icon-utility-builder slds-current-color"
								name="builder"
								size="x-small"
							/>
						</div>
						<div className="slds-media__body">App Name</div>
					</div>
				</div>
				<nav className="slds-builder-header__item slds-builder-header__nav">
					<ul className="slds-builder-header__nav-list">
						<li className="slds-builder-header__nav-item">
							<a href="javascript:void(0);" className="slds-builder-header__item-action slds-media slds-media_center">
								<span className="slds-media__figure">
									<Icon
										assistiveText={{ label: 'Builder' }}
										category="utility"
										containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
										name="settings"
										size="x-small"
									/>
								</span>
								<span className="slds-media__body">
									<span className="slds-truncate" title="Link">Link</span>
								</span>
							</a>
						</li>
						<li className="slds-builder-header__nav-item">
							<button className="slds-button slds-builder-header__item-action slds-media slds-media_center" aria-haspopup="true" title="Click to open menu">
								<span className="slds-media__figure">
									<Icon
										assistiveText={{ label: 'Builder' }}
										category="utility"
										containerClassName="slds-icon_container slds-icon-utility-page slds-current-color"
										name="page"
										size="x-small"
									/>
								</span>
								<span className="slds-media__body">
									<span className="slds-truncate" title="Dropdown">Dropdown</span>
									<Icon
										assistiveText={{ label: 'Builder' }}
										category="utility"
										containerClassName="slds-icon_container slds-icon-utility-chevrondown slds-current-color slds-m-left_small"
										name="chevrondown"
										size="x-small"
									/>
								</span>
							</button>
						</li>
					</ul>
				</nav>
				<div className="slds-builder-header__item slds-has-flexi-truncate">
					<h1 className="slds-builder-header__item-label">
						<span className="slds-truncate" title="Page Type">Page Type</span>
					</h1>
				</div>
				<div className="slds-builder-header__item slds-builder-header__utilities">
					<div className="slds-builder-header__utilities-item">
						<a href="javascript:void(0);" className="slds-builder-header__item-action slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: 'Builder' }}
									category="utility"
									containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
									name="back"
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">Back</div>
						</a>
					</div>
					<div className="slds-builder-header__utilities-item">
						<a href="javascript:void(0);" className="slds-builder-header__item-action slds-media slds-media_center">
							<div className="slds-media__figure">
								<Icon
									assistiveText={{ label: 'Builder' }}
									category="utility"
									containerClassName="slds-icon_container slds-icon-utility-settings slds-current-color"
									name="help"
									size="x-small"
								/>
							</div>
							<div className="slds-media__body">Help</div>
						</a>
					</div>
				</div>
			</header>
			<div className="slds-builder-toolbar" role="toolbar">
				<div className="slds-builder-toolbar__item-group" aria-label="Canvas Actions">
					<ButtonGroup>
						<Button
							assistiveText={{ icon: 'Undo' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="undo"
							variant="icon"
						/>
						<Button
							assistiveText={{ icon: 'Redo' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="redo"
							variant="icon"
						/>
					</ButtonGroup>
				</div>
				<div className="slds-builder-toolbar__item-group" aria-label="Edit actions">
					<ButtonGroup>
						<Button
							assistiveText={{ icon: 'Cut' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="cut"
							variant="icon"
						/>
						<Button
							assistiveText={{ icon: 'Copy' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="copy"
							variant="icon"
						/>
						<Button
							assistiveText={{ icon: 'Paste' }}
							className="slds-button_icon-border"
							iconCategory="utility"
							iconName="paste"
							variant="icon"
						/>
					</ButtonGroup>
				</div>
				<div className="slds-builder-toolbar__actions" aria-label="Document actions">
					<Button
						iconCategory="utility"
						iconName="right"
						iconPosition="left"
						label="Run"
					/>
					<Button label="Save As" />
					<Button label="Save" variant="brand" />
				</div>
			</div>
		</div>
	</div>*/
);

BuilderHeader.displayName = 'BuilderHeader';
export default BuilderHeader;
