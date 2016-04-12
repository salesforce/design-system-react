class BreadCrumbExample extends React.Component {

  render() {
    const trail = [
      (<a href="#">Parent Entity</a>),
      (<a href="#">Parent Record Name</a>),
    ];

    return (
      <SLDSBreadCrumb
        trail={trail} />
    );
  }

}

ReactDOM.render(<BreadCrumbExample />, mountNode);
