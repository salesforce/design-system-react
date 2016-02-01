$(function () {
	var $codeshareTemplate = $('.codeshare-template').clone();
	var $globalInitialHTML = $(globalInitialHTML);

	$('.codepen-submit').each(function () {
		var el = $(this),
			$sectionInDOM = el.closest('.control-section'),
			$section = $globalInitialHTML.find('#' + $sectionInDOM.attr('id')),
			controlName = String($section.find('h3').text()).trim(),
			formId = 'codepen-form-' + $section.attr('id'),
			$controlHTML = $section.find('.demo-html').clone(),
			$demoCSS = $section.find('.demo-css'),
			$demoJS = $section.find('.demo-js'),
			HTML = '',
			CSS = '',
			JS = '',
			$demoHTML;

		el.data('codepenFormId', formId);

		if ($controlHTML) {
			$demoHTML = $codeshareTemplate.clone();
			$demoHTML.find('.section-heading').text(controlName);
			$demoHTML.find('.slds-box').append($controlHTML);
			HTML = $demoHTML.html();
		}

		if ($demoCSS) {
			CSS = $demoCSS.html();
		}

		if ($demoJS) {
			JS = $demoJS.html();
		}
		
		var js_external = [
			'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/react/0.13.0/react.min.js',
			'//www.fuelcdn.com/design-system-facades/0/assets/scripts/facades-jquery.js',
			'//www.fuelcdn.com/design-system-facades/0/assets/scripts/facades-utilities.js'
			// 'http://design-system-facades.herokuapp.com/build/demo-site-examples-jquery.bundle.js'
		].join(';');

		var css_external = [
			'//www.fuelcdn.com/lightning-design-system/0.12.1/styles/salesforce-lightning-design-system.css'
		].join(';');

		var data = {
			title              : controlName + ' :: Facades :: Salesforce Lightning Design System',
			description        : 'A developer sandbox for Salesforce Lightning Design System Facades',
			editors            : '101',
			html               : HTML,
			html_pre_processor : 'none',
			css                : CSS,
			css_pre_processor  : 'none',
			css_starter        : 'neither',
			css_prefix_free    : false,
			js                 : JS,
			js_pre_processor   : 'babel',
			js_modernizr       : false,
			js_library         : '',
			html_classes       : '',
			css_external       : css_external,
			js_external        : js_external
		};

		// Escape single and double quotes
		var JSONstring = JSON.stringify(data).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");

		var form = '<form id='+ formId +' class="codepen-form" action="http://codepen.io/pen/define" method="POST" target="_blank">' + 
				'<input type="hidden" name="data" value=\'' + JSONstring + '\'>' + '</form>';
		el.append(form);
	});

	$('.codepen-submit').click(function(){
		$( '#' + $(this).data('codepenFormId') ).submit();
	});


});