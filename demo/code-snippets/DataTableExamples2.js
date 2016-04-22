const SLDSDataTableExample = React.createClass({
  displayName: 'SLDSDataTableExample',

  getInitialState () {
    return {
      items: [
        {
          id: '8IKZHZZV80',
          name: 'An item with row actions',
          count: 100976,
          lastModified: 'Yesterday'
        }, {
          id: '5GJOOOPWU7',
          name: 'Another one with row actions',
          count: 54976,
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
        id="SLDSDataTableExample-2"
        onChange={this.handleChanged}
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
        />
        <SLDSDataTableColumn
          label="Last Modified"
          property="lastModified"
          truncate
        />
        <SLDSDataTableRowActions
					options={[
						{
							id: 0,
							text: 'Add to Group',
							value: '1'
						}, {
							id: 1,
							text: 'Publish',
							value: '2'
						}
					]}
					onAction={this.handleRowAction}
				/>
      </SLDSDataTable>
    );
  },

  handleChanged (selection) {
    this.setState({ selection });
  },

  handleRowAction (item, action) {
    console.log(item, action);
  }
});

ReactDOM.render(<SLDSDataTableExample />, mountNode);
