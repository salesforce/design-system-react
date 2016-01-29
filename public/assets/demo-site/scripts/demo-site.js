$(function () {
	// codepen

	var $codeshareTemplate = $('.codeshare-template').clone();
	var $globalInitialHTML = $(globalInitialHTML);

	$('.codepen-submit').each(function () {

		var el = $(this),
			formId = el.data('form-id'),
			$section = $globalInitialHTML.find(el.data('section-selector')),
			controlName = el.data('control-name'),
			$demoHTML = $section.find('.demo-html').clone(),
			$demoCSS = $section.find('.demo-css'),
			$demoJS = $section.find('.demo-js'),
			HTML = '',
			CSS = '',
			JS = '';

		if ($demoHTML) {
			$codeshareTemplate.find('.section-heading').text(controlName);
			$codeshareTemplate.find('.slds-box').append($demoHTML);
			HTML = $codeshareTemplate.html();
		}

		if ($demoCSS) {
			CSS = $demoCSS.html();
		}

		console.log($demoJS);

		if ($demoJS) {
			JS = $demoJS.html();
		}
		
		var js_external = [
			'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/react/0.13.0/react.min.js',
			'http://www.fuelcdn.com/design-system-facades/0/assets/scripts/facades.jquery.js'
			// 'http://design-system-facades.herokuapp.com/build/demo-site-examples-jquery.bundle.js'
		].join(';');

		var css_external = [
			'//design-system-facades.herokuapp.com/assets/design-system/styles/salesforce-lightning-design-system.css'
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

		// Quotes will messing with JSON
		var JSONstring = JSON.stringify(data).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");

		var form = '<form id='+ formId +' class="codepen-form" action="http://codepen.io/pen/define" method="POST" target="_blank">' + 
				'<input type="hidden" name="data" value=\'' + JSONstring + '\'>' + 
				// '<input type='image' src='http://s.cdpn.io/3/cp-arrow-right.svg' width='40' height='40' value='Create New Pen with Prefilled Data' class='codepen-mover-button'>' +
			'</form>';

		el.append(form);

	});

	$('.codepen-submit').click(function(){
		$( '#' + $(this).data('form-id') ).submit();
	});


});