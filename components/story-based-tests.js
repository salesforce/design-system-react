define(['exports', '../tests/initial-blank-stories', '../components/accordion/__docs__/storybook-stories'], function (exports, _initialBlankStories, _storybookStories) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Accordion = exports.Blank = undefined;

  var _initialBlankStories2 = _interopRequireDefault(_initialBlankStories);

  var _storybookStories2 = _interopRequireDefault(_storybookStories);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Blank = _initialBlankStories2.default;
  exports.Accordion = _storybookStories2.default;
});