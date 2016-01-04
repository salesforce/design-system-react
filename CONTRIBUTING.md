# Contributing Code

1. Create a new issue before starting your project so that we can keep track of what you are trying to add/fix. That way, we can also offer suggestions or let you know if there is already an effort in progress.
2. Fork off this repository.
3. Create a topic branch for the issue that you are trying to add.
4. Edit the code in your fork.
5. Send us a well documented pull request when you are done.

The **GitHub pull requests** should meet the following criteria:

  - descriptive title
  - brief summary
  - @mention several relevant people to review the code
  - add helpful GitHub comments on lines that you have questions / concerns about

We'll review your code, suggest any needed changes, and merge it in. Thank you.

## Code Guidelines

1. Use es6 syntax

2. `propTypes`, `defaultProps`, and declaration of props on components should be in alphabetical order.

3. Components' lifecyle methods should be near the top (`componentDidMount`,`componentWillUnmount`, etc.), and the `render()` function should be the last function in the component so that users can easily find them.

4. Below is a react component template. Note that `displayName`, `propTypes`, and `defaultProps` are required.

```
const displayName = "MyComponent";
const propTypes = {};
const defaultProps = {};

class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>My Component here</div>
    )
  }
}

MyComponent.displayName = displayName;
MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

module.exports = MyComponent;

```
