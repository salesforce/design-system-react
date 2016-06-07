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

## Code Guidelines

1. We use es6 and make use of a [shared eslint repository](https://github.com/salesforce-ux/eslint-config-slds) based on [Airbnb's Code guidelines](https://github.com/airbnb/javascript). You can refer to our [.eslintrc](https://github.com/salesforce-ux/design-system-react/blob/master/.eslintrc).

2. `displayName`, `propTypes`, and `defaultProps` should be in that order.

3. Component lifecyle methods (`componentDidMount`, `componentWillUnmount`, etc.) should be near the top so that developers know where to look for them and don't create duplicate methods.

4. Below is a react component template. Note that `displayName`, `propTypes`, and `defaultProps` are required.

```jsx
const MyComponent = React.createClass({
  displayName: 'MyComponent',

  propTypes: {
    ...
  },

  defaultProps: {
    ...
  },

  render () {
    return (
      <div>My Component here</div>
    );
  }
});

export default MyComponent;
```

## Finalize new component/features

1. Write tests for your new component/feature.
2. Run `npm test`.
3. After your PR is merged, make sure it appears here: [https://design-system-react-components.herokuapp.com](https://preview:8f2924b3d2232a37f63c32f70d9b3aba@design-system-react-components.herokuapp.com/). If it doesn't, reach out to one of the following people:
  * [Donielle Berg](https://github.com/donnieberg)
  * [Ivan Bogdanov](https://github.com/madpotato)
  * [David Brainer](https://github.com/tweettypography)
4. Get your component/feature approved by the UX Accessibility Team (refer to the link above).
