// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

  var lang_to       = "English";
  var lang_from     = "Spanish";
  var current_dict  = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from  
  var words         = Object.keys(current_dict);
  var dict_len      = words.length;

  var tick          = "&#x2714";

  var current_word;
  var current_ans; 

  // setting the right input output langs
  $("span.lang_from").html(lang_from);
  $("span.lang_to"  ).html(lang_to  );



  var getNextWord = function() {
    current_ans       = words[Math.floor(Math.random()*dict_len)];
    current_word      = current_dict[current_ans];
    console.log(current_ans);
  }

  var checkAnswer = function(word, guess) {
    return guess === current_ans;
  }


  /* 
    only task is to get the next word, corresponding ans, and to update the appropriate 
    places 
  */
  var setup = function() {
    getNextWord();
    $("tr.current td.word").html(current_word);
    $("tr.current td.guess input").val("");
  }


  // generates a generic template for an entry row
  var genEntryTemplate = function() {
    var $row = $("<tr></tr>");
    $row.addClass("entry");

    var $td_word    = $("<td></td>").addClass("word");
    var $td_guess   = $("<td></td>").addClass("guess");
    var $td_result  = $("<td></td>").addClass("result");
    $row.append($td_word).append($td_guess).append($td_result);
    
    return $row;
  }

  // generates a specific entry row for the table
  var genSpecificEntry = function(class_name) {
    $entry_row = genEntryTemplate();
    $entry_row.addClass(class_name);
    return $entry_row;
  }



  // main step that does most of the work
  var step  = function() {

    var word  = $("tr.current td.word").html();
    var guess = $("tr.current td.guess input").val();

    if (checkAnswer(word, guess)) {
      var $row    = genSpecificEntry("correct");
      var result  = tick;   
    }
    
    else {
      var $row = genSpecificEntry("wrong");
      var result     = current_ans;
    }

    $("td.word",   $row).html(word);
    $("td.guess",  $row).html(guess);
    $("td.result", $row).html(result);
    $("tbody tr:first").after($row);  
    // done with this round
    

    // start next round
    setup();
  }



  // attaching beahavior to elements

  $("input#check").on("click", function() {
    step();
  });


  $("tr.current td.guess input")
  .keypress(function (e) { 
    if (e.which == 13 || e.keyCode == 13) { 
      step();
      $(this).autocomplete("close");
      return false;
    }
  })
  .autocomplete({
    source:     words,
    minLength:  2,
    select:     function(event, ui) {
      $("tr.current td.guess input").val(ui.item.value);
      step();
      return false;
    }
  }); 




  // running setup for the first time.
  setup();

 });
