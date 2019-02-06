import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Combobox from '../combobox';
import comboboxFilterAndLimit from '../filter';


export default class ComboboxInteractive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selection: {},
			inputValue: '',
		};
	}

	render() {
			return (
				<Combobox
					value={this.state.inputValue}
					events={{
						onSelect: (event, data) =>
							this.setState({ selection: data.selection }),
						onRequestRemoveSelectedOption: (event, data) => {
							this.setState({
								selection: data.selection,
							});
						},
						onChange: (event, { value }) => {
							this.setState({ inputValue: value });
						},
					}}
					selection={this.state.selection}
					options={this.props.options}
				/>
			);
	}
}

ComboboxInteractive.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.PropTypes.shape({
			id: PropTypes.string.isRequired,
			icon: PropTypes.node,
			label: PropTypes.string,
			subTitle: PropTypes.string,
			type: PropTypes.string,
		})
	).isRequired,
	multiple: PropTypes.bool,
	menuMaxWidth: PropTypes.string,
	errorText: PropTypes.string,
	isOpen: PropTypes.bool,
	menuPosition: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
	variant: PropTypes.oneOf(['base', 'inline-listbox', 'readonly']),
};
