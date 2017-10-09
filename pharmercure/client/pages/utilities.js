/**
 * Format a date ad dd-MMM-yyyy
 * @param {Object} date - the date to be formatted
 * @return {String}  the string containing the formatted date
 */
function formatDate(date) {
  var monthNames = [
	"JAN", "FEB", "MAR",
	"APR", "MAY", "JUN", "JUL",
	"AUG", "SEP", "OCT",
	"NOV", "DEC"
  ];

  var hour = date.getHours();
  var minute = date.getMinutes();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  return formatNumber(day,2) + '/' + monthNames[month] + '/' + year + '\t' + formatNumber(hour,2) + ':' + formatNumber(minute,2);
}

/**
 * Format a code adding some zeros where some digits are missing
 * @param {Number} id - the initial not formatted code
 * @param {Number} maxDigits - the number of digits to reach
 * @return {Number}  formattedId - the formatted code
 */
function formatNumber(num,maxDigits) {
	var initialNumberOfDigits = countDigits(num);
	var zeros;
	if(num != 0) {
		zeros = maxDigits - initialNumberOfDigits;
	} else {
		zeros = maxDigits - initialNumberOfDigits - 1;
	}
	var formattedId = '';

	for(var i = 0; i < zeros; i++){
		formattedId += '0';
	}
	formattedId += num;

	return formattedId;
}

/**
 * Count the digits of an integer number
 * @param {Number} number - the number to be checked
 * @return {Number}  digits - the number of digits
 */
function countDigits(number) {
	//calculate the number of digits of the id
	var digits = 0;
	do{
		if(number >= 1){
			number /= 10;
			digits++;
		}	
	}while(number >= 1);

	return digits;
}
