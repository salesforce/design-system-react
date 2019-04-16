/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import ClassNames from 'classnames';

import { PUBLISHER } from '../../utilities/constants';

import Avatar from '../avatar';
import MediaObject from '../media-object';
import Button from '../button';

const propTypes = {
	hasFocus: PropTypes.bool,
	isActive: PropTypes.bool,
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
		};
	}

	getWrapper = (children) => {
		if (this.props.variant === 'base') return children;
		return <MediaObject figure={<Avatar />} body={children} />;
	};

	handleFocus = () => {
		this.setState({ hasFocus: true, isActive: true });
	};

	handleBlur = () => this.setState({ hasFocus: false });

	render() {
		const isActive = this.state.isActive || this.props.isActive;
		const hasFocus = this.state.hasFocus;
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
						<span className="slds-assistive-text">Write a comment</span>To: My
						followers
					</label>
				)}
				<textarea
					id="comment-text-input2"
					className={ClassNames('slds-publisher__input', 'slds-text-longform', {
						'slds-textarea': variant === 'base',
						'slds-input_bare': variant === 'comment',
					})}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					placeholder="Write a comment…"
				/>
				<div className="slds-publisher__actions slds-grid slds-grid_align-spread">
					<ul className="slds-grid slds-publisher__toggle-visibility">
						<li>
							<Button
								variant="icon"
								className="slds-button_icon-container"
								iconName="adduser"
								assistiveText="Add User"
								title="Add User"
							/>
						</li>
						<li>
							<Button
								variant="icon"
								className="slds-button_icon-container"
								iconName="attach"
								assistiveText="Attach a file"
								title="Attach a file"
							/>
						</li>
					</ul>
					<Button
						title={variant === 'base' ? 'Share' : 'Comment'}
						variant="brand"
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
