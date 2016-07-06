/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # App Launcher Modal

// ## Dependencies

// ### React
import React from 'react';

// Removes the need for `React.PropTypes.prop`
const { PropTypes } = React;

// ## Children
import AppTiles from './app-tiles';
import Modal from '../modal';
import ModalHeader from './modal-header';

// import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
// import reactMixin from 'react-mixin';

// ## Constants
import { APP_LAUNCHER_MODAL } from '../../utilities/constants';

const AppLauncherModal = React.createClass({

	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: APP_LAUNCHER_MODAL,

	// ### Prop Types
	propTypes: {
		/*
		 * Set the App Launcher's title text (for localization)
		 */
		appLauncherTitle: PropTypes.string,
		/*
		 * Set the search input's placeholder text (for localization)
		 */
		searchPlaceholderText: PropTypes.string,
		/*
		 * Set the App Exchange Button's text (for localization)
		 */
		appExchangeButtonText: PropTypes.string,
		appTileClicked: PropTypes.func,
		collection: PropTypes.array.isRequired,
		// localization: PropTypes.object.isRequired,
		modalIsOpen: PropTypes.bool,
		onClose: PropTypes.func,
		onCancel: PropTypes.func,
		trigger: PropTypes.object,
		filterForSearch: PropTypes.func.isRequired,
		search: PropTypes.string,
		onSearchChange: PropTypes.func
	},

	// constructor (props) {
	// 	super(props);
	// 	this.state = {};

	// 	this.handleAppTileClicked = this.handleAppTileClicked.bind(this);
	// 	this.handleModalCancel = this.handleModalCancel.bind(this);
	// 	this.handleModalClose = this.handleModalClose.bind(this);
	// 	this.createHeader = this.createHeader.bind(this);
	// 	this.handleSearchChange = this.handleSearchChange.bind(this);
	// }

	handleAppTileClicked (e, keepOpen) {
		if(!keepOpen) {
			this.handleModalClose(e);
		}

		if (this.props.appTileClicked) {
			this.props.appTileClicked(e);
		}
	},

	handleSearchChange (value, e) {
		e.stopPropagation();

		if (value !== this.props.search && this.props.onSearchChange) {
			this.props.onSearchChange(value, e);
		}
	},


	handleModalCancel (e) {
		if (this.props.onCancel) {
			this.props.onCancel(e);
		}
	},

	handleModalClose (e) {
		if (this.props.onClose) {
			this.props.onClose(e);
		}
	},

	render () {
		return (
			<Modal
				size="large"
				isOpen={this.props.modalIsOpen}
				onCancel={this.handleModalCancel}
				onClose={this.handleModalClose}
				renderHeader={this.createHeader}
				triggerNode={this.props.trigger}
			>
				<ModalHeader />
				<AppTiles
					appTileClicked={this.handleAppTileClicked}
					collection={this.props.collection}
					isVisible={this.props.modalIsOpen}
					search={this.props.search}
					filterForSearch={this.props.filterForSearch}
				/>
			</Modal>
		);
	}
});

// reactMixin(AppLauncherModal.prototype, PureRenderMixin);

module.exports = AppLauncherModal;
