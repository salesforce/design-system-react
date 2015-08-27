// COMBOBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import ComboboxCore from '../../core/combobox';

// Framework specific
import React from 'react';
import State from '../mixins/state';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from '../selectlist/selectlist-item';

const Combobox = React.createClass(Lib.merge({}, ComboboxCore, {
	mixins: [State, Events, genericWillMount],
	
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object
		]),
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired
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
		const selectionName = item.getText();

		const styles = {
			width: this.state.width
		};
		
		const disabledClass = {};
		disabledClass[this.cssClasses.DISABLED] = this.props.disabled;

		const openClass = {};
		openClass[this.cssClasses.OPEN] = this.state.isOpen;

		return (
			<div className={classNames(this.cssClasses.CONTROL, 'input-group input-append dropdown', disabledClass)}>
				<input name={this.props.name} className="form-control" type="text" value={selectionName} disabled={this.props.disabled} onChange={this._handleChanged} />
				<div className={classNames('input-group-btn', openClass)} onKeyDown={this._handleKeyPressed} onKeyPress={this._handleKeyPressed}>
					<button type="button" className={classNames(this.cssClasses.CONTROL, this.cssClasses.TOGGLE, 'btn btn-default', disabledClass)} disabled={this.props.disabled} aria-haspopup="true" aria-expanded={this.state.isOpen} onClick={this._handleClicked}><span className="caret"></span></button>
					<ul className="dropdown-menu dropdown-menu-right" role="menu" style={styles} ref={this.cssClasses.MENU}>
						{this.menuItems()}
					</ul>
				</div>
			</div>
		);
	},
	
	componentDidMount () {
		document.addEventListener('click', this._closeMenu, false);
		this._findElements();
		
		if (this.getProperty('resize') === 'auto') {
			this.resize();
		}
	},
	
	componentDidUpdate () {
		this._findElements();
	},
	
	componentWillUnmount () {
		document.removeEventListener('click', this._closeMenu, false);
	},
	
	_findElements () {
		this.elements.dropdownMenu = Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.MENU]));
		
		this.elements.menuItems = [];
		const menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
		
		for (let i = 0; i < menuItems.length; i++) {
			const menuItem = menuItems[i].getElementsByTagName('a');
			
			if (!menuItems[i].disabled && menuItem.length === 1) {
				this.elements.menuItems.push(menuItem[0]);
			}
		}
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
	
	_handleChanged (e) {
		this._setSelection(e.target.value);
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
		if (e.key && (/(ArrowUp|ArrowDown)/.test(e.key) || e.key.length === 1)) {
			e.preventDefault();
			this._keyboardNav(e.key, this.elements.menuItems);
		}
	}
}));

export default Combobox;
