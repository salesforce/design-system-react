const iconExamples = (
  <div>
    <Icon name='custom1' category='custom' size='small' assistiveText='Favorite' />
    <Icon name='account' category='standard' size='medium' assistiveText='Accounts' />
    <Icon name='announcement' category='action' size='medium' assistiveText='Announcements' />
    <Icon name='approval' category='action' size='large' assistiveText='Approval' />
    <Icon name='open_folder' category='utility' size='large' assistiveText='' className='slds-icon-text-default' />
    <span className="slds-m-left--x-small">Documents Folder</span>
  </div>
);

React.render(iconExamples, mountNode);

