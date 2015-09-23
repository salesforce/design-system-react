/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import SLDSDateInput from '../../components/SLDSDateInput/index';
import {ButtonIcon, Icon} from "./../../components/SLDSIcons";
import {default as PrismCode} from "react-prism/lib/PrismCode";
import SLDSGrid from '../../components/SLDSGrid';

const SLDSColumn = SLDSGrid.Column;

export default class WorkspacePage extends Component {

  render() {
    return (
      <section className="stage slds-grid slds-grid--vertical slds-nowrap"> 
        <div className="region region--top slds-shrink-none">
          <div className="slds-page-header">
            <div className="slds-grid">
              <div className="slds-col slds-has-flexi-truncate">
                <div className="slds-media">
                  <div className="slds-media__figure">
                    <Icon name="opportunity" category="standard" size="large" position="left" />
                  </div>
                  <div className="slds-media__body">
                    <p className="slds-text-heading--label">Opportunity</p>
                    <div className="slds-grid">
                      <h1 className="slds-text-heading--medium slds-m-right--small slds-truncate slds-align-middle" title="Record Title">Acme</h1>
                      <div className="slds-col slds-shrink-none">
                        <button className="slds-button slds-button--neutral slds-not-selected" aria-live="assertive">
                          <span className="slds-text-not-selected">
                            <ButtonIcon name="add" stateful={true} position="left" />Follow
                          </span>
                          <span className="slds-text-selected">Following</span>
                          <span className="slds-text-selected-focus">
                            <ButtonIcon name="close" stateful={true} position="left" />Unfollow
                          </span>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="slds-col slds-no-flex slds-align-bottom">
                    <div className="slds-button-group" role="group">
                      <button className="slds-button slds-button--neutral">Edit</button>
                      <button className="slds-button slds-button--neutral">Delete</button>
                      <button className="slds-button slds-button--neutral">Clone</button>
                      <div className="slds-button--last">
                      <button className="slds-button slds-button--icon-border-filled">
                        <ButtonIcon name="down" />
                        <span className="slds-assistive-text">More</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slds-grid slds-page-header__detail-row">
                <div className="slds-col--padded slds-size--1-of-4">
                  <dl>
                    <dt>
                      <p className="slds-truncate" title="Field 1">Phone</p>
                    </dt>
                    <dd>
                      <p className="slds-text-body--regular slds-truncate" title="(212) 555-5555">(212) 555-5555</p>
                    </dd>
                  </dl>
                </div>
                <div className="slds-col--padded slds-size--1-of-4">
                  <dl>
                    <dt>
                      <p className="slds-text-heading--label slds-truncate" title="Field2 (3)">Billing Address</p>
                    </dt>
                    <dd>
                      <p className="slds-text-body--regular"> 10 Main Rd.<br /> New York, New York 31349 United States </p>
                    </dd>
                  </dl>
                </div>
              <div className="slds-col--padded slds-size--1-of-4">
                <dl>
                  <dt>
                    <p className="slds-text-heading--label slds-truncate" title="Field 3">Website</p>
                  </dt>
                  <dd>
                    <a href="//www.acme.com">acme.com</a>
                  </dd>
                </dl>
              </div>
              <div className="slds-col--padded slds-size--1-of-4">
                <dl>
                  <dt>
                    <p className="slds-text-heading--label slds-truncate" title="Field 4">Account Owner</p>
                  </dt>
                  <dd>
                    <p>
                      <span className="slds-avatar slds-avatar--circle slds-avatar--x-small">
                        <img src="demo/demo_assets/avatar2.jpg" alt="Gordon Figgis" /> 
                      </span>
                      <a href>Gordon Figgis</a>
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <main className="stage-main slds-grid slds-wrap slds-grow slds-scrollable--y" role="main">
          <div className="region region--main slds-grow slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--8-of-12 slds-col-rule--right slds-p-around--large">
            <div className="slds-tabs--default">
              <ul className="slds-tabs--default__nav" role="tablist">
                <li className="slds-tabs__item slds-text-heading--label slds-active" title="Item One" role="presentation">
                  <a href="#" role="tab" tabIndex={0} aria-selected>Activity</a>
                </li>
                <li className="slds-tabs__item slds-text-heading--label" title="Item Two" role="presentation">
                  <a href="#" role="tab" tabIndex={-1} aria-selected>Details</a>
                </li>
              </ul>
              <div className="slds-tabs__content slds-show" role="tabpanel">
                <div className="slds-tabs--scoped">
                  <ul className="slds-tabs--scoped__nav" role="tablist">
                    <li className="slds-tabs__item slds-text-heading--label slds-active" title="Item One" role="presentation">
                      <a href="#" role="tab" tabIndex={0} aria-selected>Log a Call</a>
                    </li>
                    <li className="slds-tabs__item slds-text-heading--label" title="Item Two" role="presentation">
                      <a href="#" role="tab" tabIndex={-1} aria-selected>New Task</a>
                    </li>
                    <li className="slds-tabs__item slds-text-heading--label" title="Item Two" role="presentation">
                      <a href="#" role="tab" tabIndex={-1} aria-selected>New Event</a>
                    </li>
                    <li className="slds-tabs__item slds-text-heading--label" title="Item Two" role="presentation">
                      <a href="#" role="tab" tabIndex={-1} aria-selected>Email</a>
                    </li>
                  </ul>
                  <div className="slds-tabs__content slds-show" role="tabpanel">
                    <div className="slds-form-element slds-is-required">
                      <label className="slds-form-element__label" htmlFor="task">Subject</label>
                      <div className="slds-form-element__control slds-grid">
                        <input id="task" className="slds-input" placeholder="Call" />
                        <button className="slds-button slds-button--brand slds-button--small slds-m-left--medium">Save</button>
                      </div>
                    </div>
                  </div>
                <div className="slds-tabs__content slds-hide" role="tabpanel">
                  <h2>Item Two Content</h2>
                </div>
              </div>
              <hr />
              <ul className="slds-timeline">
                <li className="slds-timeline__item">
                  <span className="slds-assistive-text">Task</span>
                  <div className="slds-media slds-media--reverse">
                    <div className="slds-media__figure">
                      <div className="slds-timeline__actions">
                        <p className="slds-timeline__date">Sept 29</p>
                      </div>
                    </div>
                    <div className="slds-media__body">
                      <div className="slds-media slds-media--timeline slds-timeline__media--task">
                        <div className="slds-media__figure">
                          <Icon name="task" category="standard" className="slds-timeline__icon" />
                        </div>
                        <div className="slds-media__body">
                          <div className="slds-media slds-tile slds-media--small">
                            <div className="slds-media__figure">
                              <label className="slds-checkbox" htmlFor="mark-complete0"> 
                                <input name="checkbox" type="checkbox" id="mark-complete0" />
                                <span className="slds-checkbox--faux" />
                                <span className="slds-form-element__label slds-assistive-text">mark-complete</span>
                              </label>
                            </div>
                            <div className="slds-media__body">
                              <p className="slds-tile__title slds-truncate">
                                <a href="#">Review proposals for EBC deck with larger team and have marketing review this</a>
                              </p>
                              <ul className="slds-tile__detail slds-list--horizontal slds-text-body--small">
                                <li className="slds-list__item slds-m-right--large">
                                  <dl className="slds-dl--inline">
                                    <dt className="slds-dl--inline__label">Contact:</dt>
                                    <dd className="slds-dl--inline__detail">
                                      <a href="#">Marc Benioff</a>
                                    </dd>
                                  </dl>
                                </li>
                              </ul>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="slds-timeline__item">
              <span className="slds-assistive-text">Task</span>
              <div className="slds-media slds-media--reverse">
                <div className="slds-media__figure">
                  <div className="slds-timeline__actions">
                    <p className="slds-timeline__date">Sept 24</p>
                  </div>
                </div>
                <div className="slds-media__body">
                  <div className="slds-media slds-media--timeline slds-timeline__media--event">
                    <div className="slds-media__figure">
                      <Icon name="event" category="standard" className="slds-timeline__icon" />
                    </div>
                    <div className="slds-media__body">
                      <p>
                        <a href="#">Company One — EBC Meeting</a>
                      </p>
                      <p className="slds-truncate">Let's get together to review the theater's layout and facilities.</p>
                      <ul className="slds-list--horizontal slds-text-body--small">
                        <li className="slds-list__item slds-m-right--large">
                          <dl className="slds-dl--inline">
                            <dt className="slds-dl--inline__label">Name:</dt>
                            <dd className="slds-dl--inline__detail">
                              <a href="#">Jason Dewar</a>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="slds-timeline__item">
              <span className="slds-assistive-text">Task</span>
              <div className="slds-media slds-media--reverse">
                <div className="slds-media__figure">
                  <div className="slds-timeline__actions">
                    <p className="slds-timeline__date">Sept 27</p>
                  </div>
                </div>
                <div className="slds-media__body">
                  <div className="slds-media slds-media--timeline slds-timeline__media--email">
                    <div className="slds-media__figure">
                      <Icon name="email" category="standard" className="slds-timeline__icon" />
                    </div>
                    <div className="slds-media__body">
                      <p>
                        <a href="#">Updated Proposals</a>
                      </p>
                      <p className="slds-truncate">Hi guys, Thanks for meeting with the team today and going through the proposals we saw.</p>
                      <ul className="slds-list--horizontal slds-text-body--small">
                        <li className="slds-list__item slds-m-right--large">
                          <dl className="slds-dl--inline">
                            <dt className="slds-dl--inline__label">Name:</dt>
                            <dd className="slds-dl--inline__detail">
                              <a href="#">Lei Chan</a>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="slds-timeline__item">
              <span className="slds-assistive-text">Task</span>
              <div className="slds-media slds-media--reverse">
                <div className="slds-media__figure">
                  <div className="slds-timeline__actions">
                    <p className="slds-timeline__date">Sept 20</p>
                  </div>
                </div>
                <div className="slds-media__body">
                  <div className="slds-media slds-media--timeline slds-timeline__media--task">
                    <div className="slds-media__figure">
                      <Icon name="task" category="standard" className="slds-timeline__icon" />
                    </div>
                    <div className="slds-media__body">
                      <div className="slds-media slds-tile slds-media--small">
                        <div className="slds-media__figure">
                          <label className="slds-checkbox" htmlFor="mark-complete3">
                            <input name="checkbox" type="checkbox" id="mark-complete3" />
                            <span className="slds-checkbox--faux" />
                            <span className="slds-form-element__label slds-assistive-text">mark-complete</span>
                          </label>
                        </div>
                        <div className="slds-media__body">
                          <p className="slds-tile__title slds-truncate">
                            <a href="#">Debrief Howard on the latest findings from the research on widgets selection</a>
                          </p>
                          <ul className="slds-tile__detail slds-list--horizontal slds-text-body--small">
                            <li className="slds-list__item slds-m-right--large">
                              <dl className="slds-dl--inline">
                                <dt className="slds-dl--inline__label">Contact:</dt>
                                <dd className="slds-dl--inline__detail">
                                  <a href="#">Howard Jones</a>
                                </dd>
                              </dl>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="slds-timeline__item">
              <span className="slds-assistive-text">Task</span>
              <div className="slds-media slds-media--reverse">
                <div className="slds-media__figure">
                  <div className="slds-timeline__actions">
                    <p className="slds-timeline__date">Sept 26</p>
                  </div>
                </div>
                <div className="slds-media__body">
                  <div className="slds-media slds-media--timeline slds-timeline__media--task">
                    <div className="slds-media__figure">
                      <Icon name="task" className="slds-timeline__icon" />
                    </div>
                    <div className="slds-media__body">
                      <div className="slds-media slds-tile slds-media--small">
                        <div className="slds-media__figure">
                          <label className="slds-checkbox" htmlFor="mark-complete4">
                            <input name="checkbox" type="checkbox" id="mark-complete4" />
                            <span className="slds-checkbox--faux" />
                            <span className="slds-form-element__label slds-assistive-text">mark-complete</span>
                          </label>
                        </div>
                        <div className="slds-media__body">
                          <p className="slds-tile__title slds-truncate">
                            <a href="#">Follow Up with Howard on timing</a>
                          </p>
                          <ul className="slds-tile__detail slds-list--horizontal slds-text-body--small">
                            <li className="slds-list__item slds-m-right--large">
                              <dl className="slds-dl--inline">
                                <dt className="slds-dl--inline__label">Contact:</dt>
                                <dd className="slds-dl--inline__detail">
                                  <a href="#">Howard Jones</a>
                                </dd>
                              </dl>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="slds-timeline__item">
              <span className="slds-assistive-text">Task</span>
              <div className="slds-media slds-media--reverse">
                <div className="slds-media__figure">
                  <div className="slds-timeline__actions">
                    <p className="slds-timeline__date">Sept 29</p>
                  </div>
                </div>
                <div className="slds-media__body">
                  <div className="slds-media slds-media--timeline slds-timeline__media--event">
                    <div className="slds-media__figure">
                      <Icon name="event" className="slds-timeline__icon" />
                    </div>
                    <div className="slds-media__body">
                      <p>
                        <a href="#">Discussion</a>
                      </p>
                      <p className="slds-truncate">Follow up to see if they are still interested</p>
                      <ul className="slds-list--horizontal slds-text-body--small">
                        <li className="slds-list__item slds-m-right--large">
                          <dl className="slds-dl--inline">
                            <dt className="slds-dl--inline__label">Name:</dt>
                            <dd className="slds-dl--inline__detail">
                              <a href="#">Jason Dewar</a>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="slds-timeline__item">
              <span className="slds-assistive-text">Task</span>
              <div className="slds-media slds-media--reverse">
                <div className="slds-media__figure">
                  <div className="slds-timeline__actions">
                    <p className="slds-timeline__date">Sept 27</p>
                  </div>
                </div>
                <div className="slds-media__body">
                  <div className="slds-media slds-media--timeline slds-timeline__media--email">
                    <div className="slds-media__figure">
                      <Icon name="email" className="slds-timeline__icon" />
                    </div>
                    <div className="slds-media__body">
                      <p>
                        <a href="#">Love the new UI</a>
                      </p>
                      <p className="slds-truncate">Love the new Lightning Experience Marc! Can`t wait to see what else is in the pipelines!</p>
                      <ul className="slds-list--horizontal slds-text-body--small">
                        <li className="slds-list__item slds-m-right--large">
                          <dl className="slds-dl--inline">
                            <dt className="slds-dl--inline__label">Name:</dt>
                            <dd className="slds-dl--inline__detail">
                              <a href="#">Marc Benioff</a>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="slds-tabs__content slds-hide" role="tabpanel">
          <h2>Item Two Content</h2>
        </div>
      </div>
    </div>
    <div className="region region--sidebar slds-shrink-none slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--4-of-12 slds-p-around--large" role="complementary">
      <div className="slds-card">
        <header className="slds-card__header slds-grid">
          <div className="slds-media slds-media--center slds-has-flexi-truncate">
            <div className="slds-media__figure"> 
              <Icon name="contact" className="slds-timeline__icon" size="small" />
            </div>
            <div className="slds-media__body">
              <h3 className="slds-text-heading--small slds-truncate">Contacts (3+)</h3>
            </div>
          </div>
          <div className="slds-no-flex">
            <button className="slds-button slds-button--icon-border-filled">
              <ButtonIcon name="down" />
              <span className="slds-assistive-text">More Options</span>
            </button>
          </div>
        </header>
        <section className="slds-card__body">
          <ul>
            <li>
              <div className="slds-tile slds-hint-parent">
                <div className="slds-grid slds-grid--align-spread slds-has-flexi-truncate">
                  <p className="slds-tile__title slds-truncate">
                    <a href="#">Adam Choi</a>
                  </p>
                  <button className="slds-button slds-button--icon-border-filled slds-button--icon-border-small slds-shrink-none">
                    <ButtonIcon name="down" size="small" hint={true}/>
                    <span className="slds-assistive-text">Show More</span>
                  </button>
                </div>
                <div className="slds-tile__detail">
                  <dl className="dl--horizontal slds-text-body--small">
                    <dt className="slds-dl--horizontal__label">
                      <p className="slds-truncate">Title:</p>
                    </dt>
                    <dd className="slds-dl--horizontal__detail slds-tile__meta">
                      <p className="slds-truncate">VP, Facilities</p>
                    </dd>
                    <dt className="slds-dl--horizontal__label">
                      <p className="slds-truncate">Email:</p>
                    </dt>
                    <dd className="slds-dl--horizontal__detail slds-tile__meta">
                      <p className="slds-truncate">achoi@burlingtion.com</p>
                    </dd>
                  </dl>
                </div>
              </div>
            </li>
            <li>
              <div className="slds-tile slds-hint-parent">
                <div className="slds-grid slds-grid--align-spread slds-has-flexi-truncate">
                  <p className="slds-tile__title slds-truncate">
                    <a href="#">Adam Choi</a>
                  </p>
                  <button className="slds-button slds-button--icon-border-filled slds-button--icon-border-small slds-shrink-none">
                    <ButtonIcon name="down" size="small" hint={true}/>
                    <span className="slds-assistive-text">Show More</span>
                  </button>
                </div>
                <div className="slds-tile__detail">
                <dl className="dl--horizontal slds-text-body--small">
                  <dt className="slds-dl--horizontal__label">
                    <p className="slds-truncate">Title:</p>
                  </dt>
                  <dd className="slds-dl--horizontal__detail slds-tile__meta">
                    <p className="slds-truncate">VP, Facilities</p>
                  </dd>
                  <dt className="slds-dl--horizontal__label">
                    <p className="slds-truncate">Email:</p>
                  </dt>
                  <dd className="slds-dl--horizontal__detail slds-tile__meta">
                    <p className="slds-truncate">achoi@burlingtion.com</p>
                  </dd>
                </dl>
              </div>
            </div>
          </li>
          <li>
            <div className="slds-tile slds-hint-parent">
              <div className="slds-grid slds-grid--align-spread slds-has-flexi-truncate">
                <p className="slds-tile__title slds-truncate">
                  <a href="#">Adam Choi</a>
                </p>
                <button className="slds-button slds-button--icon-border-filled slds-button--icon-border-small slds-shrink-none">
                  <ButtonIcon name="down" size="small" hint={true}/>
                  <span className="slds-assistive-text">Show More</span>
                </button>
              </div>
              <div className="slds-tile__detail">
                <dl className="dl--horizontal slds-text-body--small">
                  <dt className="slds-dl--horizontal__label">
                    <p className="slds-truncate">Title:</p>
                  </dt>
                  <dd className="slds-dl--horizontal__detail slds-tile__meta">
                    <p className="slds-truncate">VP, Facilities</p>
                  </dd>
                  <dt className="slds-dl--horizontal__label">
                    <p className="slds-truncate">Email:</p>
                  </dt>
                  <dd className="slds-dl--horizontal__detail slds-tile__meta">
                    <p className="slds-truncate">achoi@burlingtion.com</p>
                  </dd>
                </dl>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <footer className="slds-card__footer">
        <a href="#">View All</a>
      </footer>
    </div>
    <div className="slds-card">
      <header className="slds-card__header slds-grid">
        <div className="slds-media slds-media--center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <Icon name="file" size="small" />
          </div>
          <div className="slds-media__body">
            <h3 className="slds-text-heading--small slds-truncate">Files </h3>
          </div>
        </div>
        <div className="slds-no-flex">
          <button className="slds-button slds-button--icon-border-filled">
            <ButtonIcon name="down" />
            <span className="slds-assistive-text">More Options</span>
          </button>
        </div>
      </header>
      <section className="slds-card__body">
        <ul>
          <li>
            <div className="slds-tile slds-hint-parent">
              <div className="slds-media">
                <div className="slds-media__figure">
                  <Icon name="zip" category="doctype" />
                </div>
                <div className="slds-media__body">
                  <p className="slds-tile__title slds-truncate">
                    <a href="#">LSDS_038.zip</a>
                  </p>
                  <ul className="slds-tile__detail slds-list--horizontal slds-has-dividers slds-text-body--small">
                    <li className="slds-truncate slds-list__item">May 9th, 2015</li>
                    <li className="slds-truncate slds-list__item">3.6mb</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="slds-tile slds-hint-parent">
              <div className="slds-media">
                <div className="slds-media__figure">
                  <Icon name="zip" category="doctype" />
                </div>
                <div className="slds-media__body">
                  <p className="slds-tile__title slds-truncate">
                    <a href="#">LSDS_038.zip</a>
                  </p>
                  <ul className="slds-tile__detail slds-list--horizontal slds-has-dividers slds-text-body--small">
                    <li className="slds-truncate slds-list__item">May 9th, 2015</li>
                    <li className="slds-truncate slds-list__item">3.6mb</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <div className="slds-card">
      <header className="slds-card__header slds-grid">
        <div className="slds-media slds-media--center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <Icon name="note" size="small" />
          </div>
          <div className="slds-media__body">
            <h3 className="slds-text-heading--small slds-truncate">Notes </h3>
          </div>
        </div>
        <div className="slds-no-flex">
          <button className="slds-button slds-button--icon-border-filled">
            <ButtonIcon name="down" />
            <span className="slds-assistive-text">More Options</span>
          </button>
        </div>
      </header>
      <section className="slds-card__body">
        <ul>
          <li>
            <div className="slds-tile slds-hint-parent">
              <p className="slds-tile__title slds-truncate">
                <a href="#">Company One beats Company Two to the 200-mile affordable electric car</a>
              </p>
              <div className="slds-tile__detail slds-text-body--small"> 
                <p>by Steve Author</p>
                <ul className="slds-list--horizontal slds-has-dividers slds-tile__meta">
                  <li className="slds-list__item slds-list__item">Breaking News</li>
                  <li className="slds-list__item slds-list__item">1 day ago</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</main>
</section>
    );
  }
}
