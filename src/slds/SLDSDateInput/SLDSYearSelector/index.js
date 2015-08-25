import React, { Component } from 'react';
import SLDSPopover from '../../SLDSPopover';
import Moment from 'moment';
import {InputIcon} from "./../../SLDSIcons";

var ListItemComponent = React.createClass( {

  getDefaultProps: function(){
    return {
      moment: Moment(),
      onSelect: function(moment){
        console.log('onSelect should be defined');
      }
    }
  },

  handleClick() {
    if(this.props.onSelect && this.props.value){
      this.props.onSelect(this.props.moment.set('year', this.props.value));
    }
  },

  render() {
    return (
      <li className={this.props.isSelected?'slds-is-selected':''} aria-selected={this.props.isSelected} onClick={this.handleClick}>
        { this.props.value }
      </li>
    )
  }
});

module.exports = React.createClass( {

  displayName: "SLDSYearSelector",

  getDefaultProps: function(){
    return {
      moment:Moment(),
      relativeFrom:-3,
      relativeTo:15,
      onChange:function(moment){
        console.log('onChange should be defined');
      }
    }
  },

  componentWillReceiveProps(nextProps){
    this.setState({isOpen:false});
  },

  handleSelectDate(day) {
    this.setState({selectedDate:day})
  },

  handleClose() {
    this.setState({isOpen:false})
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleFocus() {
    this.setState({isOpen:true})
  },

  handleSelect(moment) {
    if(this.props.onSelect){
      this.props.onSelect(moment);
    }
    this.setState({isOpen:false});
  },

  listItems() {
    var listItems = [];
    var currentYear = this.props.moment.year();
    var from = Moment().add(this.props.relativeFrom,'y').year();
    var to = Moment().add(this.props.relativeTo,'y').year();

    for(var i=from;i<to;i++){
      listItems.push(<ListItemComponent 
          key={'year_'+i}
          onSelect={this.handleSelect} 
          isSelected={currentYear===i}
          moment={this.props.moment}
          value={i} />);
    }
    return listItems;
  },

  popover() {
    if(this.state && this.state.isOpen){
      return (
        <SLDSPopover targetElement={this.refs.date}>
          <div className="ignore-react-onclickoutside">
          <ul className="slds-datepicker--time__list" tabIndex="0">
            { this.listItems() }
          </ul>
          </div>
        </SLDSPopover>
      );
    }
    return <span />;
  },

  render() {
    return (
      <div className="slds-form-element">
        <div className="slds-form-element__control">
          <div className="slds-input-has-icon slds-input-has-icon--right">
            <button id="year" 
              className="slds-button slds-button--neutral slds-picklist__label" 
              onClick={this.handleClick}
              onFocus={this.handleFocus}
              aria-haspopup="true" 
              aria-expanded="false">{this.props.moment.format('YYYY')}
              <span style={{color:'black'}}></span>
            </button>
            <InputIcon name="down"/>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});