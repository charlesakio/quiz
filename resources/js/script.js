$(document).ready(function() {


  // ** Get the xml file using the jquery ajax call after button is clicked ** //
  $('button').click(function() {
    
    //Hide the button
    $('.jumbotron').hide();

    // ** Create the top layout of the quiz app with jquery **//
    $("#app").append("<div class='page-header'>" +
                      "<h1></h1>" +
                      "<h2></h2>" + 
                      "</div>"
    );
    //Query ajax to get xml document
    $.ajax({
        type: "GET",
        url: "quizStructure.xml",
        datatype: "xml",
        success: getQuizStructure,
        error: function() {
          alert("error in calling xml data, please check xml file or ajax call")
        }
    });//ajax call*/
  });//button click

  function getQuizStructure (xml) {
     //code when success happens      
     //GET the parent node called quiz
     //[] - Show the title and description nodes 
     $(xml).find('quiz').each(function() {
       var title = $(this).find('title').text();
       var description = $(this).find('description').text();
       $("<h1></h1>").html(title).appendTo("#app h1");
       $("<h2></h2>").html('&nbsp' + description).appendTo("#app h2");
      });

     showQuestions(xml)

  }//getQuizStructure 

  function showQuestions(xml) {
    var counter = 1;

    //GET all question nodes and show it for now 
    $(xml).find('question').each(function(index, item) {
    var $currentDiv = $('<div id=q' + counter + '>');

    //Create new div layout to hold the questions and choices
    $currentDiv.append("<h1>" + counter + ".)" +
            $(item).find('text').text() + "</h1>"
    );
    $currentDiv.append("<ol type='a' role='radiogroup' id=list"+ 
                       counter + ">"
    );
    var choices = $(item).find('choices choice').each(function(index_choice, item) {
      $currentDiv.find('ol').append(
        '<li><input type="radio" name="choice' + 
          (index + 1) + '" value="' +
          $(item).attr('correct') + '">"' + 
          $(item).text() + "</li>"
      );
    });
    
    //Append the current container of the question
    $("#app").append($currentDiv);
    counter++;
    
    })//find each question
    
//Start doing quiz since values are added
//If user clicks in a specifc div the right button show correct
  //Else, show wrong 

    $('input[type="radio"]').click(function () {
        var value = '';
        value = $(this).val();
        
        if(value == 'true') {
          $(this).parent().css('background-color', 'green');
        } else {
          $(this).parent().css('background-color', 'red');
        }
    })//each
  }//showQuestions
})
