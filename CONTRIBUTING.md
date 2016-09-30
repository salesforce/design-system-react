# Contributing Code

1. Create a new issue before starting your project so that we can keep track of what you are trying to add/fix. That way, we can also offer suggestions or let you know if there is already an effort in progress.
2. Fork off this repository.
3. Create a topic branch for the issue that you are trying to add.
4. Edit the code in your fork.
5. Send us a well documented pull request when you are done.

**GitHub pull requests** should meet the following criteria:

  - descriptive title
  - brief summary
  - @mention several relevant people to review the code
  - add helpful GitHub comments on lines where you have questions or concerns

We'll review your code, suggest any needed changes, and merge it in. Thank you.

## Concepts and Best Practices

- <a name="approved-slds-patterns" href="#approved-slds-patterns">#</a> This library should include only components which have approved patterns in SLDS.
- <a name="familiarize" href="#familiarize">#</a> Familiarize yourself with concepts used in the rest of the library.
- <a name="eslint-all-files-touched" href="#eslint-all-files-touched">#</a> If a file is touched that has outstanding ESlint errors, please fix the ESlint errors first (and in a separate commit). Sometimes special cases require an `eslint-disable` comment for a particular rule and/or line. Please use sparingly.
- <a name="react-create-class" href="#react-create-class">#</a> `React.createClass` is preferred over ES6 classes and `extend` at this time.
- <a name="stateful-stateless-components" href="#stateful-stateless-components">#</a> Know how smart/stateful React components [work together](https://gist.github.com/trevordmiller/a7791c11228b48f0366b) with [pure/dumb stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).
- <a name="stateful-top-level-component" href="#stateful-top-level-component">#</a> It is preferable to only have one stateful top-level class per component in this library. For these top-level components, it’s preferable to leave them stateful (that is, to use `React.createClass`). It's much easier to get the DOM node reference if you need it for such things as measurements. Then, you don't have to go through a lot of hassle to work around not having lifecycle methods. It also allows components to follow the controlled / uncontrolled pattern mentioned below. All sub-components should be stateless and manipulated with props if possible.
    - A Tree should have state. A tree node should not.
    - A Data Table should have state, a Table Column should not.
    - Frequently used items such as badges, pills, buttons or icons should probably not have state.
- <a name="avoid-mixins" href="#avoid-mixins">#</a> Avoid mixins. Instead, import and use shared code and external libraries as libraries, or use higher-order components. Do not add external dependencies unless absolutely necessary. Consider the "total cost of ownership" of all dependencies.
- <a name="rest-operators-with-jsx" href="#rest-operators-with-jsx">#</a> Be careful with [rest operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) when passively applying unnamed and unknown props to JSX nodes. This concept allows flexibility to the consuming developer, but is difficult to track for maintainers. If rest operators should be used, be sure to deconstruct each one that is actually needed by the JSX nodes, so that the rest operator only handles "unknown props" passed in from the outside developer. In short, don't utilize any properties in the `...props` object within the component. After using `const { active, className, ...rest } = props;` do not go back to using `this.prop.*` anywhere in the render function. 
- <a name="rest-operators-with-jsx-delete" href="#rest-operators-with-jsx-delete">#</a> If a rest operator is already present in your render function and you need to remove additional props so that they do not get passed to a JSX node, use the rest operator along with `// eslint-disable-line no-unused-vars` to remove the prop from `...rest`.
- <a name="dimoc" href="#dimoc">#</a> Use the controlled/uncontrolled callback/prop pattern. By default, React components should be "controlled" - exposing a callback and expecting their parent to control them. If a component needs to ability to also manage its own state (be an "uncontrolled" component) in particular situations the parent should still be able to take over and make it controlled simply by passing in a value for the prop. For instance, an `onModalClose` callback could change `isModalOpen` to `false` when it is ready to close the modal. For more detail and examples of this pattern, visit [DIMOC: Do It Myself or Callback](https://gist.github.com/jamesgpearce/53a6fc57677870f93248).
- <a name="event-callbacks" href="#event-callbacks">#</a> Event callbacks should pass in the synthetic event, then a data object with contents that relate to the event.
- <a name="boolean-prop-prefix" href="#boolean-prop-prefix">#</a> If a prop is a boolean, please prefix with `is` or `can` or suffix it with `-able`. Never default a prop to `true`.
- <a name="use-checkprops" href="#use-checkprops">#</a> Add as many prop checking tests that will _only run in development_ as needed via `checkProp`. If the test can become an independent module and work in multiple components, add it to the `utilities` folder.
- <a name="all-text-can-be-internationalized" href="#all-text-can-be-internationalized">#</a> Any text the user can read (including text for screenreaders) should be able to be set via a prop for internationalization.
- <a name="different-react-component-hierarchy" href="#different-react-component-hierarchy">#</a> React component hierarchy doesn't always mean HTML tag hierarchy. Sometimes children become the wrapping component.
- <a name="classnames" href="#classnames">#</a> This library makes extensive use of the [classnames](https://github.com/JedWatson/classnames) library for feeding conditional CSS classes into `className` attributes and allows a variety of types such as `string`, `object`, and `arrays`. Please review the libary's API.
- <a name="props-in-get-initial-state" href="#props-in-get-initial-state">#</a> [Props in getInitialState is an anti-pattern.](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)
- <a name="jsx-gotchas" href="#jsx-gotchas">#</a> Read [JSX Gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html#html-entities)

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
    title: React.PropTypes.string.isRequired
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

## Understand child component decorator pattern
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
// good
render () {
  let classes = {
    'MyComponent': true,
    'MyComponent--active': this.state.active
  };

  return <div className={classnames(classes)} />;
}
```

Read: [Class Name Manipulation](https://github.com/JedWatson/classnames/blob/master/README.md)

from the [Planning Center](https://github.com/planningcenter/react-patterns)

## Testing Guidelines

- All external APIs should be tested, so that breaking changes can be detected. If a breaking change doesn't cause at least one test to fail, then add a test.
    - All `props` should be tested. It is OK to test multiple props in the same test for optmization as long as they are isolated and do not affect each other (for instance `id`, `classname`, and `style`).
    - All event callbacks should be tested along with any data object keys outside of the synthetic event to confirm the data. The data object, if present, is typically the second parameter of an event callback. 
    - All mouse and keyboard interactions should be tested.
- Components should have 90%+ test coverage. Coverage can be determined by reviewing the coverage summary at the end of `npm test`. Please note that high test coverage does not imply correct logic, but low coverage implies low test quality/quantity. 
- Test should run correctly in headless browsers (`npm test`) and within a "real" browser (`npm start` -> `http://localhost:8001/`)
- For more specifics about testing please review the [testing module walkthough](tests/README.md).


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


# Releasing
1. [Add to release notes](https://github.com/salesforce-ux/design-system-react/blob/master/RELEASENOTES.md).
1. Run `npm prune` and `npm install` to clean up node modules in preparation for build.
1. Pull from upstream, bump and commit the package version, and publish tags to your upstream repo (that is this repo). **Choose one**: `npm run release-patch` or `npm run release-minor`
1. Copy and paste your release notes into the Github Draft Release UI and publish.

_If you are timid about releasing or need your pull request in review "pre-released," you can publish to origin (your fork) with `npm run publish-to-git` and then test and review the tag on your fork. This is just the publish step though, any other tasks you will need to do manually to test publishing._
