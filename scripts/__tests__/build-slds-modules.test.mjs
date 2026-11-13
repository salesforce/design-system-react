/*
 * Tests for scripts/build-slds-modules.ts (`npm run css:refresh`).
 *
 * Runs the real script against the installed SLDS package with `--out` set to
 * a throwaway directory, so the checked-in css/ is never touched.
 */
import { spawnSync } from 'child_process';
import {
	cpSync,
	existsSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const SCRIPT = join(ROOT, 'scripts/build-slds-modules.ts');
const TSX = join(ROOT, 'node_modules/.bin/tsx');
const CSS = join(ROOT, 'css');

let out;
const run = (...args) =>
	spawnSync(TSX, [SCRIPT, '--out', out, ...args], {
		cwd: ROOT,
		encoding: 'utf8',
	});
const readJson = (file) => JSON.parse(readFileSync(join(out, file), 'utf8'));

beforeEach(() => {
	out = mkdtempSync(join(tmpdir(), 'slds-modules-'));
});
afterEach(() => {
	rmSync(out, { recursive: true, force: true });
});

describe('build-slds-modules', () => {
	it('regenerates the checked-in css/ exactly', () => {
		cpSync(CSS, out, { recursive: true });
		const result = run();
		expect(result.status, result.stderr).toBe(0);
		const files = (dir) =>
			readdirSync(dir, { recursive: true })
				.filter((f) => f.endsWith('.css') || f.endsWith('.json'))
				.sort();
		expect(files(out)).toEqual(files(CSS));
		for (const file of files(CSS)) {
			expect(readFileSync(join(out, file), 'utf8'), file).toBe(
				readFileSync(join(CSS, file), 'utf8')
			);
		}
	}, 60000);

	it('prints the size table and writes nothing on --dry-run', () => {
		const result = run('--dry-run');
		expect(result.status, result.stderr).toBe(0);
		expect(result.stdout).toMatch(/components\/combobox\s+[\d.]+ KB/);
		expect(result.stdout).toMatch(/Dry run: nothing written/);
		expect(readdirSync(out)).toEqual([]);
	}, 60000);

	describe('when a published module is no longer in SLDS', () => {
		const seed = () => {
			cpSync(CSS, out, { recursive: true });
			const manifest = readJson('manifest.json');
			manifest.modules['components/gone'] = {
				path: 'components/gone.css',
				bytes: 1,
				scopedBytes: 1,
				sources: [],
				dependsOn: [],
			};
			writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest));
		};

		it('stops and leaves css/ unchanged', () => {
			seed();
			const before = readFileSync(join(out, 'manifest.json'), 'utf8');
			const result = run();
			expect(result.status).toBe(1);
			expect(result.stderr).toMatch(
				/components\/gone\.css is no longer in SLDS .*--stub-removed/
			);
			expect(readFileSync(join(out, 'manifest.json'), 'utf8')).toBe(before);
		}, 60000);

		it('writes an empty stub with --stub-removed', () => {
			seed();
			const result = run('--stub-removed');
			expect(result.status, result.stderr).toBe(0);
			const stub = readFileSync(join(out, 'components/gone.css'), 'utf8');
			expect(stub).toMatch(
				/^\/\* removed in SLDS [\w.-]+; kept so imports resolve; see CHANGELOG \*\/\n$/
			);
			expect(existsSync(join(out, 'scoped/components/gone.css'))).toBe(true);
			const { version } = readJson('manifest.json').source;
			expect(
				readJson('manifest.json').modules['components/gone']
			).toMatchObject({
				removedIn: version,
			});
			// The stub stays on the next refresh without the flag.
			expect(run().status).toBe(0);
			expect(existsSync(join(out, 'components/gone.css'))).toBe(true);
		}, 120000);
	});

	it('stops when a class DSR renders loses its SLDS styles', () => {
		cpSync(CSS, out, { recursive: true });
		const map = readJson('components.json');
		map.combobox.unstyled = map.combobox.unstyled.filter(
			(cls) => cls !== 'slds-listbox__item'
		);
		writeFileSync(join(out, 'components.json'), JSON.stringify(map));
		const result = run();
		expect(result.status).toBe(1);
		expect(result.stderr).toMatch(/combobox: `slds-listbox__item` no longer/);
		expect(run('--accept-unstyled').status).toBe(0);
	}, 120000);
});
