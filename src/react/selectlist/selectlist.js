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
				<SelectlistItem key={index} item={item} text={item.getText()} type={item.getType()} disabled={item.getDisabled()} onSelected={this._handleMenuItemSelected} />
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

		const openClass = {};
		openClass[this.cssClasses.OPEN] = this.state.isOpen;

		return (
			<div className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, disabledClass, openClass)} onKeyPress={this._handleKeyPressed}>
				<button className={classNames(this.cssClasses.BTN_DEFAULT, this.cssClasses.TOGGLE, disabledClass)} type="button" disabled={this.props.disabled} style={styles} aria-haspopup="true" aria-expanded={this.state.isOpen} onClick={this._handleClicked}>
					<span className={this.cssClasses.LABEL}>{item.getText() || this.strings.NONE_SELECTED}</span>
					<span className={this.cssClasses.CARET}></span>
					<span className={this.cssClasses.SR_ONLY}>{this.strings.TOGGLE_DROPDOWN}</span>
				</button>
				<ul className={this.cssClasses.MENU} role="menu" style={styles} ref={this.cssClasses.MENU}>
					{this.menuItems()}
				</ul>
			</div>
		);
	},
	
	componentDidMount () {
		document.addEventListener('click', this._closeMenu, false);
	},
	
	componentWillUnmount () {
		document.removeEventListener('click', this._closeMenu, false);
	},
	
	_closeMenu (e) {
		if (e.originator !== this) {
			this.setState({
				isOpen: false
			});
		}
	},
	
	_onSelected () {
		this.setState({
			isOpen: false
		});
	},

	_handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},
	
	_handleClicked (e) {
		e.nativeEvent.originator = this;
		
		if (!this.props.disabled) {
			this.setState({
				isOpen: !this.getState('isOpen')
			});
		}
	},

	_handleKeyPressed (e) {
		this.elements.dropdownMenu = this.elements.dropdownMenu || Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.MENU]));
		
		const key = e.key || e.keyIdentifier;
		if (key) this._jumpToLetter(key);
	}
}));

export default Selectlist;
