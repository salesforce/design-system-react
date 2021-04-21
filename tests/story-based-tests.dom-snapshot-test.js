/*
 * STORY-BASED DOM SNAPSHOT TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create DOM and image snapshot tests.
 *
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */
// Ran in Jest Node environment

import initStoryshots, {
	multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

// Add tests to this file to exclude them from testing
import excludeFromTests from './exclude-story-config';
import { getExcludeKindRegex, skipStoryShotTest } from './storyshots-helpers';

console.log(`
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
QUEUEING: STORY-BASED DOM SNAPSHOT TESTING
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

EXECUTING /tests/story-based-tests.dom.snapshot-test.js
BASED ON STORYBOOK STORIES FOUND IN /components/

This script uses Jest to call Storyshots 
https://github.com/storybooks/storybook/tree/next/addons/storyshots on each 
Storybook story found at http://localhost:9001. This stores a copy of the 
DOM on load in a text file. If you need an open menu tested, then you will 
need to open the menu with the \`isOpen\` prop.

For more information, please review: https://github.com/salesforce/design-system-react/blob/master/tests/README.md
`);

// Create DOM snapshot tests from Storybook stories
initStoryshots({
	configPath: '.storybook',
	storyNameRegex: new RegExp(`^((?!.*?(${skipStoryShotTest})).)*$`, 'g'),
	storyKindRegex: getExcludeKindRegex({
		arrayOfStoryKind: excludeFromTests.domSnapshot.storyKind,
	}),
	suite: 'DOM snapshots',
	integrityOptions: { cwd: __dirname }, // start searching from the current directory
	test: multiSnapshotWithOptions({}),
});
