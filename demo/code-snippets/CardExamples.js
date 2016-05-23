const sampleItems = [{
  name: 'Cloudhub'}, {
  name: 'Cloudhub + Anypoint Connectors'},{
  name: 'Cloud City'}];

const CardExample = React.createClass({
  displayName: 'CardExample',

  getInitialState () {
    return {
      items: sampleItems,
      isFiltering: false,
      totalItems: sampleItems.length
    };
  },

  render () {
    const isEmpty = (this.state.items.length === 0);

    return (
      <div className="slds-grid slds-grid--vertical">

        <SLDSCard
          id="ExampleCard"
          filter={
            (!isEmpty || this.state.isFiltering) && <SLDSCardFilter onChange={this.handleFilterChange} />
          }
          headerActions={
            !isEmpty && <SLDSButton label="Delete All Items" onClick={this.handleDeleteAllItems} />
          }
          heading={`Related Items${itemsShowing}`}
          icon={<SLDSIcon category="standard" name="default" size="small" />}
          empty={isEmpty ? <SLDSCardEmpty heading="No Related Items">
              <SLDSButton label="Add Item" onClick={this.handleAddItem} />
            </SLDSCardEmpty> : null}
        >
          <SLDSDataTable items={this.state.items} id="SLDSDataTableExample-1" bordered>
            <SLDSDataTableColumn
              label="Opportunity Name"
              property="name"
              truncate
            />
          </SLDSDataTable>
        </SLDSCard>

      </div>
    );
  },

  handleFilterChange (event) {
    const filteredItems = sampleItems.filter( (item) => RegExp(event.target.value, 'i').test(item.name));
    this.setState({isFiltering: true, items: filteredItems, totalItems: filteredItems.length});
  },

  handleDeleteAllItems () {
    this.setState({isFiltering: false, items: [], totalItems: 0});
  },

  handleAddItem () {
    this.setState({items: sampleItems, totalItems: sampleItems.length});
  }
});

ReactDOM.render(<CardExample />, mountNode);
