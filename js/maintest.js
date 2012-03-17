var language=1; /* greek */
var category=1; /* car */

function startCarTest() {
	window.location = "test.html?1,"+language;
}

function startMotoTest() {
	window.location = "test.html?2,"+language;
}

function startTruckTest() {
	window.location = "test.html?3,"+language;
}

function startBusTest() {
	window.location = "test.html?4,"+language;
}

lang = document.getElementById('language');
home = document.getElementById('home');
instructions = document.getElementById('instructions');
car = document.getElementById('car');
moto = document.getElementById('moto');
truck = document.getElementById('truck');
bus = document.getElementById('bus');

function changeLanguage() {
	
	if(language < 5) {
		language++;
		switch(language) {
			case 1:
				lang.src = '../img/testDrive/greek.jpg';
				home.src = '../img/testDrive/arhikh.gif';
				instructions.src = '../img/testDrive/odhgies.jpg';
				car.src = '../img/testDrive/bauto.gif';
				moto.src = '../img/testDrive/bmoto.gif';
				truck.src = '../img/testDrive/bfortiga.gif';
				bus.src = '../img/testDrive/bleofor.gif';			
				break;
			case 2:
				lang.src = '../img/testDrive/en.jpg';
				home.src = '../img/testDrive/arhikh_en.gif';
				instructions.src = '../img/testDrive/odhgies_en.jpg';
				car.src = '../img/testDrive/bauto_en.gif';
				moto.src = '../img/testDrive/bmoto_en.gif';
				truck.src = '../img/testDrive/bfortiga_en.gif';
				bus.src = '../img/testDrive/bleofor_en.gif';	
				break;
			case 3:
				lang.src = '../img/testDrive/ru.jpg';
				home.src = '../img/testDrive/arhikh_ru.gif';
				instructions.src = '../img/testDrive/odhgies_ru.jpg';
				car.src = '../img/testDrive/bauto_ru.gif';
				moto.src = '../img/testDrive/bmoto_ru.gif';
				truck.src = '../img/testDrive/bfortiga_ru.gif';
				bus.src = '../img/testDrive/bleofor_ru.gif';	
				break;
			case 4:
				lang.src = '../img/testDrive/al.jpg';
				home.src = '../img/testDrive/arhikh_al.gif';
				instructions.src = '../img/testDrive/odhgies_al.jpg';
				car.src = '../img/testDrive/bauto_al.gif';
				moto.src = '../img/testDrive/bmoto_al.gif';
				truck.src = '../img/testDrive/bfortiga_al.gif';
				bus.src = '../img/testDrive/bleofor_al.gif';	
				break;
		}
	}
	if(language >= 5) {
		language = 1;
		lang.src = '../img/testDrive/greek.jpg';
		home.src = '../img/testDrive/arhikh.gif';
		instructions.src = '../img/testDrive/odhgies.jpg';
		car.src = '../img/testDrive/bauto.gif';
		moto.src = '../img/testDrive/bmoto.gif';
		truck.src = '../img/testDrive/bfortiga.gif';
		bus.src = '../img/testDrive/bleofor.gif';
	}
}

car = document.getElementById('car');
car.addEventListener('click',startCarTest,false);

moto = document.getElementById('moto');
moto.addEventListener('click',startMotoTest,false);

truck = document.getElementById('truck');
truck.addEventListener('click',startTruckTest,false);

bus = document.getElementById('bus');
bus.addEventListener('click',startBusTest,false);

lang.addEventListener('click',changeLanguage,false);

home = document.getElementById('home');
home.addEventListener('click',function() {window.location = "..";},false);

$('#instructions').colorbox({href: '../img/testDrive/help.gif'}); 
