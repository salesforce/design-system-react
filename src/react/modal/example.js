import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import Lookup from '../lookup/lookup';
import sampleData from '../../../sample-data/lookup';

export default function () {
	const ModalExample = React.createClass({
		getInitialState () {
			return {
				isOpen: false,
				collection: sampleData.defaultArray
			};
		},

		render () {
			return (
				<div>
					<Modal
						headerText="Modal Header"
						isOpen={this.state.isOpen}
						onClose={this.onClose}
						onCancel={this.onCancel}
						onPrimary={this.onPrimary}
						primaryButtonText={'Save Test'}
						secondaryButtonText={'Cancel'}
						headerTitle={'React Modal'}
						headerTagline={<span>look what I can <a href="https://c2.staticflickr.com/4/3122/2850356021_eb4d1d9c4c.jpg">do</a></span>}>
						<p>This is a test modal!</p>
						<Lookup
							label="Accounts"
							collection={this.state.collection}
							selection={this.state.selection}
							onChanged={this._handleModelChange}
							modalMenu/>
					</Modal>
					<button className="slds-button slds-button--neutral slds-button--x-small" onClick={this._handleClick}>Toggle</button>
				</div>
			);
		},

		onClose () {
			this.setState({
				isOpen: false
			});
		},

		onCancel () {
			this.setState({
				isOpen: false
			});
		},

		onPrimary () {
			console.log('Item has been saved!');
		},
		
		_handleModelChange (item, selection) {
			this.setState({ selection });
		},

		_handleClick () {
			this.setState({
				isOpen: true
			});
		}
	});

	ReactDOM.render(<ModalExample />, document.getElementById('modal-react-control'));
}
