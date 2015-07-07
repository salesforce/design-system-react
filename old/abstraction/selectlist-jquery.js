// TO-DO:
// • Copied directly from FuelUX right now, needs to be streamlined and updated for consistency
// • We need the templates too, but I'm not sure yet how to best share them. Maybe they'll have to be framework specific

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'selectlist-core'], factory);
	} else {
		factory(jQuery, Landmark.Selectlist);
	}
}(function ($, Core) {
	var old = $.fn.selectlist;

	var Selectlist = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.selectlist.defaults, options);
		this._initialize({}, this.options);
	};

	// TO-DO:
	// • Using Backbone's extend synatx here right now. Would have to be wired up. Is that the best way to go?
	Selectlist.prototype = Core.extend({

		constructor: Selectlist,
		
		onInitialized: function () {
			this.$button = this.$element.find('.btn.dropdown-toggle');
			this.$hiddenField = this.$element.find('.hidden-field');
			this.$label = this.$element.find('.selected-label');
			this.$dropdownMenu = this.$element.find('.dropdown-menu');
	
			this.$element.on('click.fu.selectlist', '.dropdown-menu a', $.proxy(this.itemClicked, this));
		},

		destroy: function () {
			this.$element.remove();
			return this.$element[0].outerHTML;
		},
		
		onSelected: function () {
			var selected = this.getSelected();
			if (selected && selected.id) {
				var selector = 'li[data-id="' + selected.id + '"]';
				doSelect(this.$element.find(selector));
			}
		},

		doSelect: function ($item) {
			var $selectedItem = $item;

			this.$hiddenField.val($selectedItem.attr('data-value'));
			this.$label.html($($selectedItem.children()[0]).html());

			// clear and set selected item to allow declarative init state
			// unlike other controls, selectlist's value is stored internal, not in an input
			this.$element.find('li').each(function () {
				if ($selectedItem.is($(this))) {
					$(this).attr('data-selected', true);
				} else {
					$(this).removeData('selected').removeAttr('data-selected');
				}
			});
		},

		itemClicked: function (e) {
			// TO-DO:
			// • Event seems like the kind of thing that should be shared, but it can't until we standardize the API
			this.$element.trigger('clicked.fu.selectlist', this.$selectedItem);

			e.preventDefault();

			//selectedItem needs to be <li> since the data is stored there, not in <a>
			this.setSelectionByValue(($(e.target).closest('li')).attr('data-value'));

			// TO-DO: 
			// This is different now, used to pass object including text and any data-attributes
			// to onchange event
			var data = this.getSelection();
			
			// trigger changed event
			this.$element.trigger('changed.fu.selectlist', data);

			// return focus to control after selecting an option
			this.$element.find('.dropdown-toggle').focus();
		},

		resize: function () {
			var width = 0;
			var newWidth = 0;
			var sizer = $('<div/>').addClass('selectlist-sizer');


			if (Boolean($(document).find('html').hasClass('fuelux'))) {
				// default behavior for fuel ux setup. means fuelux was a class on the html tag
				$(document.body).append(sizer);
			} else {
				// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
				$('.fuelux:first').append(sizer);
			}

			sizer.append(this.$element.clone());

			this.$element.find('a').each(function () {
				sizer.find('.selected-label').text($(this).text());
				newWidth = sizer.find('.selectlist').outerWidth();
				newWidth = newWidth + sizer.find('.sr-only').outerWidth();
				if (newWidth > width) {
					width = newWidth;
				}
			});

			if (width <= 1) {
				return;
			}

			this.$button.css('width', width);
			this.$dropdownMenu.css('width', width);

			sizer.remove();
		},

		// TO-DO:
		// • Even though they would be shells these functions should probably be reflected in the core as part of the API
		enable: function () {
			this.$element.removeClass('disabled');
			this.$button.removeClass('disabled');
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$button.addClass('disabled');
		}
	});


	// SELECT PLUGIN DEFINITION

	$.fn.selectlist = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.selectlist');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('fu.selectlist', (data = new Selectlist(this, options)));
			}

			if (typeof option === 'string') {
				methodReturn = data[option].apply(data, args);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.selectlist.defaults = {};

	$.fn.selectlist.Constructor = Selectlist;

	$.fn.selectlist.noConflict = function () {
		$.fn.selectlist = old;
		return this;
	};


	// DATA-API

	$(document).on('mousedown.fu.selectlist.data-api', '[data-initialize=selectlist]', function (e) {
		var $control = $(e.target).closest('.selectlist');
		if (!$control.data('fu.selectlist')) {
			$control.selectlist($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=selectlist]').each(function () {
			var $this = $(this);
			if (!$this.data('fu.selectlist')) {
				$this.selectlist($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --