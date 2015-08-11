// COMBOBOX CONTROL - REACT FACADE

// Core
import Lib from '../../core/lib';
import ComboboxCore from '../../core/combobox';

// Framework specific
import React from 'react';
import ReactHelpers from '../helpers';

// Third party
import classNames from 'classnames';

// Children
import SelectlistItem from '../selectlist/selectlist-item';

const Combobox = React.createClass(Lib.extend({}, ComboboxCore, ReactHelpers, {
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
		name: React.PropTypes.string
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
			<div className={classNames(this.cssClasses.CONTROL, 'input-group input-append dropdown', this.state.wrapperClasses)} onKeyPress={this.handleKeyPress}>
				<input name={this.props.name} className="form-control" type="text" value={Lib.getProp(selection, 'name')} disabled={this.state.disabled} />
				<div className="input-group-btn">
					<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" disabled={this.state.disabled}><span className="caret"></span></button>
					<ul className="dropdown-menu dropdown-menu-right" role="menu" style={styles}>
						{this.menuItems()}
					</ul>
				</div>
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
				},
				outerWidth () {
					return 0;
				}
			}
		};

		this.__constructor(this.props);

		if (Lib.isFunction(this.props.onBeforeSelection)) this.onBeforeSelection = this.props.onBeforeSelection;
		if (Lib.isFunction(this.props.onSelected)) this.onSelected = this.props.onSelected;
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
