// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

	var lang_to				= "English";
	var lang_from			= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
  var words        	= Object.keys(current_dict);
  var dict_len     	= words.length;

  var current_word;
  var current_ans; 

	// setting the right input output langs
	$("span.lang_from").html(lang_from);
	$("span.lang_to"  ).html(lang_to  );



	var getNextWord = function() {
		current_ans   		= words[Math.floor(Math.random()*dict_len)];
    current_word      = current_dict[current_ans];
    return current_word;
	}

	var checkAnswer = function(word, guess) {
		return guess === current_ans;
	}


	var re_init = function() {
		var word = getNextWord();
		$("tr.current td.word").html(word);
		$("tr.current td.guess input").val("");
	}


	var gen_specific_entry = function(class_name) {
		$entry_row = gen_entry_template();
		$entry_row.addClass(class_name);
		return $entry_row;
	}

	var gen_entry_template = function() {
		var $row = $("<tr></tr>");
		$row.addClass("entry");

		var $td_word 		= $("<td></td>").addClass("word");
		var $td_guess 	= $("<td></td>").addClass("guess");
		var $td_result 	= $("<td></td>").addClass("result");
		$row.append($td_word).append($td_guess).append($td_result);
		
		return $row;
	}


  $("tr.current td.guess input").autocomplete({
    source:     words,
    minLength:  3,
    max: 10,
    select: function(event, ui) {

      if (event.which==13) {
      	main();
        return false; 
      }
      $("input").val(ui.item.value);
      main();
      return false;
    }
  }); 


	var main	= function() {
		var word 	= $("tr.current td.word").html();
		var guess = $("tr.current td.guess input").val();

		if (checkAnswer(word, guess)) {
			var $row = gen_specific_entry("correct");
			$("td.word",   $row).html(word);
			$("td.guess",  $row).html(guess);
			$("td.result", $row).html('&#x2714');
			$("tbody tr:first").after($row);			

		} else {
			var $row = gen_specific_entry("wrong");

			var result  = current_ans;
			$("td.word",   $row).html(word);
			$("td.guess",  $row).html(guess);
			$("td.result", $row).html(result);
			$("tbody tr:first").after($row);	
		}

		re_init();
	}


	$("#check").on("click", function() {
		main();
	})

	$("tr.current td.guess input").keypress(function (e) { 
    if (e.which == 13) { 
      main();
      return false;
    } 
	 });


	// $('.ui-autocomplete').addClass('f-dropdown');
	re_init();

 });
