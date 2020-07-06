/*actualisation de la taille des bloc séparateur entre chaque chant*/
function updateSeparator() {
    $.each($(".separator") , function() {
        this.style.height = window.innerHeight+50+"px"; //+50px pour avoir de la marge lors du scroll avec la souris
    });
}

/*changement du thème en alternance noir/blanc*/
function changeTheme (theme) {
    $("body").removeClass().addClass(theme);
}

/*changement des marges de la liste des chants*/
function changeMargin(marginClass) {
    $("#lyricsList").removeClass().addClass(marginClass);
}

/*attache ou détache les boutons de personnalisation*/
function toggleTopButtons(element) {
    $("#paramButtons").toggleClass("sticky");
    $(element).toggleClass("active");
}

/*change tous les refrains en flottant ou non*/
function toggleChoruses(element) {
    $(".chorus").toggleClass("sticky");
    $(element).children("i").toggleClass("fa-square fa-check-square");
}

/*cache tous les couplets*/
function hideVerses() {
    $(".verse").addClass("hide").removeClass("show");
}

/*modification de l'arrière-plan par une vidéo ou une photo*/
function changeCustomBackground(file) {
    var reader = new FileReader(),
        div = $("#customBackground");

    if (file.type.includes("video")) {
        cleanBackground();
        reader.addEventListener('load', function() {
            div.append("<video id='customBackgroundElement' autoplay loop muted><source src='"+this.result+"'></video>");
        });

        reader.readAsDataURL(file);
    } else{
        if (file.type.includes("image")) {
            cleanBackground();
            reader.addEventListener('load', function() {
                div.append("<img id='customBackgroundElement' src='"+this.result+"'></img>");
            });

            reader.readAsDataURL(file);
        };
    };

    /*les refrains ne doivent pas être volant (cela affiche un fond sinon)*/
    $(".chorus").removeClass("sticky");
    $("#paramStickyChoruses").children("i").toggleClass("fa-square fa-check-square");
}

/*suppression en fondu de l'arrière-plan*/
function cleanBackground() {
    $("#customBackgroundElement").fadeOut(1000, function() {
        $("#customBackgroundElement").remove();
    });
}

/*affichage ecran noir (tout en bas de la page)*/
function goToBottom () {
    document.documentElement.scrollTop = document.body.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
}

//https://gist.github.com/oziks/3664787
jQuery.expr[':'].contains = function(a, i, m) {
    var rExps=[
    {re: /[\xC0-\xC6]/g, ch: "A"},
    {re: /[\xE0-\xE6]/g, ch: "a"},
    {re: /[\xC8-\xCB]/g, ch: "E"},
    {re: /[\xE8-\xEB]/g, ch: "e"},
    {re: /[\xCC-\xCF]/g, ch: "I"},
    {re: /[\xEC-\xEF]/g, ch: "i"},
    {re: /[\xD2-\xD6]/g, ch: "O"},
    {re: /[\xF2-\xF6]/g, ch: "o"},
    {re: /[\xD9-\xDC]/g, ch: "U"},
    {re: /[\xF9-\xFC]/g, ch: "u"},
    {re: /[\xC7-\xE7]/g, ch: "c"},
    {re: /[\xD1]/g, ch: "N"},
    {re: /[\xF1]/g, ch: "n"}
    ];

    var element = $(a).text();
    var search  = m[3];

    $.each(rExps, function() {
        element    = element.replace(this.re, this.ch);
        search     = search.replace(this.re, this.ch);
    });

    return element.toUpperCase()
    .indexOf(search.toUpperCase()) >= 0;
};

/*mise à jour du lien vers le chant suivant*/
function updateNext (next) {
    var btn = $("#nextSongBtn")[0];
    btn.href = next;
    btn.classList.remove("disabled");
}

function sortByProperty(objArray, prop, direction) {
    const clone = objArray.slice(0);
    const direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending
    const propPath = (prop.constructor===Array) ? prop : prop.split(".");
    clone.sort(function(a,b) {
        for (let p in propPath) {
            if (a[propPath[p]] && b[propPath[p]]) {
                a = a[propPath[p]];
                b = b[propPath[p]];
            }
        }
        // convert numeric strings to integers
        a = a.match(/^\d+$/) ? +a : a;
        b = b.match(/^\d+$/) ? +b : b;
        return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
    });
    return clone;
}


function main() {
    window.addEventListener('beforeunload', (event) => {
        event.returnValue = "Rafraichir la page réinitialise son contenue (zones personnlisées, paramètres modifiés)";
    });

    //Tri des chants
    chants = sortByProperty(chants,"attributes.id");

    //Construction du sommaire et de la liste déroulante en même temps
    var sommaireHtml = new Array;
    var filtreHtml = new Array;
    var letter = '';

    $.each(chants, function(key, val) {
    	if (val.id.charAt(0) != letter) {
    		sommaireHtml.push('<p><a name="'+val.id.charAt(0)+'"></a>'+val.id.charAt(0).toUpperCase()+'</p>');
    		filtreHtml.push('<span class="dropdown-header p-1">'+val.id.charAt(0).toUpperCase()+'</span>');
    		letter = val.id.charAt(0);
    	}
    	sommaireHtml.push('<p><a href="#'+val.id+'">'+val.title+'</a></p>');
    	filtreHtml.push('<button onclick="updateNext(\'#'+val.id+'\')" class="dropdown-item text-truncate text-light bg-dark p-1" style="cursor:pointer;" type="button">'+val.title+'</button>');
    });

    $("#summary").html(sommaireHtml.join(''));
    $("#filterList").html(filtreHtml.join(''));

    //Construction des blocks de paroles
    var chantsHtml = new Array;

    $.each(chants, function(key, val) {
    	var block;

        //block principal
        chantsHtml.push('<div class="lyrics-block" id="'+val.id+'">');

        //Titre
        chantsHtml.push('<p class="title">'+val.title+'</p>');

        //Paroles
        for (var i = 0; i < val.lyrics.length; i++) {
        	block = val.lyrics[i];
        	next = val.lyrics[i+1];
        	if (block.type=="chorus" || block.type=="verse") {
        		chantsHtml.push('<div class="'+ (block.type=="chorus" ? 'chorus sticky">' : (block.type=="verse" ? 'verse show">' : "")));
        		chantsHtml.push(block.text.replace(/\n/g,"<br/>"));

                //sous-block de traduction
                if (next && next.type=="translation") {
                	chantsHtml.push('<div class="translation">');
                	chantsHtml.push(next.text.replace(/\n/g,"<br/>"));
                	chantsHtml.push('</div>');
                }
                chantsHtml.push('</div>');
            }
        }

        chantsHtml.push('</div>');
        chantsHtml.push('<div class="separator"></div>');
    });

	$("#lyricsList").html(chantsHtml.join(''));

    //Mise à jour constante des parties vides pour suivre la taille de la fenêtre
    $(window).resize(updateSeparator);
    updateSeparator();

    //Clic sur couplet = cacher/montrer
    $(".verse").click(function (event) {
    	$(this).toggleClass("show hide");
    });

    //Clic sur refrain = fixe/scroll
    $(".chorus").click(function (event) {
    	$(this).toggleClass("sticky ");
    });

	//Fonction de recherche
	$("#searchInput").on("keyup", function() {
		$("#filterList .dropdown-item").show();
		$("#filterList .dropdown-header").show();
		if (this.value != "") {
			//cache les chants ne contenant pas le terme recherché
			$("#filterList .dropdown-item:not(:contains('"+this.value+"'))").hide();

			//cache les lettres n'ayants aucun chants
			$.each($("#filterList .dropdown-header"), function () {
				var nb = $(this).nextUntil(".dropdown-header", ".dropdown-item:visible").length;
				if (nb==0) {
					$(this).hide();
				}
			});
		};
	});
}

$(document).ready(function() {
	main();
});