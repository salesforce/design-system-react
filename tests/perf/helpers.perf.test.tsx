/*
 * Self-tests for the perf helpers: each tracker must see the problem it is
 * meant to catch, or every check built on it passes vacuously.
 */
import React, { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import {
	countRenders,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
	settle,
	trackConsoleErrors,
	trackLayout,
	trackListeners,
	trackObservers,
	trackTimers,
} from './helpers';

const restores: (() => void)[] = [];
const track = <T extends { restore: () => void }>(tracker: T) => {
	restores.push(() => tracker.restore());
	return tracker;
};

afterEach(() => {
	restores.splice(0).forEach((restore) => restore());
	resetRenderCounts();
});

describe('renderCounted', () => {
	it('counts one commit for a plain mount', () => {
		const result = renderCounted(<div>static</div>);
		expect(result.commitCount).toBe(1);
	});

	it('counts the extra commit of a setState-on-mount effect', async () => {
		const Measuring = () => {
			const [width, setWidth] = useState(0);
			useEffect(() => setWidth(10), []);
			return <div>{width}</div>;
		};
		const result = renderCounted(<Measuring />);
		await settle();
		expect(result.commitCount).toBe(2);
	});
});

describe('countRenders', () => {
	it('counts function, memo and class renders, and memo bail-outs', () => {
		const Label = ({ label }: { label: string }) => <span>{label}</span>;
		const Leaf = countRenders(Label, 'Leaf');
		const MemoLeaf = countRenders(React.memo(Label), 'MemoLeaf');
		class ClassLeafBase extends React.Component<{ label: string }> {
			render() {
				return <span>{this.props.label}</span>;
			}
		}
		const ClassLeaf = countRenders(ClassLeafBase, 'ClassLeaf');
		// A new element each time; React skips re-rendering an identical one.
		const ui = () => (
			<>
				<Leaf label="a" />
				<MemoLeaf label="a" />
				<ClassLeaf label="a" />
			</>
		);
		const { rerender } = render(ui());
		rerender(ui());
		expect(getRenderCount('Leaf')).toBe(2);
		expect(getRenderCount('MemoLeaf')).toBe(1);
		expect(getRenderCount('ClassLeaf')).toBe(2);
	});
});

describe('trackListeners', () => {
	it('reports global, leaked and non-passive listeners', () => {
		const listeners = track(trackListeners());
		const onResize = () => {};
		const onWheel = () => {};
		window.addEventListener('resize', onResize);
		document.addEventListener('wheel', onWheel);
		document.addEventListener('touchstart', onWheel, { passive: true });
		expect(listeners.global()).toHaveLength(3);
		expect(listeners.nonPassive).toHaveLength(1);

		window.removeEventListener('resize', onResize);
		document.removeEventListener('wheel', onWheel);
		document.removeEventListener('touchstart', onWheel);
		expect(listeners.leaked()).toHaveLength(0);
	});

	it('ignores listeners on detached elements', () => {
		const listeners = track(trackListeners());
		const node = document.createElement('div');
		document.body.appendChild(node);
		node.addEventListener('click', () => {});
		expect(listeners.leaked()).toHaveLength(1);
		node.remove();
		expect(listeners.leaked()).toHaveLength(0);
	});
});

describe('trackTimers', () => {
	it('counts pending timeouts, intervals and frames until they run or clear', async () => {
		const timers = track(trackTimers());
		const timeout = window.setTimeout(() => {}, 10000);
		const interval = window.setInterval(() => {}, 10000);
		window.requestAnimationFrame(() => {});
		expect(timers.pending).toBe(3);
		window.clearTimeout(timeout);
		window.clearInterval(interval);
		await settle();
		expect(timers.pending).toBe(0);
	});
});

describe('trackObservers', () => {
	it('counts observers until they disconnect', () => {
		const observers = track(trackObservers());
		const resize = new ResizeObserver(() => {});
		const mutation = new MutationObserver(() => {});
		resize.observe(document.body);
		mutation.observe(document.body, { childList: true });
		expect(observers.live).toBe(2);
		resize.disconnect();
		mutation.disconnect();
		expect(observers.live).toBe(0);
	});
});

describe('trackLayout', () => {
	it('counts reads and the reads that force a reflow', () => {
		const node = document.createElement('div');
		document.body.appendChild(node);
		const layout = track(trackLayout());
		node.getBoundingClientRect();
		void node.offsetWidth;
		expect(layout.reads).toBe(2);
		expect(layout.forcedReflows).toBe(0);

		for (let i = 0; i < 3; i += 1) {
			node.style.width = `${i}px`;
			void node.offsetWidth;
		}
		expect(layout.forcedReflows).toBe(3);
		node.remove();
	});
});

describe('trackConsoleErrors', () => {
	it('counts errors but not DSR prop warnings', () => {
		const errors = track(trackConsoleErrors());
		console.error('Warning: [Design System React] deprecated prop');
		console.error('Warning: Cannot update a component while rendering');
		expect(errors.count).toBe(1);
	});
});
