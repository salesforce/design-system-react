import Datepicker from '~/components/date-picker';

<Datepicker
	onDateChange = {function(date){
		console.log('>>> onDateChange ', date);
	}}
/>
