/* global $ */
var elements =  ['#top', 'button', 'footer'];
var radios = document.getElementsByName("radio");
var lock = false;
var isProcessStoped = false;


init();

function init(){
	RadioListener();
	reset();

}



function CheckHebrew(){
	var str = $("textarea").val().toString();//Hebrew Character
	var position = str.search(/[\u0590-\u05FF]/);
	if(position >= 0){
		return true;
		}
	else {
		return false;
		}
	}


$("textarea").on("focus", function(){
	if($(this).val() ===  'Type your review...'){
	    $(this).val('');
	}
 });


$("textarea").on("blur", function(){
	if($(this).val()===''){
	    $(this).val('Type your review...');
	}
});

document.getElementById('file').onchange = function(){
	if(ValidateSingleInput(this)){
				setFileProccessingMode();
			  var file = this.files[0];
			  var reader = new FileReader();
			  var reviews = [];
			  
			  reader.onload = function(progressEvent){
			      var lines = this.result.split('\n');
			      console.log("lines lenght = " ,lines.length);
			      for(var line = 0; line < lines.length; line++){
			    		reviews.push(lines[line]);
			
			     
			    		}
			      classifyFromFile(reviews);
			    
			  };
			  reader.readAsText(file);
	}
	else{alert("Sorry, file format is invalid, allowed only txt files!");}
};

function setFileProccessingMode(){
	
	$("#myTextarea").hide();
	$("#clasify-button").hide();
	$("#file").hide();
	$("#corpus").hide();
	$("#TblRevies").find("tr:gt(0)").remove();
	$("#TblRevies").show();
	$("#supply").hide();
	$("#return").show();
	$("#upload-div").hide();
	$("#loaderTbl").toggleClass("loader");
	$("#loaderTbl").show();
	$("#h4-algorithm").hide();
	$("#KNN_LINE").hide();
	$("#NAIVE_LINE").hide();
	$("#h3-explanation").hide();
	$("#h2-usage").text("Processing file...");
	
}

function classifyFromFile(reviews){
	
	isProcessStoped = false;
	for (var i=0; i < reviews.length; i++){
		
		console.log("review" + i, reviews[i]);
		
		ClassifyCorpusByJson({text: getOnlyWords(reviews[i]), algorithm: getAlgorithm()},i,reviews);
	} 
}


function ClassifyCorpusByJson(parameters,index,reviews){
	if(!lock){
		lock = true;
		$.get( '/getClassificationByJson',parameters, function(data) {
    		insertResultIntoTextbox(data);
    		lock = false;
			if(index<reviews.length-1 && !isProcessStoped){
    			ClassifyCorpusByJson({text: getOnlyWords(reviews[index+1]), algorithm: getAlgorithm()},index+1,reviews);
    		} 
    		else{
					FinishProcessing();
    		}
		});	
	}
}

function FinishProcessing(){
	$("#loaderTbl").removeClass("loader");
	if(isProcessStoped != true){
  $("#h2-usage").text("Done");
	    }		
}
	
function insertResultIntoTextbox(data) {

	console.log("insert ",data.text," ",data.result);
	var table = document.getElementById("TblRevies");
	var tr = document.createElement("tr");
	var cell1 = document.createElement("td");
	var cell2 = document.createElement("td");
	var text = document.createTextNode(data.text);
	var result = document.createTextNode(getTblResult(data.result));
  cell1.appendChild(text);
	cell2.appendChild(result);
	tr.appendChild(cell1);
	tr.appendChild(cell2);
	table.appendChild(tr);

	
}

function getTblResult(result){
	if(parseInt(result)===1){return "🙂" + "Positive";}
	else {return "🙁" + "Negative";}
}

$("#return").on("click",  function(event){
	isProcessStoped = true;
	resetAfterFileClassification();
});


$("#clasify-button").on("click",  function(event){
	if(checkIfTextIsFilled()){
		$(this).fadeOut(10);
	  Loading();
    var parameters = SetClassification();
    var result = getClassificationByJson(parameters);
    console.log(result);
	}
	else	{ alert("Please fill text area!") }
});


function RadioListener(){
	for(var i=0; i<radios.length; i++){
	
		radios[i].addEventListener("click",function(){
			var className = this.getAttribute("class");
			console.log('.'+className);
			$(".container").toggleClass("bold");

		});
	  }
	}


function getAlgorithm(){
	
	if(radios[0].checked){
		return "KNNScript.py";
	}
	else return "NAIVEScript.py";
	}


function Loading(){
	$("#loader").toggleClass("loader");
	$("#loader").fadeIn(1000);
	$("#upload-div").hide();
	$("#return").hide();


	
	}

function SetClassification(){
	return {text: getOnlyWords($("textarea").val()), algorithm: getAlgorithm() };
	}

function getClassificationByJson(parameters){
	var result;
	$.get( '/getClassificationByJson',parameters, function(data) {
    	UpdateElementsByResult(data.result);
    	$("#loader").toggleClass("loader");
    	
    	UpPopUp(data.result);
    	$("button").fadeIn(200);
    	
    	
	});
	return result;
	}

function UpPopUp(result) {
	
	var msg = getPopUpMsg(result);
	console.log("POPUP");
	$(".popup").show();
	$(".popup h2").text(msg);
  if ($(".wrapper").length == 0){
			$(".popup").wrapInner("<div class='wrapper'></div>");
		
	}

  $("#close").click(function(e) {
	if ($(".popup").is(':visible')) {
				$(".popup").hide();
				reset();
		}
	});
    

	/* Close popup if user clicks on background */
	$(".popup").click(function(e) {
		if ( e.target == this ) {
			if ($(".popup").is(':visible')) {
				$(".popup").hide();
				reset();
			}
		}
	});
	}

function getPopUpMsg(result){
	var msg = "Review is ";
	if(parseInt(result)===1){msg += 'positive ' + "🙂" ;}
	else{msg += 'negative ' + "🙁";}
	return msg;
	}

function checkIfTextIsFilled(){
	if($("textarea").val()==='Type your review...' || $("textarea").val()===''|| CheckHebrew() === false){
		return false;
	}
	return true;
	}



function UpdateElementsByResult(result){
	if(parseInt(result) === 1){
		setPositive(); 
	}
	else{
		setNegative();
	}
}

function setNegative(){
	for (var i = 0; i<elements.length; i++){
		$(elements[i]).addClass("negative");
		$(elements[i]).removeClass("positive");
	}
	}

function setPositive(){
	for (var i = 0; i<elements.length; i++){
		console.log('Positive');
		$(elements[i]).addClass("positive");
		$(elements[i]).removeClass("negative");
	}
}

function SetNeutral(){
	console.log("reset");
	for (var i = 0; i<elements.length; i++){
		$(elements[i]).removeClass("positive");
		$(elements[i]).removeClass("negative");
	}	
	
}

function textBoxReset() {
	// body...
	$("textarea").val('Type your review...');
	
} 
	

function reset(){
	SetNeutral();
	textBoxReset();
	$("#upload-div").show();
	$("#TblRevies").hide();
	$("#h2-usage").text("Usage");  
	$("#return").hide();
	$("#loaderTbl").hide();
}

function resetAfterFileClassification(){
  $("#myTextarea").show();
  $("#loaderTbl").removeClass("loader");
  $("#clasify-button").show();
  $("#file").show();
  $("#h4-algorithm").show();
  $("#KNN_LINE").show();
  $("#NAIVE_LINE").show();
  $("#h3-explanation").show();
  $("#h2-usage").text("Usage");  
  $("#return").hide();
  $("#TblRevies").hide();
  $("#upload-div").show();
  document.getElementById("file").value = "";
  $("#TblRevies").find("tr:gt(0)").remove();
}



function ValidateSingleInput(oInput) {
    if (oInput.type == "file") {
    var sFileName = oInput.value;
    if (sFileName.length > 0) {
            
      var sCurExtension = ".txt";
      if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
    	return true;
                   }
      }
    }
    return false;
}


function getOnlyWords(str){
	return str.replace(/[^\u0590-\u05FF]/g, " ");
}


