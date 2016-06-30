import AppTiles from './app-tiles.js';
import Button from 'slds-for-react/button';
import Modal from '../slds-for-react/modal.js';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import reactMixin from 'react-mixin';
import Search from '../search';

class AppLauncherModal extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		this.handleAppTileClicked = this.handleAppTileClicked.bind(this);
		this.handleModalCancel = this.handleModalCancel.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.createHeader = this.createHeader.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	createHeader () {
		return (
			<div>
				<div className="slds-grid slds-grid--pull-padded">
					<div className="slds-modal__header--appLauncherTitle slds-col slds-p-left--large slds-size--1-of-3">
						{this.props.localization.APP_LAUNCHER_TITLE}
					</div>
					<Search
						className="slds-col slds-m-top--x-small slds-m-horizontal--xx-large slds-size--1-of-3"
						onChange={this.handleSearchChange}
						onInputClick={this.handleSearchInputClick}
						onKeyDown={this.handleSearchChange}
						onKeyPress={this.handleSearchChange}
						placeholder={this.props.localization.APP_LAUNCHER_SEARCH_PLACEHOLDER}
						value={this.props.search}
					/>
					<div className="slds-col slds-size--1-of-3"></div>
				</div>
				<Button
					assistiveText="Close"
					className="slds-modal__close"
					iconCategory="utility"
					iconName="close"
					iconSize="large"
					iconStyle="icon-inverse"
					onClick={this.handleModalClose}
				/>
			</div>
		);
	}

	handleAppTileClicked (e, keepOpen) {
		if(!keepOpen) {
			this.handleModalClose(e);
		}

		if (this.props.appTileClicked) {
			this.props.appTileClicked(e);
		}
	}

	handleSearchChange (value, e) {
		e.stopPropagation();

		if (value !== this.props.search && this.props.onSearchChange) {
			this.props.onSearchChange(value, e);
		}
	}


	handleModalCancel (e) {
		if (this.props.onCancel) {
			this.props.onCancel(e);
		}
	}

	handleModalClose (e) {
		if (this.props.onClose) {
			this.props.onClose(e);
		}
	}

	render () {
		return (
			<Modal
				isLarge
				isOpen={this.props.modalIsOpen}
				onCancel={this.handleModalCancel}
				onClose={this.handleModalClose}
				renderHeader={this.createHeader}
				triggerNode={this.props.trigger}
			>
				<AppTiles
					appTileClicked={this.handleAppTileClicked}
					collection={this.props.collection}
					localization={this.props.localization}
					isVisible={this.props.modalIsOpen}
					search={this.props.search}
					filterForSearch={this.props.filterForSearch}
				/>
			</Modal>
		);
	}
}

AppLauncherModal.displayName = 'AppLauncherModal';

AppLauncherModal.propTypes = {
	appTileClicked: React.PropTypes.func,
	collection: React.PropTypes.array.isRequired,
	localization: React.PropTypes.object.isRequired,
	modalIsOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	onCancel: React.PropTypes.func,
	trigger: React.PropTypes.object,
	filterForSearch: React.PropTypes.func.isRequired,
	search: React.PropTypes.string,
	onSearchChange: React.PropTypes.func
};

reactMixin(AppLauncherModal.prototype, PureRenderMixin);

export default AppLauncherModal;
