design-system-react
=====================

Future home of SLDS-React components

### Usage

```
npm install
npm start
open http://localhost:3000
```

## Components

### Accessible [PickList Base](http://www.lightningdesignsystem.com/components/picklists#base&role=regular&status=all) Component

```jsx

import {SLDSPicklistBase} from 'design-system-react';

...

<SLDSPicklistBase 
  options={[
      {label:'A Option',value:'A0'},
      {label:'B Option',value:'B0'},
      {label:'C Option',value:'C0'},
      {label:'D Option',value:'D0'},
    ]}
  value='A0' 
  label='Contacts'
  onSelect={(value)=>{
    console.log('selected: ',value);
  }}
  placeholder='Select a contact'/>

```

[![browser support](/readme-assets/SLDSPicklistBase.gif)](/readme-assets/SLDSPicklistBase.gif)


### Work in progress

### Accessible [DatePicker Base](http://www.lightningdesignsystem.com/components/datepickers#base) Component

[![browser support](/readme-assets/SLDSDatePickerBase.gif)](/readme-assets/SLDSDatePickerBase.gif)


### Future Pipeline
* Lookups
* Modals
* Buttons


