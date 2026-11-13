/*
 * Timing benchmarks (plan D4), report-only: mount and update 1, 100 and 1,000
 * instances of the primitives. Run with `npm run perf:bench`; CI compares the
 * JSON with master's and warns, never fails.
 */
import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { bench, describe } from 'vitest';

import Badge from '../../components/badge';
import Button from '../../components/button';
import Checkbox from '../../components/checkbox';
import Input from '../../components/input';

const noop = () => {};

const primitives: Record<string, (i: number, tick: number) => React.ReactNode> =
	{
		Button: (i, tick) => <Button key={i} label={`Button ${i} ${tick}`} />,
		Input: (i, tick) => (
			<Input
				key={i}
				id={`input-${i}`}
				label="Name"
				value={`${tick}`}
				onChange={noop}
			/>
		),
		Checkbox: (i, tick) => (
			<Checkbox
				key={i}
				id={`checkbox-${i}`}
				labels={{ label: `Option ${i}` }}
				checked={tick % 2 === 0}
				onChange={noop}
			/>
		),
		Badge: (i, tick) => <Badge key={i} id={`badge-${i}`} content={`${tick}`} />,
	};

const list = (
	make: (i: number, tick: number) => React.ReactNode,
	n: number,
	tick: number
) => Array.from({ length: n }, (_, i) => make(i, tick));

// Benchmarks render outside act(), as an app does; Testing Library's setup
// turns React's act warnings on.
(
	globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = false;

let host: HTMLDivElement;
let root: Root;
const setup = () => {
	// Benchmarks render outside act(), as an app does. Testing Library (loaded
	// by the browser setup file) turns React's act warnings on.
	(
		globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
	).IS_REACT_ACT_ENVIRONMENT = false;
	host = document.createElement('div');
	document.body.appendChild(host);
	root = createRoot(host);
};
const teardown = () => {
	root.unmount();
	host.remove();
};

for (const [name, make] of Object.entries(primitives)) {
	describe(name, () => {
		for (const n of [1, 100, 1000]) {
			bench(
				`mount ${n}`,
				() => {
					setup();
					flushSync(() => root.render(<>{list(make, n, 0)}</>));
					teardown();
				},
				{ time: 300 }
			);

			let tick = 0;
			bench(
				`update ${n}`,
				() => {
					tick += 1;
					flushSync(() => root.render(<>{list(make, n, tick)}</>));
				},
				{
					time: 300,
					setup: () => {
						setup();
						flushSync(() => root.render(<>{list(make, n, 0)}</>));
					},
					teardown,
				}
			);
		}
	});
}
