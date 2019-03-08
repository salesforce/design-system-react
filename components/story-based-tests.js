"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = exports.Tree = exports.ProgressIndicator = exports.PillContainer = exports.PageHeader = exports.MediaObject = exports.Illustration = exports.Icon = exports.Input = exports.GlobalHeader = exports.DataTable = exports.Filter = exports.Combobox = exports.ColorPicker = exports.Checkbox = exports.Card = exports.ButtonStateful = exports.ButtonGroup = exports.Button = exports.Breadcrumb = exports.BrandBand = exports.Avatar = exports.Alert = exports.Accordion = exports.Blank = undefined;

var _initialBlankStories = require("../tests/initial-blank-stories");

var _initialBlankStories2 = _interopRequireDefault(_initialBlankStories);

var _storybookStories = require("../components/accordion/__docs__/storybook-stories");

var _storybookStories2 = _interopRequireDefault(_storybookStories);

var _storybookStories3 = require("../components/alert/__docs__/storybook-stories");

var _storybookStories4 = _interopRequireDefault(_storybookStories3);

var _storybookStories5 = require("../components/avatar/__docs__/storybook-stories");

var _storybookStories6 = _interopRequireDefault(_storybookStories5);

var _storybookStories7 = require("../components/brand-band/__docs__/storybook-stories");

var _storybookStories8 = _interopRequireDefault(_storybookStories7);

var _storybookStories9 = require("../components/breadcrumb/__docs__/storybook-stories");

var _storybookStories10 = _interopRequireDefault(_storybookStories9);

var _storybookStories11 = require("../components/button/__docs__/storybook-stories");

var _storybookStories12 = _interopRequireDefault(_storybookStories11);

var _storybookStories13 = require("../components/button-group/__docs__/storybook-stories");

var _storybookStories14 = _interopRequireDefault(_storybookStories13);

var _storybookStories15 = require("../components/button-stateful/__docs__/storybook-stories");

var _storybookStories16 = _interopRequireDefault(_storybookStories15);

var _storybookStories17 = require("../components/card/__docs__/storybook-stories");

var _storybookStories18 = _interopRequireDefault(_storybookStories17);

var _storybookStories19 = require("../components/checkbox/__docs__/storybook-stories");

var _storybookStories20 = _interopRequireDefault(_storybookStories19);

var _storybookStories21 = require("../components/color-picker/__docs__/storybook-stories");

var _storybookStories22 = _interopRequireDefault(_storybookStories21);

var _storybookStories23 = require("../components/combobox/__docs__/storybook-stories");

var _storybookStories24 = _interopRequireDefault(_storybookStories23);

var _storybookStories25 = require("../components/filter/__docs__/storybook-stories");

var _storybookStories26 = _interopRequireDefault(_storybookStories25);

var _storybookStories27 = require("../components/data-table/__docs__/storybook-stories");

var _storybookStories28 = _interopRequireDefault(_storybookStories27);

var _storybookStories29 = require("../components/global-header/__docs__/storybook-stories");

var _storybookStories30 = _interopRequireDefault(_storybookStories29);

var _storybookStories31 = require("../components/input/__docs__/storybook-stories");

var _storybookStories32 = _interopRequireDefault(_storybookStories31);

var _storybookStories33 = require("../components/icon/__docs__/storybook-stories");

var _storybookStories34 = _interopRequireDefault(_storybookStories33);

var _storybookStories35 = require("../components/illustration/__docs__/storybook-stories");

var _storybookStories36 = _interopRequireDefault(_storybookStories35);

var _storybookStories37 = require("../components/media-object/__docs__/storybook-stories");

var _storybookStories38 = _interopRequireDefault(_storybookStories37);

var _storybookStories39 = require("../components/page-header/__docs__/storybook-stories");

var _storybookStories40 = _interopRequireDefault(_storybookStories39);

var _storybookStories41 = require("../components/pill-container/__docs__/storybook-stories");

var _storybookStories42 = _interopRequireDefault(_storybookStories41);

var _storybookStories43 = require("../components/progress-indicator/__docs__/storybook-stories");

var _storybookStories44 = _interopRequireDefault(_storybookStories43);

var _storybookStories45 = require("../components/tree/__docs__/storybook-stories");

var _storybookStories46 = _interopRequireDefault(_storybookStories45);

var _storybookStories47 = require("../components/popover/__docs__/storybook-stories");

var _storybookStories48 = _interopRequireDefault(_storybookStories47);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * STORY-BASED SNAPSHOT TESTING
 *
 * Please add stories below to use Storybook Stories (http://localhost:9001)
 * as the basis for DOM and image snapshots to allow markup and visual
 *  regression testing. All new components should be added below to enable 
 * DOM and image snapshots. With enough Storybook story examples, these two
 * methods should be significant to fully test components with the exception
 * of callback testing. Please test callback props with the Mocha framework
 * (http://localhost:8001). `tests/story-based-tests.snapshot-test.js` looks
 * at this file and uses the following stories to create snapshots.
 *
 * This library is transitioning to story-based testing, but not all components
 * are able to be tested without a DOM. This file should eventually go away and
 * `storybook-stories.js` used for the basis of snapshot creation.
 */
exports.Blank = _initialBlankStories2.default;
exports.Accordion = _storybookStories2.default;
exports.Alert = _storybookStories4.default;
exports.Avatar = _storybookStories6.default;
exports.BrandBand = _storybookStories8.default;
exports.Breadcrumb = _storybookStories10.default;
exports.Button = _storybookStories12.default;
exports.ButtonGroup = _storybookStories14.default;
exports.ButtonStateful = _storybookStories16.default;
exports.Card = _storybookStories18.default;
exports.Checkbox = _storybookStories20.default;
exports.ColorPicker = _storybookStories22.default;
exports.Combobox = _storybookStories24.default;
exports.Filter = _storybookStories26.default;
exports.DataTable = _storybookStories28.default; // export Dropdown from '../components/menu-dropdown/__docs__/storybook-stories';

exports.GlobalHeader = _storybookStories30.default;
exports.Input = _storybookStories32.default;
exports.Icon = _storybookStories34.default;
exports.Illustration = _storybookStories36.default;
exports.MediaObject = _storybookStories38.default;
exports.PageHeader = _storybookStories40.default; // export Pill from '../components/pill/__docs__/storybook-stories';

exports.PillContainer = _storybookStories42.default;
exports.ProgressIndicator = _storybookStories44.default; // export ProgressRing from '../components/progress-ring/__docs__/storybook-stories';
// export RadioGroup from '../components/radio-group/__docs__/storybook-stories';
// export RadioButtonGroup from '../components/radio-button-group/__docs__/storybook-stories';
// export Search from '../components/input/__docs__/search/storybook-stories';
// export Slider from '../components/slider/__docs__/storybook-stories';
// export SplitView from '../components/split-view/__docs__/storybook-stories';
// export Tabs from '../components/tabs/__docs__/storybook-stories';
// export Textarea from '../components/textarea/__docs__/storybook-stories';
// export Toast from '../components/toast/__docs__/storybook-stories';
// export Tooltip from '../components/tooltip/__docs__/storybook-stories';

exports.Tree = _storybookStories46.default; // export VerticalNavigation from '../components/vertical-navigation/__docs__/storybook-stories';

/*
 * The following components are not compatible Jest testing because they
 * need a real DOM. These components should be updated to allow testing
 * with Jest. This is typically done by gaurding references to `document`.
 */
// export AppLauncher from '../components/app-launcher/__docs__/storybook-stories';
// export GlobalNavigationBar from '../components/global-navigation-bar/__docs__/storybook-stories';
// export DatePicker from '../components/date-picker/__docs__/storybook-stories';
// export IconSettings from '../components/icon-settings/__docs__/storybook-stories';
// export Modal from '../components/modal/__docs__/storybook-stories';
// export Panel from '../components/panel/__docs__/storybook-stories';

exports.Popover = _storybookStories48.default; // export Spinner from '../components/spinner/__docs__/storybook-stories';
// export TimePicker from '../components/time-picker/__docs__/storybook-stories';
// DEPRECATED
// export Lookup from '../components/lookup/__docs__/storybook-stories';
// export Notification from '../components/notification/__docs__/storybook-stories';
// export Picklist from '../components/menu-picklist/__docs__/storybook-stories';