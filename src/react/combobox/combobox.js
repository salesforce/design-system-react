// COMBOBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../lib/lib';
import ComboboxCore, {CONTROL} from '../../core/combobox';

// Framework specific
import React from 'react';
import { SelectlistObject } from '../selectlist/selectlist';

// Third party
import classNames from 'classnames';

export const ComboboxObject = Lib.merge(SelectlistObject, {
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
						{this._menuItems()}
					</ul>
				</div>
			</div>
		);
	},
	
	componentDidMount () {
		document.addEventListener('click', this._closeMenu, false);
		this._findElements();
	},
	
	_handleChanged (e) {
		const value = {};
		
		value[this.accessors.textProp()] = e.target.value;

		this.setSelection(value);
	}
});

let Combobox = Lib.merge({}, ComboboxCore, ComboboxObject);

Combobox = Lib.runHelpers('react', CONTROL, Combobox);
Combobox = React.createClass(Combobox);

export default Combobox;
