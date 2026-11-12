/*
 * Shared by `api-report.ts` (the committed `api/` snapshot) and
 * `api-compat.ts` (the breaking-change classifier): emitting declarations and
 * deciding which of them are public.
 */
import { spawnSync } from 'child_process';
import { readdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const tsc = join(repoRoot, 'node_modules', '.bin', 'tsc');

/**
 * Every file under these is importable through the `exports` wildcards, so it
 * is public unless it sits in a `private/` folder.
 */
const PUBLIC_DIRS = ['components', 'utilities'];

export const isPublic = (file: string): boolean =>
	PUBLIC_DIRS.includes(file.split('/')[0]) &&
	!file.split('/').includes('private');

/** Every file under `dir`, as `/`-separated paths relative to it. */
export const walk = (dir: string, base = dir): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return walk(path, base);
		return [relative(base, path).split('\\').join('/')];
	});

/**
 * Emit `project`'s declarations into `outDir` with `tsconfig.dts.json`, as
 * `build:types` does. Returns false (tsc's errors already printed) on failure.
 */
export const emitDeclarations = (project: string, outDir: string): boolean =>
	spawnSync(
		tsc,
		[
			'-p',
			join(project, 'tsconfig.dts.json'),
			'--outDir',
			outDir,
			'--declarationMap',
			'false',
		],
		{ cwd: project, stdio: 'inherit' }
	).status === 0;

/** `components/checkbox/index.d.ts` -> `components/checkbox` (its import path). */
export const subpath = (file: string): string =>
	file.replace(/\.d\.ts$/, '').replace(/\/index$/, '');

/** The `api/` file a declaration file is snapshotted in, e.g. `components/checkbox.api.d.ts`. */
export const reportFileOf = (file: string): string =>
	`${file
		.split('/')
		.slice(0, 2)
		.join('/')
		.replace(/\.d\.ts$/, '')}.api.d.ts`;
