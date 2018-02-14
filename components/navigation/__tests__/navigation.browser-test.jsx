/* Adds all of the Mocha (eg `it` and `should`) and sinon testing global
 * variables to the global namespace for eslint purposes.
 */
/* eslint-env mocha */
/* global sinon */

// Import your external dependencies
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import entries from 'object.entries';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */
import {
	mountComponent,
	unmountComponent,
} from '../../../tests/enzyme-helpers';

import { sampleReportCategories } from '../../../utilities/sample-data/navigation';
import Navigation from '../../navigation';

// shim for PhantomJS
if (!Object.entries) {
	entries.shim();
}

/* Set Chai to use chaiEnzyme for enzyme compatible assertions:
 * https://github.com/producthunt/chai-enzyme
 */
chai.use(chaiEnzyme());

const defaultProps = {
	id: 'sample-navigation',
	className: 'sample-navigation',
	categories: sampleReportCategories,
};

/* A re-usable demo component fixture outside of `describe` sections
 * can accept props within each test and be unmounted after each tests.
 */
const DemoComponent = createReactClass({
	displayName: 'NavigationDemoComponent',
	propTypes: {
		selectedId: PropTypes.string,
		onSelect: PropTypes.func,
	},

	getDefaultProps () {
		return defaultProps;
	},

	getInitialState () {
		return {};
	},

	// event handlers

	render () {
		return <Navigation {...this.props} />;
	},
});

describe('SLDSNavigation', () => {
	describe('Assistive technology', () => {
		/* Detect if presence of accessibility features such as ARIA
		 * roles and screen reader text is present in the DOM.
		 */
		beforeEach(mountComponent(<DemoComponent />));

		afterEach(unmountComponent);

		it('has items described by category headers', function () {
			const structure = { reports: 5, folders: 3 };
			Object.entries(structure).forEach(([categoryId, itemCount]) => {
				const header = this.wrapper.find(`#sample-navigation-${categoryId}`);
				expect(header).to.have.length(1);
				const ariaDescribedbyId = this.wrapper.find(
					`a[aria-describedby="sample-navigation-${categoryId}"]`
				);
				expect(ariaDescribedbyId).to.have.length(itemCount);
			});
		});
	});

	// PROPS

	describe('selectedId prop', () => {
		const selectedId = 'my_folders';

		beforeEach(mountComponent(<DemoComponent selectedId={selectedId} />));

		afterEach(unmountComponent);

		it('is used to select an item', function () {
			const item = this.wrapper
				.find('.sample-navigation')
				.find('li.slds-is-active')
				.find('a[data-id="my_folders"]');
			expect(item).to.have.length(1);
		});
	});

	// EVENTS

	describe('Item', () => {
		const clickHandler = sinon.spy();

		beforeEach(mountComponent(<DemoComponent onSelect={clickHandler} />));

		afterEach(unmountComponent);

		it('calls onSelect', function () {
			const item = this.wrapper
				.find('.sample-navigation')
				.find('a[data-id="my_folders"]');
			item.simulate('click');
			expect(clickHandler.callCount).to.equal(1);
		});
	});
});
