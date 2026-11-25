import React from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { darkTheme, isDarkScheme, lightTheme } from './storybook-themes';

// Docs pages (autodocs and MDX) render Storybook's own blocks (title, story
// previews, ArgTypes table, source) with a fixed light theme by default. This
// container picks the light or dark Storybook theme from the Color Scheme
// toolbar global, the same one preview-decorator.js applies to the canvas, so
// the docs chrome matches the components rendered inside it.

const useColorScheme = (channel) => {
	const [scheme, setScheme] = React.useState(
		() =>
			new URLSearchParams(window.location.search)
				.get('globals')
				?.match(/(?:^|;)theme:(light|dark|system)(?:;|$)/)?.[1] || 'light'
	);
	const [, rerender] = React.useReducer((n) => n + 1, 0);

	React.useEffect(() => {
		const onGlobals = ({ globals } = {}) => {
			if (globals?.theme) setScheme(globals.theme);
		};
		channel.on(SET_GLOBALS, onGlobals);
		channel.on(GLOBALS_UPDATED, onGlobals);
		// "System" follows the OS setting live.
		const osDark = window.matchMedia('(prefers-color-scheme: dark)');
		osDark.addEventListener('change', rerender);
		return () => {
			channel.off(SET_GLOBALS, onGlobals);
			channel.off(GLOBALS_UPDATED, onGlobals);
			osDark.removeEventListener('change', rerender);
		};
	}, [channel]);

	return scheme;
};

const ThemedDocsContainer = ({ context, children, ...props }) => {
	const scheme = useColorScheme(context.channel);
	return (
		<DocsContainer
			{...props}
			context={context}
			theme={isDarkScheme(scheme) ? darkTheme : lightTheme}
		>
			{children}
		</DocsContainer>
	);
};

export default ThemedDocsContainer;
