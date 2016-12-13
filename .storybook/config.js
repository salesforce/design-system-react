import { configure } from '@kadira/storybook';

function loadStories() {
  require('../examples/stories');
}

configure(loadStories, module);
