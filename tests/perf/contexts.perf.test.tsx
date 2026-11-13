/*
 * Context value stability (plan D2, check 4): a parent re-render with
 * unchanged props must not hand consumers a new context value, or every
 * consumer below re-renders. SimpleDataTable's TableContext is checked in its
 * own __perf__ file.
 */
import React from 'react';
import { describe, it, afterEach } from 'vitest';

import IconSettings, {
	IconSettingsContext,
} from '../../components/icon-settings';
import PortalSettings, {
	PortalSettingsContext,
} from '../../components/portal-settings';
import {
	checkBudget,
	countRenders,
	getRenderCount,
	renderCounted,
	resetRenderCounts,
	trackContextValue,
} from './helpers';

const restores: (() => void)[] = [];
afterEach(() => {
	restores.splice(0).forEach((restore) => restore());
	resetRenderCounts();
});

// A memoized consumer: it re-renders only when the context value changes.
const Consumer = countRenders(
	React.memo(function Consumer({
		context,
	}: {
		context: React.Context<unknown>;
	}) {
		React.useContext(context);
		return <span />;
	}),
	'Consumer'
);

const cases = [
	{
		key: 'IconSettings',
		Context: IconSettingsContext as React.Context<unknown>,
		ui: (child: React.ReactNode) => (
			<IconSettings iconPath="/assets/icons">{child}</IconSettings>
		),
	},
	{
		key: 'PortalSettings',
		Context: PortalSettingsContext as React.Context<unknown>,
		ui: (child: React.ReactNode) => (
			<PortalSettings renderTo="#portal">{child}</PortalSettings>
		),
	},
];

describe.each(cases)('$key', ({ key, Context, ui }) => {
	it('keeps its context value across a parent re-render (check 4)', () => {
		const context = trackContextValue(Context);
		restores.push(context.restore);
		const consumer = <Consumer context={Context} />;
		const result = renderCounted(ui(consumer));
		context.reset();
		resetRenderCounts();
		result.rerender(ui(consumer));
		checkBudget(
			`${key}/parent-rerender`,
			{
				contextChanges: context.changes,
				consumerRenders: getRenderCount('Consumer'),
			},
			{ contextChanges: 0, consumerRenders: 0 }
		);
		result.unmount();
	});
});
