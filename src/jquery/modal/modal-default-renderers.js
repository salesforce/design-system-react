import * as Lib from '../../lib/lib';

import headTemplate from './modal-head-default-template';
import footTemplate from './modal-foot-default-template';

import Button from '../button/button';

const $ = Lib.global.jQuery || Lib.global.$;

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
