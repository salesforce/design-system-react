// SELECTLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

const Selectlist = React.createClass(Lib.merge({}, SelectlistCore, {
	mixins: [State, Events, genericWillMount],
	
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.object
		]),
		collection: React.PropTypes.any.isRequired,
		text: React.PropTypes.string
	},

	menuItems () {
		return this._collection.map((item, index) => {
			return (
				<SelectlistItem key={index} item={item} text={item.getText()} type={item.getType()} disabled={item.getDisabled()} onSelected={this.handleMenuItemSelected} />
			);
		});
	},

	render () {
		const item = this._getSelection();

		const styles = {
			width: this.state.width
		};
		
		const disabledClass = {};
		disabledClass[this.cssClasses.DISABLED] = this.props.disabled;

		return (
			<div className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, disabledClass)} onKeyPress={this.handleKeyPress}>
				<button className={classNames(this.cssClasses.BTN_DEFAULT, this.cssClasses.TOGGLE, disabledClass)} data-toggle="dropdown" type="button" disabled={this.props.disabled} style={styles}>
					<span className={this.cssClasses.LABEL}>{item.getText() || this.strings.NONE_SELECTED}</span>
					<span className={this.cssClasses.CARET}></span>
					<span className={this.cssClasses.SR_ONLY}>this.strings.TOGGLE_DROPDOWN</span>
				</button>
				<ul className={this.cssClasses.MENU} role="menu" style={styles} ref={this.cssClasses.MENU}>
					{this.menuItems()}
				</ul>
			</div>
		);
	},

	handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},

	handleKeyPress (e) {
		this.elements.dropdownMenu = this.elements.dropdownMenu || Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.MENU]));
		
		const key = e.key || e.keyIdentifier;
		if (key) this._jumpToLetter(key);
	}
}));

export default Selectlist;
