# Salesforce Platform
Have tips to share with other Salesforce Platform users? Please share with the rest of the "Ohana" and add to the list below.

## SVG Icon location
Salesforce Lightning Design System's NPM module icon folder structure is present in Salesforce Platform orgs at the following path: `/_slds/icons`.

To make these icons work with this library, please use the `IconSettings` component:
```
<IconSettings iconPath="/_slds/icons">
  <App />
</IconSettings>
```
