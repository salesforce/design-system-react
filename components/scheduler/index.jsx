/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Scheduler

// Implements tje [Scheduler design pattern](https://www.lightningdesignsystem.com/components/schedulers) in React.
// Based on SLDS v2.3.0-rc.1

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### classNames
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// ## Constants
import { SCHEDULER } from '../../utilities/constants';

// Temporary hack until included in SLDS
import '../../styles/scheduler/scheduler.scss';
import '../../styles/scheduler/day-occurrence-picker.scss';
import '../../styles/scheduler/end-configuration.scss';
import '../../styles/scheduler/frequency.scss';
import '../../styles/scheduler/main.scss';
import '../../styles/scheduler/monthly-style-one.scss';
import '../../styles/scheduler/monthly-style-two.scss';
import '../../styles/scheduler/specific-date-picker.scss';
import '../../styles/scheduler/variants.scss';
import '../../styles/scheduler/weekly.scss';
import '../../styles/scheduler/yearly.scss';

/**
 * A scheduler is a grouping of a datepicker, a timepicker, a timezone picklist, and a reoccurrence interface that allows the user to create a reoccurring event.
 */
class Scheduler extends React.Component {
	static displayName = SCHEDULER;

	static propTypes = {
		/**
		 * **Assistive text for accessibility**
		 * * ``:
		 */
		assistiveText: PropTypes.shape({
		}),
		/**
			* Custom CSS classes for `slds-filters__item` node. Uses `classNames` [API](https://github.com/JedWatson/classnames).
			*/
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string]),
		/**
		 * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. An `id` will be generated if none is supplied.
		 */
		id: PropTypes.string
	};

	static defaultProps = {
		assistiveText: {}
	};

	componentWillMount () {
		this.generatedId = shortid.generate();
	}

	getId = () => (this.props.id || this.generatedId);

	render () {
		return (
			<div
				className={classNames(
					'slds-scheduler',
					this.props.className
				)}
				id={this.getId()}
			>
				<div className="scheduler-prototype__variant --variation-a">
					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--medium slds-p-horizontal--small slds-size--1-of-1 slds-text-heading--small">
							Set SMS Send Date
						</div>
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-1">
							<div className="slds-grid slds-wrap slds-grid--pull-padded">
								<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--2-of-3">
									<div className="slds-dropdown-trigger slds-dropdown-trigger--click ignore-react-onclickoutside slds-datepicker__trigger">
										<div className="slds-form-element">
											<label className="slds-form-element__label" htmlFor="Syg8kvMVCx">{/* react-text: 30 */}Start Date{/* /react-text */}</label>
											<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
												<input className="slds-input" id="Syg8kvMVCx" placeholder="Pick a Date" type="text" defaultValue="Tuesday, April 18, 2017" /><button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--icon slds-input__icon slds-input__icon--right"><svg className="slds-button__icon" viewBox="0 0 24 24">
														<path d="M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" /></svg><span className="slds-assistive-text">Open Calendar</span></button>
											</div>
										</div>
									</div>
								</div>
								<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
									<div className="slds-form-element">
										<label className="slds-form-element__label" htmlFor="r1zU1vGE0e" style={{width: '100%'}}>{/* react-text: 40 */}Start Time{/* /react-text */}</label>
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" id="r1zU1vGE0e" tabIndex={0}><span className="slds-truncate">1:30 PM</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 47 */}{/* /react-text */}</span></button>
										</div>
									</div>
								</div>
								<div className="slds-p-horizontal--small slds-size--1-of-1">
									<div className="slds-form-element">
										<label className="slds-form-element__label" htmlFor="BJmUkPMNAx" style={{width: '100%'}}>{/* react-text: 51 */}Time Zone{/* /react-text */}</label>
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" id="BJmUkPMNAx" tabIndex={0}><span className="slds-truncate">(GMT-08:00) Pacific Time (US &amp; Canada) *</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 58 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-p-top--xx-small slds-text-color--weak slds-text-title">
										* Denotes this time zone honors daylight savings time.
									</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}>
						<hr />
					</div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">None (run once)</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>

					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Per Second</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
												<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Per Minute</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
												<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Hourly</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
												<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="scheduler-prototype__frequency slds-p-bottom--large slds-p-horizontal--small slds-size--2-of-3">
							<div className="slds-grid">
								<label className="scheduler-prototype__frequency-input-label slds-form-element__label">Frequency</label>
								<div className="scheduler-prototype__every slds-size--1-of-8">
									Every
								</div>
								<div className="slds-size--2-of-8">
									<div className="slds-form-element">
										<div className="slds-form-element__control">
											<input className="slds-input" id="B1K0OzEAg" type="number" defaultValue={1} />
										</div>
									</div>
								</div>
								<div className="scheduler-prototype__frequency-unit slds-size--5-of-8">
									Hour(s)
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Daily</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="scheduler-prototype__frequency slds-p-bottom--large slds-p-horizontal--small slds-size--2-of-3">
							<div className="slds-grid">
								<label className="scheduler-prototype__frequency-input-label slds-form-element__label">Frequency</label>
								<div className="scheduler-prototype__every slds-size--1-of-8">
									Every
								</div>
								<div className="slds-size--2-of-8">
									<div className="slds-form-element">
										<div className="slds-form-element__control">
											<input className="slds-input" id="B1K0OzEAg" type="number" defaultValue={1} />
										</div>
									</div>
								</div>
								<div className="scheduler-prototype__frequency-unit slds-size--5-of-8">
									Days(s)
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Weekdays</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Weekly</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="scheduler-prototype__frequency slds-p-bottom--large slds-p-horizontal--small slds-size--2-of-3">
							<div className="slds-grid">
								<label className="scheduler-prototype__frequency-input-label slds-form-element__label">Frequency</label>
								<div className="scheduler-prototype__every slds-size--1-of-8">
									Every
								</div>
								<div className="slds-size--2-of-8">
									<div className="slds-form-element">
										<div className="slds-form-element__control">
											<input className="slds-input" id="B1K0OzEAg" type="number" defaultValue={1} />
										</div>
									</div>
								</div>
								<div className="scheduler-prototype__frequency-unit slds-size--5-of-8">
									Week(s)
								</div>
							</div>
						</div>
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-1">
							<div className="slds-button-group scheduler-prototype__weekly" role="group">
								<button className="slds-button slds-button--neutral"><span>Sun</span></button><button className="slds-button slds-button--neutral"><span>Mon</span></button><button className="slds-button slds-button--neutral"><span>Tue</span></button><button className="slds-button slds-button--neutral"><span>Wed</span></button><button className="slds-button slds-button--neutral"><span>Thu</span></button><button className="slds-button slds-button--neutral"><span>Fri</span></button><button className="slds-button slds-button--neutral"><span>Sat</span></button>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Monthly</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-1">
							<div className="scheduler-prototype__monthly --style-one">
								<div className="slds-grid">
									<div className="scheduler-prototype__monthly-on-day slds-p-bottom--small slds-size--5-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio select"><input id="monthly-radio-0" name="monthly-1492556749325" type="radio" defaultValue="onDate" value="on" checked /><label className="slds-radio__label" htmlFor="monthly-radio-0"><span className="slds-radio--faux" /><span className="slds-form-element__label">Repeat on a specific date:</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="scheduler-prototype__monthly-specific-date-picker slds-p-bottom--small slds-size--3-of-10">
										<div className="slds-form-element specific-date-picker">
											<div className="slds-form-element__control">
												<div className="slds-input-has-icon slds-input-has-icon--right">
													<button className="slds-button slds-button--icon slds-input__icon"><svg className="slds-button__icon" viewBox="0 0 24 24">
															<path d="M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" /></svg><span /></button><input className="slds-input slds-button--neutral slds-text-align--left" placeholder="Select one or more dates" readOnly style={{cursor: 'pointer'}} type="text" defaultValue={1} />
												</div>
											</div>
											<div className="specific-date-picker__dropdown">
												<table>
													<tbody>
														<tr className="specific-date-picker__instructions">
															<td colSpan={7}>Select one or more dates:</td>
														</tr>
														<tr className="specific-date-picker__date-row">
															<td colSpan={1}>
																<div className="specific-date-picker__circle --selected">
																	1
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	2
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	3
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	4
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	5
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	6
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	7
																</div>
															</td>
														</tr>
														<tr className="specific-date-picker__date-row">
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	8
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	9
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	10
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	11
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	12
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	13
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	14
																</div>
															</td>
														</tr>
														<tr className="specific-date-picker__date-row">
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	15
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	16
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	17
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	18
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	19
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	20
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	21
																</div>
															</td>
														</tr>
														<tr className="specific-date-picker__date-row">
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	22
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	23
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	24
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	25
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	26
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	27
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	28
																</div>
															</td>
														</tr>
														<tr className="specific-date-picker__date-row">
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	29
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	30
																</div>
															</td>
															<td colSpan={1}>
																<div className="specific-date-picker__circle">
																	31
																</div>
															</td>
															<td colSpan={2}>
																<div className="specific-date-picker__circle --last-day">
																	Last Day
																</div>
															</td>
														</tr>
													</tbody>
												</table>
												<div className="specific-date-picker__done-button">
													<button className="slds-button slds-button--neutral"><span>Done</span></button>
												</div>
											</div>
										</div>
									</div>
									<div className="slds-size--2-of-10" />
								</div>
								<div className="slds-grid">
									<div className="scheduler-prototype__monthly-on-the slds-size--5-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="monthly-radio-1" name="monthly-1492556749325" type="radio" defaultValue="onDay" /><label className="slds-radio__label" htmlFor="monthly-radio-1"><span className="slds-radio--faux" /><span className="slds-form-element__label">Repeat on a specific day:</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="slds-size--5-of-10">
										<div className="slds-form-element day-occurrence-picker">
											<div className="slds-form-element__control">
												<div className="slds-input-has-icon slds-input-has-icon--right">
													<button className="slds-button slds-button--icon slds-input__icon"><svg className="slds-button__icon" viewBox="0 0 24 24">
															<path d="M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" /></svg><span /></button><input className="slds-input slds-button--neutral slds-text-align--left" disabled readOnly style={{cursor: 'pointer'}} type="text" defaultValue="Second Wednesday" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ paddingTop: '250px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Monthly</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-1">
							<div className="scheduler-prototype__monthly --style-one">
								<div className="slds-grid">
									<div className="scheduler-prototype__monthly-on-day slds-p-bottom--small slds-size--5-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="monthly-radio-2" name="monthly-1492556749325" type="radio" defaultValue="onDate" /><label className="slds-radio__label" htmlFor="monthly-radio-2"><span className="slds-radio--faux" /><span className="slds-form-element__label">Repeat on a specific date:</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="scheduler-prototype__monthly-specific-date-picker slds-p-bottom--small slds-size--3-of-10">
										<div className="slds-form-element specific-date-picker">
											<div className="slds-form-element__control">
												<div className="slds-input-has-icon slds-input-has-icon--right">
													<button className="slds-button slds-button--icon slds-input__icon"><svg className="slds-button__icon" viewBox="0 0 24 24">
															<path d="M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" /></svg><span /></button><input className="slds-input slds-button--neutral slds-text-align--left" disabled placeholder="Select one or more dates" readOnly style={{cursor: 'pointer'}} type="text" defaultValue={1} />
												</div>
											</div>
										</div>
									</div>
									<div className="slds-size--2-of-10" />
								</div>
								<div className="slds-grid">
									<div className="scheduler-prototype__monthly-on-the slds-size--5-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="monthly-radio-3" name="monthly-1492556749325" type="radio" defaultValue="onDay" value="on" checked /><label className="slds-radio__label" htmlFor="monthly-radio-3"><span className="slds-radio--faux" /><span className="slds-form-element__label">Repeat on a specific day:</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="slds-size--5-of-10">
										<div className="slds-form-element day-occurrence-picker">
											<div className="slds-form-element__control">
												<div className="slds-input-has-icon slds-input-has-icon--right">
													<button className="slds-button slds-button--icon slds-input__icon"><svg className="slds-button__icon" viewBox="0 0 24 24">
															<path d="M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" /></svg><span /></button><input className="slds-input slds-button--neutral slds-text-align--left" readOnly style={{cursor: 'pointer'}} type="text" defaultValue="Third Friday" />
												</div>
											</div>
											<div className="day-occurrence-picker__dropdown">
												<table>
													<tbody>
														<tr className="day-occurrence-picker__days-row">
															<td />
															<td className>Sun</td>
															<td className>Mon</td>
															<td className>Tue</td>
															<td className>Wed</td>
															<td className>Thu</td>
															<td className="--hovered">Fri</td>
															<td className>Sat</td>
														</tr>
														<tr className="day-occurrence-picker__occurrence-row">
															<td className>1st</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	1st
																</div>
															</td>
														</tr>
														<tr className="day-occurrence-picker__occurrence-row">
															<td className>2nd</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	2nd
																</div>
															</td>
														</tr>
														<tr className="day-occurrence-picker__occurrence-row">
															<td className=" --hovered">3rd</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	3rd
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	3rd
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	3rd
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	3rd
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle">
																	3rd
																</div>
															</td>
															<td className=" --hovered">
																<div className="day-occurrence-picker__circle --hovered --selected">
																	3rd
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	3rd
																</div>
															</td>
														</tr>
														<tr className="day-occurrence-picker__occurrence-row">
															<td className>4th</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
															<td className>
																<div className="day-occurrence-picker__circle">
																	4th
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ paddingTop: '250px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Yearly</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-1">
							<div className="scheduler-prototype__yearly">
								<div className="slds-grid">
									<div className="scheduler-prototype__yearly-on slds-p-bottom--small slds-size--2-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="yearly-radio-0" name="yearly-1492557232416" type="radio" defaultValue="onDate" value="on" checked /><label className="slds-radio__label" htmlFor="yearly-radio-0"><span className="slds-radio--faux" /><span className="slds-form-element__label">on</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="slds-p-bottom--small slds-size--4-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-month-picklist">
											<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="B1uhaMNRe" tabIndex={0}><span className="slds-truncate">January</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 399 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-p-left--medium slds-size--2-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-date-picklist">
											<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="rJguhafVCl" tabIndex={0}><span className="slds-truncate">1</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 407 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-size--2-of-10" />
								</div>
								<div className="slds-grid">
									<div className="scheduler-prototype__yearly-on-the slds-size--2-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="yearly-radio-1" name="yearly-1492557232416" type="radio" defaultValue="onThe" /><label className="slds-radio__label" htmlFor="yearly-radio-1"><span className="slds-radio--faux" /><span className="slds-form-element__label">on the</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="slds-size--2-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-the-position-picklist">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" disabled id="BkW_hpMVAe" tabIndex={0}><span className="slds-truncate">First</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 425 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-p-horizontal--medium slds-size--3-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-the-days-picklist">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" disabled id="HJfO2aMERe" tabIndex={0}><span className="slds-truncate">Monday</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 433 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="scheduler-prototype__yearly-of slds-size--1-of-10">
										of
									</div>
									<div className="slds-size--2-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-the-month-picklist">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" disabled id="H1XOh6zNCe" tabIndex={0}><span className="slds-truncate">January</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 442 */}{/* /react-text */}</span></button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-3">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="BJE8JwGVAg" style={{width: '100%'}}>{/* react-text: 63 */}Repeat{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="BJE8JwGVAg" tabIndex={0}><span className="slds-truncate">Yearly</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 70 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-1">
							<div className="scheduler-prototype__yearly">
								<div className="slds-grid">
									<div className="scheduler-prototype__yearly-on slds-p-bottom--small slds-size--2-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="yearly-radio-2" name="yearly-1492557232416" type="radio" defaultValue="onDate" /><label className="slds-radio__label" htmlFor="yearly-radio-2"><span className="slds-radio--faux" /><span className="slds-form-element__label">on</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="slds-p-bottom--small slds-size--4-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-month-picklist">
											<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" disabled id="B1uhaMNRe" tabIndex={0}><span className="slds-truncate">January</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 399 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-p-left--medium slds-size--2-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-date-picklist">
											<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" disabled id="rJguhafVCl" tabIndex={0}><span className="slds-truncate">1</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 407 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-size--2-of-10" />
								</div>
								<div className="slds-grid">
									<div className="scheduler-prototype__yearly-on-the slds-size--2-of-10">
										<fieldset className="slds-form-element">
											<div className="slds-form-element__control">
												<span className="slds-radio"><input id="yearly-radio-3" name="yearly-1492557232416" type="radio" defaultValue="onThe" checked/><label className="slds-radio__label" htmlFor="yearly-radio-3"><span className="slds-radio--faux" /><span className="slds-form-element__label">on the</span></label></span>
											</div>
										</fieldset>
									</div>
									<div className="slds-size--2-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-the-position-picklist">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" id="BkW_hpMVAe" tabIndex={0}><span className="slds-truncate">First</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 425 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="slds-p-horizontal--medium slds-size--3-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-the-days-picklist">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" id="HJfO2aMERe" tabIndex={0}><span className="slds-truncate">Monday</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 433 */}{/* /react-text */}</span></button>
										</div>
									</div>
									<div className="scheduler-prototype__yearly-of slds-size--1-of-10">
										of
									</div>
									<div className="slds-size--2-of-10">
										<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click scheduler-prototype__yearly-on-the-month-picklist">
											<button aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label" id="H1XOh6zNCe" tabIndex={0}><span className="slds-truncate">January</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
														<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 442 */}{/* /react-text */}</span></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-4">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="rJev9ofERe" style={{width: '100%'}}>{/* react-text: 102 */}End{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="rJev9ofERe" tabIndex={0}><span className="slds-truncate">After</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
												<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 109 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="scheduler-prototype__end-configuration slds-p-bottom--large slds-p-horizontal--small slds-size--2-of-4">
							<div className="slds-grid">
								<div className="slds-size--1-of-4">
									<div className="slds-form-element">
										<div className="slds-form-element__control">
											<input className="slds-input" id="rkNYAM4Cx" type="number" defaultValue={1} />
										</div>
									</div>
								</div>
								<div className="scheduler-prototype__occurrences slds-size--3-of-4">
									occurrence(s)
								</div>
							</div>
						</div>
					</div>

					<div style={{ height: '50px' }}><hr /></div>

					<div className="slds-grid slds-wrap slds-grid--pull-padded">
						<div className="slds-p-bottom--large slds-p-horizontal--small slds-size--1-of-4">
							<div className="slds-form-element">
								<label className="slds-form-element__label" htmlFor="rJev9ofERe" style={{width: '100%'}}>{/* react-text: 102 */}End{/* /react-text */}</label>
								<div className="slds-picklist slds-dropdown-trigger slds-dropdown-trigger--click">
									<button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--neutral slds-picklist__label drop-target drop-out-of-bounds drop-element-attached-top drop-element-attached-left drop-target-attached-bottom drop-target-attached-left drop-out-of-bounds-bottom" id="rJev9ofERe" tabIndex={0}><span className="slds-truncate">On Date</span><span className><svg className="slds-icon slds-icon-text-default" viewBox="0 0 24 24">
											<path d="M3.8 6.5h16.4c.4 0 .8.6.4 1l-8 9.8c-.3.3-.9.3-1.2 0l-8-9.8c-.4-.4-.1-1 .4-1z" /></svg>{/* react-text: 109 */}{/* /react-text */}</span></button>
								</div>
							</div>
						</div>
						<div className="scheduler-prototype__end-configuration slds-p-bottom--large slds-p-horizontal--small slds-size--2-of-4">
							<div className="slds-dropdown-trigger slds-dropdown-trigger--click ignore-react-onclickoutside slds-datepicker__trigger">
								<div className="slds-form-element">
									<div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
										<input className="slds-input" id="S1lHym40e" placeholder="Pick a Date" type="text" defaultValue="Sunday, April 23, 2017" /><button aria-expanded="false" aria-haspopup="true" className="slds-button slds-button--icon slds-input__icon slds-input__icon--right"><svg className="slds-button__icon" viewBox="0 0 24 24">
												<path d="M21.5 9.2h-19c-.3 0-.7.4-.7.7v11.3c0 1 .9 1.9 1.9 1.9h16.6c1 0 1.9-.9 1.9-1.9V9.9c0-.3-.4-.7-.7-.7zM8.8 19.4c0 .3-.2.4-.5.4H6.5c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4H6.5c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm4.6 4.6c0 .3-.2.4-.5.4h-1.8c-.3 0-.5-.1-.5-.4v-1.9c0-.2.2-.4.5-.4h1.8c.3 0 .5.2.5.4v1.9zm0-4.6c0 .2-.2.4-.5.4h-1.8c-.3 0-.5-.2-.5-.4v-1.9c0-.3.2-.4.5-.4h1.8c.3 0 .5.1.5.4v1.9zm2.3-11.6H18v-.9c0-.7-.6-1.4-1.4-1.4-.7 0-1.4.6-1.4 1.4v.9H8.8v-.9c0-.7-.6-1.4-1.4-1.4C6.6.9 6 1.5 6 2.3v.9H3.7c-1 0-1.9.9-1.9 1.9v1.1c0 .4.4.7.7.7h19c.3 0 .7-.3.7-.7V5.1c0-1-.9-1.9-1.9-1.9z" /></svg><span className="slds-assistive-text">Open Calendar</span></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Scheduler;
