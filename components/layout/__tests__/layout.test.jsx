/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Layout from '../layout';
import LayoutItem from '../layout-item';
import {
	Layout as LayoutFromIndex,
	LayoutItem as LayoutItemFromIndex,
} from '../index';

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

	it('accepts an LBC comma-separated flexibility string', () => {
		const { container } = render(<LayoutItem flexibility="auto, no-shrink" />);
		expect(container.firstChild).toHaveClass('slds-col', 'slds-shrink-none');
	});

	it('trims whitespace around comma-separated flexibility tokens', () => {
		const { container } = render(
			<LayoutItem flexibility="  auto ,   no-shrink  " />
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

describe('LayoutItem dev warnings', () => {
	it('warns when a device size is set without size', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(<LayoutItem mediumDeviceSize={4} />);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toMatch(/requires `size`/);
		spy.mockRestore();
	});

	it('does not warn when size accompanies a device size', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(<LayoutItem size={6} mediumDeviceSize={4} />);
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});

	it('warns when flexibility combines auto and no-flex', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(<LayoutItem flexibility={['auto', 'no-flex']} />);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toMatch(/auto.*no-flex|contradictory/);
		spy.mockRestore();
	});

	it('warns on a conflicting comma-separated flexibility string', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(<LayoutItem flexibility="auto, no-flex" />);
		expect(spy).toHaveBeenCalled();
		expect(spy.mock.calls[0][0]).toMatch(/auto.*no-flex|contradictory/);
		spy.mockRestore();
	});
});

describe('Layout', () => {
	it('renders a slds-grid div with children', () => {
		const { container } = render(<Layout>kids</Layout>);
		expect(container.firstChild).toHaveClass('slds-grid');
		expect(container.firstChild).toHaveTextContent('kids');
	});

	it('maps horizontalAlign to slds-grid_align-*', () => {
		[
			['center', 'slds-grid_align-center'],
			['space', 'slds-grid_align-space'],
			['spread', 'slds-grid_align-spread'],
			['end', 'slds-grid_align-end'],
		].forEach(([value, cls]) => {
			const { container } = render(<Layout horizontalAlign={value} />);
			expect(container.firstChild).toHaveClass('slds-grid', cls);
		});
	});

	it('maps verticalAlign to the correct class', () => {
		[
			['start', 'slds-grid_vertical-align-start'],
			['center', 'slds-grid_vertical-align-center'],
			['end', 'slds-grid_vertical-align-end'],
			['stretch', 'slds-grid_vertical-stretch'],
		].forEach(([value, cls]) => {
			const { container } = render(<Layout verticalAlign={value} />);
			expect(container.firstChild).toHaveClass(cls);
		});
	});

	it('maps pullToBoundary to slds-grid_pull-padded[-size]', () => {
		[
			['small', 'slds-grid_pull-padded'],
			['medium', 'slds-grid_pull-padded-medium'],
			['large', 'slds-grid_pull-padded-large'],
		].forEach(([value, cls]) => {
			const { container } = render(<Layout pullToBoundary={value} />);
			expect(container.firstChild).toHaveClass(cls);
		});
	});

	it('adds slds-wrap only when multipleRows is set', () => {
		const wrapped = render(<Layout multipleRows />);
		expect(wrapped.container.firstChild).toHaveClass('slds-wrap');
		const plain = render(<Layout />);
		expect(plain.container.firstChild).not.toHaveClass('slds-wrap');
	});

	it('adds no alignment classes when unset', () => {
		const { container } = render(<Layout />);
		expect(container.firstChild.className).toBe('slds-grid');
	});

	it('merges className and passes through arbitrary attributes', () => {
		const { container } = render(
			<Layout className="extra" id="grid-1" data-test="y" role="list" />
		);
		const div = container.firstChild;
		expect(div).toHaveClass('slds-grid', 'extra');
		expect(div).toHaveAttribute('id', 'grid-1');
		expect(div).toHaveAttribute('data-test', 'y');
		expect(div).toHaveAttribute('role', 'list');
	});
});

describe('Layout package entry', () => {
	it('exposes Layout and LayoutItem from the index', () => {
		expect(LayoutFromIndex).toBeDefined();
		expect(LayoutItemFromIndex).toBeDefined();
	});

	it('attaches LayoutItem as Layout.Item', () => {
		expect(LayoutFromIndex.Item).toBe(LayoutItemFromIndex);
	});
});
