/*
 *
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import PopoverTooltip from '../popover-tooltip';
import omit from 'lodash.omit';

const displayName = 'PageHeaderDetailRow';
const propTypes = {
	/**
	 * Optional class name
	 */
	className: React.PropTypes.string,
	/**
	 * label
	 */
	label: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	/**
	 * The content property can be a string or a React element
	 */
	content: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	/**
	 * Sets whether the fields truncate
	 */
	truncate: React.PropTypes.bool,
	flavor: React.PropTypes.string
};

const defaultProps = {
	label: '',
	content: ''
};

class DetailBlock extends Component {
	constructor (props) {
		super(props);
		this.state = { showTooltip: false };
	}

	componentDidMount () {
		this._renderFieldTruncation();
	}

	componentDidUpdate (prevProps) {
		if (this.props.content !== prevProps.content) {
			this._renderFieldTruncation();
		}
	}

	_renderFieldTruncation () {
		const fieldContent = this.refs.fieldContent;
		const isTruncated = fieldContent && fieldContent.scrollWidth > fieldContent.offsetWidth;
		if (isTruncated) {
			this.setState({ showTooltip: true });
		} else {
			this.setState({ showTooltip: false });
		}
	}

	_getClassNames (className, flavor) {
		return classnames('slds-page-header__detail-block', className, {
			[`slds-size--${flavor}`]: flavor
		});
	}

	render () {
		const {
			className,
			label,
			content,
			truncate,
			flavor
		} = this.props;

		const attr = omit([
			'className',
			'label',
			'content',
			'truncate',
			'flavor'
		], this.props);

		const classes = this._getClassNames(className, flavor);
		let labelElement;
		let contentElement;

		/**
		 * Render the label
		 */
		const renderLabel = () => {
			const type = typeof label;

			if (type === 'string') {
				const labelClasses = classnames('slds-text-title', {
					'slds-truncate': truncate
				});
				return <p className={labelClasses} title={label}>{label}</p>;
			}
			return label;
		};

		/**
		 * Render the content
		 */
		const renderContent = () => {
			const type = typeof content;
			if (type === 'string') {
				const labelClasses = classnames('slds-text-body--regular', {
					'slds-truncate': truncate
				});
				return <p ref="fieldContent" className={labelClasses} content={content}>{content}</p>;
			}
			return content;
		};

		/**
		 * Render the content with a tooltip (for content that truncates)
		 */
		const renderContentWithTooltip = () => {
			const labelClasses = classnames('slds-text-body--regular', {
				'slds-truncate': truncate
			});
			return (
				<PopoverTooltip
					align="top"
					content={content}
				>
					<p tabIndex="0" className={labelClasses}>
						{content}
					</p>
				</PopoverTooltip>
			);
		};

		labelElement = renderLabel();
		contentElement = this.state.showTooltip ? renderContentWithTooltip() : renderContent();

		return (
			<li className={classes} {...attr}>
				{labelElement}
				{contentElement}
			</li>
		);
	}
}

DetailBlock.displayName = displayName;
DetailBlock.propTypes = propTypes;
DetailBlock.defaultProps = defaultProps;

module.exports = DetailBlock;

