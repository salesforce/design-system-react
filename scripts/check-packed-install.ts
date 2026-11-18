/*
 * Install the `npm pack` tarball into throwaway consumer projects and check
 * that every entry point in the package `exports` map loads and type-checks
 * there, as it would for a user installing from npm.
 *
 * `check-package-exports.mjs` checks the built `dist/` through self-reference,
 * so it cannot see what the tarball leaves out: the `files` field,
 * `.npmignore` and `prepack` all decide what is actually published. This
 * check runs against the tarball:
 *
 *   1. `npm pack` (its `prepack` script runs the full build);
 *   2. install the tarball, with its peer dependencies and React's types, into
 *      a temp dir holding four consumers:
 *        - `esm`:            `"type": "module"`, `import()` of every entry point;
 *        - `cjs`:            `require()` of every entry point;
 *        - `ts-bundler`:     `moduleResolution: bundler`, imports every entry point;
 *        - `ts-node16`:      `moduleResolution: node16`, imports every entry
 *                            point from an `.mts` (`import` condition) and a
 *                            `.cts` (`require` condition) file;
 *   3. the runtime consumers check each entry point has every value export its
 *      installed types declare; the TypeScript consumers must type-check with
 *      `skipLibCheck: false`, so the published declarations are checked too.
 *
 * The entry points are each `exports` key, plus every source module under
 * `components/` that a `./components/*` pattern exports, so a module the build
 * or the `files` field drops is reported rather than silently skipped.
 *
 * Regression check for #3237: alpha.4 shipped types for 18 entry points whose
 * runtime modules were missing.
 *
 * Usage: `npm run test:packed` (`--keep` leaves the temp dir for inspection).
 */
import { execFileSync, spawnSync } from 'child_process';
import {
	globSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'fs';
import { createRequire } from 'module';
import { tmpdir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

import {
	componentDirSubpaths,
	componentFileSubpaths,
	entryPointSpecifiers,
	runtimeFixtureSource,
	typesFixtureSource,
	valueExportNames,
} from './package-entry-points.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const require = createRequire(import.meta.url);
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const pkg: string = manifest.name;
const keep = process.argv.includes('--keep');

// Source modules that are not entry points although `./components/*` matches
// them. Each needs a reason.
const NOT_ENTRY_POINTS = new Set([
	// The documentation site's example index: `require('raw-loader!…')` calls,
	// never built or published.
	'components/site-stories',
]);

const log = (message: string) =>
	console.log(`check-packed-install: ${message}`);
const run = (cmd: string, args: string[], cwd: string) =>
	execFileSync(cmd, args, {
		cwd,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe'],
		maxBuffer: 64 * 1024 * 1024,
	});
const write = (file: string, content: string | object) => {
	mkdirSync(join(file, '..'), { recursive: true });
	writeFileSync(
		file,
		typeof content === 'string'
			? content
			: `${JSON.stringify(content, null, '\t')}\n`
	);
};

const temp = mkdtempSync(join(tmpdir(), 'dsr-packed-'));
const failures: string[] = [];
try {
	// --- Pack ------------------------------------------------------------------

	log('packing (prepack runs the build)…');
	run('npm', ['pack', '--pack-destination', temp, '--loglevel=error'], root);
	const tarball = join(
		temp,
		`${pkg.replace(/^@/, '').replace('/', '-')}-${manifest.version}.tgz`
	);

	// --- Install ---------------------------------------------------------------

	// One install shared by the consumer folders below it: each folder has its
	// own `package.json` (module type) and tsconfig, and resolves the package
	// from the parent `node_modules`, as a workspace package would.
	const typesVersion = (name: string) =>
		JSON.parse(readFileSync(require.resolve(`${name}/package.json`), 'utf8'))
			.version;
	write(join(temp, 'package.json'), {
		name: 'dsr-packed-install-consumers',
		private: true,
		dependencies: {
			[pkg]: `file:${tarball}`,
			'@types/react': typesVersion('@types/react'),
			'@types/react-dom': typesVersion('@types/react-dom'),
		},
	});
	log('installing the tarball…');
	run(
		'npm',
		[
			'install',
			'--no-audit',
			'--no-fund',
			'--prefer-offline',
			'--loglevel=error',
		],
		temp
	);

	// --- One React -------------------------------------------------------------

	// The repo's `overrides` do not apply to a consumer's install, so a
	// dependency that hard-depends on another React major gets its own nested
	// copy there, and its elements fail to render under the consumer's React.
	const reactCopies = globSync(
		'**/node_modules/{react,react-dom}/package.json',
		{
			cwd: temp,
		}
	).filter((file) => !/^node_modules\/react(-dom)?\/package\.json$/.test(file));
	for (const file of reactCopies) {
		const { name, version } = JSON.parse(
			readFileSync(join(temp, file), 'utf8')
		);
		failures.push(
			`${file.replace(/\/package\.json$/, '')}: a nested ${name}@${version}, beside the consumer's own; the package's dependencies must not install their own React`
		);
	}

	// --- Entry points ----------------------------------------------------------

	const specs = entryPointSpecifiers(pkg, manifest.exports, [
		...componentDirSubpaths(root),
		...componentFileSubpaths(root),
	]).filter((spec) => !NOT_ENTRY_POINTS.has(spec.slice(pkg.length + 1)));

	// The value exports each entry point's installed types declare, resolved
	// from a consumer folder so the tarball's `exports` map is the one applied.
	const compilerOptions: ts.CompilerOptions = {
		module: ts.ModuleKind.Preserve,
		moduleResolution: ts.ModuleResolutionKind.Bundler,
		strict: true,
		skipLibCheck: true,
		noEmit: true,
	};
	const importer = join(temp, 'esm', 'index.ts');
	const typeFiles = new Map<string, string>();
	for (const spec of specs) {
		const file = ts.resolveModuleName(
			spec,
			importer,
			compilerOptions,
			ts.sys,
			undefined,
			undefined,
			ts.ModuleKind.ESNext
		).resolvedModule?.resolvedFileName;
		if (file) typeFiles.set(spec, file);
		else
			failures.push(`${spec}: types do not resolve from the installed package`);
	}
	const program = ts.createProgram([...typeFiles.values()], compilerOptions);
	const checker = program.getTypeChecker();
	const expected: Record<string, string[]> = {};
	for (const [spec, file] of typeFiles) {
		const names = valueExportNames(checker, program.getSourceFile(file));
		// A type-only module (`components/carousel/types`) has no runtime part.
		if (names.length) expected[spec] = names;
	}

	// --- Runtime consumers -----------------------------------------------------

	for (const [kind, type, file] of [
		['esm', 'module', 'index.js'],
		['cjs', 'commonjs', 'index.js'],
	] as const) {
		const dir = join(temp, kind);
		write(join(dir, 'package.json'), { private: true, type });
		write(join(dir, file), runtimeFixtureSource(kind, expected));
		const result = spawnSync(process.execPath, [file], {
			cwd: dir,
			encoding: 'utf8',
			maxBuffer: 64 * 1024 * 1024,
		});
		let reported: string[] | undefined;
		try {
			reported = JSON.parse(result.stdout);
		} catch {
			reported = undefined;
		}
		if (result.status !== 0 || !reported) {
			failures.push(
				`${kind} consumer exited ${result.status}: ${result.stderr.trim().split('\n')[0]}`
			);
		} else {
			failures.push(...reported);
		}
	}

	// --- TypeScript consumers --------------------------------------------------

	// The repo's `tsc` (TypeScript 7, `@typescript/native`), as `npm run typecheck`
	// uses; the `typescript` package is the TypeScript 6 API.
	const tsc = join(root, 'node_modules', '.bin', 'tsc');
	const tsFixtures: Array<{
		name: string;
		type: 'module' | 'commonjs';
		options: Record<string, unknown>;
		files: string[];
	}> = [
		{
			name: 'ts-bundler',
			type: 'module',
			options: { module: 'preserve', moduleResolution: 'bundler' },
			files: ['index.ts'],
		},
		{
			name: 'ts-node16',
			type: 'commonjs',
			options: { module: 'node16', moduleResolution: 'node16' },
			files: ['index.mts', 'index.cts'],
		},
	];
	for (const { name, type, options, files } of tsFixtures) {
		const dir = join(temp, name);
		write(join(dir, 'package.json'), { private: true, type });
		write(join(dir, 'tsconfig.json'), {
			compilerOptions: {
				...options,
				target: 'es2022',
				lib: ['es2022', 'dom', 'dom.iterable'],
				jsx: 'react-jsx',
				strict: true,
				noEmit: true,
				skipLibCheck: false,
				types: [],
			},
			files,
		});
		for (const file of files) write(join(dir, file), typesFixtureSource(specs));
		const result = spawnSync(tsc, ['-p', dir, '--pretty', 'false'], {
			cwd: dir,
			encoding: 'utf8',
			maxBuffer: 64 * 1024 * 1024,
		});
		if (result.status !== 0) {
			const errors = `${result.stdout}${result.stderr}`
				.split('\n')
				.filter((line) => line.trim());
			failures.push(
				...errors.map((line) => `${name}: ${line.replace(`${temp}/`, '')}`)
			);
		}
	}

	if (failures.length) {
		console.error(
			`check-packed-install: ${failures.length} problem(s):\n` +
				failures.map((line) => `  - ${line}`).join('\n')
		);
		process.exitCode = 1;
	} else {
		log(
			`${specs.length} entry points load from the installed tarball (ESM, CJS) ` +
				`and type-check (bundler; node16 import and require).`
		);
	}
} finally {
	if (keep) log(`kept ${temp}`);
	else rmSync(temp, { recursive: true, force: true });
}
