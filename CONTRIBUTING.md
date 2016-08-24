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

- This library should include only components which have approved patterns in SLDS.
- Familiarize yourself with concepts used in the rest of the library.
- If a file is touched that has outstanding ESlint errors, please fix the ESlint errors first (and in a separate commit). Sometimes special cases require an `eslint-disable` comment for a particular rule and/or line. Please use sparingly.
- `React.createClass` is preferred over ES6 classes and `extend` at this time.
- Prefer stateless components (basically a one fat-arrow functional component) unless you need state. Try not to use state.
- Avoid mixins. Instead, import and use shared code and external libraries as libraries, or use higher-order components. Do not add external dependencies unless absolutely necessary. Consider the "total cost of ownership" of all dependencies.
- Be careful with [rest operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) when passively applying unnamed and unknown props to JSX nodes. This concept allows flexibility to the consuming developer, but is difficult to track for maintainers. If rest operators should be used, be sure to deconstruct each one that is actually needed by the JSX nodes, so that the rest operator only handles "unknown props." In short, don't utilize any properties in the `...props` object within the component. After using `const { active, className, ...other } = props;` do not go back to using this.prop.* anywhere in the render function.
- Use the controlled/uncontrolled callback/prop pattern. By default, React components should be "controlled" - exposing a callback and expecting their parent to control them. If a component needs to ability to also manage its own state (be an "uncontrolled" component) in particular situations the parent should still be able to take over and make it controlled simply by passing in a value for the prop. For instance, an `onModalClose` callback could change `isModalOpen` to `false` when it is ready to close the modal. For more detail and examples of this pattern, visit [DIMOC: Do It Myself or Callback](https://gist.github.com/jamesgpearce/53a6fc57677870f93248).
- Event callbacks should pass in the synthetic event, then a data object with contents that relate to the event.
- If a prop is a boolean, please prefix with `is` or `can` or suffix it with `-able`. Never default a prop to `true`.
- Add as many prop checking tests that will _only run in development_ as needed via `checkProp`. If the test can become an independent module and work in multiple components, add it to the `utilities` folder.
- Any text the user can read (including a11y text for screenreaders) should be able to be set via a prop for internationalization.
- React component hierarchy doesn't always mean HTML tag hierarchy. Sometimes children become the wrapping component.
- Understand grandchild prop decorating such as in `MenuDropdown` and the example of creating custom trigger buttons which prevents the creation of new props such as `buttonClassName` and allows an existing component, `<Button>` to be decorated with props from its parent or grandparent while adding the flexibility of the developer to use all existing `<Button>` props. In short, don't alias props for child components that already exist.
- [Props in getInitialState is an anti-pattern.](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)
- Read [JSX Gotchas](https://facebook.github.io/react/docs/jsx-gotchas.html#html-entities)

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

## Finalize new component/features

1. Write tests for your new component/feature.
2. Run `npm test`.
3. After your PR is merged, make sure it appears here: [https://design-system-react-components.herokuapp.com](https://preview:8f2924b3d2232a37f63c32f70d9b3aba@design-system-react-components.herokuapp.com/). If it doesn't, reach out to one of the following people:
  * [Donielle Berg](https://github.com/donnieberg)
  * [Ivan Bogdanov](https://github.com/madpotato)
  * [David Brainer](https://github.com/tweettypography)
4. Get your component/feature approved by the UX Accessibility Team (refer to the link above).


# Releasing
1. Run `npm prune` and `npm install` to clean up node modules in preparation for build.
2. Increment the package version in `package.json` based on the `semver` methodology.
3. [Add to release notes](https://github.com/salesforce-ux/design-system-react/blob/master/RELEASENOTES.md)
4. Commit the previous two changes.
5. Publish to your upstream repo (that is this repo): `npm run publish-to-upstream`
6. Copy and paste your release notes into the Github Draft Release UI and publish.

_If you are timid about releasing or need your pull request in review "pre-released," you can publish to origin (your fork) with `npm run publish-to-git` and then test and review the tag on your fork._
