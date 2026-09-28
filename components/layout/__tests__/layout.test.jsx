/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LayoutItem from '../layout-item';

describe('LayoutItem', () => {
	it('renders a bare div with no layout class when no props are set', () => {
		const { container } = render(<LayoutItem>content</LayoutItem>);
		const div = container.firstChild;
		expect(div.tagName).toBe('DIV');
		expect(div).not.toHaveAttribute('class');
		expect(div).toHaveTextContent('content');
	});

	it('maps size and device sizes to slds-size classes', () => {
		const { container } = render(
			<LayoutItem
				size={6}
				smallDeviceSize={4}
				mediumDeviceSize={3}
				largeDeviceSize={2}
			/>
		);
		expect(container.firstChild).toHaveClass(
			'slds-size_6-of-12',
			'slds-small-size_4-of-12',
			'slds-medium-size_3-of-12',
			'slds-large-size_2-of-12'
		);
	});

	it('omits the size class for a falsy size of 0', () => {
		const { container } = render(<LayoutItem size={0} />);
		expect(container.firstChild).not.toHaveAttribute('class');
	});

	it('maps each flexibility token to its class', () => {
		const cases = [
			['auto', 'slds-col'],
			['grow', 'slds-grow'],
			['shrink', 'slds-shrink'],
			['no-grow', 'slds-grow-none'],
			['no-shrink', 'slds-shrink-none'],
			['no-flex', 'slds-no-flex'],
		];
		cases.forEach(([token, cls]) => {
			const { container } = render(<LayoutItem flexibility={token} />);
			expect(container.firstChild).toHaveClass(cls);
		});
	});

	it('accepts a flexibility array and emits all classes', () => {
		const { container } = render(
			<LayoutItem flexibility={['auto', 'no-shrink']} />
		);
		expect(container.firstChild).toHaveClass('slds-col', 'slds-shrink-none');
	});

	it('emits both slds-col and the size class when auto + size combine', () => {
		const { container } = render(<LayoutItem flexibility="auto" size={4} />);
		expect(container.firstChild).toHaveClass('slds-col', 'slds-size_4-of-12');
	});

	it('maps around padding to one class and horizontal padding to two', () => {
		const around = render(<LayoutItem padding="around-medium" />);
		expect(around.container.firstChild).toHaveClass('slds-p-around_medium');

		const horizontal = render(<LayoutItem padding="horizontal-small" />);
		expect(horizontal.container.firstChild).toHaveClass(
			'slds-p-left_small',
			'slds-p-right_small'
		);
	});

	it('maps alignmentBump to slds-col_bump-*', () => {
		const { container } = render(<LayoutItem alignmentBump="left" />);
		expect(container.firstChild).toHaveClass('slds-col_bump-left');
	});

	it('merges className and passes through arbitrary attributes', () => {
		const { container } = render(
			<LayoutItem
				size={6}
				className="extra"
				id="item-1"
				data-test="x"
				role="listitem"
			/>
		);
		const div = container.firstChild;
		expect(div).toHaveClass('slds-size_6-of-12', 'extra');
		expect(div).toHaveAttribute('id', 'item-1');
		expect(div).toHaveAttribute('data-test', 'x');
		expect(div).toHaveAttribute('role', 'listitem');
	});
});
