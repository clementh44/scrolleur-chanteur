/*actualisation de la taille des bloc séparateur entre chaque chant*/
function updateSeparator() {
	$.each($(".separator"), function () {
		this.style.height = window.innerHeight + 50 + "px"; //+50px pour avoir de la marge lors du scroll avec la souris
	});
}

/*changement du thème en alternance noir/blanc*/
function changeTheme(theme) {
	$("body").removeClass().addClass(theme);
}

/*changement des marges de la liste des chants*/
function changeMargin(marginClass) {
	$("#listeParoles").removeClass().addClass(marginClass);
}

/*attache ou détache les boutons de personnalisation*/
function toggleTopButtons(element) {
	$("#paramButtons").toggleClass("sticky");
	$(element).toggleClass("active");
}

/*change tout les refrains en flottant ou non*/
function toggleRefrain(element) {
	$(".refrain").toggleClass("sticky");
	$(element).children("i").toggleClass("fa-square fa-check-square");
}

/*modification de l'arrière-plan par une vidéo ou une photo*/
function changeCustomBackground(file) {
	var reader = new FileReader(),
		div = $("#customBackground");

	if (file.type.includes("video")) {
		cleanBackground();
		reader.addEventListener('load', function () {
			div.append("<video id='customBackgroundElement' autoplay loop muted><source src='" + this.result + "'></video>");
		});

		reader.readAsDataURL(file);
	} else {
		if (file.type.includes("image")) {
			cleanBackground();
			reader.addEventListener('load', function () {
				div.append("<img id='customBackgroundElement' src='" + this.result + "'></img>");
			});

			reader.readAsDataURL(file);
		};
	};

	/*les refrains ne doivent pas être volant (cela affiche un fond sinon)*/
	$(".refrain").removeClass("sticky");
	$("#paramStickyRefrain").children("i").toggleClass("fa-square fa-check-square");
}

/*suppression en fondu de l'arrière-plan*/
function cleanBackground() {
	$("#customBackgroundElement").fadeOut(1000, function () {
		$("#customBackgroundElement").remove();
	});
}

/*affichage ecran noir (tout en bas de la page)*/
function goToBottom() {
	document.documentElement.scrollTop = document.body.scrollHeight;
	document.body.scrollTop = document.body.scrollHeight;
	//cleanBackground(); //Suppression de l'arrière plan à ce moment là ? mettre en paramètre ?
}
function goToBottomChant() {
	document.getElementById("popup2").scrollTop = document.getElementById("popup2").scrollHeight;
	envoieSocket("Bottom", "ok");
}
function goToTopChant() {
	document.getElementById("popup2").scrollTop = 0;
	envoieSocket("Top", "ok");
}
var toDown = 0;
var goDown = 1;
function goToDown(){
	var d = new Date();
	if(d.getMilliseconds() + d.getSeconds()*1000 - toDown < 1000)goDown++;
	else goDown = 1;
	toDown = d.getMilliseconds() + d.getSeconds()*1000;
	envoieSocket("Down", goDown.toString());
}
var toUp = 0;
var goUp = 1;
function goToUp(){
	var d = new Date();
	if(d.getMilliseconds() + d.getSeconds()*1000 - toUp < 1000)goUp++;
	else goUp = 1;
	toUp = d.getMilliseconds() + d.getSeconds()*1000;
	envoieSocket("Up", goUp.toString());
}
var toLeft = 0;
var goLeft = 1;
function goToLeft(){
	var d = new Date();
	if(d.getMilliseconds() + d.getSeconds()*1000 - toLeft < 1000)goLeft++;
	else goLeft = 1;
	toLeft = d.getMilliseconds() + d.getSeconds()*1000;
	envoieSocket("Left", goLeft.toString());
}
var toRight = 0;
var goRight = 1;
function goToRight(){
	var d = new Date();
	if(d.getMilliseconds() + d.getSeconds()*1000 - toRight < 1000)goRight++;
	else goRight = 1;
	toRight = d.getMilliseconds() + d.getSeconds()*1000;
	envoieSocket("Right", goRight.toString());
}
var zoomPlus = 0;
var zoomplus = 1;
function toZoomPlus(){
	var d = new Date();
	if(d.getMilliseconds() + d.getSeconds()*1000 - zoomPlus < 1000)zoomplus++;
	else zoomplus = 1;
	zoomPlus = d.getMilliseconds() + d.getSeconds()*1000;
	envoieSocket("zoomPlus", zoomplus.toString());
}
var zoomMoins = 0;
var zoommoins = 1;
function toZoomMoins(){
	var d = new Date();
	if(d.getMilliseconds() + d.getSeconds()*1000 - zoomMoins < 1000)zoommoins++;
	else zoommoins = 1;
	zoomMoins = d.getMilliseconds() + d.getSeconds()*1000;
	envoieSocket("zoomMoins", zoommoins.toString());
}
function affParam() {
	var all = document.getElementsByClassName('btn');
	for (var i = 0; i < all.length; i++) {
		if(all[i].style.visibility == "hidden")all[i].style.visibility = 'visible';
		else all[i].style.visibility = 'hidden';
	}
}


//https://gist.github.com/oziks/3664787
jQuery.expr[':'].contains = function (a, i, m) {
	var rExps = [
		{ re: /[\xC0-\xC6]/g, ch: "A" },
		{ re: /[\xE0-\xE6]/g, ch: "a" },
		{ re: /[\xC8-\xCB]/g, ch: "E" },
		{ re: /[\xE8-\xEB]/g, ch: "e" },
		{ re: /[\xCC-\xCF]/g, ch: "I" },
		{ re: /[\xEC-\xEF]/g, ch: "i" },
		{ re: /[\xD2-\xD6]/g, ch: "O" },
		{ re: /[\xF2-\xF6]/g, ch: "o" },
		{ re: /[\xD9-\xDC]/g, ch: "U" },
		{ re: /[\xF9-\xFC]/g, ch: "u" },
		{ re: /[\xC7-\xE7]/g, ch: "c" },
		{ re: /[\xD1]/g, ch: "N" },
		{ re: /[\xF1]/g, ch: "n" }
	];

	var element = $(a).text();
	var search = m[3];

	$.each(rExps, function () {
		element = element.replace(this.re, this.ch);
		search = search.replace(this.re, this.ch);
	});

	return element.toUpperCase()
		.indexOf(search.toUpperCase()) >= 0;
};

/*mise à jour du lien vers le chant suivant*/
function updateNext(next) {
	var btn = $("#nextBtn")[0];
	btn.href = next;
	btn.classList.remove("disabled");
	var btn = $("#nextBtn2")[0];
	btn.href = next;
	btn.classList.remove("disabled");
	var btn = $("#nextBtn3")[0];
	document.getElementById('nextBtn3').setAttribute("onclick", "window.location.href ='" + next + "'");
	btn.classList.remove("disabled");	
}

function sortByProperty(objArray, prop, direction) {
	const clone = objArray.slice(0);
	const direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending
	const propPath = (prop.constructor === Array) ? prop : prop.split(".");
	clone.sort(function (a, b) {
		for (let p in propPath) {
			if (a[propPath[p]] && b[propPath[p]]) {
				a = a[propPath[p]];
				b = b[propPath[p]];
			}
		}
		// convert numeric strings to integers
		a = a.match(/^\d+$/) ? +a : a;
		b = b.match(/^\d+$/) ? +b : b;
		return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
	});
	return clone;
}


function main() {
	/*window.addEventListener('beforeunload', (event) => {
		event.returnValue = "Rafraichir la page réinitialise son contenue (zones personnlisées, paramètres modifiés)";
	});*/

	//Tri des chants
	chants = sortByProperty(chants, "attributes.id");

	//Construction du sommaire et de la liste déroulante en même temps
	var sommaireHtml = new Array;
	var filtreHtml = new Array;
	var letter = '';

	$.each(chants, function (key, val) {
		if (val.id.charAt(0) != letter) {
			sommaireHtml.push('<p><a name="' + val.id.charAt(0) + '"></a>' + val.id.charAt(0).toUpperCase() + '</p>');
			filtreHtml.push('<span class="dropdown-header p-1">' + val.id.charAt(0).toUpperCase() + '</span>');
			letter = val.id.charAt(0);
		}
		sommaireHtml.push('<p><a href="#' + val.id + '">' + val.titre + '</a></p>');
		filtreHtml.push('<button onclick="updateNext(\'#' + val.id + '\')" class="dropdown-item text-truncate text-light bg-dark p-1" style="cursor:pointer;" type="button">' + val.titre + '</button>');
	});

	$("#sommaire").html(sommaireHtml.join(''));
	$("#filterList").html(filtreHtml.join(''));
	$("#filterList2").html(filtreHtml.join(''));
	$("#filterList3").html(filtreHtml.join(''));

	//Construction des blocks de paroles
	/*var chantsHtml = new Array;

	$.each(chants, function (key, val) {
		var block;

		//block principal
		chantsHtml.push('<div class="paroles-block" id="' + val.id + '">');

		//Titre
		chantsHtml.push('<p class="titre">' + val.titre + '</p>');

		//Paroles
		for (var i = 0; i < val.paroles.length; i++) {
			block = val.paroles[i];
			next = val.paroles[i + 1];
			if (block.type == "refrain" || block.type == "couplet") {
				chantsHtml.push('<div class="couplet' + i + " " + (block.type == "refrain" ? 'refrain sticky">' : (block.type == "couplet" ? 'couplet show">' : "")));
				chantsHtml.push(block.text.replace(/\n/g, "<br/>"));

				//sous-block de traduction
				if (next && next.type == "traduction") {
					chantsHtml.push('<div class="traduction">');
					chantsHtml.push(next.text.replace(/\n/g, "<br/>"));
					chantsHtml.push('</div>');
				}
				chantsHtml.push('</div>');
			}
		}

		chantsHtml.push('</div>');
		chantsHtml.push('<div class="separator"></div>');
	});*/

	//$("#listeParoles").html(chantsHtml.join(''));

	//Mise à jour constante des parties vides pour suivre la taille de la fenêtre
	$(window).resize(updateSeparator);
	updateSeparator();

	/*//Clic sur couplet = cacher/montrer
	$(".couplet").click(function (event) {
		//$(this).toggleClass("show hide");
		hideCouplet(this.classList[0].toString(), null);
		envoieSocket('couplet', this.classList.toString());
	});

	//Clic sur refrain = fixe/scroll
	$(".refrain").click(function (event) {
		//$(this).toggleClass("sticky ");
		stickyRefrain(this.classList[0].toString(), null);
		envoieSocket('refrain', this.classList.toString());
	});*/

	//Fonction de recherche
	$("#searchInput").on("keyup", function () {
		$("#filterList .dropdown-item").show();
		$("#filterList .dropdown-header").show();
		if (this.value != "") {
			//cache les chants ne contenant pas le terme recherché
			$("#filterList .dropdown-item:not(:contains('" + this.value + "'))").hide();

			//cache les lettres n'ayants aucun chants
			$.each($("#filterList .dropdown-header"), function () {
				var nb = $(this).nextUntil(".dropdown-header", ".dropdown-item:visible").length;
				if (nb == 0) {
					$(this).hide();
				}
			});
		};
	});
	$("#searchInput2").on("keyup", function () {
		$("#filterList2 .dropdown-item").show();
		$("#filterList2 .dropdown-header").show();
		if (this.value != "") {
			//cache les chants ne contenant pas le terme recherché
			$("#filterList2 .dropdown-item:not(:contains('" + this.value + "'))").hide();

			//cache les lettres n'ayants aucun chants
			$.each($("#filterList2 .dropdown-header"), function () {
				var nb = $(this).nextUntil(".dropdown-header", ".dropdown-item:visible").length;
				if (nb == 0) {
					$(this).hide();
				}
			});
		};
	});
	$("#searchInput3").on("keyup", function () {
		$("#filterList3 .dropdown-item").show();
		$("#filterList3 .dropdown-header").show();
		if (this.value != "") {
			//cache les chants ne contenant pas le terme recherché
			$("#filterList3 .dropdown-item:not(:contains('" + this.value + "'))").hide();

			//cache les lettres n'ayants aucun chants
			$.each($("#filterList3 .dropdown-header"), function () {
				var nb = $(this).nextUntil(".dropdown-header", ".dropdown-item:visible").length;
				if (nb == 0) {
					$(this).hide();
				}
			});
		};
	});
	cacher_noir();
}


$(document).ready(function () {
	main();
});

function getParoles(id) {
	$('#listeParoles').html('');

	$.ajax({
		type: 'GET',
		url: 'php/getChant.php',
		data: 'chant=' + encodeURIComponent(id),
		success: function (data) {
			if (data != "") {
				console.log(data);
				//document.getElementById(lettre).innerHTML = result;
				//$('#result-search').append(result).trigger('update');
				console.log(data.split('\n'));
				aff_chant(id, data.split('\n'));
			} else {
				console.log("ERR: pas de retour getChant");
				//document.getElementById('result-search').innerHTML = "Aucun chant"
			}
		}
	});
}

function aff_chant(id, texte) {
	var chantsHtml = new Array;
	var block = new Array;

	//block principal
	chantsHtml.push('<div class="paroles-block" id="' + id + '" style="margin-bottom:1500px">');

	//Titre
	chantsHtml.push('<p class="titre">' + texte[0] + '</p>');

	//var type = new Array;

	var j = 0;
	while (j < texte.length) {
		if (texte[j].charAt(0) == '#') {
			var type = null;
			if (texte[j].charAt(2) == 'r') type = "refrain";
			else if (texte[j].charAt(2) == 'c') type = "couplet";
			else if (texte[j].charAt(2) == 't') type = "traduction";
			else console.log("ERR : type inconnu, " + texte[j]);

			if (type) {
				var text = "";
				j++;
				while (j < texte.length && texte[j].charAt(0) != '#') {
					text += texte[j] + '\n';
					j++;
				}
				var temp = {
					type: type,
					texte: text
				};
				block.push(temp);
			}
		} else {
			j++;
		}
	}
	console.log(block);

	//Paroles
	for (var i = 0; i < block.length; i++) {
		next = block[i + 1];
		if (block[i].type == "refrain" || block[i].type == "couplet") {
			chantsHtml.push('<div class="couplet' + i + " " + (block[i].type == "refrain" ? 'refrain sticky">' : (block[i].type == "couplet" ? 'couplet show">' : "")));
			chantsHtml.push(block[i].texte.replace(/\n/g, "<br/>"));

			//sous-block de traduction
			if (next && next.type == "traduction") {
				chantsHtml.push('<div class="traduction">');
				chantsHtml.push(next.texte.replace(/\n/g, "<br/>"));
				chantsHtml.push('</div>');
			}
			chantsHtml.push('</div>');
		}
	}
	chantsHtml.push('</div>');
	chantsHtml.push('<div class="separator"></div>');

	console.log(chantsHtml);
	$("#listeParoles").html(chantsHtml.join(''));

	//Clic sur couplet = cacher/montrer
	$(".couplet").click(function (event) {
		//$(this).toggleClass("show hide");
		hideCouplet(this.classList[0].toString(), null);
		envoieSocket('couplet', this.classList.toString());
	});

	//Clic sur refrain = fixe/scroll
	$(".refrain").click(function (event) {
		//$(this).toggleClass("sticky ");
		stickyRefrain(this.classList[0].toString(), null);
		envoieSocket('refrain', this.classList.toString());
	});

	commandeCoupletRefrain(block);
}

function renommer() {
	noir(900);
	let popup = document.getElementById("popup2");
	popup.style.visibility = "visible";
	//popup.style.top = "0%";
	popup.style.opacity = 1;

	let overlay = document.getElementById("renommer_form");
	overlay.style.opacity = 1;
	overlay.style.visibility = "visible";
	document.getElementById("body").style.overflow = "hidden";

	//document.getElementById("popup2").onscroll = function () { myFunction() };
	return false;
}

function cacher_renommer() {
	let popup = document.getElementById("popup2");
	popup.style.visibility = "hidden";
	//popup.style.top = "50%";
	popup.style.opacity = 0;

	let overlay = document.getElementById("renommer_form");
	overlay.style.opacity = 0;
	overlay.style.visibility = "hidden";
	document.getElementById("body").style.overflow = "scroll";
	cacher_noir();
}

function telecommande() {
	let popup = document.getElementById("popup3");
	popup.style.visibility = "visible";
	//popup.style.top = "0%";
	popup.style.opacity = 1;

	let overlay = document.getElementById("renommer_form");
	overlay.style.opacity = 1;
	overlay.style.visibility = "visible";
	document.getElementById("body").style.overflow = "hidden";

	//document.getElementById("popup3").onscroll = function () { myFunction() };
	return false;
}

function cacher_telecommande() {
	let popup = document.getElementById("popup3");
	popup.style.visibility = "hidden";
	//popup.style.top = "50%";
	popup.style.opacity = 0;

	let overlay = document.getElementById("renommer_form");
	overlay.style.opacity = 0;
	overlay.style.visibility = "hidden";
	document.getElementById("body").style.overflow = "scroll";
}

function commandeCoupletRefrain(block){
	var refrain = 1;
	var couplet = 1;
	var chantsHtml = new Array;
	chantsHtml.push('<label style="width:100%">Affichage des couplets/refrains</label>')
	for(var i=0; i<block.length; i++){
		if(block[i].type.localeCompare("refrain")==0){
			console.log("refrain");
			chantsHtml.push('<button style="width:100%" onclick="envoieSocket(\'refrain\', \'couplet'+i.toString()+'\')">Refrain '+refrain.toString()+'</button>');
			refrain++;
		} else {
			console.log("couplet");
			chantsHtml.push('<button style="width:100%" onclick="envoieSocket(\'couplet\', \'couplet'+i.toString()+'\')">Couplet '+couplet.toString()+'</button>');
			couplet++;
		}
	}
	$("#coupletRefrain").html(chantsHtml.join(''));
}
