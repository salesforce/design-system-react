// LOOKUP PILL - REACT FACADE

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';

import Svg from '../svg/svg';

export const CONTROL = 'lookup-pill';

const LookupPill = React.createClass({
	displayName: CONTROL,

	propTypes: {
		onDeselect: React.PropTypes.func.isRequired,
		renderer: React.PropTypes.func.isRequired,
		item: React.PropTypes.object.isRequired,
		strings: React.PropTypes.object.isRequired,
		autoFocus: React.PropTypes.bool
	},

	getDefaultProps () {
		return {
			autoFocus: false
		};
	},

	componentDidMount () {
		if (this.props.autoFocus) {
			ReactDOM.findDOMNode(this).focus();
		}
	},

	render () {
		return (
			<span className="slds-pill slds-pill--bare" tabIndex="0" onClick={this._handlePillClick} onKeyPress={this._handleKeyPressed} onKeyDown={this._handleKeyPressed}>
				<a href="#" className="slds-pill__label" tabIndex="-1">
					{this.props.renderer({
						icon: this.props.item.getIcon(),
						text: this.props.item.getText(),
						item: this.props.item._item,
						strings: this.props.strings
					})}
				</a>
				<button className="slds-button slds-button--icon-bare" onClick={this._handleCloseClick}>
					<Svg icon="utility.close" className="slds-button__icon" />
					<span className="slds-assistive-text">Remove</span>
				</button>
			</span>
		);
	},

	componentDidUpdate ( prevProps ) {
		console.log('prevProps: ', prevProps);
	},

	_handlePillClick (e) {
		e.preventDefault();
		this.props.onDeselect(this.props.item);
	},

	_handleCloseClick (e) {
		e.preventDefault();
		this.props.onDeselect(this.props.item);
	},

	_handleKeyPressed (e) {
		if (e.key && /(Backspace|Delete)/.test(e.key)) {
			e.preventDefault();
			this.props.onDeselect(this.props.item);
		}
	}
});

export default LookupPill;
