/*
 * Storybook landing page. The look follows the Lightning Design System 2 site;
 * the content is this library's own and comes from README.md and the
 * Salesforce multiframework styling guide.
 *
 * This file lives outside `components/**`, so the story-snapshot suite and the
 * Vitest projects never load it. All styling is inline and scoped to this
 * page's markup; nothing global is added to the canvas.
 */
import React from 'react';
import { linkTo } from '@storybook/addon-links';
import pkg from '../../package.json';
import slds2Pkg from '@salesforce-ux/design-system-2/package.json';
import heroImage from './hero.jpg';

const REPO = 'https://github.com/salesforce/design-system-react';
const STYLING_GUIDE =
	'https://developer.salesforce.com/docs/platform/multiframework/guide/mfw-styling.html';
// The docs-site workflow copies dist/llms into the Storybook site root, next
// to iframe.html (where this story renders). Resolve against that root rather
// than the domain root, so it works under the GitHub Pages /design-system-react/
// subpath and on any other host.
const LLMS = './llms.txt';

// SLDS versions are `2.<Salesforce release>.<patch>`. Salesforce ships three
// releases a year, two numbers apart, and 244 was Summer '23, so the release
// name follows from the minor version (264 is Winter '27).
const releaseName = (version) => {
	const release = Number(version.split('.')[1]);
	const steps = Math.round((release - 244) / 2);
	const index = ((steps % 3) + 3) % 3;
	const season = ['Summer', 'Winter', 'Spring'][index];
	// Winter is named for the following year.
	const year = 23 + Math.floor((steps + 2) / 3);
	return `${season} ’${year}`;
};

const slds2Release = releaseName(slds2Pkg.version);

// Fluid spacing: `min` px at a 375px phone, `max` px from 1200px up, linear in
// between. Inline styles can't hold media queries, so clamp() does the work.
const clamp = (min, max) => {
	const slope = (max - min) / (1200 - 375);
	const base = min - slope * 375;
	return `clamp(${min}px, ${base.toFixed(2)}px + ${(slope * 100).toFixed(3)}vw, ${max}px)`;
};
// Side gutter shared by the hero, body and footer so they keep one left edge.
const GUTTER = clamp(16, 32);

const TITLE_FONT =
	"'Salesforce Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif";

// SLDS 2 tokens with fallbacks, so the page follows the Theme and Color Scheme
// toolbar like the components do.
const color = {
	heading: 'var(--slds-g-color-on-surface-3, #032d60)',
	text: 'var(--slds-g-color-on-surface-2, #2e2e2e)',
	muted: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
	link: 'var(--slds-g-color-accent-2, #0176d3)',
	surface: 'var(--slds-g-color-surface-container-1, #fff)',
	codeBg: 'var(--slds-g-color-surface-container-2, #f3f3f3)',
	border: 'var(--slds-g-color-border-1, #e5e5e5)',
};

const styles = {
	page: {
		color: color.text,
		background: 'var(--slds-g-color-surface-1, #fff)',
		fontSize: '1rem',
		fontFamily: 'var(--slds-g-font-family, system-ui, sans-serif)',
		minHeight: '100vh',
	},
	hero: {
		position: 'relative',
		overflow: 'hidden',
		// Title and release line only, so equal space above and below. Scales
		// from 28px on phones to 72px on desktop.
		padding: `${clamp(28, 72)} 0`,
		color: '#fff',
		// Solid fallback (the image's base blue) keeps the white text readable
		// while the image loads.
		backgroundColor: '#3b4bd9',
		transition: 'background-color 300ms ease',
	},
	// The image sits on its own layer behind the text so it can be dimmed (dark
	// mode) and slowly drift (see useHeroGlow) without touching the text. The
	// 12% overscan keeps its edges out of view while it moves.
	heroImage: {
		position: 'absolute',
		inset: '-12%',
		backgroundImage: `url(${heroImage})`,
		// Anchor bottom-left so the orange/pink glow stays in view as the hero
		// crops on narrow or short viewports.
		backgroundPosition: 'left bottom',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		transition: 'filter 300ms ease',
		willChange: 'transform, filter',
	},
	// Same width and side padding as `main`, so the hero text and the body copy
	// share one left edge at every viewport width.
	heroInner: {
		maxWidth: 800,
		margin: '0 auto',
		padding: `0 ${GUTTER}`,
		position: 'relative',
	},
	// Light weight, as on the Lightning Design System for React site. Salesforce
	// Sans renders where installed; its license doesn't allow shipping it here.
	heroTitle: {
		margin: 0,
		fontFamily: TITLE_FONT,
		// Sized off the viewport so "Design System for React" stays on one line
		// down to a 320px phone (about 26px there), up to 64px on desktop.
		fontSize: 'clamp(1.5rem, 7.2vw, 4rem)',
		fontWeight: 300,
		lineHeight: 1.25,
		color: '#fff',
	},
	heroVersion: {
		margin: '16px 0 0',
		fontSize: '1rem',
		fontWeight: 400,
	},
	heroLink: { color: '#fff', textDecoration: 'underline' },
	main: {
		maxWidth: 800,
		margin: '0 auto',
		padding: `${clamp(28, 56)} ${GUTTER} ${clamp(40, 80)}`,
	},
	h2: {
		margin: `${clamp(36, 56)} 0 16px`,
		// 20px on phones so section headings stay smaller than the hero title.
		fontSize: clamp(20, 28),
		fontWeight: 700,
		lineHeight: 1.25,
		color: color.heading,
	},
	h3: {
		margin: '32px 0 8px',
		fontSize: '1.125rem',
		fontWeight: 700,
		color: color.heading,
	},
	p: { margin: '0 0 12px', fontSize: '1rem', lineHeight: 1.6 },
	pre: {
		margin: '0 0 16px',
		padding: '14px 16px',
		overflowX: 'auto',
		background: color.codeBg,
		border: `1px solid ${color.border}`,
		borderRadius: 8,
		fontFamily:
			'var(--slds-g-font-family-monospace, Consolas, Menlo, Monaco, monospace)',
		fontSize: '0.8125rem',
		lineHeight: 1.6,
	},
	code: {
		fontFamily:
			'var(--slds-g-font-family-monospace, Consolas, Menlo, Monaco, monospace)',
		fontSize: '0.875em',
	},
	link: { color: color.link, fontWeight: 600 },
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
		gap: 24,
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		padding: 24,
		background: color.surface,
		border: `1px solid ${color.border}`,
		borderRadius: 12,
	},
	cardTitle: {
		margin: '0 0 8px',
		fontSize: '1.125rem',
		fontWeight: 700,
		color: color.heading,
	},
	cardLink: {
		marginTop: 'auto',
		paddingTop: 12,
		color: color.link,
		fontWeight: 700,
		textDecoration: 'none',
		background: 'none',
		border: 0,
		padding: '12px 0 0',
		cursor: 'pointer',
		font: 'inherit',
		textAlign: 'left',
	},
	resources: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '12px 28px',
		margin: 0,
		padding: 0,
		listStyle: 'none',
	},
	// Legal footer, matching the Lightning Design System for React site.
	// Same column as `main`; the inner box carries the rule so it spans only
	// the text width.
	footer: {
		maxWidth: 800,
		margin: '0 auto',
		padding: `0 ${GUTTER} ${clamp(28, 48)}`,
		color: color.muted,
		fontSize: '0.875rem',
		lineHeight: 1.6,
	},
	footerLinks: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '4px 0',
		margin: '0 0 8px',
		padding: 0,
		listStyle: 'none',
	},
	footerInner: { paddingTop: 32, borderTop: `1px solid ${color.border}` },
	footerLink: { color: color.link },
	footerP: { margin: 0 },
	table: { width: '100%', borderCollapse: 'collapse', margin: '0 0 16px' },
	cell: {
		padding: '8px 12px 8px 0',
		borderBottom: `1px solid ${color.border}`,
		textAlign: 'left',
		verticalAlign: 'top',
	},
};

const Code = ({ children }) => <code style={styles.code}>{children}</code>;

const Snippet = ({ label, children }) => (
	<pre style={styles.pre} aria-label={label} tabIndex={0}>
		<code>{children}</code>
	</pre>
);

const ExternalLink = ({ href, children }) => (
	<a href={href} target="_blank" rel="noreferrer" style={styles.link}>
		{children}
	</a>
);

const LEGAL_LINKS = [
	[
		'Terms of Service',
		'https://www.salesforce.com/company/legal/sfdc-website-terms-of-service/',
	],
	['Privacy', 'https://www.salesforce.com/company/privacy/'],
	['Responsible Disclosure', 'https://www.salesforce.com/company/disclosure/'],
	['Trust', 'https://trust.salesforce.com/'],
	// Machine-readable docs index for coding agents (see the Explore card).
	['llms.txt', LLMS],
];

const LegalFooter = () => (
	<footer style={styles.footer}>
		<div style={styles.footerInner}>
			<nav aria-label="Legal">
				<ul style={styles.footerLinks}>
					{LEGAL_LINKS.map(([label, href], index) => (
						<li key={href}>
							{index > 0 && (
								<span aria-hidden="true" style={{ margin: '0 8px' }}>
									•
								</span>
							)}
							<a
								href={href}
								target="_blank"
								rel="noreferrer"
								style={styles.footerLink}
							>
								{label}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<p style={styles.footerP}>
				© Copyright 2015-present Salesforce.com, inc.{' '}
				<a
					href="https://www.salesforce.com/company/legal/intellectual/"
					target="_blank"
					rel="noreferrer"
					style={{ ...styles.footerLink, textDecoration: 'underline' }}
				>
					All rights reserved
				</a>
				. Various trademarks held by their respective owners. Salesforce, Inc.
				Salesforce Tower, 415 Mission Street, 3rd Floor, San Francisco, CA
				94105, United States
			</p>
		</div>
	</footer>
);

const Card = ({ title, children, action }) => (
	<section style={styles.card}>
		<h3 style={styles.cardTitle}>{title}</h3>
		<p style={{ ...styles.p, margin: 0 }}>{children}</p>
		{action}
	</section>
);

// Tracks a media query, e.g. the OS dark-mode or reduced-motion setting.
const useMediaQuery = (query) => {
	const [matches, setMatches] = React.useState(
		() => typeof window !== 'undefined' && window.matchMedia(query).matches
	);
	React.useEffect(() => {
		const mql = window.matchMedia(query);
		const onChange = () => setMatches(mql.matches);
		onChange();
		mql.addEventListener('change', onChange);
		return () => mql.removeEventListener('change', onChange);
	}, [query]);
	return matches;
};

// Dark mode keeps the image's colors but roughly halves its brightness, so it
// sits beside the dark SLDS surface without glaring.
const heroFilter = (isDark, hue = 0) =>
	`${isDark ? 'brightness(0.5) saturate(1.15) ' : ''}hue-rotate(${hue}deg)`;

// A slow "pearl core" glow: the image layer breathes (scale), drifts and
// shifts hue, back and forth over 14s. Uses the Web Animations API
// so no stylesheet is needed; off when the user prefers reduced motion.
const useHeroGlow = (ref, isDark, reduceMotion) => {
	React.useEffect(() => {
		const layer = ref.current;
		if (!layer || reduceMotion || typeof layer.animate !== 'function') {
			return undefined;
		}
		const animation = layer.animate(
			[
				{
					transform: 'scale(1) translate(0, 0)',
					filter: heroFilter(isDark, 0),
				},
				{
					transform: 'scale(1.16) translate(-5%, 4%)',
					filter: heroFilter(isDark, -25),
				},
				{
					transform: 'scale(1.1) translate(4%, -3%)',
					filter: heroFilter(isDark, 18),
				},
			],
			{
				duration: 14000,
				easing: 'ease-in-out',
				direction: 'alternate',
				iterations: Infinity,
			}
		);
		return () => animation.cancel();
	}, [ref, isDark, reduceMotion]);
};

// `scheme` is the Color Scheme toolbar global (light, dark or system), the
// same value preview-decorator.js turns into slds-color-scheme--* on <body>.
const IntroductionPage = ({ scheme = 'light' }) => {
	const osDark = useMediaQuery('(prefers-color-scheme: dark)');
	const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
	const isDark = scheme === 'dark' || (scheme === 'system' && osDark);
	const imageRef = React.useRef(null);
	useHeroGlow(imageRef, isDark, reduceMotion);

	return (
		<div style={styles.page}>
			<header
				style={{
					...styles.hero,
					...(isDark && { backgroundColor: '#1c2470' }),
				}}
			>
				<div
					ref={imageRef}
					aria-hidden="true"
					data-hero-image=""
					style={{ ...styles.heroImage, filter: heroFilter(isDark) }}
				/>
				<div style={styles.heroInner}>
					<h1 style={styles.heroTitle}>
						Design System <i>for</i> React
					</h1>
					<p style={styles.heroVersion}>
						Latest release:{' '}
						<a
							href={`${REPO}/releases/tag/v${pkg.version}`}
							target="_blank"
							rel="noreferrer"
							style={styles.heroLink}
						>
							{pkg.version}
						</a>{' '}
						| Pairs well with:{' '}
						<a
							href={`https://www.npmjs.com/package/${slds2Pkg.name}/v/${slds2Pkg.version}`}
							target="_blank"
							rel="noreferrer"
							style={styles.heroLink}
						>
							SLDS {slds2Release}
						</a>
					</p>
				</div>
			</header>

			<main style={styles.main}>
				<h2 style={{ ...styles.h2, marginTop: 0 }}>
					Create the world’s best enterprise app experiences.
				</h2>
				<p style={{ ...styles.p, fontSize: '1.125rem' }}>
					Design System React is the React implementation of the{' '}
					<ExternalLink href="https://www.lightningdesignsystem.com/">
						Salesforce Lightning Design System
					</ExternalLink>
					. These components render SLDS 2 markup with keyboard and screen
					reader support built in, for React 19 with TypeScript types included.
				</p>

				<h3 style={styles.h3}>1. Install</h3>
				<Snippet label="Install command">
					npm install @salesforce/design-system-react@alpha
				</Snippet>
				<p style={styles.p}>
					v11 is in prerelease and needs the <Code>@alpha</Code> tag. Without
					it, npm installs the stable 0.10.x line (React 16.8+, SLDS 1). v11
					requires React 19.2 and isn't a drop-in upgrade from 0.10.x. Pin the
					exact version you tested against. For <Code>ERESOLVE</Code> errors,
					see the{' '}
					<ExternalLink href={`${REPO}#troubleshooting-eresolve-errors`}>
						README
					</ExternalLink>
					.
				</p>

				<h3 style={styles.h3}>2. Add the SLDS 2 stylesheet</h3>
				<p style={styles.p}>
					The components render SLDS markup but don't ship CSS. The stylesheet
					comes from <Code>@salesforce-ux/design-system-2</Code>, which installs
					with the library. Import it once at your app's entry point:
				</p>
				<Snippet label="Stylesheet import">
					{`import '@salesforce-ux/design-system-2/dist/css/bundled/slds2.cosmos.css';`}
				</Snippet>
				<p style={styles.p}>
					Without a bundler, serve the package's <Code>dist/css</Code> folder
					and link <Code>bundled/slds2.cosmos.css</Code>. The bundled folder
					also has <Code>slds2.lightning-blue.css</Code> and scoped versions of
					both themes.
				</p>

				<h3 style={styles.h3}>3. Choose a color scheme</h3>
				<p style={styles.p}>
					Put an <Code>slds-color-scheme--*</Code> class on{' '}
					<Code>&lt;body&gt;</Code>. The stylesheet switches its color tokens to
					match, so the components follow without any extra props.
				</p>
				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.cell}>Class</th>
							<th style={styles.cell}>Color scheme</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={styles.cell}>
								<Code>slds-color-scheme--system</Code>
							</td>
							<td style={styles.cell}>Follows the operating system</td>
						</tr>
						<tr>
							<td style={styles.cell}>
								<Code>slds-color-scheme--light</Code>
							</td>
							<td style={styles.cell}>Always light</td>
						</tr>
						<tr>
							<td style={styles.cell}>
								<Code>slds-color-scheme--dark</Code>
							</td>
							<td style={styles.cell}>Always dark</td>
						</tr>
					</tbody>
				</table>
				<p style={styles.p}>
					The Theme and Color Scheme menus in this Storybook's toolbar work the
					same way.
				</p>

				<h3 style={styles.h3}>4. Render a component</h3>
				<p style={styles.p}>
					Icons load from SVG sprites in{' '}
					<Code>@salesforce-ux/design-system</Code>. Serve its{' '}
					<Code>assets/icons</Code> folder and point <Code>IconSettings</Code>{' '}
					at it:
				</p>
				<Snippet label="Entry point example">
					{`// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IconSettings } from '@salesforce/design-system-react';
import '@salesforce-ux/design-system-2/dist/css/bundled/slds2.cosmos.css';
import App from './App';

document.body.classList.add('slds-color-scheme--system');

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<IconSettings iconPath="/assets/icons">
			<App />
		</IconSettings>
	</StrictMode>
);`}
				</Snippet>
				<Snippet label="Component example">
					{`// src/App.tsx
import { Button } from '@salesforce/design-system-react';

export default function App() {
	return (
		<main className="slds-p-around_medium">
			<Button label="Edit" variant="brand" />
		</main>
	);
}`}
				</Snippet>
				<p style={styles.p}>
					Most components also have their own entry point, such as{' '}
					<Code>@salesforce/design-system-react/components/button</Code>.
				</p>

				<h3 style={styles.h3}>5. Customize the supported way</h3>
				<p style={styles.p}>
					Use the component APIs for structure and behavior, and SLDS 2 styling
					hooks for color, spacing and typography. Don't override component
					internals or copy blueprint markup when a component already exists.
					That breaks on updates and can break accessibility. See the{' '}
					<ExternalLink href={STYLING_GUIDE}>
						multiframework styling guide
					</ExternalLink>
					.
				</p>
				<p style={styles.p}>
					Deprecated props still compile in v11. Turn on{' '}
					<Code>@typescript-eslint/no-deprecated</Code> so lint names the
					replacement.
				</p>

				<h2 style={styles.h2}>Explore</h2>
				<div style={styles.grid}>
					<Card
						title="Components"
						action={
							<button
								type="button"
								style={styles.cardLink}
								onClick={linkTo('Components/Button')}
							>
								Browse components ➞
							</button>
						}
					>
						Every component, with live examples, props and an accessibility
						check, is in the sidebar.
					</Card>
					<Card
						title="Docs for coding agents"
						action={
							<a
								href={LLMS}
								target="_blank"
								rel="noreferrer"
								style={styles.cardLink}
							>
								Open llms.txt ➞
							</a>
						}
					>
						One markdown file per component, generated from the type
						definitions. The package ships the same files in{' '}
						<Code>dist/llms</Code>, matched to your installed version.
					</Card>
					<Card
						title="Accessibility"
						action={
							<a
								href={`${REPO}#accessibility`}
								target="_blank"
								rel="noreferrer"
								style={styles.cardLink}
							>
								Learn more ➞
							</a>
						}
					>
						Built to WCAG 2.1 AA, tested with axe-core, with keyboard navigation
						and screen reader support.
					</Card>
					<Card
						title="Contribute"
						action={
							<a
								href={`${REPO}/blob/master/CONTRIBUTING.md`}
								target="_blank"
								rel="noreferrer"
								style={styles.cardLink}
							>
								Read the guide ➞
							</a>
						}
					>
						A community-supported project. Bug reports and pull requests are
						welcome.
					</Card>
				</div>

				<h2 style={styles.h2}>Resources</h2>
				<ul style={styles.resources}>
					<li>
						<ExternalLink href={REPO}>GitHub</ExternalLink>
					</li>
					<li>
						<ExternalLink href={`${REPO}/releases`}>Releases</ExternalLink>
					</li>
					<li>
						<ExternalLink href={`${REPO}/blob/master/CHANGELOG.md`}>
							Changelog
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://www.lightningdesignsystem.com/">
							Lightning Design System 2
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href={STYLING_GUIDE}>Styling guide</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://www.npmjs.com/package/@salesforce/design-system-react">
							npm
						</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://stackoverflow.com/questions/tagged/design-system-react">
							Stack Overflow
						</ExternalLink>
					</li>
				</ul>
			</main>

			<LegalFooter />
		</div>
	);
};

export default {
	title: 'Get started',
	// Keep the original ids (introduction--introduction) so existing links and
	// the panel rule in manager.js keep working after the rename.
	id: 'introduction',
	component: IntroductionPage,
	// A landing page, not a component: no Docs tab, and out of test runners.
	tags: ['!autodocs', '!test'],
	parameters: {
		layout: 'fullscreen',
		controls: { disable: true },
		actions: { disable: true },
		chromatic: { disableSnapshot: true },
	},
};

export const Introduction = {
	name: 'Get started',
	render: (_args, { globals }) => <IntroductionPage scheme={globals.theme} />,
};
