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
	
	$(".textOutput").keypress(check);

// getting text from db when start is clicked
	$(".button--start").on("click", function (){

		reseting();
		
		$.getJSON('text_db.json', function (json){

			let x = Math.floor(Math.random() * Object.keys(json).length);
			let $selected = $("#selectLanguage option:selected").val();
			let textInput = json[$selected][x];

			let $textOutput = $(".textOutput").val();
			let textInputArray = textInput.split(" ");
			let textInputArraySave = textInput.split(" ");
			
			for(var i = 0; i < textInputArray.length; i++){
				textInputArraySave[i] = "<span id=\"x"+i+"\">" + textInputArray[i] + "</span>";
		        textInput = textInputArraySave.join(" ");
			}
			callback(textInputArray, textInput);
			$(".textInput").html(textInput);
			
			words(iG, textInputArray);
			highlight(iG);
			updateCounter();
		});
	});
	
	
// checking if spacebar or enter is pressed then comparing words. If error update counter, if words match go to next
	function check(e, callback) {

		if(!startTimer){
			startTimer = true;
			timer(startTimer);
		}

	    if (e.which === 32 || e.which === 13) {
	    	e.preventDefault();
			
			let $textOutput = $(".textOutput").val();

			if($textOutput === textInputArray[iG]){
				$(".textOutput").val("");
				iG++;
		    	highlight(iG, textInputArray[iG], $textOutput);
		    	words(iG, textInputArray);
		    	typerState();
		    } else {
				wrongAnswerCounter += 1;
				updateCounter(wrongAnswerCounter);
			}
			typerState();
	    }
	}

// Counting wrong answers (counts only when spacebar or enter is hit and words don't match)
	function updateCounter(){
		$(".wrongAnswer").text(wrongAnswerCounter);
	}


// Highlihting correct word and one ahead
	function highlight(iG){
		$("#x"+iG).addClass("nextWord");
	    iG = iG -1;
	    $("#x"+iG).removeClass("nextWord");
	    $("#x"+iG).addClass("correctWord");
	}

// Changing Typer state active / disabled
	function typerState(){
	    if(iG >= textInputArray.length){
    		console.log("End");
    		stop = true;
    		$(".button--start").removeAttr("disabled", " ");
    		$("#selectLanguage").removeAttr("disabled", " ")
    		$("textarea.textOutput").attr("disabled", "disabled");
    		iG = 0;
    		return;
		}   
	}

// setting timer
	function timer(startTimer){
		let ms = 0, sec = 0, min = 0, hour = 0, msAdd, secAdd, minAdd, hourAdd, czas;
		
		if(startTimer == true){
			let myInt = setInterval(function() {
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
			let czas = hourAdd + ":" + minAdd + ":" + secAdd + ":" + msAdd;
			$(".timer").text(czas);
		}
	}

// reseting when writing is done
	function reseting(){
		$("textarea.textOutput").removeAttr("disabled", "disabled");
		$(".button--start").attr("disabled", "disabled");
		$("#selectLanguage").attr("disabled", "disabled")
		wrongAnswerCounter = 0;
		stop = false;
		startTimer = false;
		updateCounter(wrongAnswerCounter);
	}
	function words(iG, textInputArray){
		$(".words").text("Words: " + iG + " / " + textInputArray.length)
	}
});
