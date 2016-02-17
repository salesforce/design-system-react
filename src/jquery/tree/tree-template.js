/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Template --- jQuery Facade

// Helps implements the [Tree design pattern](http://www.lightningdesignsystem.com/components/trees) in jQuery.

// Used by [Tree](./tree.html).

export default String.raw`
<div class="slds-tree_container" role="application">
	<h4 class="slds-text-heading--label">Tree Example</h4>
	<ul class="slds-tree" role="tree" aria-labelledby="treeheading-jquery" aria-activedescendant="">
		<li role="treeitem" aria-level="1" aria-expanded="true">
			<div class="slds-tree__item" >
				<x-branch-button></x-branch-button>
				<a id="tree0-node1__label" tabIndex="-1" role="presentation" class="slds-truncate | slds-size--1-of-1">Tree Branch</a>
			</div>
			<ul class="slds-is-expanded" role="group" aria-labelledby="tree0-node1__label">
				<li role="treeitem" aria-level="2">
					<div class="slds-tree__item">
						<div class="slds-spinner slds-spinner--small" role="alert">
							<img src="/assets/design-system/images/spinners/slds_spinner.gif" alt="Loading..." />
						</div>
					</div>
				</li>
			</ul>
		</li>
		<li role="treeitem" aria-level="1">
			<div class="slds-tree__item">
				<a tabIndex="-1" role="presentation" class="slds-truncate | slds-size--1-of-1">Tree Item</a>
			</div>
		</li>
	</ul>
</div>
`;
