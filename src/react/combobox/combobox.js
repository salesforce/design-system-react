// COMBOBOX CONTROL - REACT FACADE

// Core
import * as Lib from '../../core/lib';
import ComboboxCore from '../../core/combobox';

// Framework specific
import React from 'react';
import Events from '../mixins/events';
import State from '../state';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from '../selectlist/selectlist-item';

const Combobox = React.createClass(Lib.merge({}, ComboboxCore, State, {
	mixins: [Events],
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
		return this.__initializeState();
	},

	menuItems () {
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
			<div className={classNames(this.cssClasses.CONTROL, 'input-group input-append dropdown', disabledClass)} onKeyPress={this.handleKeyPress}>
				<input name={this.props.name} className="form-control" type="text" value={selection.get('text')} disabled={this.props.disabled} />
				<div className="input-group-btn">
					<button type="button" className={classNames(this.cssClasses.CONTROL, this.cssClasses.TOGGLE, 'btn btn-default', disabledClass)} data-toggle="dropdown" disabled={this.props.disabled}><span className="caret"></span></button>
					<ul className="dropdown-menu dropdown-menu-right" role="menu" style={styles}>
						{this.menuItems()}
					</ul>
				</div>
			</div>
		);
	},

	componentWillMount () {
		this.elements = {
			wrapper: {
				toggleClass () {
				},
				outerWidth () {
					return 0;
				}
			}
		};

		this.__initialize(this.props);
	},

	handleMenuItemSelected (selection) {
		this.setSelection(selection);
	},

	handleKeyPress (e) {
		const key = e.key || e.keyIdentifier;
		if (key) this.__jumpToLetter(key);
	}
}));

export default Combobox;
