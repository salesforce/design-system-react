/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import * as Lib from '../../lib/lib';

import headTemplate from './modal-head-default-template';
import footTemplate from './modal-foot-default-template';

import Button from '../button/button';

import $ from 'jquery';

module.exports = {
	renderHeader (options) {
		const $headTemplate = $(headTemplate);
		const closeButton = new Button({
			assistiveText: options.closeClicked,
			icon: 'utility.close',
			iconSize: 'large',
			iconStyle: 'icon-inverse'
		});

		$headTemplate.append(closeButton.$el.addClass('slds-modal__close'));
		closeButton.on('click', options.closeClicked);

		$headTemplate.find('.slds-text-heading--' + options.headerTextSize)
			.html(options.headerTitle);

		$headTemplate.find('.slds-m-top--x-small')
			.html(options.headerTagline);

		return $headTemplate.children();
	},

	renderFooter (options) {
		const $footTemplate = $(footTemplate);

		$footTemplate.on('click.slds-button:eq(0)', options.secondaryClicked);
		$footTemplate.find('.slds-button:eq(0)').html(options.secondaryText);

		$footTemplate.on('click.slds-button:eq(1)', options.secondaryClicked);
		$footTemplate.find('.slds-button:eq(1)').html(options.primaryText);

		return $footTemplate;
	}
};
