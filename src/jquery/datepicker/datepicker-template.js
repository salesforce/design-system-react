export default String.raw`
	<div class="slds-form--stacked slds-datepicker-form">

		<div class="slds-form-element">
			<div class="slds-form-element__control">
				<div class="slds-input-has-icon slds-input-has-icon--right">
					<x-svg></x-svg>
					<input class="slds-input" type="text" placeholder="Pick a Date" label="Date Picker Label"/>
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
