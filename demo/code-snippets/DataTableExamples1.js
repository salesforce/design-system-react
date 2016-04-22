const SLDSDataTableExample = React.createClass({
  displayName: 'SLDSDataTableExample',

  getInitialState () {
    return {
      items: [
        {
          id: '8IKZHZZV80',
          name: 'Cloudhub',
          count: 100976,
          lastModified: 'Yesterday'
        }, {
          id: '5GJOOOPWU7',
          name: 'Cloudhub + Anypoint Connectors',
          count: 54976,
          lastModified: 'Today'
        }, {
          id: 'Q8Z71ZUCEZ',
          name: 'Cloud City',
          count: 101280,
          lastModified: 'Today'
        }
      ],
      selection: []
    };
  },

  render () {
    return (
      <SLDSDataTable
        bordered
        items={this.state.items}
        id="SLDSDataTableExample-1"
        onChange={this.handleChanged}
        onSort={this.handleSort}
        selection={this.state.selection}
        selectRows
        striped
      >
        <SLDSDataTableColumn
          label="Opportunity Name"
          property="name"
          truncate
        />
        <SLDSDataTableColumn
          label="Count"
          property="count"
          sortable
          sortDirection={this.state.countSortDirection}
        />
        <SLDSDataTableColumn
          label="Last Modified"
          property="lastModified"
          sortable
          sortDirection={this.state.lastModifiedSortDirection}
          truncate
        />
      </SLDSDataTable>
    );
  },

  handleChanged (selection) {
    this.setState({ selection });
  },

  handleSort (sortColumn, sortDirection) {
    const sortProperty = sortColumn.property;
    const newState = {
      items: [...this.state.items]
    };

    newState.items = newState.items.sort((a, b) => {
      let val = 0;

      if (a[sortProperty] > b[sortProperty]) {
        val = 1;
      }
      if (a[sortProperty] < b[sortProperty]) {
        val = -1;
      }

      if (sortDirection === 'desc') val = val * -1;

      return val;
    });

    if (sortColumn.property === 'count') {
      newState.countSortDirection = sortDirection;
    } else if (sortColumn.property === 'lastModified') {
      newState.lastModifiedSortDirection = sortDirection;
    }

    this.setState(newState);
  }
});

ReactDOM.render(<SLDSDataTableExample />, mountNode);
