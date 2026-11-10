/*
 * Test for scripts/check-prop-docs.ts (`npm run check:prop-docs`).
 *
 * Runs the real script with `--root` pointed at a throwaway package: a
 * hand-written `dist/types` and a `components/` source tree with
 * `deprecatedProperty()` calls.
 */
import { spawnSync } from 'child_process';
import {
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const SCRIPT = fileURLToPath(new URL('../check-prop-docs.ts', import.meta.url));
const TSX = fileURLToPath(
	new URL('../../node_modules/.bin/tsx', import.meta.url)
);
const REACT_TYPES = fileURLToPath(
	new URL('../../node_modules/@types/react', import.meta.url)
);

let root;

const write = (path, text) => {
	mkdirSync(dirname(join(root, path)), { recursive: true });
	writeFileSync(join(root, path), text);
};

const run = (...args) =>
	spawnSync(
		TSX,
		[SCRIPT, '--root', root, '--allowlist', join(root, 'allow.json'), ...args],
		{ encoding: 'utf8' }
	);

// A documented component; tests then break one thing at a time.
const WIDGET = `
import React from 'react';
/** Text for the widget. */
export interface WidgetLabels {
	/** Visible label. Defaults to the English text \`Widget\`. */
	label?: string;
}
interface WidgetBaseProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Labels. */
	labels?: WidgetLabels;
	/** @deprecated Use \`labels.label\`. */
	label?: string;
}
export type WidgetChangeProps =
	| {
			/** Called on change with \`(event, { value })\`. */
			onChange: (event: Event, data: { value: string }) => void;
	  }
	| {
			/** Ignored. */
			onChange?: undefined;
			readOnly?: never;
	  };
/** Extra props that narrow \`labels\`; documented on \`WidgetBaseProps\`. */
interface WidgetVariantProps {
	labels?: WidgetLabels & { label: string };
}
export type WidgetProps = WidgetBaseProps & WidgetChangeProps & WidgetVariantProps;
declare function Widget(props: WidgetProps): React.ReactElement;
export default Widget;
`;

const CHECK_PROPS = `
import deprecatedProperty from '../../utilities/warning/deprecated-property';
export default (props) => {
	deprecatedProperty('Widget', props.label, 'label', 'labels.label');
	deprecatedProperty('Widget', props.gone, 'gone', 'labels.label');
	deprecatedProperty('Widget', props.x, 'items[].label (string)', 'x');
};
`;

beforeEach(() => {
	root = mkdtempSync(join(tmpdir(), 'check-prop-docs-'));
	mkdirSync(join(root, 'node_modules', '@types'), { recursive: true });
	// Resolve `react` from the fixture the way a consumer would.
	spawnSync('ln', ['-s', REACT_TYPES, join(root, 'node_modules/@types/react')]);
	write(
		'dist/types/components/index.d.ts',
		"export { default as Widget } from './widget';\nexport type { WidgetProps } from './widget';\n"
	);
	write('dist/types/components/widget/index.d.ts', WIDGET);
	write('components/widget/check-props.js', CHECK_PROPS);
});

afterEach(() => {
	rmSync(root, { recursive: true, force: true });
});

describe('check-prop-docs', () => {
	it('passes when every prop is documented and deprecated props are tagged', () => {
		const result = run();
		expect(result.stderr).toBe('');
		expect(result.status).toBe(0);
	});

	it('reports undocumented props in unions, intersections and labels, but not HTML attributes', () => {
		write(
			'dist/types/components/widget/index.d.ts',
			WIDGET.replace(
				'/** Visible label. Defaults to the English text `Widget`. */',
				''
			).replace('/** Ignored. */', '')
		);
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toContain(
			'no JSDoc: components/widget/index: WidgetLabels.label'
		);
		expect(result.stderr).toContain(
			'no JSDoc: components/widget/index: WidgetChangeProps.onChange'
		);
		// HTML attributes, a `never` member, and the second declaration of
		// `labels` are not reported.
		expect(result.stderr).not.toMatch(
			/onClick|className|readOnly|WidgetVariantProps/
		);
	});

	it('reports a deprecatedProperty() call whose prop has no @deprecated tag', () => {
		write(
			'dist/types/components/widget/index.d.ts',
			WIDGET.replace(
				'/** @deprecated Use `labels.label`. */',
				'/** Old label. */'
			)
		);
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toContain(
			'deprecatedProperty() call without a @deprecated tag: components/widget: label'
		);
		// `gone` isn't declared and `items[].label (string)` isn't a prop name.
		expect(result.stderr).not.toMatch(/gone|items/);
	});

	it('tolerates allowlisted gaps and rejects stale allowlist entries', () => {
		write(
			'dist/types/components/widget/index.d.ts',
			WIDGET.replace('/** Ignored. */', '')
		);
		expect(run('--write-allowlist').status).toBe(0);
		expect(JSON.parse(readFileSync(join(root, 'allow.json'), 'utf8'))).toEqual({
			undocumented: ['components/widget/index: WidgetChangeProps.onChange'],
			deprecated: [],
		});
		expect(run().status).toBe(0);

		write('dist/types/components/widget/index.d.ts', WIDGET);
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toContain(
			'fixed, remove from the allowlist: components/widget/index: WidgetChangeProps.onChange'
		);
	});
});
