const ExampleEvents = {
	fireExampleEvent (details) {
		const exampleMethod = new CustomEvent('exampleMethod',
			{ detail:
				{
					control: details.control,
					callbackMethod: details.callbackMethod,
					parameters: details.parametersObject
				}
			});
		document.documentElement.dispatchEvent(exampleMethod);
	},

	registerEventListener (controlContext, control, eventName) {
		document.documentElement.addEventListener(eventName, function (e) {
			if (e.detail.control === control) controlContext[e.detail.callbackMethod]();
		}, false);
	}
};

export default ExampleEvents;
