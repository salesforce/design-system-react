// SELECTLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import React from 'react';
import ReactHelpers from '../mixins/helpers';
import Events from '../mixins/events';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

const Selectlist = React.createClass(Lib.extend({}, SelectlistCore, {
	mixins: [ReactHelpers, Events],
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

	getInitialState () {
		return Lib.extend(this.__getInitialState(), {
			wrapperClasses: {}
		});
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

		return (
			<div className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, this.state.wrapperClasses)} onKeyPress={this.handleKeyPress}>
				<button className={classNames('btn btn-default dropdown-toggle', {disabled: this.state.disabled})} data-toggle="dropdown" type="button" disabled={this.state.disabled} style={styles}>
					<span className="selected-label">{selection.get('text') || 'None selected'}</span>
					<span className="caret"></span>
					<span className="sr-only">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu" role="menu" style={styles}>
					{this.menuItems()}
				</ul>
				<input name={this.props.name} className="hidden hidden-field" readOnly aria-hidden="true" type="text" value={JSON.stringify(selection)}></input>
			</div>
		);
	},

	handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},

	handleKeyPress (e) {
		const key = e.key || e.keyIdentifier;
		if (key) this.__jumpToLetter(key);
	}
}));

export default Selectlist;
