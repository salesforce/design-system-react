// SELECTLIST CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import SelectlistCore from '../../core/selectlist';

// Framework specific
import React from 'react';
import ReactHelpers from '../mixins/helpers';
import selectable from '../mixins/selectable';
import Events from '../events';
// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from './selectlist-item';

const Selectlist = React.createClass(Lib.extend({}, SelectlistCore, Events, {
	mixins: [ReactHelpers, selectable],
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
		return this.props.collection.map((menuItem) => {
			return (
				<SelectlistItem key={Lib.getProp(menuItem, 'id')} item={menuItem} onSelected={this.handleMenuItemSelected} />
			);
		});
	},

	render () {
		const selection = this.getSelection();

		const styles = {
			width: this.state.width
		};

		return (
			<div className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, this.state.wrapperClasses)} onKeyPress={this.handleKeyPress}>
				<button className={classNames('btn btn-default dropdown-toggle', {disabled: this.state.disabled})} data-toggle="dropdown" type="button" disabled={this.state.disabled} style={styles}>
					<span className="selected-label">{Lib.getProp(selection, 'text') || 'None selected'}</span>
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

	componentWillMount () {
		const self = this;

		this.elements = {
			wrapper: {
				toggleClass (cssClass, state) {
					const wrapperClasses = self.state.wrapperClasses;
					wrapperClasses[cssClass] = state;

					self.setState({
						wrapperClasses: wrapperClasses
					});
				}
			}
		};

		this.__constructor(this.props);
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
