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
		
		const disabledClass = {};
		disabledClass[this.cssClasses.DISABLED] = this.props.disabled;
		
		const isOpen = this.getState('isOpen');

		return (
			<div className={classNames(this.cssClasses.CONTROL)} onKeyPress={this.handleKeyPress}>
				<button className="slds-button slds-button--neutral slds-picklist__label" aria-expanded={isOpen} onClick={this._handleItemClick}>
					<span className="slds-truncate">{item.getText() || this.strings.NONE_SELECTED}</span>
					<svg aria-hidden="true" className="slds-icon" dangerouslySetInnerHTML={{__html: '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>'}}></svg>
				</button>
				<div className={classNames('slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu', {'slds-hide': !isOpen})} hidden={!isOpen}>
					<ul className="slds-dropdown__list" role="menu">
						{this.menuItems()}
					</ul>
				</div>
			</div>
		);
	},

	handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},
	
	_handleItemClick () {
		this.setState({
			isOpen: !this.getState('isOpen')
		});
	},

	handleKeyPress (e) {
		this.elements.dropdownMenu = this.elements.dropdownMenu || Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.MENU]));
		
		const key = e.key || e.keyIdentifier;
		if (key) this._jumpToLetter(key);
	}
}));

export default Selectlist;
