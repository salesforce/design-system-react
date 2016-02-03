document.addEventListener('DOMContentLoaded', function () {
	var codepenSubmit = document.querySelector('.codepen-submit');

	codepenSubmit.addEventListener('click', function (event) {
		var componentName = event.target.dataset.componentName;
		document.querySelector('#codepen-form-' + componentName).submit();
	}, false);
});