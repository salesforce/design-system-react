// `@typescript-eslint/no-deprecated`, except that a component may use what it
// deprecates itself. During the 11.x RC a component reads its own deprecated
// props to honor them (and warn at runtime); 11.0 removes the props and these
// reads with them. Anything else stays an error: another component's deprecated
// prop, or a deprecated React or DOM API.
//
// "Itself" means the symbol is declared under the same `components/<name>/` (or
// `utilities/<name>/`) directory as the file using it, relative to
// `parserOptions.tsconfigRootDir` (the repo root). A report whose symbol can't be
// resolved is kept.
//
// The match is by directory, not by component: a file in `components/foo/` may
// use any deprecated symbol declared in `components/foo/`, even one that belongs
// to a different component exported from that directory.
import path from 'node:path';
import tseslint from 'typescript-eslint';

const upstream = tseslint.plugin.rules['no-deprecated'];

const ownerDir = (root, fileName) => {
	const parts = path.relative(root, fileName).split(path.sep);
	return ['components', 'utilities'].includes(parts[0]) && parts.length > 2
		? `${parts[0]}/${parts[1]}`
		: undefined;
};

const resolveSymbol = (services, node) => {
	const { parent } = node;
	if (parent?.type === 'JSXAttribute') {
		return services
			.getContextualType(parent.parent.name)
			?.getProperty(node.name);
	}
	if (parent?.type === 'Property' && parent.key === node) {
		return (
			services.getTypeAtLocation(parent.parent).getProperty(node.name) ??
			services.getSymbolAtLocation(node)
		);
	}
	if (parent?.type === 'MemberExpression' && parent.computed) {
		return services
			.getTypeAtLocation(parent.object)
			.getProperty(node.value ?? node.name);
	}
	return services.getSymbolAtLocation(node);
};

export default {
	meta: { ...upstream.meta, docs: { ...upstream.meta.docs, url: undefined } },
	defaultOptions: upstream.defaultOptions,
	create(context) {
		const root =
			context.languageOptions.parserOptions?.tsconfigRootDir ?? context.cwd;
		const owner = ownerDir(root, context.filename);
		if (!owner) {
			return upstream.create(context);
		}
		const services = context.sourceCode.parserServices;
		const checker = services.program.getTypeChecker();
		const isOwn = (node) => {
			let symbol = resolveSymbol(services, node);
			// eslint-disable-next-line no-bitwise
			if (symbol && symbol.flags & 2097152 /* ts.SymbolFlags.Alias */) {
				symbol = checker.getAliasedSymbol(symbol);
			}
			const declarations = symbol?.getDeclarations() ?? [];
			return (
				declarations.length > 0 &&
				declarations.every(
					(declaration) =>
						ownerDir(root, declaration.getSourceFile().fileName) === owner
				)
			);
		};
		const filtered = Object.create(context, {
			report: {
				value: (descriptor) => {
					if (!isOwn(descriptor.node)) {
						context.report(descriptor);
					}
				},
			},
		});
		return upstream.create(filtered);
	},
};
