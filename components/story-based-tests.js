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

export Blank from '../tests/initial-blank-stories';
export Accordion from '../components/accordion/__docs__/storybook-stories';
export Alert from '../components/alert/__docs__/storybook-stories';
export Avatar from '../components/avatar/__docs__/storybook-stories';
export BrandBand from '../components/brand-band/__docs__/storybook-stories';
export Breadcrumb from '../components/breadcrumb/__docs__/storybook-stories';
export Button from '../components/button/__docs__/storybook-stories';
export ButtonGroup from '../components/button-group/__docs__/storybook-stories';
export ButtonStateful from '../components/button-stateful/__docs__/storybook-stories';
export Card from '../components/card/__docs__/storybook-stories';
export Checkbox from '../components/checkbox/__docs__/storybook-stories';
export ColorPicker from '../components/color-picker/__docs__/storybook-stories';
export Combobox from '../components/combobox/__docs__/storybook-stories';
export Filter from '../components/filter/__docs__/storybook-stories';
export DataTable from '../components/data-table/__docs__/storybook-stories';
// export Dropdown from '../components/menu-dropdown/__docs__/storybook-stories';
export GlobalHeader from '../components/global-header/__docs__/storybook-stories';
export Input from '../components/input/__docs__/storybook-stories';
export Icon from '../components/icon/__docs__/storybook-stories';
export Illustration from '../components/illustration/__docs__/storybook-stories';
export MediaObject from '../components/media-object/__docs__/storybook-stories';
export PageHeader from '../components/page-header/__docs__/storybook-stories';
// export Pill from '../components/pill/__docs__/storybook-stories';
export PillContainer from '../components/pill-container/__docs__/storybook-stories';
export ProgressIndicator from '../components/progress-indicator/__docs__/storybook-stories';
// export ProgressRing from '../components/progress-ring/__docs__/storybook-stories';
// export RadioGroup from '../components/radio-group/__docs__/storybook-stories';
// export RadioButtonGroup from '../components/radio-button-group/__docs__/storybook-stories';
// export Search from '../components/input/__docs__/search/storybook-stories';
// export Slider from '../components/slider/__docs__/storybook-stories';
// export SplitView from '../components/split-view/__docs__/storybook-stories';
// export Tabs from '../components/tabs/__docs__/storybook-stories';
// export Textarea from '../components/textarea/__docs__/storybook-stories';
// export Toast from '../components/toast/__docs__/storybook-stories';
// export Tooltip from '../components/tooltip/__docs__/storybook-stories';
export Tree from '../components/tree/__docs__/storybook-stories';
// export VerticalNavigation from '../components/vertical-navigation/__docs__/storybook-stories';

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
// export Popover from '../components/popover/__docs__/storybook-stories';
// export Spinner from '../components/spinner/__docs__/storybook-stories';
// export TimePicker from '../components/time-picker/__docs__/storybook-stories';

// DEPRECATED
// export Lookup from '../components/lookup/__docs__/storybook-stories';
// export Notification from '../components/notification/__docs__/storybook-stories';
// export Picklist from '../components/menu-picklist/__docs__/storybook-stories';
