/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import DetailRow from '../detail-row';

const displayName = 'PageHeaderRecordHome';
const propTypes = {
	/**
	 * Icon node passed by PageHeader
	 */
	icon: React.PropTypes.node,
	/**
	 * Title node passed by PageHeader
	 */
	title: React.PropTypes.node,
	/**
	 * Info node passed by PageHeader
	 */
	info: React.PropTypes.node,
	/**
	 * Content to appear on the right hand side of the page header
	 */
	contentRight: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element,
	]),
	/**
	 * An array of detail blocks
	 */
	details: React.PropTypes.array,
};
const defaultProps = {};

class RecordHome extends Component {
	renderIcon() {
		if(this.props.icon) {
			return <div className="slds-media__figure">
				{ this.props.icon }
			</div>
		}
	}

	render() {
		const { details } = this.props;

		return (
			<div>
				<div className="slds-grid">
					<div className="slds-col slds-has-flexi-truncate">
						<div className="slds-media slds-media--center">
							{this.renderIcon()}
							<div className="slds-media__body">
								{ this.props.label }
								{ this.props.title }
								{ this.props.info }
							</div>
						</div>
					</div>
					<div className="slds-col slds-no-flex slds-grid slds-align-bottom">
						{ this.props.contentRight }
					</div>
				</div>
				<DetailRow details={details} />
			</div>
		);
	}
}

RecordHome.displayName = displayName;
RecordHome.propTypes = propTypes;
RecordHome.defaultProps = defaultProps;

module.exports = RecordHome;
