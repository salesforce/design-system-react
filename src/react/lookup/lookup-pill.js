// LOOKUP PILL - REACT FACADE

// Framework specific
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../button/button';

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
				<Button iconStyle="icon-bare" icon="utility.close" assistiveText={this.props.strings.REMOVE} onClick={this._handleCloseClick}/>
			</span>
		);
	},

	componentDidMount () {
		if (this.props.autoFocus) {
			ReactDOM.findDOMNode(this).focus();
		}
	},

	_handlePillClick (e) {
		e.preventDefault();
	},

	_handleCloseClick () {
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
