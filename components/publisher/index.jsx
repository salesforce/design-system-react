/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import ClassNames from 'classnames';

import { PUBLISHER } from '../../utilities/constants';

import Avatar from '../avatar';
import MediaObject from '../media-object';
import Button from '../button';
import Icon from '../icon';

import adduser from '../../icons/utility/adduser';
import attach from '../../icons/utility/attach';

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
	getWrapper = (children) => {
		if (this.props.variant === 'base') return children;
		return <MediaObject figure={<Avatar />} body={children} />;
	};

	render() {
		const isActive = true || this.props.isActive;
		const { variant } = this.props;
		return this.getWrapper(
			<div
				className={ClassNames('slds-publisher', {
					'slds-is-active': isActive,
					'slds-publisher_comment': variant === 'comment',
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
					placeholder="Write a comment…"
				/>
				<div className="slds-publisher__actions slds-grid slds-grid_align-spread">
					<ul className="slds-grid slds-publisher__toggle-visibility">
						<li>
							<Button
								className="slds-button slds-button_icon slds-button_icon-container"
								title="Add User"
							>
								<Icon
									assistiveText={{ label: 'Add User' }}
									category="utility"
									icon={adduser}
									size="x-small"
								/>
							</Button>
						</li>
						<li>
							<Button
								className="slds-button slds-button_icon slds-button_icon-container"
								title="Attach a file"
							>
								<Icon
									assistiveText={{ label: 'Add User' }}
									category="utility"
									icon={attach}
									size="x-small"
								/>
							</Button>
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
