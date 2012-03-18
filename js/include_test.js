// read vars from url - http://www.boutell.com/newfaq/creating/scriptpass.html

var query = window.location.search;
// Skip the leading ?, which should always be there, 
// but be careful anyway
if (query.substring(0, 1) == '?') {
	query = query.substring(1);
}

var data = query.split(','); 
for (i = 0; (i < data.length); i++) {
	data[i] = unescape(data[i]);
}

if(data[0] !== undefined && data[0] != '')
	category = data[0];
else
	category = '1';

if(data[1] !== undefined && data[1] != '')
	language = data[1];
else
	language = '1';

json = '../js/test/questions_';

switch(category) {
	case '1':
		json += 'car_';
		var testtime = originaltesttime = 35 * 60; // 30 min
		var maxquestions = 20;
		break;
	case '2':
		var testtime = originaltesttime = 15 * 60; // 15 min
		var maxquestions = 10;
		json += 'moto_';
		break;
	case '3':
		var testtime = originaltesttime = 15 * 60; // 15 min
		var maxquestions = 10;
		json += 'truck_';
		break;
	case '4':
		var testtime = originaltesttime = 15 * 60; // 15 min
		var maxquestions = 10;
		json += 'bus_';
		break;
}

switch(language) {
	case '1':
		$.getScript('../js/test/misc_el.js');
		json += 'gr.js';
		break;
	case '2':
		$.getScript('../js/test/misc_en.js');
		json += 'en.js';
		break;
	case '3':
		$.getScript('../js/test/misc_ru.js');
		json += 'ru.js';
		break;
	case '4':
		$.getScript('../js/test/misc_al.js');
		json += 'al.js';
		break;
}

$.getScript(json,function() {$.getScript('../js/test.js');});
