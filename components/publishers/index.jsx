/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import ClassNames from 'classnames';

import { PUBLISHER } from '../../utilities/constants';

import Avatar from '../avatar';
import MediaObject from '../media-object';
import Button from '../button';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './docs.json';

const propTypes = {
	onAddUser: PropTypes.func,
	onAttach: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	/**
	 * This label appears above the text area
	 */
	label: PropTypes.string,
	/**
	 * Variant of the Publisher Component. `base` is the default and `comment` is to add an icon beside the text area.
	 */
	variant: PropTypes.oneOf(['base', 'comment']),
};

const defaultProps = {
	variant: 'base',
};

class Publisher extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			hasFocus: false,
			disabled: true,
		};
	}

	componentWillMount() {
		checkProps(PUBLISHER, componentDoc);
	}

	getWrapper = (children) => {
		if (this.props.variant === 'base') return children;
		return <MediaObject figure={<Avatar />} body={children} />;
	};

	handleFocus = () => this.setState({ hasFocus: true, isActive: true });

	handleBlur = () => this.setState({ hasFocus: false });

	handleChange = (event) => {
		const data = {
			value: event.target.value,
		};
		this.setState({ disabled: !data.value.length > 0 });
		this.props.onChange(event, data);
	};

	render() {
		const isActive = this.state.isActive;
		const hasFocus = this.state.hasFocus;
		const placeholder = this.props.placeholder || 'Write a comment...';
		const { variant } = this.props;
		return this.getWrapper(
			<div
				className={ClassNames('slds-publisher', {
					'slds-is-active': isActive,
					'slds-publisher_comment': variant === 'comment',
					'slds-has-focus': hasFocus,
				})}
			>
				{variant === 'base' && (
					<label
						htmlFor="comment-text-input2"
						className="slds-publisher__toggle-visibility slds-m-bottom_small"
					>
						<span className="slds-assistive-text">Write a comment</span>
						{this.props.label}
					</label>
				)}
				<textarea
					id="comment-text-input2"
					className={ClassNames('slds-publisher__input', 'slds-text-longform', {
						'slds-textarea': variant === 'base',
						'slds-input_bare': variant === 'comment',
					})}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					placeholder={placeholder}
				/>
				<div className="slds-publisher__actions slds-grid slds-grid_align-spread">
					<ul className="slds-grid slds-publisher__toggle-visibility">
						<li>
							<Button
								onClick={this.props.onAddUser}
								variant="icon"
								className="slds-button_icon-container"
								iconName="adduser"
								iconCategory="utility"
								assistiveText={{ icon: 'Add User' }}
								title="Add User"
							/>
						</li>
						<li>
							<Button
								onClick={this.props.onAttach}
								variant="icon"
								className="slds-button_icon-container"
								iconName="attach"
								iconCategory="utility"
								assistiveText={{ icon: 'Attach a file' }}
								title="Attach a file"
							/>
						</li>
					</ul>
					<Button
						onClick={this.props.onSubmit}
						disabled={this.state.disabled}
						title={variant === 'base' ? 'Share' : 'Comment'}
						variant="brand"
						assistiveText={{ label: variant === 'base' ? 'Share' : 'Comment' }}
					>
						{variant === 'base' ? 'Share' : 'Comment'}
					</Button>
				</div>
			</div>
		);
	}
}

Publisher.displayName = PUBLISHER;
Publisher.propTypes = propTypes;
Publisher.defaultProps = defaultProps;

export default Publisher;
