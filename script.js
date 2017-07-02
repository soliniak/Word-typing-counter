$(function(){


	let iG = 0;
	let wrongAnswerCounter;

	function callback(value, value2){ 
		textInput = value2;
		textInputArray = value;
		return textInputArray, textInput; 
	};

	$(".button--start").on("click", function (){

		timer();

		$("textarea.textOutput").removeAttr("disabled", "disabled");
		$(".button--start").attr("disabled", "disabled");
		wrongAnswerCounter = 0;
		updateCounter(wrongAnswerCounter);
		$.getJSON('text_db.json', function (json){

			let x = Math.floor(Math.random() * Object.keys(json).length);

			let textOutput = $(".textOutput").val();

			let textInput = json[x];
			var textInputArray = textInput.split(" ");

			callback(textInputArray, textInput);
			$(".textInput").text(textInput);
			
			highlight(iG, textInputArray[iG]);
			updateCounter();
		});
	});
	
	$(".textOutput").keypress(check);

	function check(e, callback) {


	    if (e.which === 32) {

	    		w = textInputArray.length;
		    	

	    	e.preventDefault();

			let textOutput = $(".textOutput").val();

			if(textOutput === textInputArray[iG]){
				iG++;
				$(".textOutput").val("");
		    	highlight(iG, textInputArray[iG], textOutput);
	
		    	console.log("Słowo " + textInputArray[iG] + " iG " + iG);

		    	console.log("tIA " + textInputArray.length);
		    	console.log("W " + w + "iG " + iG);


		    } else {
				wrongAnswerCounter += 1;
				updateCounter(wrongAnswerCounter);
			}
		    if(iG >= w){
		    		console.log("End");
		    		$(".button--start").removeAttr("disabled", " ");
		    		$("textarea.textOutput").attr("disabled", "disabled");
		    		iG = 0;
		    		return;
			} 
    		
	     }
	}

// Counting wrong answers	
	function updateCounter(){
		$(".wrongAnswer").text(wrongAnswerCounter);
	}
// Highlihting correct word and one ahead
	function highlight(iG, wordFromArr, wordToMach, callback){
		
		$("span.nextWord").addClass("correctWord");

		$('.textInput').each(function() {

			let regex = new RegExp(wordFromArr);
			let result = regex.test(textInput);

			if(result){
				$(this).html(
					$(this).html().replace(wordFromArr, '<span class="nextWord">'+wordFromArr+'</span>')
				)
			}

		});
	}

	function timer(){
		var d = new Date;

		setInterval(function() {
		n = d.toLocaleTimeString();
		    $('.timer').text((n) + " Seconds");
		}, 1000);
	}
});
