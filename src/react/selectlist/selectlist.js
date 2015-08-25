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
		
		const hiddenClass = {};
		hiddenClass[this.cssClasses.HIDDEN] = !this.state.isOpen;

		return (
			<div className={classNames(this.cssClasses.CONTROL, disabledClass)} onKeyPress={this.handleKeyPress}>
				<button className={classNames(this.cssClasses.BTN_DEFAULT, this.cssClasses.PICKLIST_LABEL, disabledClass)} aria-expanded={this.state.isOpen} onClick={this._handleItemClick}>
					<span className={classNames(this.cssClasses.TRUNCATE)}>{item.getText() || this.strings.NONE_SELECTED}</span>
					<svg aria-hidden="true" className={classNames(this.cssClasses.ICON)} dangerouslySetInnerHTML={{__html: '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>'}}></svg>
				</button>
				<div className={classNames(this.cssClasses.MENU, hiddenClass)} hidden={!this.state.isOpen}>
					<ul className={classNames(this.cssClasses.DROPDOWN_LIST)} role="menu" ref={this.cssClasses.DROPDOWN_LIST}>
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
		this.elements.dropdownMenu = this.elements.dropdownMenu || Lib.wrapElement(React.findDOMNode(this.refs[this.cssClasses.DROPDOWN_LIST]));
		
		const key = e.key || e.keyIdentifier;
		if (key) this._jumpToLetter(key);
	}
}));

export default Selectlist;
