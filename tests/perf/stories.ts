/// <reference types="vite/client" />
/*
 * Every story as a perf fixture. Copied from
 * components/__tests__/story-snapshots.test.jsx (which isn't refactored, so the
 * two stay independent). Test files that use this must also mock
 * `utilities/generate-id`, as that suite does, so ids are deterministic:
 *
 *   vi.mock('../../utilities/generate-id', async () =>
 *     (await import('./generate-id-mock')).default);
 */
import type { ComponentType } from 'react';
import { composeStories } from '@storybook/react-vite';

const storyModules = import.meta.glob(
	'../../components/**/__docs__/*.stories.{jsx,tsx}',
	{ eager: true }
);

const componentName = (filePath: string) => {
	// ../../components/badge/__docs__/Badge.stories.jsx -> Badge
	const match = filePath.match(/\/([^/]+)\.stories\.[jt]sx$/);
	return match ? match[1] : filePath;
};

export interface StoryFixture {
	/** `Badge/Default`, the key used in budgets.json. */
	key: string;
	file: string;
	name: string;
	Story: ComponentType;
}

export const stories: StoryFixture[] = Object.entries(storyModules).flatMap(
	([filePath, storyModule]) =>
		Object.entries(composeStories(storyModule as never)).map(
			([name, Story]) => ({
				key: `${componentName(filePath)}/${name}`,
				file: componentName(filePath),
				name,
				Story: Story as unknown as ComponentType,
			})
		)
);

export const isPortalError = (error: unknown) =>
	error instanceof Error &&
	/Portals are not currently supported by the server renderer/.test(
		error.message
	);
