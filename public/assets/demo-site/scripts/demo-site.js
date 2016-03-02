;(function () {
	var throttle = function throttle(type, name, obj) {
		obj = obj || window;
		var running = false;
		var func = function func() {
			if (running) {
				return;
			}
			running = true;
			requestAnimationFrame(function () {
				obj.dispatchEvent(new CustomEvent(name));
				running = false;
			});
		};
		obj.addEventListener(type, func);
	};

	/* init - you can init any event */
	throttle("resize", "optimizedResize");
	throttle("scroll", "optimizedScroll");
})();


var fadeTheCodeIn = function(){
	var $codeExamplesToFade = document.querySelectorAll('pre > code');
	if ( $codeExamplesToFade.length > 0) {
		Array.prototype.forEach.call($codeExamplesToFade, function(el, i){
			el.classList.add('rendered');
		});

	}
}

function outerHeight(el) {
	var height = el.offsetHeight;
	var style = getComputedStyle(el);

	height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	return height;
}

function getCombinedHeaderHeight() {
	var pos                      = document.body.scrollTop;
	var $mainNav                 = document.querySelectorAll('.facades-demo-main-nav')[0];
	var mainNavHeight            = outerHeight($mainNav);

	var combinedHeaderHeight = mainNavHeight;
	if (pos >= combinedHeaderHeight) {
		combinedHeaderHeight = mainNavHeight + (pos * -1);
	} else if (pos >= 1) {
		combinedHeaderHeight = mainNavHeight + (pos * -1);
	} else {
		combinedHeaderHeight = mainNavHeight;
	}

	return (combinedHeaderHeight <= mainNavHeight ? mainNavHeight : combinedHeaderHeight);
}

var runThePositions = {
  remind: function() {
    positionTheComponentNav();
    this.timeoutID = undefined;
  },

  setup: function() {
    if (typeof this.timeoutID === "number") {
      this.cancel();
    } else {
      this.timeoutID = window.setTimeout(function() {
        this.remind();
      }.bind(this), 125);
    }
  },

  cancel: function() {
    window.clearTimeout(this.timeoutID);
    this.timeoutID = undefined;
  }
};



var positionTheComponentNav = function() {
	if (typeof document.querySelectorAll('#component-nav')[0] !== 'undefined') {
		var pos                      = document.body.scrollTop;
		var intViewportHeight        = window.innerHeight;
		var $mainNav                 = document.querySelectorAll('.facades-demo-main-nav')[0];
		var $componentNav            = document.querySelectorAll('#component-nav > nav')[0];
		var $componentNavParent      = document.querySelectorAll('#component-nav')[0];
		var $componentListWrapper    = document.querySelectorAll('#component-list-wrapper')[0];

		var componentNavParentRect   = $componentNavParent.getBoundingClientRect();
		var componentNavParentWidth  = $componentNavParent.offsetWidth;
		var componentNavParentHeight = componentNavParentRect.height;

		var componentNavRect         = $componentNav.getBoundingClientRect();
		var componentNavWidth        = $componentNav.offsetWidth;
		var componentNavHeight       = componentNavRect.height;

		var mainNavHeight            = outerHeight($mainNav);

		var mainNavRect              = $mainNav.getBoundingClientRect();

		var combinedHeaderHeight     = getCombinedHeaderHeight();

		if (pos >= combinedHeaderHeight) {
			$mainNav.style.position  = 'fixed';
			$mainNav.style.width     = '100vw';
			$mainNav.style.zIndex    = '9999';
			mainNavHeight            = outerHeight($mainNav);

			$componentNav.style.position = 'fixed';

			combinedHeaderHeight     = getCombinedHeaderHeight();

		} else if (pos >= 1) {
			$mainNav.style.position = 'fixed';
			$mainNav.style.width = '100vw';
			$mainNav.style.zIndex = '9999';
			mainNavHeight = outerHeight($mainNav);
			$componentNav.style.position = 'fixed';
			combinedHeaderHeight = getCombinedHeaderHeight();
		} else {
			$mainNav.style.position = 'fixed';
			$mainNav.style.width = '100vw';
			mainNavHeight = outerHeight($mainNav);
			$componentNav.style.position = 'fixed';
			combinedHeaderHeight = getCombinedHeaderHeight();
		}

		var newComponentNavHeight = intViewportHeight - combinedHeaderHeight;
		var comparedHeight = intViewportHeight - newComponentNavHeight;

		var newComponentNavTop = combinedHeaderHeight;
		$componentNav.style.width = componentNavParentWidth + 'px';
		$componentNav.style.height = newComponentNavHeight + 'px';
		if (pos >= newComponentNavTop) {
			newComponentNavTop = ((combinedHeaderHeight - (pos > combinedHeaderHeight ? combinedHeaderHeight : pos)) + mainNavHeight);
			// newComponentNavTop = ((combinedHeaderHeight - (pos > combinedHeaderHeight ? combinedHeaderHeight : pos)) + mainNavHeight);
			$componentNav.style.top = newComponentNavTop + 'px';
		} else if (pos === 0) {
			mainNavHeight = outerHeight($mainNav);
			newComponentNavTop = ((combinedHeaderHeight - (pos > combinedHeaderHeight ? combinedHeaderHeight : pos)));
			$componentNav.style.top = newComponentNavTop + 'px';
			runThePositions.setup();
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {


	if (typeof document.querySelectorAll('#main-content')[0] !== 'undefined') {
		var $mainNav                 = document.querySelectorAll('.facades-demo-main-nav')[0];
		var $mainContent             = document.querySelectorAll('#main-content')[0];
		var mainNavHeight            = outerHeight($mainNav);
		$mainContent.style.marginTop = mainNavHeight + 'px';
	}

	// runThePositions.setup();

	function codepenSubmitLinkClicked (event) {
		var componentName = event.target.dataset.componentName;
		document.querySelector('#codepen-form-' + componentName).submit();
	}

	var currentComponentId;
	var $componentNav__currentComponent;
	var $componentNav__currentComponentListItem;

	var $componentNav__componentAnchors = document.querySelectorAll('#component-nav > nav #component-nav__list li a');
	var $componentNav__componentListItems = document.querySelectorAll('#component-nav > nav #component-nav__list li');
	var codepenSubmitLinks = document.querySelectorAll('.codepen-submit');

	if (typeof document.querySelectorAll('.component-wrapper')[0] !== 'undefined') {
		currentComponentId = document.querySelectorAll('.component-wrapper')[0].id;
		// $componentNav__currentComponent = document.querySelectorAll('#component-nav__' + currentComponentId)[0];
		$componentNav__currentComponentListItem = document.querySelectorAll('#component-nav__list__item--' + currentComponentId)[0];
		$componentNav__currentComponentListItem.classList.add('slds-is-selected');
		$componentNav__currentComponentListItem.classList.add('slds-is-active');
	}

	// positionTheComponentNav();

	// Highlighting Prism manually to prevent FOUC
	Prism.highlightAll('true', fadeTheCodeIn);

	for (var i = 0; i < codepenSubmitLinks.length; ++i) {
		codepenSubmitLinks[i].addEventListener('click', codepenSubmitLinkClicked, false);
	}

	Array.prototype.forEach.call($componentNav__componentAnchors, function(el, i){
		el.addEventListener ("click", function () {
			Array.prototype.forEach.call($componentNav__componentAnchors, function(el, i){
				var $thisComponent__listItemWrapper = el.parentNode;
				console.log("[demo-site.js:196] $thisComponent__listItemWrapper:", $thisComponent__listItemWrapper);
				$thisComponent__listItemWrapper.classList.remove('slds-is-selected');
				$thisComponent__listItemWrapper.classList.remove('slds-is-active');
			});
			var $thisComponent__listItemWrapper = this.parentNode;
			$thisComponent__listItemWrapper.classList.add('slds-is-selected');
			$thisComponent__listItemWrapper.classList.add('slds-is-active');
		}, false);
	});

	window.addEventListener('optimizedScroll', function(event) {
		positionTheComponentNav();

	});

	window.addEventListener("optimizedResize", function() {
		positionTheComponentNav();
	});

	positionTheComponentNav();

});

