const iconExamples = (
  <div>
    <Icon
      assistiveText="Favorite"
      category="custom"
      name="custom1"
      size="small" />

    <Icon
      assistiveText="Accounts"
      category="standard"
      name="account"
      size="medium" />

    <Icon
      assistiveText="Announcements"
      category="action"
      name="announcement"
      size="medium" />

    <Icon
      assistiveText="Approval"
      category="action"
      name="approval"
      size="large" />

    <Icon
      assistiveText=""
      category="utility"
      className="slds-icon-text-default"
      name="open_folder"
      size="large" />
      <span className="slds-m-left--x-small">Documents Folder</span>

  </div>
);

React.render(iconExamples, mountNode);

