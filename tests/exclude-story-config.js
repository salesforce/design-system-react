/*
 * STORY-BASED TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create DOM, image snapshot, static markup accessibility tests.
 * 
 * This file is list of "Story Kind" names that are created from strings 
 * in `utilities/constants.js` within each `storybook-stories.jsx` file.
 *
 * By default, Jest will test all Storybook stories, to exclude a 
 * component's stories from testing, add it below.
 * 
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */

const deprecatedComponents = [
	'SLDSInlineEdit',
	'SLDSLookup',
	'SLDSNotification',
	'SLDSMenuPicklist',
	'SLDSTimepicker',
];

const excludeFromTests = {
	accessibility: {
		storyKind: [...deprecatedComponents],
	},
	domSnapshot: {
		storyKind: [
			'SLDSAppLauncher',
			'SLDSGlobalNavigationBar',
			'SLDSDatePicker',
			'SLDSIconSettings',
			'SLDSLocationMap',
			'SLDSModal',
			'SLDSPanel',
			'SLDSWelcomeMat',
			...deprecatedComponents,
		],
	},
	visualRegression: {
		storyKind: [
			'SLDSAppLauncher',
			'SLDSGlobalNavigationBar',
			'SLDSDatePicker',
			'SLDSIconSettings',
			'SLDSModal',
			'SLDSPanel',
			'SLDSTimepicker',
			'SLDSWelcomeMat',
			...deprecatedComponents,
		],
	},
};

export default excludeFromTests;
