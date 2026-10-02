const Mode = Object.freeze({
	NAVIGATION: 'navigation' as const,
	ACTIONABLE: 'actionable' as const,
});

export type ModeType = (typeof Mode)[keyof typeof Mode];

export default Mode;
