module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
					'components/avatar/avatar.jsx',
					'components/icon/icon.jsx',
        ]
			},
			{
				"name": "Actions",
				"include": [
					'components/button/button.jsx',
					'components/button-group/button-group.jsx',
					'components/button-stateful/button-stateful.jsx',
				]
			},
			{
				"name": "Navigation",
				"include": [
					'components/breadcrumb/breadcrumb.jsx',
					'components/tabs/tabs.jsx',
					'components/tabs/tabs-panel/tabs-panel.jsx',
					'components/menu-dropdown/menu-dropdown.jsx',
					'components/input/search/search.jsx',
				]
			},
			{
				"name": "Forms",
				"include": [
					'components/input/input.jsx',
					'components/date-picker/date-picker.jsx',
					'components/time-picker/time-picker.jsx',
					'components/color-picker/color-picker.jsx',
					'components/textarea/textarea.jsx',
					'components/checkbox/checkbox.jsx',
					'components/radio/radio.jsx',
					'components/radio-button-group/radio-button-group.jsx',
					'components/radio-group/radio-group.jsx',
					'components/combobox/combobox.jsx',
					'components/combobox/combobox-interactive/combobox-interactive.jsx',
					'components/slider/slider.jsx'
				]
			},
			{
				"name": "Content",
				"include": [
					'components/alert/alert.jsx',
					'components/illustration/illustration.jsx',
					'components/progress-indicator/progress-indicator.jsx',
					'components/progress-indicator/progress-indicator-interactive/progress-indicator-interactive.jsx',
					'components/pill/pill.jsx',
					'components/pill-container/pill-container.jsx',
					'components/toast/toast.jsx',
					'components/media-object/media-object.jsx',
					'components/tooltip/tooltip.jsx',
					'components/brand-band/brand-band.jsx',
				]
			},
			{
				"name": "Accordion",
				"include": [
					'components/accordion/accordion.jsx',
					'components/accordion/accordion-panel/accordion-panel.jsx',
					'components/accordion/accordion-interactive/accordion-interactive.jsx'
				]
			},
			{
				"name": "Card",
				"include": [
					'components/card/card.jsx',
					'components/card/private/card-header/card-header.jsx',
					'components/card/private/card-footer/card-footer.jsx',
					'components/card/private/card-body/card-body.jsx'
				]
			},
			{
				"name": "AppLauncher",
				"include": [
					'components/app-launcher/app-launcher.jsx',
					'components/app-launcher/section/section.jsx',
					'components/app-launcher/tile/tile.jsx'
				]
			},
			{
				"name": "Spinners & Progress",
				"include": [
					'components/progress-ring/progress-ring.jsx',
					'components/spinner/spinner.jsx',
				]
			},
			{
				"name": "Experimental",
				"include": [
					'components/modal/modal.jsx',
					'components/tree/tree/tree.jsx'
				]
			}
    ]
  },
  name: 'Salesforce Lightning Design System'
};

/*
** Currently unsupported components:
** 1. Due to Errors with automatically rendered <IconSettings>
** 'components/global-header/global-header.jsx',
** 'components/global-header/global-header-button/global-header-button.jsx',
** 'components/global-header/global-header-dropdown/global-header-dropdown.jsx',
** 'components/global-header/global-header-search/global-header-search.jsx',
** 'components/global-header/global-header-profile/global-header-profile.jsx'
** 'components/popover/popover.jsx',
** 2. To be supported at final release
** 'components/data-table/data-table',
*/
