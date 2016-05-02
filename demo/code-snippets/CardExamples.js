const sampleItems = [{
  name: 'Cloudhub'}, {
  name: 'Cloudhub + Anypoint Connectors'},{
  name: 'Cloud City'}];

const CardExample = React.createClass({
  displayName: 'CardExample',

  getInitialState () {
    return {
      items: sampleItems
    };
  },

  render () {
    const isEmpty = (this.state.items.length === 0);

    return (
      <div className="slds-grid slds-grid--vertical">

        <SLDSCard
          id="ExampleCard"
          filter={
            !isEmpty && <SLDSCardFilter onChange={this.handleFilterChange} />
          }
          headerActions={
            !isEmpty && <SLDSButton label="Delete All Items" onClick={this.handleDeleteAllItems} />
          }
          heading="Releated Items"
          icon={<SLDSIcon category="standard" name="default" size="small" />}
          empty={isEmpty ? <SLDSCardEmpty heading="No Related Items">
              <SLDSButton className="slds-m-bottom--x-large" label="Add Item" onClick={this.handleAddItem} />
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

  handleFilterChange () {
    console.log('Update Collection');
  },

  handleDeleteAllItems () {
    this.setState({items: []});
  },

  handleAddItem () {
    this.setState({items: sampleItems});
  },
});

ReactDOM.render(<CardExample />, mountNode);