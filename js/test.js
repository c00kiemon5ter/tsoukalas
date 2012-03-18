// shuffles the array - http://www.hardcode.nl/subcategory_1/article_317-array-shuffle-function
Array.prototype.shuffle = function() {
 	var len = this.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = this[i];
  	this[i] = this[p];
  	this[p] = t;
 	}
};

// http://blog.stevenlevithan.com/archives/faster-than-innerhtml
function replaceHtml(el, html) {
	var oldEl = typeof el === "string" ? document.getElementById(el) : el;
	/*@cc_on // Pure innerHTML is slightly faster in IE
		oldEl.innerHTML = html;
		return oldEl;
	@*/
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	/* Since we just removed the old element from the DOM, return a reference
	to the new element, which can be used to restore variable references. */
	return newEl;
};

// questions var already defined

/* * * * * * * * * * * * * * * * * * * * * * * * * */
if(maxquestions === undefined)
	maxquestions = 20;
var current = 0;

var useranswers = [];
var useranswer = '';
var questionsanswered = 0;

if(testtime === undefined)
	testtime = originaltesttime = 20; // seconds

questions.test.questions.shuffle();
var test = questions.test.questions.slice(0,maxquestions);
/* * * * * * * * * * * * * * * * * * * * * * * * * */

document.getElementById('time-label').innerHTML = words.time;

function showQuestion() {
	question = test[current].question;
	image = test[current].image;
	choices = test[current].choices;
	
	document.getElementById('title').innerHTML = words.question+' '+(current+1);
	document.getElementById('question').innerHTML = question;
	
	if(image!=null)
		document.getElementById('image-container').innerHTML = '<img src="../img/testDrive/'+image+'.jpg" alt="image" id="image" />';
	else
		document.getElementById('image-container').innerHTML = '';
	
	choicebox = '';
	for (var i=0;i<choices.length;i++) {
		choicebox += '<a href="#a'+i+'" id="a'+i+'"><textarea class="choice" readonly="readonly" id="'+i+'" >'+choices[i].answer+'</textarea></a>';
	}
	document.getElementById('choices').innerHTML = choicebox;
	
	answers = document.getElementsByClassName('choice');
	for(var i=0;i<answers.length;i++)
		answers[i].addEventListener('click',enableApprove,false);
	
}

var approve = document.getElementById('confirm');

function approveAnswer() {
	useranswers[current] = useranswer;
	questionsanswered++;
	nextQuestion();
}

function nextQuestion() {
	if (approve.removeEventListener)
		approve.removeEventListener('click',approveAnswer,false);
	approve.style.backgroundImage = 'url(\'../img/testDrive/apantdis.gif\')';
	if(current>=maxquestions-1)
		current = 0;
	else
		current++;
		
	useranswer = '';
	
	if(questionsanswered == maxquestions) {
		showResults();
	} else {	
		if(useranswers[current] === undefined) 
			showQuestion();
		else
			nextQuestion();
	}
}

function enableApprove(evt) {
	switch(language) {
		case '1':
		approve.style.backgroundImage = 'url(\'../img/testDrive/apantisi.gif\')';
		break;
		case '2':
		approve.style.backgroundImage = 'url(\'../img/testDrive/apantisi_en.gif\')';
		break;
		case '3':
		approve.style.backgroundImage = 'url(\'../img/testDrive/apantisi_ru.gif\')';
		break;
		case '4':
		approve.style.backgroundImage = 'url(\'../img/testDrive/apantisi_al.gif\')';
		break;
	}
	approve.addEventListener('click',approveAnswer,false);
	useranswer = evt.target.id;
}

function showResults() {
	container = document.getElementById('container');
	
	var totalwrong = 0;
	var resultstable = '';
	for(var i=0;i<maxquestions;i++) {
		if(useranswers[i] === undefined || !test[i].choices[useranswers[i]].status) {
			totalwrong++;
			resultstable += '<tr><td class="tablerow" id='+i+'>'+words.question+' '+(i+1)+'</td></tr>';
		}
	}
	
	var newHTML = '\
	<div id="results">';
	
	if(totalwrong == 1)
		newHTML += '<div id="result">'+words.onequestion+'</div>';
	else if(totalwrong > 1)
		newHTML += '<div id="result">'+words.wrong1+' '+totalwrong+' '+words.questions+'</div>';
	
	if(totalwrong > 1) {
		newHTML += '\
			<table id="results-table">';
		newHTML += resultstable;
		newHTML += '\
			</table>\
		</div>\
		<div id="description">\
		<div id="resbox"><span id="fail">'+words.failed+'</span></div>\
		</div>';
	} else if(totalwrong == 1) {
		newHTML += '\
			<table id="results-table">';
		newHTML += resultstable;
		newHTML += '\
			</table>\
		</div>\
		<div id="description">\
		<div id="resbox"><span id="pass">'+words.passed+'</span></div>\
		</div>';
	}	
	else {
		newHTML += 'ΠΕΡΑΣΕ';
	}
	
	
	switch(language) {
	case '1':
	newHTML += '<img class="menuimg" src="../img/testDrive/arhikh.gif" id="home-res" alt="home" />';
	break;
	case '2':
	newHTML += '<img class="menuimg" src="../img/testDrive/arhikh_en.gif" id="home-res" alt="home" />';
	break;
	case '3':
	newHTML += '<img class="menuimg" src="../img/testDrive/arhikh_ru.gif" id="home-res" alt="home" />';
	break;
	case '4':
	newHTML += '<img class="menuimg" src="../img/testDrive/arhikh_al.gif" id="home-res" alt="home" />';
	break;
}
	
	replaceHtml(container, newHTML);
	
	tablerows = document.getElementsByClassName('tablerow');
	for(var i=0;i<tablerows.length;i++) {
		tablerows[i].addEventListener('mouseover',showDescription,false);
		tablerows[i].addEventListener('mouseout',recoverDescription,false);
	}
	
	// home button listener	
	home = document.getElementById('home-res');
	home.addEventListener('click',function() {window.location = "index.html";},false);	
}

var tmpdescription = '';

function showDescription(e) {
	description = document.getElementById('description');
	tmpdescription = description.innerHTML;
	
	correct = '';
	
	// find correct answer
	for(var i=0;i<test[e.target.id].choices.length;i++) {
		if(test[e.target.id].choices[i].status == true) {
			correct = test[e.target.id].choices[i].answer;
			break;
		}
	}
	
	
	img='<div id="image-box-res"><div id="image-container-res"></div></div>';
	if(test[e.target.id].image !== null)
		img = '<div id="image-box-res"><div id="image-container-res"><img id="img-res" src="../img/testDrive/'+test[e.target.id].image+'.jpg" alt="image" /></div></div>';
	
	if(useranswers[e.target.id] !== undefined)
		description.innerHTML = img+'\
		<div class="box"><span class="white gradient">'+words.inthequestion+'\
		</span><br/>'+test[e.target.id].question+'</div><br/><div class="bluebox"><span class="white">\
		'+words.answered+'</span><br/>'+test[e.target.id].choices[useranswers[e.target.id]].answer+'</div>\
			<br/><div class="pinkbox"><span class="white">'+words.rightanswer+'</span><br/>'+correct+'</div>';
	else
		description.innerHTML = img+'\
		<div class="box"><span class="white gradient">'+words.inthequestion+'</span><br/>\
		'+test[e.target.id].question+'</div><br/><div class="bluebox"><span class="white">'+words.notanswered+'</span></div><br/>\
			<br/><div class="pinkbox"><span class="white">'+words.rightanswer+'</span><br/>'+correct+'</div>';
}

function recoverDescription() {
	description = document.getElementById('description');
	description.innerHTML = tmpdescription;
	tmpdescription = '';
}

function timer() {
	if(testtime<=0) {
		showResults();
	}
	else {
		testtime--;
		drawTimebar();
		setTimeout("timer()",1000);
	}
}

function drawTimebar() {
	var canvas = document.getElementById("time-progress");
	var context = canvas.getContext("2d");
	
	context.fillStyle="#FF0000";
	if(testtime!=0)
		width = canvas.width/(originaltesttime) * (originaltesttime - testtime);
	else
		width = canvas.width;
	context.fillRect(0,0,width,canvas.height);
}

function Escape(e) {
	if (e.keyCode == 27) {
		var answer = confirm (words.escape);
		if(answer)
			showResults();
	}
}

showQuestion();

nextbut = document.getElementById('next');
nextbut.addEventListener('click',nextQuestion,false);

switch(language) {
	case '2':
	nextbut.style.backgroundImage = 'url(\'../img/testDrive/epomeni3_en.gif\')';
	break;
	case '3':
	nextbut.style.backgroundImage = 'url(\'../img/testDrive/epomeni3_ru.gif\')';
	break;
	case '4':
	nextbut.style.backgroundImage = 'url(\'../img/testDrive/epomeni3_al.gif\')';
	break;
}

timer();

document.addEventListener('keyup',Escape,false);
