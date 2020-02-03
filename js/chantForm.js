function updateChantId(element) {
	$("#formChantId").val($(element).val().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f|'|(|)|"|&|!|.|,|;|:]/g, "").replace(/ /g, "-")); 
}

function addElement() {
	$("#chantForm").append('<div class="form-group form-element"> <label>'+$("#formType").val()+'</label> <button type="button" class="close" onclick="removeElement(this)"><i class="fas fa-times"></i></button> <textarea class="form-control" rows="5" required></textarea> </div>');
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
	var result = ",\n{\n";
	
	result += '\t"id": "' + $("#formChantId").val() + '",\n';

	result += '\t"titre": "' + $("#formChantTitre").val().replace(/"/g,'\\"') + '",\n';

	result += '\t"paroles": [\n';

	$(".form-element").each(function(index) {
		if (index>0) {
			result += ',\n';
		};
		result += '\t{\n';

		result += '\t\t"type": "' + $(this).children("label").text().toLowerCase() + '",\n'
		result += '\t\t"text": "' + $(this).children("textarea").val().replace(/"/g,'\\"').replace(/\n/g,'\\n') + '"\n';

		result += '\t}';
	});

	result += '\n\t]\n}\n'

	//affichage du résultat
	$("#resultArea").val(result);

	//copie du resultat dans le presse-papier de l'utilisateur
	$("#resultArea").select();
	document.execCommand('copy');
	//avec un message sui se ferme au bout de 5 secondes
	$("#alert").html('<div class="alert alert-success alert-dismissible fade show" role="alert"> Chant copié !<br/>À coller tout en-bas du fichier chants.js (dossier js).<br/>Voir le fichier README.md pour plus d\'informations sur la modification des chants etc...<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>');
	setTimeout(function() {$("#alert").children().alert('close');}, 7000);
}