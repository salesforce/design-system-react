/* eslint-disable indent */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MODAL } from '../../utilities/constants';
import Modal from '../../components/modal';
import SLDSLookup from '../../components/lookup';
import SLDSMenuPicklist from '../../components/menu-picklist';
import SLDSTimepicker from '../../components/time-picker';
import SLDSDatepicker from '../../components/date-picker';
import SLDSButton from '../../components/button';

const getModal = props => (
	<Modal {...props} />
);

const modalFooter = [
  <SLDSButton key="modalBCancel" label="Cancel" />,
  <SLDSButton key="modalBSave" label="Save" variant="brand" />
];

const modalContent = (
  <section className="slds-p-around--large">
    <div className="slds-form-element slds-m-bottom--large">
      <label className="slds-form-element__label" htmlFor="opptyName">Opportunity Name</label>
      <div className="slds-form-element__control">
        <input id="opptyName" className="slds-input" type="text" placeholder="Enter name" />
      </div>
    </div>
    <div className="slds-form-element slds-m-bottom--large">
      <label className="slds-form-element__label" htmlFor="description">Opportunity Description</label>
      <div className="slds-form-element__control">
        <textarea id="description" className="slds-textarea" placeholder="Enter description"></textarea>
      </div>
    </div>

    {/*
    */}
    <SLDSLookup
      modal={true}
      className="slds-m-bottom--large"
      emptyMessage="No Accounts Found"
      hasError={false}
      iconName="account"
      label="Account Name"
			onChange={action('change')}
			onSelect={action('selected')}
      options={[
        {label:"Paddy\"s Pub"},
        {label:"Tyrell Corp"},
        {label:"Paper St. Soap Company"},
        {label:"Nakatomi Investments"},
        {label:"Acme Landscaping"},
        {label:"Acme Construction"}
      ]}
    />

  <SLDSMenuPicklist
    className="slds-m-bottom--large"
    label="Lead Source"
    modal={true}
    onSelect={(option)=>{console.log("selected: ", option.label);}}
    options={[
      {label:"Third Party Program",value:"A0"},
      {label:"Cold Call",value:"B0"},
      {label:"LinkedIn",value:"C0"},
      {label:"Direct Mail",value:"D0"},
      {label:"Other",value:"E0"},
    ]}
    placeholder = "Select Lead Source"
    value="B0"
  />

  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>
  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>
  <div className="slds-m-bottom--large">
    <SLDSDatepicker
      onDateChange={() => { console.log('date is selected') }}
      modal
    />
  </div>

  <div className="slds-m-bottom--large">
    <SLDSTimepicker
      onDateChange={() => { console.log('time is selected') }}
      modal
    />
  </div>

  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>

  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>
  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>
  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>
  <div className="slds-form-element slds-m-vertical--large">
    <label className="slds-form-element__label" htmlFor="amount">Amount</label>
    <div className="slds-form-element__control">
      <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
    </div>
  </div>
</section>
);

storiesOf(MODAL, module)
  .addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
  .add('Small', () => getModal({
    isOpen: true,
    tagline:"Enter in details below",
    title:"New Opportunity",
    children: modalContent
  }))



