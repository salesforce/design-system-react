/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// ### React
// React is an external dependency of the project.
import React from 'react';

import { CARD_BODY } from '../../utilities/constants';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally joining classNames together."
import classNames from 'classnames';

const idSuffixes = {
	base: '__body'
};

const CardBody = (props) => {
	const id = props.id ? (props.id + idSuffixes.base) : null;

	return (<div
		className={classNames('slds-card__body', props.className)}
		id={id}
	>
		{props.children}
	</div>
	);
};

CardBody.displayName = CARD_BODY;

CardBody.propTypes = {
	/**
	 * Elements to place in the body.
	 */
	children: React.PropTypes.node,
	/**
	 * CSS classes to be added to the card.
	 */
	className: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object, React.PropTypes.string]),
	/**
	 * Set the HTML `id` of the body.
	 */
	id: React.PropTypes.string
};

module.exports = CardBody;
module.exports.idSuffixes = idSuffixes;
