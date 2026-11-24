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

const REPO = 'https://github.com/salesforce/design-system-react';
const STYLING_GUIDE =
	'https://developer.salesforce.com/docs/platform/multiframework/guide/mfw-styling.html';
const LLMS = 'https://salesforce.github.io/design-system-react/llms.txt';

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
		padding: '72px 32px 64px',
		color: '#fff',
		background: [
			'radial-gradient(circle at 8% 0%, rgba(254, 147, 57, 0.85) 0, rgba(254, 147, 57, 0) 28%)',
			'radial-gradient(circle at 88% 22%, rgba(255, 160, 120, 0.9) 0, rgba(255, 160, 120, 0) 7%)',
			'radial-gradient(circle at 68% 82%, rgba(255, 184, 210, 0.9) 0, rgba(255, 184, 210, 0) 5%)',
			'radial-gradient(circle at 100% 100%, rgba(254, 120, 80, 0.75) 0, rgba(254, 120, 80, 0) 32%)',
			'radial-gradient(ellipse at 75% 60%, #0b1f66 0, #0b1f66 30%, rgba(11, 31, 102, 0) 60%)',
			'linear-gradient(120deg, #032d60 0%, #1b3bd1 55%, #2f4be3 100%)',
		].join(', '),
	},
	heroInner: { maxWidth: 960, margin: '0 auto', position: 'relative' },
	heroTitle: {
		margin: 0,
		fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
		fontWeight: 700,
		lineHeight: 1.1,
		letterSpacing: '-0.02em',
		color: '#fff',
	},
	heroVersion: {
		margin: '12px 0 0',
		fontSize: '0.9375rem',
		fontWeight: 700,
	},
	heroLead: {
		margin: '32px 0 0',
		maxWidth: 560,
		fontSize: '1.125rem',
		lineHeight: 1.5,
		fontWeight: 600,
	},
	main: { maxWidth: 800, margin: '0 auto', padding: '56px 32px 80px' },
	h2: {
		margin: '56px 0 16px',
		fontSize: '1.75rem',
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
	callout: {
		margin: '0 0 16px',
		padding: '12px 16px',
		borderLeft: `4px solid ${color.link}`,
		background: color.codeBg,
		borderRadius: 4,
		lineHeight: 1.6,
	},
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

const Card = ({ title, children, action }) => (
	<section style={styles.card}>
		<h3 style={styles.cardTitle}>{title}</h3>
		<p style={{ ...styles.p, margin: 0 }}>{children}</p>
		{action}
	</section>
);

const IntroductionPage = () => (
	<div style={styles.page}>
		<header style={styles.hero}>
			<div style={styles.heroInner}>
				<h1 style={styles.heroTitle}>Design System React</h1>
				<p style={styles.heroVersion}>v{pkg.version}</p>
				<p style={styles.heroLead}>
					Accessible, localization-friendly React components for Lightning
					Design System 2.
				</p>
			</div>
		</header>

		<main style={styles.main}>
			<p style={{ ...styles.p, fontSize: '1.125rem' }}>
				Design System React is the React implementation of the{' '}
				<ExternalLink href="https://www.lightningdesignsystem.com/">
					Salesforce Lightning Design System
				</ExternalLink>
				. These components render SLDS 2 markup with keyboard and screen reader
				support built in, for React 19 with TypeScript types included.
			</p>

			<h2 style={styles.h2}>Get started</h2>

			<h3 style={styles.h3}>1. Install</h3>
			<Snippet label="Install command">
				npm install @salesforce/design-system-react@alpha
			</Snippet>
			<p style={styles.callout}>
				v11 is in prerelease and needs the <Code>@alpha</Code> tag. Without it,
				npm installs the stable 0.10.x line (React 16.8+, SLDS 1). v11 requires
				React 19.2 and isn't a drop-in upgrade from 0.10.x. Pin the exact
				version you tested against. For <Code>ERESOLVE</Code> errors, see the{' '}
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
				Without a bundler, serve the package's <Code>dist/css</Code> folder and
				link <Code>bundled/slds2.cosmos.css</Code>. The bundled folder also has{' '}
				<Code>slds2.lightning-blue.css</Code> and scoped versions of both
				themes.
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
				Icons load from SVG sprites in <Code>@salesforce-ux/design-system</Code>
				. Serve its <Code>assets/icons</Code> folder and point{' '}
				<Code>IconSettings</Code> at it:
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
				internals or copy blueprint markup when a component already exists. That
				breaks on updates and can break accessibility. See the{' '}
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
					Every component, with live examples, props and an accessibility check,
					is in the sidebar.
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
					One markdown file per component, generated from the type definitions.
					The package ships the same files in <Code>dist/llms</Code>, matched to
					your installed version.
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
	</div>
);

export default {
	title: 'Introduction',
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
	name: 'Introduction',
	render: () => <IntroductionPage />,
};
