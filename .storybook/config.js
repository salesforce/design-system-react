import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/data-table');
}

configure(loadStories, module);
