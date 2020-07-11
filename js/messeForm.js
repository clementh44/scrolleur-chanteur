var coupletInc = 1;
var nombreBlock = 0;

function updateChantId(element) {
	$("#formChantId").val($(element).val().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f|'|(|)|"|&|!|.|,|;|:]/g, "").replace(/ /g, "-")); 
}

function addElement(label) {
	$("#chantForm").append(createElement(label) + "&nbsp;");
	ajoutSommaire();
}
function addPartie(element){
	$("#block"+element).before(createElement("") + "&nbsp;");
	ajoutSommaire();	
}

function createElement(label){
	var numero = nombreBlock;
    var contenu = '<div id="block'+numero+'" class="form-group form-element">'
    contenu += '<input type="text" value="' + label + '" name="block" required minlength="2" placeholder="Moment de la messe" maxlength="30" size="20">';
    contenu += '<button type="button" class="close" onclick="removeElement(this)"><i class="fas fa-times"></i></button><button type="button" style="margin-right:10px" class="close" onclick="addPartie('+numero+')"><i class="fas fa-plus"></i></button><label id="label'+numero+'" Style="margin-right:20px;margin-left:20px"></label>';
    contenu += '<div class="btn-group dropdown dropup" role="group"><button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Recherche et ajoute le chant suivant ->"><i class="fas fa-search"></i></button><div class="dropdown-menu text-light bg-dark"><input type="text" class="form-control" placeholder="Rechercher..." id="searchInput'+ numero.toString() + '" style="font-size: x-small;" /><div id="filterList' + numero.toString() + '" style="height: 250px; overflow: scroll; width: 200px; font-size: x-small;"></div></div></div></div>';
    return contenu;
}
function ajoutSommaire(){
	var numero = nombreBlock;
	$("#filterList" + numero.toString()).html(getSommaire(numero));
    $("#searchInput" + numero.toString()).on("keyup", function () {
		$("#filterList"+ numero.toString() +" .dropdown-item").show();
		$("#filterList"+ numero.toString() +" .dropdown-header").show();
		if (this.value != "") {
			//cache les chants ne contenant pas le terme recherché
			$("#filterList"+ numero.toString() +" .dropdown-item:not(:contains('" + this.value + "'))").hide();

			//cache les lettres n'ayants aucun chants
			$.each($("#filterList"+ numero.toString() +" .dropdown-header"), function () {
				var nb = $(this).nextUntil(".dropdown-header", ".dropdown-item:visible").length;
				if (nb == 0) {
					$(this).hide();
				}
			});
		};
    });
	nombreBlock++;
}

function removeElement(element) {
	$(element).parent().remove();
}

function validateForm() {
	var result = $("#formChantTitre").val() + "\n";

	$(".form-element").each(function(index) {
		console.log($(this).children("input"));
		result += "# " + $(this).children("input").val().toLowerCase() + '\n'
		result += $(this).children("label").text().toLowerCase() + '\n';
	});

	//affichage du résultat
	$("#resultArea").val(result);
}

function insererChant(){
	if($("#resultArea").val() == "" || $("#formChantId").val()=="" || $("#formChantTitre").val()=="")return;
	$.ajax({
		type: 'GET',
		url: 'php/addChant.php',
		data: 'id=' + encodeURIComponent($("#formChantId").val()) + "&chant=" + encodeURIComponent($("#resultArea").val()) + "&titre=" + encodeURIComponent($("#formChantTitre").val()),
		success: function (data) {
			if (data != "") {
				if(data == "ok"){
					$("#alert").html('<div class="alert alert-success alert-dismissible fade show" role="alert">Chant ajouté</div>');
					setTimeout(function() {$("#alert").children().alert('close');}, 3000);
				} else {
					$("#alert").html('<div class="alert alert-danger alert-dismissible fade show" role="alert">' + data + '</div>');
					setTimeout(function() {$("#alert").children().alert('close');}, 3000);
				}
				console.log(data);
				console.log(data.split('\n'));
			} else {
				console.log("ERR: pas de retour getChant");
			}
		}
	});
}

function getSommaire(numero){
    chants = sortByProperty(chants, "attributes.id");

	//Construction du sommaire et de la liste déroulante en même temps
	var filtreHtml = new Array;
	var letter = '';

	$.each(chants, function (key, val) {
		if (val.id.charAt(0) != letter) {
			filtreHtml.push('<span class="dropdown-header p-1">' + val.id.charAt(0).toUpperCase() + '</span>');
			letter = val.id.charAt(0);
		}
		filtreHtml.push('<button onclick="ajouterChant(\'' + numero + '#' + val.id + '\')" class="dropdown-item text-truncate text-light bg-dark p-1" style="cursor:pointer;" type="button">' + val.titre + '</button>');
    });
    return filtreHtml.join('');
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

function ajouterChant(id){
    console.log(id);
    var info = id.split("#");
    var i=0;
    while(i<chants.length && chants[i].id != info[1])i++;
    if(i<chants.length)$("#label" + info[0]).html(chants[i].titre);
}

function ajouteParties(){
    var parties = ["Entrée", "PP", "Gloria", "Psaume", "PU", "Offertoire", "Sanctus", "Anamnèse", "Agnus", "Communion", "Sortie"];
    var contenu = "";
    for(var i=0; i<parties.length; i++){
        contenu += '<button class="btn btn-outline-primary" type="button" onclick="addElement(\'' + parties[i] + '\')">'+parties[i]+'</button>';
    }
    $('#lesparties').html(contenu);
}

$(document).ready(function () {
	ajouteParties();
});
