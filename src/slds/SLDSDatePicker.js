import React, { Component } from 'react';


export default class SLDSDatePicker extends Component {

/*
      <div className="sds-dropdown sds-dropdown--left sds-datepicker" aria-hidden="false" data-selection="single">
*/
  render() {
    return (

      <div className="sds-datepicker" aria-hidden="false" data-selection="single">
          <div className="sds-datepicker__filter sds-grid">
            <div className="sds-datepicker__filter--month sds-grid sds-grid--align-spread sds-size--3-of-4">
              <div className="sds-align-middle" role="button" aria-labelledby="bn_prev-label" tabIndex="0">
                <button className="sds-button sds-button--icon-container">

                  <span className="sds-assistive-text">Previous Month</span>
                </button>
              </div>
              <div id="month" className="sds-align-middle" role="heading" aria-live="assertive" aria-atomic="true">June 2015</div>
              <div className="sds-align-middle" role="button" aria-labelledby="bn_next-label" tabIndex="0">
                <button className="sds-button sds-button--icon-container">

                  <span className="sds-assistive-text">Next Month</span>
                </button>
              </div>
            </div>
            <div className="sds-picklist datepicker__filter--year sds-shrink-none">
              <button id="year" className="sds-button sds-button--neutral sds-picklist__label" aria-haspopup="true" aria-expanded="false">2015
{/*
                <svg aria-hidden="true" className="sds-icon sds-icon--small">
                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                </svg>
*/}
              </button>
            </div>
          </div>
          <table className="datepicker__month" role="grid" aria-labelledby="month" tabIndex="0">
            <thead>
              <tr id="weekdays">
                <th id="Sunday">
                  <abbr title="Sunday">S</abbr>
                </th>
                <th id="Monday">
                  <abbr title="Monday">M</abbr>
                </th>
                <th id="Tuesday">
                  <abbr title="Tuesday">T</abbr>
                </th>
                <th id="Wednesday">
                  <abbr title="Wednesday">W</abbr>
                </th>
                <th id="Thursday">
                  <abbr title="Thursday">T</abbr>
                </th>
                <th id="Friday">
                  <abbr title="Friday">F</abbr>
                </th>
                <th id="Saturday">
                  <abbr title="Saturday">S</abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="sds-disabled-text" headers="Sunday" role="gridcell" aria-disabled="true">
                  <span className="sds-day">31</span>
                </td>
                <td headers="Monday" role="gridcell" aria-selected="false">
                  <span className="sds-day">1</span>
                </td>
                <td headers="Tuesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">2</span>
                </td>
                <td headers="Wednesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">3</span>
                </td>
                <td headers="Thursday" role="gridcell" aria-selected="false">
                  <span className="sds-day">4</span>
                </td>
                <td headers="Friday" role="gridcell" aria-selected="false">
                  <span className="sds-day">5</span>
                </td>
                <td headers="Saturday" role="gridcell" aria-selected="false">
                  <span className="sds-day">6</span>
                </td>
              </tr>
              <tr>
                <td headers="Sunday" role="gridcell" aria-selected="false">
                  <span className="sds-day">7</span>
                </td>
                <td headers="Monday" role="gridcell" aria-selected="false">
                  <span className="sds-day">8</span>
                </td>
                <td headers="Tuesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">9</span>
                </td>
                <td headers="Wednesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">10</span>
                </td>
                <td headers="Thursday" role="gridcell" aria-selected="false">
                  <span className="sds-day">11</span>
                </td>
                <td headers="Friday" role="gridcell" aria-selected="false">
                  <span className="sds-day">12</span>
                </td>
                <td headers="Saturday" role="gridcell" aria-selected="false">
                  <span className="sds-day">13</span>
                </td>
              </tr>
              <tr>
                <td headers="Sunday" role="gridcell" aria-selected="false">
                  <span className="sds-day">14</span>
                </td>
                <td headers="Monday" role="gridcell" aria-selected="false">
                  <span className="sds-day">15</span>
                </td>
                <td headers="Tuesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">16</span>
                </td>
                <td headers="Wednesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">17</span>
                </td>
                <td className="sds-is-today" headers="Thursday" role="gridcell" aria-selected="false">
                  <span className="sds-day">18</span>
                </td>
                <td headers="Friday" role="gridcell" aria-selected="false">
                  <span className="sds-day">19</span>
                </td>
                <td headers="Saturday" role="gridcell" aria-selected="false">
                  <span className="sds-day">20</span>
                </td>
              </tr>
              <tr>
                <td headers="Sunday" role="gridcell" aria-selected="false">
                  <span className="sds-day">21</span>
                </td>
                <td headers="Monday" role="gridcell" aria-selected="false">
                  <span className="sds-day">22</span>
                </td>
                <td className="sds-is-selected" headers="Tuesday" role="gridcell" aria-selected="true">
                  <span className="sds-day">23</span>
                </td>
                <td headers="Wednesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">24</span>
                </td>
                <td headers="Thursday" role="gridcell" aria-selected="false">
                  <span className="sds-day">25</span>
                </td>
                <td headers="Friday" role="gridcell" aria-selected="false">
                  <span className="sds-day">26</span>
                </td>
                <td headers="Saturday" role="gridcell" aria-selected="false">
                  <span className="sds-day">27</span>
                </td>
              </tr>
              <tr>
                <td headers="Sunday" role="gridcell" aria-selected="false">
                  <span className="sds-day">28</span>
                </td>
                <td headers="Monday" role="gridcell" aria-selected="false">
                  <span className="sds-day">29</span>
                </td>
                <td headers="Tuesday" role="gridcell" aria-selected="false">
                  <span className="sds-day">30</span>
                </td>
                <td className="sds-disabled-text" headers="Wednesday" role="gridcell" aria-disabled="true">
                  <span className="sds-day">1</span>
                </td>
                <td className="sds-disabled-text" headers="Thursday" role="gridcell" aria-disabled="true">
                  <span className="sds-day">2</span>
                </td>
                <td className="sds-disabled-text" headers="Friday" role="gridcell" aria-disabled="true">
                  <span className="sds-day">3</span>
                </td>
                <td className="sds-disabled-text" headers="Saturday" role="gridcell" aria-disabled="true">
                  <span className="sds-day">4</span>
                </td>
              </tr>
            </tbody>
          </table>
          <span id="bn_prev-label" className="sds-assistive-text">Go to previous month</span>
          <span id="bn_next-label" className="sds-assistive-text">Go to next month</span>
        </div>
    );
  }
}

