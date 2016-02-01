/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

export default String.raw`
<table class="">
  <thead>
    <tr class="slds-text-heading--label"></tr>
  </thead>
  <tbody>
  </tbody>
</table>
`;

// TH
  // Sortable
  // <th class="slds-is-sortable" scope="col">
  //   <span class="slds-truncate">Opportunity Name</span>
  //   <button class="slds-button slds-button--icon-bare slds-button--icon-border-small">
  //     <svg aria-hidden="true" class="slds-button__icon slds-button__icon--small">
  //       <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"></use>
  //     </svg>
  //     <span class="slds-assistive-text">Sort</span>
  //   </button>
  // </th>

  // Non-sortable
  // <th scope="col">
  //   <span class="slds-truncate">Account Name</span>
  // </th>

// TD
  // Row selector
  // <td class="slds-row-select">
  //   <label class="slds-checkbox" for="select-row1">
  //     <input name="select-row1" type="checkbox" id="select-row1" />
  //     <span class="slds-checkbox--faux"></span>
  //     <span class="slds-form-element__label slds-assistive-text">select row1</span>
  //   </label>
  // </td>

  // Normal
  // <td data-label="activity">
  //   <span class="slds-truncate">4/14/2015</span>
  // </td>
