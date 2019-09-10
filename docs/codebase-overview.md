# Codebase Overview

### This page will give you an overview of the library codebase organization, conventions, and implementation. Components will always be moving toward this specification, but may not comply currently.

If you want to [contribute](/CONTRIBUTING.md), we hope that this overview will help you feel more comfortable.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Top-Level folders](#top-level-folders)
* [Introduction to presentational components](#introduction-to-presentational-components)
  * [Your audience is intermediate to advanced engineers](#your-audience-is-intermediate-to-advanced-engineers)
  * [Write clear prop comment descriptions for documentation website](#write-clear-prop-comment-descriptions-for-documentation-website)
  * [Prop changes need console warnings](#prop-changes-need-console-warnings)
* [External architecture](#external-architecture)
  * [No prop breaking changes without backwards compatibility](#no-prop-breaking-changes-without-backwards-compatibility)
  * [Review similar components before proposing a feature](#review-similar-components-before-proposing-a-feature)
  * [Rendered text needs a prop. Group assistive text and labels](#rendered-text-needs-a-prop-group-assistive-text-and-labels)
  * [Use `isRequired` PropType when possible](#use-isrequired-proptype-when-possible)
  * [Prefix `onRequest[ACTION]` to pre-state-change callbacks functions](#prefix-onrequestaction-to-pre-state-change-callbacks-functions)
  * [Prefix `on[EVENT]` to post-event callback functions](#prefix-onevent-to-post-event-callback-functions)
  * [No return values in event callback functions](#no-return-values-in-event-callback-functions)
  * [Allow `id` to be set and unique to the page](#allow-id-to-be-set-and-unique-to-the-page)
  * [Callback props should be tested to see if they exist](#callback-props-should-be-tested-to-see-if-they-exist)
  * [Prefix render props with `onRender`](#prefix-render-props-with-onrender)
  * [Reuse existing component props by using component. No `<Button iconClassName />`.](#reuse-existing-component-props-by-using-component-no-button-iconclassname-)
  * [Put private components in `private` folder](#put-private-components-in-private-folder)
  * [No global DOM or `window` access](#no-global-dom-or-window-access)
  * [Limit global event listeners usage](#limit-global-event-listeners-usage)
  * [Limit use of DOM `ref`](#limit-use-of-dom-ref)
  * [Use `refs` object for external DOM callbacks](#use-refs-object-for-external-dom-callbacks)
  * [`className` class is rendered on `.slds-[COMPONENT]`](#classname-class-is-rendered-on-slds-component)
  * [Use `className[NODE]` prefix for other nodes](#use-classnamenode-prefix-for-other-nodes)
  * [Boolean props: Use `is`, `has`, and `can` prefixes or `-able` suffix](#boolean-props-use-is-has-and-can-prefixes-or--able-suffix)
  * [No truthy defaults for boolean type props](#no-truthy-defaults-for-boolean-type-props)
  * [Adding a default prop may be a breaking change](#adding-a-default-prop-may-be-a-breaking-change)
  * [Use `event, { key: value }` in callback parameters](#use-event--key-value--in-callback-parameters)
  * [Transpile this library before using](#transpile-this-library-before-using)
  * [Only propose SLDS components](#only-propose-slds-components)
* [Internal Architecture](#internal-architecture)
  * [Example Class](#example-class)
  * [Limit component state](#limit-component-state)
  * [Use controlled components](#use-controlled-components)
  * [React component can differ from DOM hierarchy](#react-component-can-differ-from-dom-hierarchy)
  * [Group form elements in the same component](#group-form-elements-in-the-same-component)
  * [Use loose coupling and weak connascence](#use-loose-coupling-and-weak-connascence)
  * [Use a single return](#use-a-single-return)
  * [Define defaults in one location](#define-defaults-in-one-location)
  * [Use functions instead of loops](#use-functions-instead-of-loops)
  * [No mixins](#no-mixins)
  * [Use one stateful component and many stateless sub-components](#use-one-stateful-component-and-many-stateless-sub-components)
  * [No DOM node queries](#no-dom-node-queries)
  * [Limit external production dependencies.](#limit-external-production-dependencies)
  * [Avoid inline styles and non-SLDS classes.](#avoid-inline-styles-and-non-slds-classes)
  * [Only extend from `React.Component`](#only-extend-from-reactcomponent)
  * [Use `classnames` for conditional CSS classes](#use-classnames-for-conditional-css-classes)
  * [Use design tokens for inline styles](#use-design-tokens-for-inline-styles)
  * [500+ line files should be avoided](#500-line-files-should-be-avoided)
  * [Render style preference: 1) `?:`, 2) `&&`, 3) Enum, 4) Sub-component](#render-style-preference-1--2--3-enum-4-sub-component)
  * [Use `handle` prefix on internal callbacks](#use-handle-prefix-on-internal-callbacks)
  * [Use entire class name string when rendering conditional class names](#use-entire-class-name-string-when-rendering-conditional-class-names)
  * [No variable mutation](#no-variable-mutation)
  * [No spread operator on DOM nodes](#no-spread-operator-on-dom-nodes)
  * [No props in initial state](#no-props-in-initial-state)
* [Write tests](#write-tests)
  * [Test all props](#test-all-props)
  * [Components should have 90%+ test coverage](#components-should-have-90%25-test-coverage)
* [Components should be accessible](#components-should-be-accessible)
  * [Components should be keyboard accessible](#components-should-be-keyboard-accessible)
  * [Use DOM ref to control focus if needed](#use-dom-ref-to-control-focus-if-needed)
* [Writing documentation site examples](#writing-documentation-site-examples)
* [Converting SLDS to Design System React](#converting-slds-to-design-system-react)
* [Babel Preset folder](#babel-preset-folder)
* [Benefits of open source software](#benefits-of-open-source-software)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Top-Level folders

* `components` - React components
  * `[COMPONENT]` - components that are part of the public API
    * `__tests__` - Mocha and Jest tests
    * `__examples__` Examples used in storybook and documentation website
    * `__docs__` - storybook and documentation website imports of examples
    * `private` - components that are not a part of the public API
  * `utilities` - components that are shared between other components (not public API)
* `icons` - Inline icons \[legacy\]
* `preset` - Babel preset published to `@salesforce/babel-preset-design-system-react`
* `scripts` - Build and release tasks
* `styles` - Temporary location for styles (use sparingly)
* `utilities` - Scripts that are not React components including `checkProp` warnings, DOM, and event helpers. (not public API)

### Introduction to presentational components

If you are new to React, you may be trained to design components in a more complicated way than they need to be. The goal is for engineers to not have to think about markup and stylesheets. Please prioritize the simple and the flexible.

The gist of presentational components is to be a template that takes in data and passes out user events and related data to callback functions. One over-simplified way to approach it is to consider these components as [Handlebars templates](http://handlebarsjs.com/) with event listeners.

* Take data and UI data, such as disabled buttons, from parent via props to display data and UI state correctly. Don't manipulate props with string concatenations, array pushes, and sorting within components.
* Pass mouse and keyboard events and related event data, such as the item data for the item that was clicked, up to parent state machine, so it can decide how to manipulate it's child components' props.
* Parent components should be the only components that change data. Components should be data stateless and only reflect the data they have been given. Only UI state, such as "is this dialog open?" or "is this option active/focused" should be within components. Focus and active state should be maintained internally in order to not introduce these into your state engine store (e.g.- Redux).

#### Your audience is intermediate to advanced engineers

This project is not Bootstrap, and we've built [frameworks on top of Bootstrap](https://github.com/ExactTarget/fuelux). The primary audience for this project is software engineers wanting to easily implement the design artifact handed to them. Yes, contributors should over-document and explain as much as you need to, but you do _not_ need to have components just work when you drop them on the page. In short, think functionally and limiting internal component state.

#### Write clear prop comment descriptions for documentation website

"I just updated. What just broke and why?" Why does the React child component become the DOM parent node? Write as long of a prop description comment that is needed to understand the concept. These comments are used for the prop tables on the library documentation website.

#### Prop changes need console warnings

Need to sunset a prop or change the variable type accepted? Write backward compatible code and add console warnings that will _only run in development_. Use a `checkProp` function to communicate to the developer that they are not using the library correctly. If the warning can become an independent module and work in multiple components, add it to the `design-system-react/utilities` folder. Some examples include:

* A component has children without a specified `displayName`
* Determine if the trigger can be tabbed to
* Require one of multiple props, but not both or only one of the specified properties
* Warnings of property deprecation, sunsetting, and future changes

### External architecture

#### No prop breaking changes without backward compatibility

Except on rare occasions with considerable thought breaking changes will be denied. Non-backward compatible changes to component props or a new design system version that has breaking changes within it _is_ a breaking change and this library will have to release a major version.

SLDS markup alignment and class changes within the current design system release cycle are _not_ considered breaking changes in this library although they may break markup queries. When upgrading the design system CSS, please create an archive/stale branch labeled similar to `spring-17-2.2.x`, except using the correct Salesforce release date and SLDS version that the code was intended to support.

If you need an existing prop changes, please consider some alternatives such as deprecated the old prop and proposing a new prop name (`onChange` to `onRowChange` for instance).

#### Review similar components before proposing a feature

Familiarize yourself with concepts used in the rest of the library.

#### Rendered text needs a prop. Group assistive text and labels

Be inclusive of non-English users. Any text the user can read (including hidden assistive text for screenreaders) should be able to be set via a prop for internationalization purposes. Within the component, **do not concatenate strings.** This assumes that you know the word order of all languages. Strings should be passed into props in their entirety. Non-visible programmatic keys can be concatenated.

If the text has a mix of data and words, use a before/after key name or a callback with a return value. All assistive text for accessibility and visible text should be grouped in an object and passed in with a prop, `assistiveText` and `labels` respectively. This will allow consuming developers to easily find and map text to localize it. All visible text labels should allow a propType of `node`. This allows for italics, bold, other inline styling, and adding tooltips.

#### Use `isRequired` PropType when possible

Similar to limiting internal state, `isRequired` is explicit and determines the minimal API of each component. It simplifies a component's internal code and removes conditionals.

#### Prefix `onRequest[ACTION]` to pre-state-change callbacks functions

Pre-state-change events are events that _request_ a state change from the parent component. Pre-state-change events callbacks should check for an invalid state and prevent the invalid state. For example

* Pill's `onRequestRemove` would be called before the Pill is removed. A pill is requesting that itself be removed, but it hasn't been removed yet. \* `onRemove` would be called after the Pill is removed.
* "Native" events, like `onClick`, `onKeyDown`, `onFocus` do not have the prefix `onRequest`, since the callback occurs after the specified event.
* `onRequestRemove` occurs _before_ the event of removal, while `onKeyDown` (delete or backspace) on a Pill occurs after a key is pressed down.

#### Prefix `on[EVENT]` to post-event callback functions

This is fairly standard React convention. Post-state-change or post-user-action events are called after a state change or a user event and should have the `on` prefix.

#### No return values in event callback functions

Event callback props should not communicate with the parent component through return values. To increase clarity, do use `event.preventDefault()` or `return false` within a callback prop to communicate information back to the component. Trapping event bubbling is good, but components should only be communicated with by props cycling back through the state engine. All data needed to change the state or communicate an invalid state should be explicitly provided by a key in the data object of the function parameter. The data object is always the second parameter of the callback.

#### Allow `id` to be set and unique to the page

All `id` attributes in a component's DOM should be unique to the page, especially if the same component is used multiple times. A top-level component's `id` prop should be `shortid` generated by default _and_ also be able to be controlled by the consuming developer. `shortid` generated `id` attributes are needed to enable accessibility and sometimes used for a React `key`. Letting the developer set a component's `id` allows library and consuming application DOM snapshots tests to be deterministic. Sub-component `id` props and nodes within a component can be concatenated strings such as `` <div id={`tab-panel-${props.componentId}-${props.panelId}`} role="tabpanel" /> ``. Every `id` should contain the component's `id` prop, since multiple components on the same page could use the same data objects and all HTML element `id`'s should be unique to the page.

#### Callback props should be tested to see if they exist

Public callback/handler function props should be tested to see if they exist before execution. Within private child components use `.isRequired` PropType if the callback is needed internally for the component to function.

#### Prefix render props with `onRender`

Render props are essentially a callback function that occurs at render and should be given all data that the default render function has access to. Use an `onRender` prefix to signal that it is a standard [render prop](https://reactjs.org/docs/render-props.html) function (e.g.- `onRender[nodeOrComponentName]`). In a menu item render, this would be the `options` object. This functional is always swapped out with a DOM node.

#### Reuse existing component props by using component. No `<Button iconClassName />`.

Another kind of render prop is when a prop accepts an existing Design System React component class with a prop API such as the `dropdown` prop of `DataTableRowActions`. _Component composition with prop spread_ is a similar pattern to render props, but differs in that it does an element clone with a shallow prop/object merge in which it is assumed that the prop component passed in overrides any props from its parent.

In a way, this is "grandparent control" in that it surfaces the internal API of sub-components to the consuming developer in a way that the parent of the parent can control it. The parent component (such as `DataTableRowActions`) shallow merges the props from itself with the component props provided from the developer. The developer's passed in component controlled by the "grandparent" takes precedence and **\*merges in last** which is what you typically want, since a grandparent component controls the parent. That said, overriding internal logic can easily break a component. _Use with caution._

This pattern creates a separation of concern and a more declarative approach that relies on child components with their own documented props instead of additional props on the parent component such as `<Button iconClassName />`. Passing in `<Dropdown options={} />` to a `dropdown` prop limits the aliasing of props for child components that already exist (`dropdownOptions` is discouraged) and reduces duplication of `PropType` documentation and increases library maintainability.

#### Put private components in `private` folder

React components not in a `private` folder are considered public and are considered within the scope of semantic versioning for breaking changes.

#### No global DOM or `window` access

Encapsulate your components. No DOM queries. If `window`, `document` and event listeners are needed for events, you should test for their existence. Their existence is not guaranteed.

#### Limit global event listeners usage

The component should not be listening to window events directly. If a menu needs to be smaller to be responsive, consuming applications should listen for the resize event and change the correct props to make the component responsive--or a CSS solution should be found.

#### Limit use of DOM `ref`

DOM references should only be used for tasks such as measurement.

#### Use `refs` object for external DOM callbacks

If you need to provide a DOM node reference, create an object called `refs` with keys that are semantic names of DOM nodes: `refs: { triggerButton: ()=>{}, triggerInput: ()=>{} }`. `ref` is a reserved prop name. This will return the component React object, _not_ the DOM node. If you use a `refs` object, you may need shallow merge the object with default props. For more information, please review [Exposing DOM Refs to Parent Components](https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components).

```javascript
const CustomTextInput (props) => (
  <div><input ref={props.refs.input} /></div>
);

const Parent () => (
  <CustomTextInput
    refs={{
      input: (el) => {
        this.inputElement = el;
      },
    }}
  />
);
```

#### `className` class is rendered on `.slds-[COMPONENT]`

The `className` prop should be on a consistent node. The classes passed into `className` should be present on the `.slds-[COMPONENT]` node and not on a container node--nor on a child of `.slds-[COMPONENT]`. All other `className` props should be suffixed--such as `classNameMenu` or `classNameContainer`.

#### Use `className[NODE]` prefix for other nodes

Use `classNameInput` for the classname on an `input` within a component.

#### Boolean props: Use `is`, `has`, and `can` prefixes or `-able` suffix

If a prop is a boolean, please prefix with `is` or `can`, `has`, or suffix it with `-able`. Never default a prop to `true`.

#### No truthy defaults for boolean type props

This will prevent consumers from having to write `propName={false}`. HTML defaults many attributes to true if no value is provided, such as `checked` instead of `checked="true"`. To maintain JSX's HTML-like syntax, please avoid asking a developer to use `propName={false}`. This may require using the opposite word, such as `isInline` instead of `isModal`.

#### Adding a default prop may be a breaking change

If adding a default prop changes the component visually from what it was without the default prop, it is considered a breaking change. Default props are very helpful and welcome if there are no changes to the component or are part of a new component. One alternative option is to create a value not specified by the design system that results in the originally rendered markup.

#### Use `event, { key: value }` in callback parameters

Use consistent callback parameters and names. All render callbacks, that is callbacks that determine what to render, should pass a data object with named key/values as the second parameter. Event callbacks should pass in the synthetic event, then a data object with named key/values that relate to the event. If an event callback doesn't have a user event that triggered it, pass `undefined` as the event. This will look something like `this.props.onCallback(event, { extraInfo: true })`.

#### Transpile this library before using

This library will not, and is not, intended to be run in a browser as-is. This library is targeted at engineers that can optimize their builds for performance and target the browsers and environments they need to support with appropriate polyfills. Polyfills should be added at application build time.

#### Only propose SLDS components

This library should include only components which have approved patterns in Salesforce's [design system](https://www.lightningdesignsystem.com/). If there is a use case from a designer that conforms to a design pattern, that component should be able to be implemented with this library. This library does NOT conform to Salesforce production per se, but is open to being customized to support patterns in production if they remain generic and flexible. If you are a Salesforce employee and need a component not in SLDS, please email Stephen James.

### Internal Architecture

Internal architecture should promote readability and easy maintainance.

#### Example Class

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import checkProps from './check-props';
import { EXTERNAL_CONSTANT } from '../../utilities/constants';

const propTypes = {
	/**
	 * The description of this prop (will appear in the documentation site).
	 */
	title: PropTypes.string.isRequired,
};

// These values will also be visible in the documentation site.
const defaultProps = {};

/**
 * The description of this component (will appear in the documentation site).
 */
class DemoComponent extends React.Component {
	static displayName = EXTERNAL_CONSTANT_NAME;
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);

		// useful for unique DOM IDs
		this.generatedId = this.props.id || shortid.generate();

		// initial state
		this.state = {};

		// Not required. This function issues console warnings to developers about props and is helpful in upgrading. All breaking changes to props must have a warning for developers when they upgrade.
		checkProps(EXTERNAL_CONSTANT, this.props);
	}

	// Class property bound to instance. Class methods that are not React lifecycle methods should use "fat-arrow" syntax if `this` binding is needed.
	toggleOpen = (event, { eventDataKey }) => {
		// you can use `this` here
	};

	// Minimize use of multiple renders. More HTML-like JSX is preferred with ternary statements
	renderSubComponent = () => null;

	// Render should be last
	render() {
		return null;
	}
}

export default DemoComponent;
```

#### Limit component state

If the parent application's state engine can handle it with a `prop`, then don't use state. _New components should always start out as controlled by their parent and only be uncontrolled (that has state) if a use case presents itself._ It's better to have a component that needs 20 props set and outputs the correct markup, than to have a component that works with no props set, yet maintains multiple internal states. We like to think of this project as design system templates with minimal logic that happen to work with the React framework. Let the library consumer create a simple _container component_ with state. Read more about [controlled components](#use-controlled-components).

#### Use controlled components

* Components should be able to be "controlled"--that exposes a callback and expect their parent to control them with props. Components should be controlled at first and then uncontrolled support added later if needed.
* Prefix callbacks that occur before an event with `onRequest`. Prefix callbacks that occur as a result of an event with `on`. The close button in a Popover will call `onRequestClose` while the Popover will call `onClose` after the Popover has been closed. This is because closing isn't guaranteed with `onRequestClose`, since the parent component will decide.
* Please note that if controlled by its parent, a component will appear broken if just copied and pasted into an application without a parent to control its props.
* Controlled components can be stateless components, but entirely stateless components do complicate DOM selectors for the consuming applications.

A **controlled** `<input>` has a `value` prop. Rendering a controlled `<input>` will reflect the value of the `value` prop.

```javascript
  render() {
    return <input type="text" value="Hello!" />;
  }
```

User input will have no effect on the rendered element because React has declared the value to be `Hello!`. To update the value in response to user input, you could use the `onChange` event:

```javascript
class MyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: 'Hello!' };
	}

	handleChange = (event) => {
		this.setState({ value: event.target.value });
	};

	render() {
		return (
			<input
				type="text"
				value={this.state.value}
				onChange={this.handleChange}
			/>
		);
	}
}
```

In this example, we are accepting the value provided by the user and updating the `value` prop of the `<input>` component. This pattern makes it easy to implement interfaces that respond to or validate user interactions. For example:

```javascript
handleChange = (event) => {
	this.setState({ value: event.target.value.substr(0, 140) });
};
```

This would accept user input and truncate the value to the first 140 characters.

A **Controlled** component does not maintain its own internal state; the component renders purely based on props.

_from [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) in the React documentation._

* If a component needs the ability to also manage its own state (that is to be an "uncontrolled" component) in particular situations the parent should still be able to take over and make it controlled simply by passing in a value for the prop. For instance, an `onModalClose` callback could change `isModalOpen` to `false` when it is ready to close the modal.
* For more detail and examples of this pattern, visit [DIMOC: Do It Myself or Callback](https://gist.github.com/jamesgpearce/53a6fc57677870f93248).

#### React component can differ from DOM hierarchy

React component hierarchy doesn't always mean HTML tag hierarchy. Sometimes children become the wrapping component.

#### Group form elements in the same component

Unless only style changes are needed, variants of form elements types such as checkboxes, radios, and inputs should be grouped in the same component. The underlying structure of a radio or checkbox do not change. All input `type=checkbox` nodes should be in the Checkbox component as a variant. This should be done, so that implementations of the same form elements that have different visual design can more easily be debugged. Bugs in one visual design of a form element are often found in another visual design.

#### Use loose coupling and weak connascence

The goal should be that a contributor can understand one piece of code without understanding another and be able to easily make updates in the future. You want weak connascence between components or components and the application (such as events) and not strong connascence. This makes it easier to update one component when modifying another in the future. How easy it will be to change in the future depends on which of the nine [types of connascence](<https://en.wikipedia.org/wiki/Connascence_(computer_programming)>) is being used. For instance, _Connascence of Name_ can be simply updated with Find/Replace. PropTypes and type systems help with _Connascence of Type_. _Connascence of Position_ with parameters is bad because it relies on the correct order of parameters. Objects with named keys should be used to avoid Connascence of Position.

#### Use a single return

Please do not short-circuit functions with multiple returns.

#### Define defaults in one location

Default props or any default variable value should be defined in one location. Many objects are merged in this library and this simplifies the logic and ensures defaults are not overriding non-defaults.

#### Use functions instead of loops

`const getKittenNames = (cats) => cats.filter(isKitten).map(getName)` is a great example of how to get a list of kitten names from a `cats` collection without a `for`, `while`, or `until` loop while only modifying variables within the functional scope.

#### No mixins

Avoid implied mixins. Instead, import and use shared code and external libraries as libraries, or use higher-order components in order to more easily trace the code execution.

#### Use one stateful component and many stateless sub-components

It is preferable to only have one stateful top-level class per component in this library. For these top-level components, it’s preferable to use `class`. All sub-components should be stateless and manipulated with props if possible.

* A `Tree` should have state. A `TreeNode` should not.
* A `DataTable` should have state, a `TableColumn` should not.
* Frequently used items such as badges, pills, buttons or icons should probably not have state.

* Know how smart/stateful React components [work together](https://gist.github.com/trevordmiller/a7791c11228b48f0366b) with [pure/dumb stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).

#### No DOM node queries

A `ref` callback is React's [link to a DOM node](https://facebook.github.io/react/docs/refs-and-the-dom.html). It is triggered on render and allows access to the DOM node asynchronously. In most cases within a component, you only need a `ref` for setting focus, but `refs` make testing easier. If you find yourself using `querySelectorAll()` to query parts of this library within your application tests, please stop and submit a contribution that surfaces the DOM node you are needing to test. If you control the contents or children yourself, please use a `ref` bound to your own JSX DOM node to test. For an example, review the `renderDialog` method of `Popover` and its `body` ref. Once surfaced, a DOM `ref` becomes part of the public API and will be treated as such.

#### Limit external production dependencies.

Do not add external dependencies _to production dependencies_ list unless absolutely necessary. Always consider the "total cost of ownership" for all dependencies.

#### Avoid inline styles and non-SLDS classes.

We are blessed to have a team of great CSS developers working on our design system. Use their CSS or contribute code back to them. Some rare or temporary implementations will be approved.

#### Only extend from `React.Component`

Use `class/extend`, but only extend from `React.Component` and never another `class`. This prevents class hierarchies and tight coupling being created beyond the basic `React.Component`. This completely avoids the gorilla-banana problem (“what you wanted was a banana, what you got was a gorilla holding the banana, and the entire jungle” - Joe Armstrong).

#### Use `classnames` for conditional CSS classes

This library makes extensive use of the [classnames](https://github.com/JedWatson/classnames) library for feeding conditional CSS classes into `className` attributes and allows a variety of types such as `string`, `object`, and `arrays`. Although longer, static classname strings are preferred more than dynamic classnames (dynamic object keys) due to searchability when updating markup. See [Classnames](#classnames) section for more details.

#### Use design tokens for inline styles

Inline styles should be kept to a minimum. The best option is to file a bug either in the internal bug system or at the [SLDS repository](https://github.com/salesforce-ux/design-system). This library contains a copy of design tokens available on the [SLDS site](https://www.lightningdesignsystem.com/design-tokens/). See [here](https://github.com/salesforce/design-system-react/blob/master/utilities/design-tokens/README.md) for more details.

#### 500+ line files should be avoided

These files should be broken into sub-components or utility libraries.

#### Render style preference: 1) `?:`, 2) `&&`, 3) Enum, 4) Sub-component

Once your data is in a correct structure, your rendering should just respond to changes in your data. Here is a list of ways to render:

1. Inline ternary operator
   * Preferred more than a simple if-else statement
   * It is more concise than if-else and can be used within JSX since it’s an expression
1. Logical `&&` operator
   * Alternative to ternary. Use when one side of the ternary operation would return null
   * Be careful that you don’t run into bugs when using multiple conditions (truthy/falsey values, especially array length of zero)
1. Inline Enum objects
   * Great to map different states
   * Great to map nested conditions ({prop1: { }}[prop1][prop2])
1. Higher Order Components or Sub-components
   * Create another stateless component and use it to shield away complex conditional rendering
   * Components can focus on their main purpose
   * This is an abstraction and can only return one node (in React 15)
1. Switch case
   * Verbose (break!)
   * Can only be JSX-inlined with self-invoking function
   * Avoid it, enums are preferred
1. If-else
   * Is the most basic conditional rendering
   * Beginner friendly
   * Cannot be inlined in JSX (needs variables)
1. Multi-level/nested conditional renderings
   * Avoid them for the sake of readability
   * Split up components into stateless components with their own simple conditional rendering
   * Use HOCs instead
1. External templating components
   * Avoid them and be comfortable with JSX and JavaScript

**Sub-render versus ternary example**

Keep variables inside the `render` function.

```javascript
// bad
renderSmilingStatement () {
  return <div>{this.props.name}{(this.state.isSmiling) ? <span> is smiling</span> : ""}</div>;
},

render () {
  return <div>{this.props.name}{this.renderSmilingStatement()}</div>;
}
```

```javascript
// good
render () {
  return (
    <div>
      {this.props.name}
      {this.state.isSmiling
        ? <span> is smiling</span>
        : null
      }
    </div>
  );
}
```

#### Use `handle` prefix on internal callbacks

Name the handler methods after their triggering event. Handler names should:

* begin with `handle`
* end with the name of the event they handle (eg, `Click`, `Change`)
* be present-tense

```javascript
// bad
punchABadger () { /*...*/ },

render () {
  return <div onClick={this.punchABadger} />;
}
```

```javascript
// good
handleClick () { /*...*/ },

render () {
  return <div onClick={this.handleClick} />;
}
```

If you need to disambiguate handlers, add additional information between
`handle` and the event name. For example, you can distinguish between `onChange`
handlers: `handleNameChange` and `handleAgeChange`. When you do this, ask
yourself if you should be creating a new component.

#### Use entire class name string when rendering conditional class names

Use [classNames](https://www.npmjs.com/package/classnames) to manage conditional classes. This allows you to search the source code for the entire class name in order to update it. Dynamic classnames are difficult to locate.

```javascript
// best
render () {
  return (
    <div className={classnames('MyComponent', {
      'MyComponent--active': this.props.active,
      'MyComponent--link': this.props.variant === 'link',
   })} />
}
```

#### No variable mutation

React tries to [optimize and prevent re-rendering the DOM when possible](https://facebook.github.io/react/docs/optimizing-performance.html#the-power-of-not-mutating-data). Many times this is not what you want. Avoid solitary use of `push`, `pop`, `shift`, `unshift`, `sort`, `reverse`, `splice` and `delete` when mutating arrays. If you ever have to ask yourself, why isn't my component rendering with new props, this is likely the reason. Use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) on objects and arrays--or [`Array.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) on arrays instead of directly modifying these variables that are accessed by reference. You may consider exploring some new ES6 types such as [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) which are collections that help store unique values of any type.

#### No spread operator on DOM nodes

Be careful with [rest operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) when passively applying unnamed and unknown props to JSX nodes. This concept allows flexibility to the consuming developer, but is difficult to track for maintainers. If rest operators should be used, be sure to deconstruct each one that is actually needed by the JSX nodes, so that the rest operator only handles "unknown props" passed in from the outside developer. In short, don't utilize any properties in the `...props` object within the component. After using `const { active, className, ...rest } = props;` do not go back to using `this.prop.*` anywhere in the render function.

#### No props in initial state

Please review [props in getInitialState is an anti-pattern.](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)

### Write tests

#### Test all props

This allows breaking changes to be detected. If a breaking change doesn't cause at least one test to fail, then add a test.

* All `props` should be tested. It is OK to test multiple props in the same test for optimization as long as they are isolated and do not affect each other (for instance `id`, `classname`, and `style`).
* All event callbacks should be tested along with any data object keys outside of the synthetic event to confirm the data. The data object, if present, is typically the second parameter of an event callback.
* All mouse and keyboard interactions should be tested.

#### Components should have 90%+ test coverage

Coverage can be determined by reviewing the coverage summary at the end of `npm test`. High test coverage does not imply correct logic, but low coverage implies low test quality/quantity.

* Test should run in headless browsers (`npm test`) and within a "real" browser (`npm start` -> `http://localhost:8001/`)
* Components should be capable to be rendered without a `DOM`. Test for the existence of `document` and `window` before using them.
* For more specifics about testing please review the [testing walkthough](../tests/README.md).

### Components should be accessible

* Non-accessible component contributions are permitted but discouraged. These are labeled "prototypes" and do not follow an approved accessible user-experience pattern. Please create an additional issue to follow up with the contribution.

* [ARIA-1.1 Authoring Practices guide](http://w3c.github.io/aria-practices/)
* [ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/) - Recommendation Candidate for the new ARIA Spec.
* [ARIA in HTML](http://w3c.github.io/html-aria/) - Reference to answer the question "Should I put ARIA on this?".
* [HTML 5.1](https://www.w3.org/TR/html51/) - Please notice the places where it informs of ARIA role for each element.
* [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) - SLDS and this library should be AA compliant.

#### Components should be keyboard accessible

* Follow the accessibility guidelines for keyboard events on the SLDS website.

#### Use DOM ref to control focus if needed

* One of the key aspects of accessibility with React components is managing a DOM node's `focus` and `blur`. This should be implemented with callback references to DOM nodes and should _not_ use `ReactDOM.findDOMNode()`. Use the current DOM node `ref` prop to create a function that passes the DOM node to a callback that is provided by the parent which will control the focus once the DOM node has been rendered.

* If a component has a focusable element, such as a button or an input, write a callback function that will pass the `ref` back to its parent. `buttonRef` or `inputRef` are possible prop names.

## Writing documentation site examples

* Documentation site code is located in a [private repository](https://github.com/salesforce-ux/design-system-react-site).
* The NPM module for this library is used for component documentation. Therefore, changes to documentation require a new version to be published.
* Documentation site examples use [CodeMirror](https://codemirror.net/) to `eval()` site examples from the NPM module. `import` and `export` statements are ignored by CodeMirror. Exports from `components/index.js` are the only variables available to code examples. Do not `import` any other variables or the site examples will not work.

## Converting SLDS to Design System React

* `variant` should be used for significant structure and markup or UX pattern changes that cannot exist at the same time. This may include examples, modifiers, but are usually labeled variants in SLDS. In order to clear, never make the presence of an event callback imply a markup change, other than the event attribute specified. Example: Do not make the addition of `onClick` turn a `span` into an `a` tag.
* `theme` should be used for a single `className` change that cannot exist at the same time as another `className`. These are typically SLDS states or themes, but could be modifiers. Examples: `warning`, `error`, `offline`, `success`.
* Modifiers and states that can exist at the same time and should be props by themselves, so that any combination of them is possible.
* `isOpen` on dialogs and menus should be able to be controlled by their parent component, but _also_ work with internal state if it is value is `undefined`
* SLDS uses styling to hide hidden elements. Please do not render these elements. Examples: menus, dialogs, tab and accordion content panels.
* In order to promote best practices, if components are used in a wrong or suboptimal way, the component should error. For instance, if `id` is a required key in option items, then the component should error out and not fall back to an array index. Custom `checkProps` warnings are the best way to provide a clear error to consuming developers.
* `propType` comments are used in the property tables on the documentation site. Please write in markdown paragraphs.
* ESLint may find errors in SLDS markup. Feel free to ask questions to the SLDS team or core maintainers of this library, but most likely the markup is intentional and well-tested. You may need to disable the error with `eslint-disable-line` or `eslint-disable-next-line`. Consider ESlint lint there to catch the rule, but not the well thought-out exception.
* All filenames should be "kabob case," `this-is-the-file`. Spaces and camel-case should be converted to hyphens.

# Babel Preset folder

`/preset` folder contains a Babel 6 preset that makes Design System React compatible with Salesforce’s supported browsers. This is a temporary location until a repository is created.

This preset enables a module bundler, such as Webpack, to transpile Design System React. Using this will make it easier to upgrade in the future without having to manually reconfigure your Babel settings to be compatible with new language features Design System React may use.

# Benefits of open source software

* More efficient and effective development
  * Faster Time-to-Market
  * Reduced development costs
* Overcoming organizational unit boundaries
  * Cost and risk sharing among organizational units
  * Collaboration across organizational unit boundaries
  * Program-wide information exchange
* More successful reuse
  * Use of competences missing at component providers
  * Independence between re-users and providers
  * Relief of component providers
* Better software product
  * Increased code quality
  * More innovative development
* More flexible utilization of developers
  * Simplified developer deployment
  * Collaboration of detached developers
* Enhanced knowledge management
  * Community-based learning
  * Openness and availability of knowledge
* Higher employee motivation
  * Shareable work \* Opportunity to lead engineering community
