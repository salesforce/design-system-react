const iconExamples = (
  <div>
    <SLDSIcon
      assistiveText="Favorite"
      category="custom"
      name="custom1"
      size="small" />

    <SLDSIcon
      assistiveText="Accounts"
      category="standard"
      name="account" />

    <SLDSIcon
      assistiveText="Announcements"
      category="action"
      className="slds-m-around--x-small"
      name="announcement" />

    <SLDSIcon
      assistiveText="Approval"
      category="action"
      className="slds-m-around--x-small"
      name="approval"
      size="large" />

    <SLDSIcon
      assistiveText=""
      category="utility"
      className="slds-icon-text-default"
      name="open_folder"
      size="large" />
      <span className="slds-m-left--x-small">Documents Folder</span>

  </div>
);

React.render(iconExamples, mountNode);

