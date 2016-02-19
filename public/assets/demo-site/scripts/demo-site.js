var fadeTheCodeIn = function(){
	$('pre > code').addClass('rendered');
}

document.addEventListener('DOMContentLoaded', function () {
	
	// Highlighting Prism manually to prevent FOUC
	Prism.highlightAll('true', fadeTheCodeIn);
	
	var codepenSubmitLinks = document.querySelectorAll('.codepen-submit');

	function codepenSubmitLinkClicked (event) {
		var componentName = event.target.dataset.componentName;
		document.querySelector('#codepen-form-' + componentName).submit();
	}

	for (var i = 0; i < codepenSubmitLinks.length; ++i) {
		codepenSubmitLinks[i].addEventListener('click', codepenSubmitLinkClicked, false);
	}

	
	// var elements = document.querySelectorAll(selector);
	// Array.prototype.forEach.call(elements, function(el, i){

	// });
});


$(function () {
	
	console.clear();
	
	var $window = $(window);
	// var $componentNav = $('#component-nav > nav');
	var $componentNav = document.querySelectorAll('#component-nav > nav')[0];
	var $componentNavParent = document.querySelectorAll('#component-nav')[0];
	
	console.log("[demo-site.js:38] $componentNavParent:", $componentNavParent);
	
	var componentNavParentWidth = $componentNavParent.offsetWidth;
	// var componentNavParentWidth = $('#component-nav').width();
	
	console.log("[demo-site.js:38] componentNavParentWidth:", componentNavParentWidth);
	
	var pos = $window.scrollTop();
	
	console.log("[demo-site.js:47] $componentNav:", $componentNav);
	
	$componentNav.width = componentNavParentWidth + 'px';
	
	$('#component-nav__' + $('.component-wrapper').attr('id')).addClass('active');
	$('a', $componentNav).on('click', function(e){
		$('a', $componentNav).removeClass('active');
		$(e.currentTarget).addClass('active');
	});

	$window.scroll(function (ev) {
		pos = $window.scrollTop();
		componentNavParentWidth = $('#component-nav').width();
		$componentNav.width = componentNavParentWidth + 'px';
		if (pos >= 0) {
			$componentNav.css({
				'top': (205 - (pos > 205 ? 205 : pos))
			})
		}
	});

	$window.resize(function (ev) {
		pos = $window.scrollTop();
		componentNavParentWidth = $('#component-nav').width();
		$componentNav.width(componentNavParentWidth);
		if (pos >= 0) {
			$componentNav.css({
				'top': (205 - (pos > 205 ? 205 : pos))
			})
		}
	});


});