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
  - add helpful GitHub comments on lines where you have questions or concerns

We'll review your code, suggest any needed changes, and merge it in. Thank you.

## Code Guidelines

1. We use es6 and generally follow [Airbnb's Code guidelines](https://github.com/airbnb/javascript). You can refer to our [.eslintrc](https://github.com/salesforce-ux/design-system-react/blob/master/.eslintrc).

2. `propTypes`, `defaultProps`, and declaration of props on components should be in alphabetical order.

3. Components' lifecyle methods should be near the top (`componentDidMount`,`componentWillUnmount`, etc.), and the `render()` function should be the last function in the component so that developers know where to look for them and don't create duplicate methods.

4. Below is a react component template. Note that `displayName`, `propTypes`, and `defaultProps` are required.

```
const displayName = "MyComponent";
const propTypes = {
  ...
};
const defaultProps = {
  ...
};

class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  ...

  render() {
    return (
      <div>My Component here</div>
    )
  }
}

MyComponent.displayName = displayName;
MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;

export default MyComponent;

```
## Finalize new component/features

1. Write tests for your new component/feature.
2. Run `npm test`.
3. Run `npm docs` to build the documentation from comments in the code.
3. After your PR is merged, make sure it appears here: [https://design-system-react-stage.herokuapp.com/#/](https://design-system-react-stage.herokuapp.com/#/). If it doesn't, reach out to [Ivan Bogdanov](https://github.com/madpotato) or [Donielle Berg](https://github.com/donnieberg).
4. Get your component/feature approved by the UX Accessibility Team (refer to the link above).
5. Once all tests pass and the Accessibility Team approves, run `npm compile`. Because this project is not open-sourced, we cannot publish it to npm. Therefore we have a build script that compiles `src/` to es5 and outputs it to `lib/` where outside projects pull from.
6. If you're creating a new component, please add it to the [README.md](https://github.com/salesforce-ux/design-system-react/blob/master/README.md)


