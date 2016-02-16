/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Picklist Template --- jQuery Facade

// Helps implements the [Picklist design pattern](http://www.lightningdesignsystem.com/components/menus#picklist) in jQuery.

// Used by [Picklist](./picklist.html).

export default String.raw`
<div class="slds-picklist" aria-expanded="true">
	<x-dropdown-button></x-dropdown-button>
	<div class="slds-dropdown slds-dropdown--left slds-dropdown--menu slds-hide">
		<ul class="slds-dropdown__list" role="menu">
			<li class="slds-dropdown__header">
				<span class="slds-text-heading--label"></span>
			</li>
			<li class="slds-dropdown__divider"></li>
			<li class="slds-dropdown__item">
				<a href="javascript:void(0)" role="menuitemradio">
					<p class="slds-truncate"></p>
				</a>
			</li>
		</ul>
	</div>
</div>
`;
