# Contributing Code

## The preferred process
1. Create a new issue before starting your project so that we can keep track of what you are trying to add/fix. That way, we can also offer suggestions or let you know if there is already an effort in progress.
2. Fork this repository, then clone that forked repository locally.
3. Create a topic branch for the issue that you are trying to add locally.
4. Edit the code locally and push to your username's forked repository. Be sure to [add a Storybook story](https://getstorybook.io/docs/react-storybook/basics/writing-stories) for new features.
5. Send us a well-documented pull request based on the branch from your forked repository.

**GitHub pull requests** should meet the following criteria:
  - descriptive title
  - brief summary
  - @mention several relevant people to review the code
  - add helpful GitHub comments on lines where you have questions or concerns

We'll review your code, suggest any needed changes, and merge it in. Thank you.

- If you are adding a feature, [add a story](https://getstorybook.io/docs/react-storybook/basics/writing-stories) to the React Storybook that uses your feature, so that reviewers can test it.
- All new props / features need tests to prevent regressions in the future. Please review the [testing readme](/tests/README.md)
- Stories are stored in [examples folder](/examples) along with Documentation site examples. To add a story to the interactive examples on the [documentation site](https://react.lightningdesignsystem.com/components/), add the JSX file to [examples/index.js](/examples/index.js). All examples that are present for a component in the [SLDS website](https://www.lightningdesignsystem.com/) or it's internal site should be created as a Storybook story _and_ listed in `examples/index.js`.
- Prop description tables on the documentation site are generated from propType comments within the component. All props should have a _Tested with snapshot testing._ or _Tested with Mocha framework._ notice in them.
- Introductory component descriptions are generated from the comment before the component declaration.

## The review process
This is an internal open-source project. You may be asked to review code submitted by others. To do this:
- `git clone` this repository
- `npm install`
- Pull down the pull requested branch. It will be within the contributor's forked repository. For instance, `git checkout -b interactivellama-data-table-width master` then `git pull git@github.com:interactivellama/design-system-react.git data-table-width`. You could also create an additional remote and pull down the branch directly.
- `npm start` and review the appropriate React Story example at `http://localhost:9001/`. Open `http://localhost:8001/` and confirm that tests are passing in your environment.
- Check that any modified or added examples for the documentation site are working and are present in `examples/index.js`. See [Releasing](#Releasing) for instructions.

## Concepts and Best Practices
#### What we've learned about building React components for the enterprise

### Think of others first
- <a name="not-bootstrap" href="#not-bootstrap">#</a> **Consider your audience.** This project is not Bootstrap, and we've built [frameworks on top of Bootstrap](https://github.com/ExactTarget/fuelux). The primary audience for this project is software engineers yearning to easily implement the design artifact handed to them. Yes, contributors should over-document and explain much as you need to, but you do _not_ need to have components just work when you drop them on the page. Read on for more about limiting internal component state.

- <a name="consuming-developer-mindset" href="#consuming-developer-mindset">#</a> **Put yourself in the consuming developer mindset.** "I just updated. What just broke and why?" Why does the React child component become the the DOM parent node? Write as long of a prop description comment that is needed to understand the concept. Need to sunset a prop or change the variable type accepted? Write backwards compatible code and add console warnings that will _only run in development_. See the `checkProp` paradigm. If the test can become an independent module and work in multiple components, add it to the `design-system-react/utilities` folder. Some examples include:
    - A component has children without a specified `displayName`
    - Determine if trigger can be tabbed to
    - Require one of multiple prop, but not both or only one of specified properties
    - Warnings of property deprecation, sunsetting, and future changes

- <a name="all-text-can-be-internationalized" href="#all-text-can-be-internationalized">#</a> Any text the user can read (including text for screenreaders) should be able to be set via a prop for internationalization.

- <a name="group-assistive-text" href="#group-assistive-text">#</a> All assistive text for accessibility should be grouped in an object and passed in with an `assistiveText` prop.

- <a name="different-react-component-hierarchy" href="#different-react-component-hierarchy">#</a> React component hierarchy doesn't always mean HTML tag hierarchy. Sometimes children become the wrapping component.

- <a name="private-child-components" href="#private-child-components">#</a> Place child components not intended to be part of the public API within a folder labelled `private`. All other React components should be considered public (and considered within the scope of Semantic Versioning), and can be used by developers in their own JSX within their application. See [Child component decorator pattern](#child-component-decorator-pattern)

- <a name="code-design-choices" href="#code-design-choices">#</a> **Use loose coupling and weak connascence.** The goal should be that a contributor can understand one piece of code without understanding another and be able to easily make updates in the future. You want weak connascence between components or components and the application (such as events) and not strong connascence. This makes it easier to update one component when modifying another in the future. How easy it will be to change in the future depends on which of the nine [types of connascence](https://en.wikipedia.org/wiki/Connascence_(computer_programming)) is being used. For instance, _Connascence of Name_ can be simply updated with Find/Replace. PropTypes and type systems help with _Connascence of Type_.

### Limit side effects
- <a name="limit-state" href="#limit-state">#</a> **Limit use of component state.** If the parent application's state engine can handle it with a `prop`, then don't use state. _New components should always start out as controlled by their parent and only be uncontrolled (that is have state) if a use case presents itself._ It's better to have a component that needs 20 props set and outputs the correct markup, than to have a component that works with no props set, yet maintains multiple internal states. We like to think of this project as design system templates with minimal logic that happen to work with the React framework. Let the library consumer create a simple _container component_ with state. Read more about [controlled components](#controlled-and-uncontrolled-components).
    - <a name="stateful-stateless-components" href="#stateful-stateless-components">#</a> Know how smart/stateful React components [work together](https://gist.github.com/trevordmiller/a7791c11228b48f0366b) with [pure/dumb stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).
    - <a name="stateful-top-level-component" href="#stateful-top-level-component">#</a> It is preferable to only have one stateful top-level class per component in this library. For these top-level components, it’s preferable to leave them stateful (that is, to use `class`). It's much easier to get the DOM node reference if you need it for such things as measurements. Then, you don't have to go through a lot of hassle to work around not having lifecycle methods. It also allows components to follow the controlled / uncontrolled pattern mentioned below. All sub-components should be stateless and manipulated with props if possible.
    - A `Tree` should have state. A `TreeNode` should not.
    - A `DataTable` should have state, a `TableColumn` should not.
    - Frequently used items such as badges, pills, buttons or icons should probably not have state.

- <a name="no-window-events" href="#no-window-events">#</a> **Encapsulate your components.** Global window events like `resize` or external DOM nodes should not be accessed from the component. `body` should be used for additional portal mounts. If a menu needs to be smaller to be responsive, consuming applications should listen for the resize event and change the correct props to make the component responsive--or a CSS solution should be found. The component should not be listening to window events directly. Global key press or mouse clicks are fine if used appropriately.

- <a name="use-dom-refs" href="#use-dom-refs">#</a> **Avoid querying the DOM for nodes you do not own.** A `ref` callback is React's [link to a DOM node](https://facebook.github.io/react/docs/refs-and-the-dom.html). It is triggered on render and allows access to the DOM node asynchronously. In most cases within a component, you only need a `ref` for setting focus, but `refs` make testing easier. If you find yourself using `querySelectorAll()` to query parts of this library within your application tests, please stop and submit a contribution that surfaces the DOM node you are needing to test. If you control the contents or children yourself, please use a `ref` bound to your own JSX DOM node to test. For an example, review the `renderDialog` method of `Popover` and its `body` ref. Once surfaced, a DOM `ref` becomes part of the public API and will be treated as such.

- <a name="breaking-changes" href="#breaking-changes">#</a> **Changes to a component's props or a new design system version are breaking changes.** SLDS markup alignment and class changes within the current design system release cycle are _not_ considered breaking changes in this library although they may break markup queries. See [Avoid querying the DOM for nodes you do not own.](#use-dom-refs).

- <a name="approved-slds-patterns" href="#approved-slds-patterns">#</a> **Only submit approved design system patterns.** This library should include only components which have approved patterns in Salesforce's [design system](https://www.lightningdesignsystem.com/) or the latest internal beta releases. If there is a use case from a designer that conforms to a design pattern, that component should be able to be implemented with this library.

- <a name="limit-extra-div" href="#limit-extra-div">#</a> **Limit the use of grouping `div` elements.** React components can only have one HTML node / JSX / function return value. A component's render function should have one HTML node as its parent JSX element. Please limit use of extra wrapping `div` elements in order to align with SLDS markup. Other options include creating additional sub-components or passing an array of components to the parent component to render.

- <a name="avoid-mixins" href="#avoid-mixins">#</a> **Avoid implied mixins.** Instead, import and use shared code and external libraries as libraries, or use higher-order components in order to more easily trace the code execution.

- <a name="avoid-dependencies" href="#avoid-dependencies">#</a> **Avoid external dependencies.** Do not add external dependencies _to production dependencies_ list unless absolutely necessary. Always consider the "total cost of ownership" for all dependencies.

- <a name="use-is-required" href="#use-is-required">#</a> **Use isRequired as much as possible in PropTypes.** `isRequired` is explicit, determines the minimal API of each component, and simplifies a component's internal code. Similar to limiting state, this library prefers simple over flexible, so use `isRequired` as much as you can without over-burdening the consuming developer.

- <a name="avoid-css" href="#avoid-css">#</a> **Avoid inline CSS style/custom classes.** We are blessed to have a team of great CSS developers working on our design system. Use their CSS or contribute code back to them.

### Be consistent
- <a name="use-eslint" href="#use-eslint">#</a> **Use ESlint** The larger a codebase becomes and the more contributors the project has, the more organization that is needed. Please use ESlint in your editor (via `.eslinttc`) and conform to ESlint settings present in [ESlint Configuration for SLDS](https://github.com/salesforce-ux/eslint-config-slds). The team is open to contributions. If a file is touched that has outstanding ESlint errors, please fix the ESlint errors first--in a separate commit. Sometimes special cases require an `eslint-disable-line`, but please use sparingly.

- <a name="familiarize" href="#familiarize">#</a>**Do not create in a vaccuum.** Familiarize yourself with concepts used in the rest of the library.

- <a name="react-create-class" href="#react-create-class">#</a> Use `class/extend`, but only extend from `React.Component` and never another `class`. This prevents class hierarchies and tight coupling being created beyond the basic `React.Component`. This completely avoids the gorilla-banana problem (“what you wanted was a banana, what you got was a gorilla holding the banana, and the entire jungle” - Joe Armstrong).

- <a name="event-callbacks" href="#event-callbacks">#</a> **Use consistent callback parameters.** All render callbacks, that is callbacks that determine what to render, should pass a data object with named key/values. Event callbacks should pass in the synthetic event, then a data object with named key/values that relate to the event. If an event callback doesn't have a user event that triggered it, pass `undefined` as the event.

- <a name="use-classnames" href="#use-classnames">#</a> **Use classNames library.** This library makes extensive use of the [classnames](https://github.com/JedWatson/classnames) library for feeding conditional CSS classes into `className` attributes and allows a variety of types such as `string`, `object`, and `arrays`. Although longer, static classname strings are preferred more than dynamic classnames (dynamic object keys) due to searchability when updating markup. See [Classnames](#classnames) section for more details.

- <a name="classname-prop-consistent" href="#classname-prop-consistent">#</a> **The `className` prop should be on a consistent node.** The classes passed into `className` should be present on the `.slds-[COMPONENT]` node and not on a container node--nor on a child of `.slds-[COMPONENT]`. All other `className` props should be prefixed--such as `triggerClassName` or `containerClassName`.

- <a name="boolean-prop-prefix" href="#boolean-prop-prefix">#</a> **Use boolean prefixes.** If a prop is a boolean, please prefix with `is` or `can` or suffix it with `-able`. Never default a prop to `true`.

### Use "the good parts"
- <a name="rest-operators-with-jsx" href="#rest-operators-with-jsx">#</a> Be careful with [rest operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) when passively applying unnamed and unknown props to JSX nodes. This concept allows flexibility to the consuming developer, but is difficult to track for maintainers. If rest operators should be used, be sure to deconstruct each one that is actually needed by the JSX nodes, so that the rest operator only handles "unknown props" passed in from the outside developer. In short, don't utilize any properties in the `...props` object within the component. After using `const { active, className, ...rest } = props;` do not go back to using `this.prop.*` anywhere in the render function.

- <a name="rest-operators-with-jsx-delete" href="#rest-operators-with-jsx-delete">#</a> If a rest operator is already present in your render function and you need to remove additional props so that they do not get passed to a JSX node, use the rest operator along with `// eslint-disable-line no-unused-vars` to remove the prop from `...rest`.

- <a name="props-in-get-initial-state" href="#props-in-get-initial-state">#</a> **Do not use props in initial state.** Please review [props in getInitialState is an anti-pattern.](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)

- <a name="jsx-gotchas" href="#jsx-gotchas">#</a> Read [JSX Gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html#html-entities)

- <a name="no-default-false-values" href="#no-default-false-values">#</a> **No falsy defaults.** Do not set default prop values to `false`. If you need to detect if a variable is `false` or undefined in order to execute code, use a "double logical NOT operator". If `isOpen` gives you a "falsey" value, then `!!isOpen` will make it return the boolean value `false`. Otherwise it will return true. If you need to test if the value is not `undefined`, use `!== undefined`.

- <a name="required-callbacks" href="#required-callbacks">#</a> **External callbacks are optional.** Public callback/handler function props should always be optional and tested to see if they exist before execution. Within private child components use `.isRequired` if the callback is needed internally for the component to function.

### Advocate for accessibility

- One of the key aspects of accessibility with React components is managing a DOM node's `focus` and `blur`. This should be implemented with callback references to DOM nodes and should _not_ use `ReactDOM.findDOMNode()`. Use the the current DOM node `ref` prop to create a function that passes the DOM node to a callback that is provided by the parent which will control the focus once the DOM node has been rendered.

- If a component has a focusable element, such as a button or an input, write a callback function that will pass the `ref` back to it's parent. `buttonRef` or `inputRef` are possible prop names.

- Non-accessible component contributions are permitted but discouraged. These are labelled "prototypes" and do not follow an approved accessible user-experience pattern. Please create an additional issue to follow up with the contribution.

Unless you have an accessiblity guru in your department (knowledge of implementing accessible code and using assistive technology), you are going to have to figure out some things for yourself. A wise manager once said "real work is when you can't Google the answer." Here are some resources that have _different_ answers to your questions.

- [ARIA-1.1 Authoring Practices guide](http://w3c.github.io/aria-practices/) - Although no one actually implemented ARIA 1.0 guidelines fully, this is the bleeding edge of the W3C's re-write of the Authoring Practices, which are based on ARIA 1.1. Many now come with the W3C's own examples pages.
- [ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/) - Recommendation Candidate for the new ARIA Spec.
- [ARIA in HTML](http://w3c.github.io/html-aria/) - Super useful reference to answer the question "Should I put ARIA on this?". Often a native HTML element will have an implicit role, so it's not required, _nor recommended_ to be added.
- [HTML 5.1](https://www.w3.org/TR/html51/) - This is at the Recommendation Candidate stage, so it is very unlikely to change. Please notice the places where it informs of ARIA role for each element, the implicit roles, may not be 100% accurate. The document authors state that the ARIA in HTML spec above is the definitive source of truth for that bit and they'll fix up 5.1 when they find stuff that's not correct.
- [eBay MIND patterns](https://ebay.gitbooks.io/mindpatterns/content/) - Nice to digest content. Most up to date functional base components our team has found so far with [examples](http://ianmcburnie.github.io/mindpatterns/). This does not mean they are correct, though.

### Be kind to future contributors and write tests

- All external APIs should be tested, so that breaking changes can be detected. If a breaking change doesn't cause at least one test to fail, then add a test.
    - All `props` should be tested. It is OK to test multiple props in the same test for optmization as long as they are isolated and do not affect each other (for instance `id`, `classname`, and `style`).
    - All event callbacks should be tested along with any data object keys outside of the synthetic event to confirm the data. The data object, if present, is typically the second parameter of an event callback.
    - All mouse and keyboard interactions should be tested.
- Components should have 90%+ test coverage. Coverage can be determined by reviewing the coverage summary at the end of `npm test`. High test coverage does not imply correct logic, but low coverage implies low test quality/quantity.
- Test should run correctly in headless browsers (`npm test`) and within a "real" browser (`npm start` -> `http://localhost:8001/`)
- For more specifics about testing please review the [testing module walkthough](tests/README.md).

## Controlled and Uncontrolled Components
- All new components should be controlled at first and then uncontrolled support added later if needed.
- All Design System React components should be able to be "controlled"--that is expose a callback and expect their parent to control them with props.
- Prefix callbacks that occur before an event with `onRequest`. Prefix callbacks that occur as a result of an event with `on`. The close button in a Popover will call `onRequestClose` while the Popover will call `onClose` after the Popover has been closed. This is because closing isn't guarenteed with `onRequestClose`, since the parent component will decide.
- Please note that if controlled by its parent, a component will appear broken if just copied and pasted into an application without a parent to control its props.
- Controlled components can be stateless components, but entirely stateless components do complicate DOM selectors for the consuming applications.

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
    this.state = {value: 'Hello!'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

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
  handleChange(event) {
    this.setState({value: event.target.value.substr(0, 140)});
  }
```

This would accept user input and truncate the value to the first 140 characters.

A **Controlled** component does not maintain its own internal state; the component renders purely based on props.

_from [Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components) in the React documentation._

- If a component needs the ability to also manage its own state (that is to be an "uncontrolled" component) in particular situations the parent should still be able to take over and make it controlled simply by passing in a value for the prop. For instance, an `onModalClose` callback could change `isModalOpen` to `false` when it is ready to close the modal.
- For more detail and examples of this pattern, visit [DIMOC: Do It Myself or Callback](https://gist.github.com/jamesgpearce/53a6fc57677870f93248).

## Component Organization

* `createClass`
  * display name
  * prop types
  * defaults and initial state
  * life cycle methods
  * sub-render methods
  * primary render

```javascript
import { EXTERNAL_CONSTANT } from '../../utilities/constants';

/**
 * The description of this component (will appear in the documentation site).
 */
const DemoComponent = React.createClass({
  displayName: EXTERNAL_CONSTANT,
  propTypes: {
    /**
     * The description of this prop (will appear in the documentation site).
     */
    title: PropTypes.string.isRequired
  },

  // These values will also be visible in the documentation site.
  getDefaultProps () {
    return {
    };
  },

  getInitialState () {
    return {
    };
  },

  toggleOpen (event) {
  },

  renderSubComponent () {
  },

  // Render should be last
  render () {
  }
});

export default DemoComponent;
```

## Formatting Props

Wrap props on newlines for exactly 2 or more. Always list alphabetically.

```html
// bad
<Person
 firstName="Michael" />

// good
<Person firstName="Michael" />
```

```html
// bad
<Person firstName="Michael" lastName="Chan" occupation="Designer" favoriteFood="Drunken Noodles" />

// good
<Person
 favoriteFood="Drunken Noodles"
 firstName="Michael"
 lastName="Chan"
 occupation="Designer"
/>
```

## Child component decorator pattern
Limit aliasing of props for child components that already exist. This pattern is similar to [higher-order components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.gjdiuf68s). It creates a separation of concern and a more declarative approach that relies on child components with their own props instead of additional props on the parent component.

For instance, allowing `MenuDropdown` to have a `Trigger` child that can be a `Button` can prevent the creation of new props such as `buttonClassName` on `MenuDropdown`, since `Button` already has a `className` prop.

- This reduces `prop` duplication for `props` that will just be passed down to the child component.
- It allows `MenuDropdown` to decorate `Button` with the correct `onClick` among other `props`.
- It allows the end-developer to use all existing `Button` props that they may already be familiar with.

The following is a simple example of the cloning process within the parent.


```javascript
const CleverParent = React.createClass({
  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        onClick: () => alert(JSON.stringify(child.props, 0, 2))
      })
    })
    return <div>{children}</div>
  }
})

const SimpleChild = React.createClass({
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
})

const App = React.createClass({
  render() {
    return (
      <CleverParent>
        <SimpleChild>1</SimpleChild>
        <SimpleChild>2</SimpleChild>
        <SimpleChild>3</SimpleChild>
        <SimpleChild>4</SimpleChild>
        <SimpleChild>5</SimpleChild>
      </CleverParent>
    )
  }
})
```
Example taken from [React Composability Patterns](http://www.zhubert.com/blog/2016/02/05/react-composability-patterns/)


## Prefer Ternary to Sub-render

Keep login inside the `render`.

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
## Naming DOM `ref` callbacks

Do not name a DOM callback prop of a library component `ref`. `ref` is a reserved prop name. This will return the component React object, _not_ the DOM node. It is best practice to create an object called `refs` with keys that are semantic names of DOM nodes: `refs: { triggerButton: ()=>{}, triggerInput: ()=>{} }`. If you use a `refs` object, you may need shallow merge the object with default props. For more information, please review [Exposing DOM Refs to Parent Components](https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components).

```javascript
// bad
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.ref} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        ref={el => this.inputElement = el}
      />
    );
  }
}
```

```javascript
// good
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.refs.input} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        refs={{
          input: (el) => { this.inputElement = el; }
        }}
      />
    );
  }
}
```

## Naming Handler Methods

Name the handler methods after their triggering event.

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

Handler names should:

- begin with `handle`
- end with the name of the event they handle (eg, `Click`, `Change`)
- be present-tense

If you need to disambiguate handlers, add additional information between
`handle` and the event name. For example, you can distinguish between `onChange`
handlers: `handleNameChange` and `handleAgeChange`. When you do this, ask
yourself if you should be creating a new component.

## Classnames

Use [classNames](https://www.npmjs.com/package/classnames) to manage conditional classes.

```javascript
// bad
get classes () {
  let classes = ['MyComponent'];

  if (this.state.active) {
    classes.push('MyComponent--active');
  }

  return classes.join(' ');
}

render () {
  return <div className={this.classes} />;
}
```

```javascript
// better
render () {
  return (
    <div className={classnames('MyComponent',
      `MyComponent--${this.props.active}`,
      `MyComponent--${this.props.variant}`,
    )} />
  );
}
```
The best solution allows you to search the source code for the entire class name in order to update it. Dynamic classnames are more difficult to locate.
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

Read: [Class Name Manipulation](https://github.com/JedWatson/classnames/blob/master/README.md)

from the [Planning Center](https://github.com/planningcenter/react-patterns)


## Finalize new component/features

1. Write tests for your new component/feature.
2. Run `npm test`.
3. After your PR is merged, make sure it appears here: [https://design-system-react-components.herokuapp.com](https://preview:8f2924b3d2232a37f63c32f70d9b3aba@design-system-react-components.herokuapp.com/). If it doesn't, reach out to one of the following people:
  * [Donielle Berg](https://github.com/donnieberg)
  * [Ivan Bogdanov](https://github.com/madpotato)
  * [David Brainer](https://github.com/tweettypography)
  * [Stephen James](https://github.com/interactivellama)
  * [David Woodward](https://github.com/futuremint)
4. Get your component/feature approved by the UX Accessibility Team (refer to the link above).


## Releasing
1. Pull down the documentation site and place in the same parent folder as this library: `git clone git@github.com:salesforce-ux/design-system-react-site.git` and run `npm install`.
`.
1. Run `npm run local-update` from within `design-system-react-site` to build, copy, and serve a local version of this library into the site. You should be able to now view the updated site at `http://localhost:8080/` and resolve any issues with updated documentation.
1. [Write the release notes](https://github.com/salesforce-ux/design-system-react/blob/master/RELEASENOTES.md) that cover everything that has changed since the last release. You don't have to commit your release notes changes though. The following script will do that for you.
1. Run `npm prune` and `npm install` to clean up node modules in preparation for build.
1. **Choose one**: `npm run release-patch` or `npm run release-minor` This script pulls from upstream, bumps the version, commits changes, and publishes tags to your `upstream` repository (that is this repo).
1. Copy and paste your release notes into the [Github Draft Release UI](https://github.com/salesforce-ux/design-system-react/releases) and publish.
1. Update the version of Design System React in the documentation site's [package.json](https://github.com/salesforce-ux/design-system-react-site/blob/master/package.json#L51) and push to master. This is will build a Heroku application. Log into Heroku and promote the staged pull request to production. You will need promotion rights to the Heroku application.

_If you are timid about releasing or need your pull request in review "pre-released," you can publish to origin (your fork) with `npm run publish-to-git` and then test and review the tag on your fork. This is just the publish step though, any other tasks you will need to do manually to test publishing._
