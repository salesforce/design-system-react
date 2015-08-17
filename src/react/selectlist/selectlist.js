// SELECTLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import React from 'react';
import Events from '../mixins/events';
import genericWillMount from '../mixins/generic-will-mount';
import State from '../mixins/state';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

const Selectlist = React.createClass(Lib.merge({}, SelectlistCore, {
	mixins: [State, Events, genericWillMount],
	propTypes: {
		disabled: React.PropTypes.bool,
		selection: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.object
		]),
		collection: React.PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		]).isRequired,
		text: React.PropTypes.string
	},

	menuItems () {
		// TO-DO: This should really look at this._collection unless we remove collection handling from the React facade
		return this.props.collection.map((menuItem, index) => {
			return (
				<SelectlistItem key={index} item={menuItem} onSelected={this.handleMenuItemSelected} />
			);
		});
	},

	render () {
		const selection = Lib.getItemAdapter(this.getSelection());

		const styles = {
			width: this.state.width
		};
		
		const disabledClass = {};
		disabledClass[this.cssClasses.DISABLED] = this.props.disabled;

		return (
			<div className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, disabledClass)} onKeyPress={this.handleKeyPress}>
				<button className={classNames('btn btn-default', this.cssClasses.TOGGLE, disabledClass)} data-toggle="dropdown" type="button" disabled={this.props.disabled} style={styles}>
					<span className="selected-label">{selection.get('text') || 'None selected'}</span>
					<span className="caret"></span>
					<span className="sr-only">Toggle Dropdown</span>
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
