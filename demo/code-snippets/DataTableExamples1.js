const SLDSDataTableExample = React.createClass({
  displayName: 'SLDSDataTableExample',

  getInitialState () {
    return {
      collection: [
        {
          id: '8IKZHZZV80',
          name: 'Item One',
          count: 100976,
          lastModified: 'Yesterday',
          modifiedBy: 'Ashley McDougal'
        }, {
          id: '5GJOOOPWU7',
          name: 'Item Two',
          count: 54976,
          lastModified: 'Today',
          modifiedBy: 'Ashley McDougal'
        }, {
          id: 'Q8Z71ZUCEZ',
          name: 'Item Three',
          count: 10128,
          lastModified: 'Today',
          modifiedBy: 'Ashley McDougal'
        }, {
          id: 'WA0Q0XARAR',
          name: 'Item Four',
          count: 63616,
          lastModified: 'Yesterday',
          modifiedBy: 'Ashley McDougal'
        }
      ],
      selection: []
    };
  },

  render () {
    return (
      <SLDSDataTable
        bordered
        collection={this.state.collection}
        columns={this.state.columns}
        id="SLDSDataTableExample-1"
        onChange={this.handleChanged}
        onSort={this.handleSort}
        selection={this.state.selection}
        selectRows
        striped
      >
        <SLDSDataTableColumn
          label="Campaign Name"
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

  handleRowAction (item, action) {
    console.log(item, action);
  },

  handleSort (sortColumn, sortDirection) {
    const sortProperty = sortColumn.property;
    const newState = {
      collection: [...this.state.collection]
    };

    newState.collection = newState.collection.sort((a, b) => {
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
