var ws;

function init() {
  ws = new WebSocket("ws://192.168.0.42:8100");

  // début connection
  ws.onopen = function (event) {
    ws.send('{ "type":"init", "content":"' + document.body.offsetHeight + '"}');
  };

  // arrivée de messages
  ws.onmessage = function (event) {
    var message = JSON.parse(event.data);
    switch (message.type) {
      case "ping":
        setTimeout(() => {
          envoieSocket("ping","ok");
          //ws.send('{ "type":"ping", "content":"ok"}');
        }, 100);
        break;
      case "text":
        dispMessage(message.content);
        break;
      case 'offsetHight':
        console.log("recu offsetHight");
        adapteFontSize(message.content);
        break;
      case 'lien':
        window.location.href = message.content;
        /*getParoles(lien[lien.length-1].substr(1));
    renommer();*/
        break;
      case 'couplet':
        hideCouplet(message.content);
        break;
      case 'refrain' :
        stickyRefrain(message.content);
        break;
      case "scroll":
        /*var scroll = parseInt(message.content);
        if(scroll > -200 && scroll < 200)window.scrollBy(0,scroll);
        interdiction_scroll = true;
        ticking = false;*/
        break;
      case "Up":
        document.getElementById("popup2").scrollTop = document.getElementById("popup2").scrollTop - 10*parseInt(message.content);
        break;
      case "Left":
        var left = document.getElementById("popup2").style.left;
        if(left == "")document.getElementById("popup2").style.left = "0px";
        else document.getElementById("popup2").style.left = (parseInt(left.substring(0,left.length-2)) - parseInt(message.content)*10).toString() + "px";
        break;
      case "Zoom":
        var all = document.getElementsByClassName('black-theme');
        for (var i = 0; i < all.length; i++) {
          if(i==0)console.log(all[i].style.fontSize);
          if(all[i].style.fontSize == "")all[i].style.fontSize = '2em';
          else all[i].style.fontSize = (parseFloat(all[i].style.fontSize.substring(0,all[i].style.fontSize.length-2))+0.01*parseInt(message.content)).toString() + 'em';
          if(i==0)console.log(all[i].style.fontSize);
        }
        break;
      case "Bottom":
        document.getElementById("popup2").scrollTop = document.getElementById("popup2").scrollHeight;
        break;
      case "Top":
        document.getElementById("popup2").scrollTop = 0;
        break;
      case "Cacher":
        if(parseInt(message.content)<0)cacher_noir();
        else noir(parseInt(message.content));
      break;
      default:  
        break;
    }
  };

  ws.onerror = function(err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
  };

  ws.onclose = function(e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
      init();
    }, 5000);
  };
}
init();


/**
 * Permet d'envoyer un message via websocket
 * @param {String} type  type de donnée
 * @param {String} texte infos correspondant au type
 */
function envoieSocket(type, texte) {
  if(ws.OPEN)ws.send('{ "type": "' + type + '", "content":"' + texte + '"}');
  else console.log("ERR : pas de connection avec le serveur");
}




var position_scroll = 0;
var ancien_scroll = 0;
var ticking = false;
var interdiction_scroll = false;

/**
 * Evenement scroll afin de l'envoyer sur tous les écrans
 *//*
window.addEventListener('scroll', function (e) {
  if(!interdiction_scroll){
    position_scroll = window.scrollY;
    if (!ticking) {
      setTimeout(() => {
        window.requestAnimationFrame(function () {
          console.log(position_scroll);
          envoieSocket("scroll", (position_scroll-ancien_scroll).toString());
          ancien_scroll = position_scroll;
          ticking = false;
        });
      }, 100);
    }
    ticking = true;
  }
  interdiction_scroll = false;
});*/



function myFunction() {
  console.log(document.getElementById("popup2").scrollTop);
}

/**
 * Permet d'adapter la taille du texte pour tous les écrans
 * @param {int} offsetHeight  taille total en pixel du body
 */
function adapteFontSize(offsetHeight){
  /*console.log("debut adaptation :");
  console.log("actuel : " + document.body.offsetHeight.toString() + " devrait être : " + offsetHeight);
  var em = "1em";
  var k=0;
  var all = document.getElementsByClassName('black-theme');
  for (var i = 0; i < all.length; i++) {
    all[i].style.fontSize = "1em";
  }
  while(document.body.offsetHeight < offsetHeight && k<40) {
    var all = document.getElementsByClassName('black-theme');
    for (var i = 0; i < all.length; i++) {
      console.log("em : " + em);
      var valeur = em.substr(0,em.length-2);
      all[i].style.fontSize = (parseInt(valeur)+0.4*k).toString() + 'em';
    }
    console.log("incre k");
    k++;
  }

  console.log("fin adaptation :");
  console.log(k);
  console.log(document.body.offsetHeight);*/

}

/**
 * Détection du déplacement à l'aide de liens
 */
$(window).bind('hashchange', function() {
  var localisation = window.location.toString();
  var lien = localisation.split("/");
  if(lien[lien.length-1].length > 2){
    //envoieSocket('lien', window.location.toString());   // on envoie le lien aux autres écrans

    for(var i=0; i<15; i++)hideCouplet("couplet" + i.toString(), true);   // on reset l'affichage des couplets
    for(var i=0; i<15; i++)stickyRefrain("couplet" + i.toString(), true); // idem pour les refrains
    getParoles(lien[lien.length-1].substr(1));
    renommer();
  }
});

/**
 * permet d'afficher ou non un couplet
 * @param {String} numeroCouplet  // class affecté
 * @param {*} hide                // reset ou pas
 */
function hideCouplet(numeroCouplet, hide){
	var all = document.getElementsByClassName(numeroCouplet);
	for(var i=0; i<all.length; i++){
    if(hide == null){
      if(all[i].style.opacity == 1 || all[i].style.opacity == ""){
        all[i].style.opacity = 0.1;
      } else {
        all[i].style.opacity = 1;
      }
    } else {
      all[i].style.opacity = 1;
    }
		
	}
}

/**
 * permet de gérer si le refrain est statique ou non
 * @param {String} numeroCouplet  // class affecté
 * @param {*} hide                // reset ou pas
 */
function stickyRefrain(numeroCouplet, hide){
	var all = document.getElementsByClassName(numeroCouplet);
	for(var i=0; i<all.length; i++){
    if(hide == null){
      if(all[i].style.position == "sticky" || all[i].style.position == ""){
        all[i].style.position = "relative";
      } else {
        all[i].style.position = "sticky";
      }
    } else {
      all[i].style.opacity = 1;
    }
	}
}


function init_bouton(){
  docuemnt.getElementById("").addEventListener("touchstart", function(){

  });
  
}