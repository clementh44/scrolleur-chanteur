var coupletInc = 1;

function updateChantId(element) {
	$("#formChantId").val($(element).val().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f|'|(|)|"|&|!|.|,|;|:]/g, "").replace(/ /g, "-")); 
}

function addElement(label) {
	$("#chantForm").append('<div class="form-group form-element"> <label>'+label+'</label> <button type="button" class="close" onclick="removeElement(this)"><i class="fas fa-times"></i></button> <textarea class="form-control" rows="5" required>'+ (label == 'Couplet' ? coupletInc++ + ' - ' : '') +'</textarea> </div>');
}

function removeElement(element) {
	$(element).parent().remove();
}

/* Modèle du chant
,
{
	"id": "",
	"titre": "",
	"paroles": [
		{
			"type": "refrain ou couplet ou traduction",
			"text": ""
		},
		{
			"type": "refrain ou couplet ou traduction",
			"text": ""
		}
	]
}
*/

function validateForm() {
	var result = $("#formChantTitre").val() + "\n";

	$(".form-element").each(function(index) {
		result += "# " + $(this).children("label").text().toLowerCase() + '\n'
		result += $(this).children("textarea").val() + '\n';
	});

	//affichage du résultat
	$("#resultArea").val(result);

	//copie du resultat dans le presse-papier de l'utilisateur
	$("#resultArea").select();
	//document.execCommand('copy');
	//avec un message sui se ferme au bout de 5 secondes
	//$("#alert").html('<div class="alert alert-success alert-dismissible fade show" role="alert"> Chant copié !<br/>À coller tout en-bas du fichier chants.js (dossier js).<br/>Voir le fichier README.md pour plus d\'informations sur la modification des chants etc...<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>');
	//setTimeout(function() {$("#alert").children().alert('close');}, 7000);
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