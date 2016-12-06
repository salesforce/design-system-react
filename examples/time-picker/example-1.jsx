import Timepicker from '~/components/time-picker';

<Timepicker 
	stepInMinutes={30}
	onDateChange = {function(date, inputStr){
		console.log('>>> onDateChange ', date, ' inputStr: ',inputStr);
	}}
/>