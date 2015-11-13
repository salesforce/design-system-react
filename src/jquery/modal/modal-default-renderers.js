import * as Lib from '../../lib/lib';

import headTemplate from './modal-head-default-template';
import footTemplate from './modal-foot-default-template';

const $ = Lib.global.jQuery || Lib.global.$;

module.exports = {
	renderHeader (options) {
		const $headTemplate = $(headTemplate);

		$headTemplate.on('click.slds-modal__close', options.closeClicked);

		$headTemplate.find('.slds-text-heading--medium')
			.html(options.headerTitle);

		$headTemplate.find('.slds-m-top--x-small')
			.html(options.headerTagline);

		return $headTemplate;
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
