$(function(){


	let iG = 0;
	let wrongAnswerCounter;
	let stop = false,
		startTimer = false;

	function callback(value, value2){ 
		textInput = value2;
		textInputArray = value;
		return textInputArray, textInput; 
	};

	$(".button--start").on("click", function (){

		$("textarea.textOutput").removeAttr("disabled", "disabled");
		$(".button--start").attr("disabled", "disabled");
		wrongAnswerCounter = 0;
		stop = false;
		startTimer = false;

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

		if(!startTimer){
			startTimer = true;
			timer(startTimer);
		}

	    if (e.which === 32) {
	    	e.preventDefault();

			let textOutput = $(".textOutput").val();

			if(textOutput === textInputArray[iG]){
				$(".textOutput").val("");
				iG++;
		    	highlight(iG, textInputArray[iG], textOutput);
		    	typerState();
		    } else {
				wrongAnswerCounter += 1;
				updateCounter(wrongAnswerCounter);
			}
			typerState();
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

// Changing typer state active / disabled
	function typerState(){
	    if(iG >= textInputArray.length){
    		console.log("End");
    		stop = true;
    		$(".button--start").removeAttr("disabled", " ");
    		$("textarea.textOutput").attr("disabled", "disabled");
    		iG = 0;
    		return;
		}   
	}

	function timer(startTimer){
		let ms = 0, sec = 0, min = 0, hour = 0, msAdd, secAdd, minAdd, hourAdd, czas;
		
		if(startTimer == true){
			var myInt = setInterval(function() {
					msAdd = ms < 10 ? "0" + ms : ms;
					secAdd = sec < 10 ? "0" + sec : sec;
					minAdd = min < 10 ? "0" + min : min;
					hourAdd = hour < 10 ? "0" + hour : hour;
				if(!stop){
					ms++;
					if(ms == 100){
						ms = 0;
						sec++;
					}
					if(sec == 60){
						min++;
						sec = 0;
					}
					if(min == 60){
						hour++;
						min = 0;
					}
					refresh();
				}else{
					czas = hourAdd + ":" + minAdd + ":" + secAdd + ":" + msAdd;
					console.log("Your time: " + czas + " Errors: " + wrongAnswerCounter);
					clearInterval(myInt);
				}
			}, 10);
		}

		function refresh(){
			var czas = hourAdd + ":" + minAdd + ":" + secAdd + ":" + msAdd;
			$(".timer").text(czas);
		}
	}
});
