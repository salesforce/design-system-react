design-system-react
=====================

Future home of SLDS-React components

## Usage

```
npm install
npm start
open http://localhost:3000
```

## Components

### [Button](https://www.lightningdesignsystem.com/components/buttons#neutral)

```jsx

<SLDSButton
  label='Test Button'
  variant='neutral'
  iconName='download'
  iconSize='small'
  iconPosition='left'
  onClick={this.handleButtonClick} />

Required Prop:
* Only label is required

Optional Props:
* variant must be neutral, brand, or icon (inverse, stateful, icon more, and hint coming soon)
* iconSize must be small, medium, or large
* iconPosition must be left or right

```

### [PickList Base](http://www.lightningdesignsystem.com/components/picklists#base&role=regular&status=all)

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

### [DatePicker Base](http://www.lightningdesignsystem.com/components/datepickers#base)

[![browser support](/readme-assets/SLDSDatePickerBase.gif)](/readme-assets/SLDSDatePickerBase.gif)



## Tests

```
npm test
```


### Future Pipeline
* Lookups
* Modals

