"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = exports.Illustration = exports.DataTable = exports.Accordion = exports.Blank = undefined;

var _initialBlankStories = require("../tests/initial-blank-stories");

var _initialBlankStories2 = _interopRequireDefault(_initialBlankStories);

var _storybookStories = require("../components/accordion/__docs__/storybook-stories");

var _storybookStories2 = _interopRequireDefault(_storybookStories);

var _storybookStories3 = require("../components/data-table/__docs__/storybook-stories");

var _storybookStories4 = _interopRequireDefault(_storybookStories3);

var _storybookStories5 = require("../components/illustration/__docs__/storybook-stories");

var _storybookStories6 = _interopRequireDefault(_storybookStories5);

var _storybookStories7 = require("../components/tree/__docs__/storybook-stories");

var _storybookStories8 = _interopRequireDefault(_storybookStories7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * STORY-BASED SNAPSHOT TESTING
 *
 * Please add stories below to use Storybook Stories (http://localhost:9001)
 * as the basis for DOM and image snapshots to allow markup and visual regression
 * testing. All new components should be added below to enable DOM and image
 * snapshots. With enough Storybook story examples, these two methods should be
 * significant to fully test components with the exception of callback testing.
 * Pleaes test callback props with the Mocha framework (http://localhost:8001).
 * `tests/story-based-tests.snapshot-test.js` looks at this file and uses the
 * following stories to create snapshots.
 *
 * This library is transitioning to story-based testing, but not all components
 * are able to be tested without a DOM. This file should eventually go away and
 * `storybook-stories.js` used for the basis of snapshot creation.
 */
exports.Blank = _initialBlankStories2.default;
exports.Accordion = _storybookStories2.default; // export Alert from '../components/alert/__docs__/storybook-stories';
// export Avatar from '../components/avatar/__docs__/storybook-stories';
// export Breadcrumb from '../components/breadcrumb/__docs__/storybook-stories';
// export Button from '../components/button/__docs__/storybook-stories';
// export ButtonGroup from '../components/button-group/__docs__/storybook-stories';
// export ButtonStateful from '../components/button-stateful/__docs__/storybook-stories';
// export Card from '../components/card/__docs__/storybook-stories';
// export Checkbox from '../components/checkbox/__docs__/storybook-stories';
// export Combobox from '../components/combobox/__docs__/storybook-stories';
// export Filter from '../components/filter/__docs__/storybook-stories';

exports.DataTable = _storybookStories4.default; // export Dropdown from '../components/menu-dropdown/__docs__/storybook-stories';
// export Input from '../components/input/__docs__/storybook-stories';
// export Textarea from '../components/textarea/__docs__/storybook-stories';
// export Search from '../components/input/__docs__/search/storybook-stories';
// export Icon from '../components/icon/__docs__/storybook-stories';

exports.Illustration = _storybookStories6.default; // export Lookup from '../components/lookup/__docs__/storybook-stories';
// export MediaObject from '../components/media-object/__docs__/storybook-stories';
// export Navigation from '../components/navigation/__docs__/storybook-stories';
// export PageHeader from '../components/page-header/__docs__/storybook-stories';
// export Pill from '../components/pill/__docs__/storybook-stories';
// export ProgressRing from '../components/progress-ring/__docs__/storybook-stories';
// export RadioGroup from '../components/radio-group/__docs__/storybook-stories';
// export RadioButtonGroup from '../components/radio-button-group/__docs__/storybook-stories';
// export Slider from '../components/slider/__docs__/storybook-stories';
// export SplitView from '../components/split-view/__docs__/storybook-stories';
// export Tabs from '../components/tabs/__docs__/storybook-stories';
// export Toast from '../components/toast/__docs__/storybook-stories';
// export Tooltip from '../components/tooltip/__docs__/storybook-stories';

exports.Tree = _storybookStories8.default;
/*
 * The following components are not compatible Jest testing because
 * need a real DOM. These components should be updated to allow testing
 * with Jest. This is typically done by gaurding references to `document`.
 */
// export AppLauncher from '../components/app-launcher/__docs__/storybook-stories';
// export GlobalNavigationBar from '../components/global-navigation-bar/__docs__/storybook-stories';
// export DatePicker from '../components/date-picker/__docs__/storybook-stories';
// export IconSettings from '../components/icon-settings/__docs__/storybook-stories';
// export GlobalHeader from '../components/global-header/__docs__/storybook-stories';
// export Modal from '../components/modal/__docs__/storybook-stories';
// export Notification from '../components/notification/__docs__/storybook-stories';
// export Panel from '../components/panel/__docs__/storybook-stories';
// export Popover from '../components/popover/__docs__/storybook-stories';
// export ProgressIndicator from '../components/progress-indicator/__docs__/storybook-stories';
// export Picklist from '../components/menu-picklist/__docs__/storybook-stories';
// export Spinner from '../components/spinner/__docs__/storybook-stories';
// export TimePicker from '../components/time-picker/__docs__/storybook-stories';