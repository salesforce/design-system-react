/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Datepicker Template --- jQuery Facade

// Helps implement the [Datepickers design pattern](https://www.lightningdesignsystem.com/components/datepickers) in jQuery.

// Used by [Datepicker](./datepicker.html).

export default String.raw`
	<div class="slds-form--stacked slds-datepicker-form">

		<div class="slds-form-element">
			<div class="slds-form-element__control">
				<div class="slds-input-has-icon slds-input-has-icon--right">
					<x-input-icon></x-input-icon>
					<input class="slds-input" aria-haspopup="true" type="text"/>
				</div>
			</div>
		</div>

		<div class="slds-dropdown slds-dropdown--left slds-datepicker slds-hidden" data-selection="single">
			<div class="slds-datepicker__filter slds-grid">

				<div class="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
					<div class="slds-align-middle">
						<x-previous-month-button></x-previous-month-button>
					</div>
					<h2 class="slds-align-middle" aria-live="assertive" aria-atomic="true"></h2>
					<div class="slds-align-middle">
						<x-next-month-button></x-next-month-button>
					</div>
				</div>

				<div class="slds-picklist slds-picklist--fluid slds-shrink-none"></div>
			</div>

			<table class="datepicker__month" role="grid" aria-labelledby="month">
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

				</tbody>
			</table>
		</div>
	</div>
`;
