var interval = null;
var temps = 0;
var ontouch = false;

function envoieBouton(key, min, max, param){
    switch (key) {
    case 1:
        interval = setInterval(() => { envoieSocket(param, min.toString()); temps++; }, 100);
        ontouch = true;
        break;
    case 2:
        if(interval)clearInterval(interval);
        if(temps < 1)envoieSocket(param, max.toString());
        temps = 0;
        break;
    default:
        if(!ontouch)envoieSocket(param, max.toString());
        break;
    }
}

function noir(zindex) {
	let popup = document.getElementById("popup1");
	popup.style.visibility = "visible";
	//popup.style.top = "0%";
    popup.style.opacity = 1;
    popup.style.zIndex = zindex;

	let overlay = document.getElementById("pageNoire");
	overlay.style.opacity = 1;
	overlay.style.visibility = "visible";
	document.getElementById("body").style.overflow = "hidden";

	//document.getElementById("popup3").onscroll = function () { myFunction() };
	return false;
}

function cacher_noir() {
	let popup = document.getElementById("popup1");
	popup.style.visibility = "hidden";
	//popup.style.top = "50%";
    popup.style.opacity = 0;
    popup.style.zIndex = -3000;

	let overlay = document.getElementById("pageNoire");
	overlay.style.opacity = 0;
	overlay.style.visibility = "hidden";
	document.getElementById("body").style.overflow = "scroll";
}