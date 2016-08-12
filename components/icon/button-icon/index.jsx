/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import SLDSUtilityIcon from '../../utilities/utility-icon';
import classNames from 'classnames';

const displayName = 'ButtonIcon';

const propTypes = {
	assistiveText: React.PropTypes.string,
	category: React.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']).isRequired,
	className: React.PropTypes.string,
	hint: React.PropTypes.bool,
	icon: React.PropTypes.object,
	inverse: React.PropTypes.bool,
	name: React.PropTypes.string,
	position: React.PropTypes.oneOf(['left', 'right']),
	size: React.PropTypes.oneOf(['x-small', 'small', 'medium', 'large'])
};

const defaultProps = {
	category: 'utility',
	size: 'medium'
};

class ButtonIcon extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	getClassName () {
		return classNames(this.props.className, 'slds-button__icon', {
			[`slds-button__icon--${this.props.position}`]: this.props.position,
			[`slds-button__icon--${this.props.size}`]: this.props.size && this.props.size !== 'medium',
			'slds-button__icon--inverse-hint': this.props.inverse && this.props.hint,
			'slds-button__icon--hint': this.props.hint && !this.props.inverse
		});
	}

	render () {
		let label = null;

		if (this.props.assistiveText) {
			label = <span className="slds-assistive-text">{this.props.assistiveText}</span>;
		}

		return (
			<span>
				{label}
				<SLDSUtilityIcon
					aria-hidden="true"
					category={this.props.category}
					className={this.getClassName()}
					icon={this.props.icon}
					name={this.props.name}
				/>
			</span>
		);
	}
}

ButtonIcon.displayName = displayName;
ButtonIcon.propTypes = propTypes;
ButtonIcon.defaultProps = defaultProps;

module.exports = ButtonIcon;
