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
		const icon = '<use xlink:href="/examples/assets/icons/utility-sprite/svg/symbols.svg#down"></use>'; // react doesn't currently support xlink:href in a svg tag
		const item = this._getSelection();
		const selectionName = item.getText();
		const styles = {
			width: this.state.width
		};
		const inputStyle = {
			border: 'none',
			borderRight: '1px solid #d8dde6',
			borderRadius: '.25rem 0 0 .25rem'
		};

		return (
		<div className="slds-combobox slds-form-element">
		  <div aria-expanded="true" className="slds-picklist">
			<button className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true" style={{paddingLeft: 0}} disabled={this.props.disabled} aria-expanded={this.state.isOpen} onClick={this._handleClicked}>
			  <div className="slds-form-element__control">
				<input name={this.props.name} type="text" value={selectionName} disabled={this.props.disabled} onChange={this._handleChanged} className="slds-input" style={inputStyle} />
			  </div>
			  <svg aria-hidden="true" className="slds-icon" style={{right: '.7rem'}} dangerouslySetInnerHTML={{__html: icon}} />
			</button>
			<div className={classNames('slds-dropdown', 'slds-dropdown--left', 'slds-dropdown--small', 'lds-dropdown--menu', {'slds-hide': !this.state.isOpen})}>
			  <ul className="slds-dropdown__list" role="menu" style={styles} ref={this.cssClasses.MENU}>
				{this._menuItems()}
			  </ul>
			</div>
		  </div>
		</div>
		);
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
