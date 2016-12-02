import Timepicker from 'design-system-react/components/time-picker';

<Timepicker 
	stepInMinutes={30}
	onDateChange = {function(date, inputStr){
		console.log('>>> onDateChange ', date, ' inputStr: ',inputStr);
	}}
/>