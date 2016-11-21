/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import classNames from 'classnames';

const getMargin = {};

const getNubbinClassName = (align) => classNames({
	'slds-nubbin--top': align === 'bottom',
	'slds-nubbin--top-left': align === 'bottom left',
	'slds-nubbin--top-right': align === 'bottom right',
	'slds-nubbin--bottom': align === 'top',
	'slds-nubbin--bottom-left': align === 'top left',
	'slds-nubbin--bottom-right': align === 'top right',
	'slds-nubbin--left': (align === 'right' || align === 'right bottom' || align === 'right top'),
	'slds-nubbin--right': (align === 'left' || align === 'left bottom' || align === 'left top')
});

const getAlignment = {};

// `indexOf` is used becauses `align` can be a string OR an array at this time.
getAlignment.horizontal = (align) => {
	let alignment = 'center';
	if (align && align.indexOf('left') > -1) {
		alignment = 'left';
	}	else if (align && align.indexOf('right') > -1) {
		alignment = 'right';
	}
	return alignment;
};

getAlignment.vertical = (align) => {
	let alignment = 'middle';
	if (align && align.indexOf('bottom') > -1) {
		alignment = 'bottom';
	}	else if (align && align.indexOf('top') > -1) {
		alignment = 'top';
	}
	return alignment;
};


getMargin.right = (align) => {
	if (getAlignment.horizontal(align) === 'right') {
		return '-.75rem';
	}
	return '.75rem';
};

getMargin.left = (align) => {
	if (getAlignment.horizontal(align) === 'left') {
		return '-.75rem';
	}
	return '.75rem';
};

getMargin.top = (align) => {
	if (align && getAlignment.vertical(align) === 'top' && align.indexOf('top') > 0) {
		return '0.25rem';
	}
	return '1.25rem';
};

getMargin.bottom = (align) => {
	if (align && getAlignment.vertical(align) === 'bottom' && align.indexOf('bottom') > 0) {
		return '0.25rem';
	}
	return '1rem';
};

module.exports.getMargin = getMargin;
module.exports.getAlignment = getAlignment;
module.exports.getNubbinClassName = getNubbinClassName;
