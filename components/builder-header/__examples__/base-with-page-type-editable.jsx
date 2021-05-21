import React from 'react';

import IconSettings from '~/components/icon-settings';
import EditDialog from '~/components/popover/edit-dialog'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime
import Tooltip from '~/components/tooltip'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';
import BuilderHeader from '~/components/builder-header';
import BuilderHeaderNav from '~/components/builder-header/nav';
import BuilderHeaderNavDropdown from '~/components/builder-header/nav-dropdown';
import BuilderHeaderNavLink from '~/components/builder-header/nav-link';
import BuilderHeaderMisc from '~/components/builder-header/misc';

const DEFAULT_PAGE_TYPE = 'Page Type';
const DEFAULT_ERROR_TEXT = '';

class Example extends React.Component {
	static displayName = 'PopoverExample';

	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.isOpen,
			pageType: DEFAULT_PAGE_TYPE, // stores pageType in edit input field
			prevPageType: DEFAULT_PAGE_TYPE,
			errorText: DEFAULT_ERROR_TEXT,
		};
	}

	onChange = (inputName) => (event, { value }) => {
		this.setState({ pageType: value });
	};

	handleClose = (event, data) => {
		if (this.props.log) {
			this.props.log('onClose')(event, data);
		}
	};

	handleRequestClose = (event, data) => {
		if (this.props.log) {
			this.props.log('handleRequestClose');
		}
		this.setState({
			isOpen: false,
			pageType: this.state.prevPageType,
			errorText: DEFAULT_ERROR_TEXT,
		});
	};

	handleSave = (event, data) => {
		if (this.state.pageType.length === 0) {
			this.setState({
				errorText: 'Required field.',
			});
		} else if (this.state.pageType.length > 255) {
			this.setState({
				errorText: 'Shorten this value to 255 or fewer characters.',
			});
		} else {
			this.setState({
				prevPageType: this.state.pageType,
				isOpen: false,
				errorText: DEFAULT_ERROR_TEXT,
			});
		}
	};

	handleOpen = () => {
		this.setState({
			isOpen: true,
		});
	};

	handleEnter = () => {
		this.setState({
			opacity: 1,
		});
	};

	onOpen = () => {
		if (this.inputRef) {
			this.inputRef.focus();
		}
	};

	setInputRef = (inputRef) => {
		this.inputRef = inputRef;
	};

	render() {
		// Body of Edit Dialog that is shown when clicking on edit button (pencil icon)
		const editDialogPopoverBody = (
			<div className="slds-form slds-form_stacked slds-p-top_medium slds-p-right_small slds-p-left_small">
				<Input
					id="page-type"
					inputRef={this.setInputRef}
					label="Page Type"
					value={this.state.pageType}
					onChange={this.onChange('page-type')}
					required
					errorText={this.state.errorText}
				/>
			</div>
		);
		return (
			<IconSettings iconPath="/assets/icons">
				<BuilderHeader
					assistiveText={{
						icon: 'Builder',
						backIcon: 'Back',
						helpIcon: 'Help',
					}}
					events={{
						onClickBack: () => console.log('onClickBack'),
						onClickHelp: () => console.log('onClickHelp'),
					}}
					labels={{
						back: 'Back',
						help: 'Help',
						pageType: '',
						title: 'App Name',
					}}
					style={{ position: 'relative' }}
				>
					<BuilderHeaderNav>
						<BuilderHeaderNavLink
							assistiveText={{ label: 'Link' }}
							iconCategory="utility"
							iconName="settings"
							label="Link"
						/>
						<BuilderHeaderNavDropdown
							assistiveText={{ icon: 'Dropdown' }}
							iconCategory="utility"
							iconName="page"
							id="dropdown"
							label="Dropdown"
							options={[
								{ label: 'Menu Item One', value: 'A0' },
								{ label: 'Menu Item Two', value: 'B0' },
							]}
						/>
					</BuilderHeaderNav>
					<BuilderHeaderMisc>
						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<span
								className="slds-p-right_x-small slds-truncate"
								style={{ display: 'inline-block' }}
							>
								{this.state.prevPageType}
							</span>
							<EditDialog
								ariaLabelledby="Edit Name"
								body={editDialogPopoverBody}
								isModified={this.state.pageType !== this.state.prevPageType}
								onCancel={this.handleRequestClose}
								onClose={this.handleClose}
								onRequestClose={this.handleRequestClose}
								onSave={this.handleSave}
								handleOpen={this.handleOpen}
								onOpen={this.onOpen}
								position="absolute"
								align="top left"
								id="edit-dialog-popover"
								isOpen={this.state.isOpen}
								style={{ color: 'initial' }}
								labels={{ save: 'Done' }}
							>
								<Tooltip
									id="page-type-tooltip"
									align="bottom"
									content="Edit Page Type"
								>
									<Button
										assistiveText={{ icon: 'Edit: Status' }}
										className="slds-button_reset"
										iconCategory="utility"
										iconName="edit"
										inverse
										onClick={this.handleOpen}
										variant="icon"
										style={{ verticalAlign: 'middle' }}
										onMouseEnter={this.handleEnter}
									/>
								</Tooltip>
							</EditDialog>
						</div>
					</BuilderHeaderMisc>
					<BuilderHeaderMisc>
						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<span
								className="slds-p-right_x-small slds-truncate"
								style={{ display: 'inline-block' }}
							>
								{this.state.prevPageType}
							</span>
							<EditDialog
								ariaLabelledby="Edit Name"
								body={editDialogPopoverBody}
								isModified={this.state.pageType !== this.state.prevPageType}
								onCancel={this.handleRequestClose}
								onClose={this.handleClose}
								onRequestClose={this.handleRequestClose}
								onSave={this.handleSave}
								handleOpen={this.handleOpen}
								onOpen={this.onOpen}
								position="absolute"
								align="top left"
								id="edit-dialog-popover"
								isOpen={this.state.isOpen}
								style={{ color: 'initial' }}
								labels={{ save: 'Done' }}
							>
								<Tooltip
									id="page-type-tooltip"
									align="bottom"
									content="Edit Page Type"
								>
									<Button
										assistiveText={{ icon: 'Edit: Status' }}
										className="slds-button_reset"
										iconCategory="utility"
										iconName="edit"
										inverse
										onClick={this.handleOpen}
										variant="icon"
										style={{ verticalAlign: 'middle' }}
										onMouseEnter={this.handleEnter}
									/>
								</Tooltip>
							</EditDialog>
						</div>
					</BuilderHeaderMisc>
				</BuilderHeader>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
