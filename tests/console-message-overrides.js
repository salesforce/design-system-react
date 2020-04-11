const consoleMessageOverrides = (function(...args) {
	const { error, warn } = console;

	console.error = function(message) {
		error.apply(console, args);
		throw message instanceof Error ? message : new Error(message);
	};

	console.warn = function(message) {
		warn.apply(console, args);
		throw message instanceof Error ? message : new Error(message);
	};

	return { error, errorNew: console.error, warn, warnNew: console.warn };
})();

export default consoleMessageOverrides;
