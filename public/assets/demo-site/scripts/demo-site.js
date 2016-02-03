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
