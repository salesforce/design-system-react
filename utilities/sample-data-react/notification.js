const collection = [
	{
		text: 'Base System Alert',
		theme: ''
	},
	{
		text: 'Scheduled Maintenance Notification: Sunday March 15, 8:00 AM-10:00 PST',
		theme: 'success'
	},
	{
		text: 'Your browser is currently not supported. Your Salesforce may be degraded.',
		theme: 'error'
	},
	{
		text: 'You are in offline mode.',
		theme: 'offline'
	}
];

module.exports = {
	default: {
		collection: collection
	}
};
