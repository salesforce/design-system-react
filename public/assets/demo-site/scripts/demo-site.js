document.addEventListener('DOMContentLoaded', function () {
	var codepenSubmitLinks = document.querySelectorAll('.codepen-submit');

	function codepenSubmitLinkClicked (event) {
		var componentName = event.target.dataset.componentName;
		document.querySelector('#codepen-form-' + componentName).submit();
	}

	for (var i = 0; i < codepenSubmitLinks.length; ++i) {
		codepenSubmitLinks[i].addEventListener('click', codepenSubmitLinkClicked, false);
	}

});


$(function () {
	$('[role="tablist"] [aria-controls]').each(function() {
		$(this).click(function(event) {
			var $thisTablist = $(this).parents('[role="tablist"]');
			var $thisTabItem = $(this).parent('[role="presentation"]');
			var $thisTablistWrapper = $thisTablist.parent();
			var $tabItems = $thisTablist.find('[role="presentation"]');
			var $contentItems = $thisTablistWrapper.find('[role="tabpanel"]');
			var thisControlsId = $(this).attr('aria-controls');
			$tabItems.removeClass('slds-active');
			$thisTabItem.addClass('slds-active');
			$contentItems.removeClass('slds-show').addClass('slds-hide');
			$('#' + thisControlsId ).removeClass('slds-hide').addClass('slds-show');
		});
	});
});
$(function () {
	var $window = $(window);
	var $componentNav = $('#component-nav > nav');
	var componentNavParentWidth = $('#component-nav').width();
	var pos = $window.scrollTop();
	$componentNav.width(componentNavParentWidth);
	$('#component-nav__' + $('.component-wrapper').attr('id')).addClass('active');
	$('a', $componentNav).on('click', function(e){
		$('a', $componentNav).removeClass('active');
		$(e.currentTarget).addClass('active');
	});

	$window.scroll(function (ev) {
		pos = $window.scrollTop();
		componentNavParentWidth = $('#component-nav').width();
		$componentNav.width(componentNavParentWidth);
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