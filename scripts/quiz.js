(function() {

  // Counts
  var userAnswers = [];
      glueCount = 0;
      dewCount = 0;
      skewCount = 0;

  // Profile
  var firstName = '',
      lastName = '',
      spirit = '';


  // What happens when you click the quiz logo at any point during the quiz
  $('#quizLogo').click(function() {

    // get the current step from the progress bar
    var currentStep = $('#progressBarContainer').attr('class');

    // if the current step is the last one, clear the quiz
    if (currentStep == 'step-8') {
      clearQuiz();

    // if the current step is the compare page, hide the page and slide the home page back up
    } else if (currentStep == 'compare') {
      $('#quizResult').removeClass('allow-scroll show').addClass('hide');
      setTimeout(function(){
        $('#snowHillContainer').removeClass('hide-down').addClass('show-up');
        clearQuiz('show-up');
      },200);

    // if the current step is a question in the middle of the quiz, slide that question backwards and slide the homepage up
    } else {
      var currentQuestion = $("section[data-progress='" + currentStep +"']");
      var progressStep = 'start';

      $(currentQuestion).addClass('hide-back').removeClass('show');

      $('#quizStart').removeClass('show hide').addClass('show-back');
      $('#progressBarContainer').addClass('hide').removeClass('show');
      $('#quizLogo').toggleClass('show hide');
      $('#snowHillContainer').removeClass('show-up');

      // move the progress bar
      $("#progressBar").attr('class', progressStep);
      $("#snowHillContainer").attr('class', progressStep);
    }
  });


  // Quiz Start
  //-----------

  $('#btnStart').click(function() {
    // start quiz at question one
    var nextQuestion = $('#questionOne');
    // get the progress step for the progress bar from the upcoming question
    var progressStep = $(nextQuestion).attr('data-progress');

    $("#quizStart").addClass('hide').removeClass('show show-back hide-back');
    $("#quizLogo").addClass('show').removeClass('hide');
    $("#quizResult").removeClass('hide');
    $("#canvas").addClass('stop').removeClass('start');
    $("#progressBarContainer").addClass('show').removeClass('hide');
    $("#compareResult").removeClass('hide');

    $(nextQuestion).addClass('show').removeClass('hide');

    // move the progress bar
    $("#progressBar").attr('class', progressStep);
    $("#snowHillContainer").attr('class', progressStep);
  });

  // firstname/Lastname
  $(".name-field").keyup(function(e) {

    firstName = $('#firstName').val();
    lastName = $('#lastName').val();

    // show the continue button if both inputs have been filled
    if (firstName && lastName) {
      $('#btnContinue').slideDown('fast').addClass('visible');

      // allow quiz start on enter button
      if (e.which == 13) {
       startQuestions();
      }
    } else {
      $('#btnContinue').slideUp('fast').removeClass('visible');
    }

  });


  // start the questions on click 
  $('#btnContinue').click(function() {
    startQuestions();
  });


  // Next Question
  //--------------

  $('input[type="radio"]').click(function() {

    var currentQuestion = $(this).parents('.quiz-question');
    var nextQuestion = $(currentQuestion).next('.quiz-question');

    // if this isn't the last question...
    if (nextQuestion.length) {

      var progressStep = $(nextQuestion).attr('data-progress');

      $(currentQuestion).addClass('hide').removeClass('show hide-back show-back');
      $(nextQuestion).addClass('show').removeClass('hide hide-back show-back');

      $("#snowHillContainer").attr('class', progressStep);
      $("#progressBar").attr('class', progressStep);

    // if this is the last question, gather the answers
    } else {

      var progressStep = $(quizResult).attr('data-progress');

      $(currentQuestion).addClass('hide').removeClass('show');

      $("#quizResult").addClass('show');
      $("#canvas").addClass('start').removeClass('stop');

      $("#snowHillContainer").attr('class', progressStep);
      $("#progressBar").attr('class', progressStep);

      checkAnswers();
      gatherAnswers();

      setTimeout(function() {
        $(quizResult).addClass('allow-scroll');
        $('#snowHillContainer').addClass('allow-scroll');
      },1000);
    };
  });


  // Back Button
  //------------

  $(".btn-back").click(function() {

    var currentQuestion = $(this).parents('.quiz-question');
    var prevQuestion = $(currentQuestion).prev('.quiz-question');

    $(currentQuestion).removeClass('show show-back').addClass('hide-back');

    // if there is a previous question...
    if (prevQuestion.length) {

      var progressStep = $(prevQuestion).attr('data-progress');

      $(prevQuestion).toggleClass('show-back hide');

      $("#progressBar").attr('class', progressStep);
      $("#snowHillContainer").attr('class', progressStep);

    // if this is the first question, go back to start
    } else {

      var progressStep = 'start';

      $("#quizStart").removeClass('show hide').addClass('show-back');
      $("#progressBarContainer").addClass('hide').removeClass('show');
      $("#quizLogo").toggleClass('show hide');
      $("#canvas").addClass('start').removeClass('stop');

      $(prevQuestion).toggleClass('show-back hide');

      $("#snowHillContainer").attr('class', progressStep);
      $("#progressBar").attr('class', progressStep);

    }
  })


  // Compare back
  //-------------

  // if you press back while on the compare results page

  $('.btn-compare-back').click(function() {

    var currentQuestion = $(this).parents('.compare-results');
    var prevQuestion = $(currentQuestion).prev('.quiz-result');
    var progressStep = $(prevQuestion).attr('data-progress');

    $(prevQuestion).addClass('show-back').removeClass('hide-down');

    $("#currentQuestion").removeClass('allow-scroll show').addClass('hide');
    $("#progressBarContainer").addClass('show').removeClass('hide');
    $('#snowHillContainer').addClass('show-up-results');

    $("#progressBar").attr('class', progressStep);
    
    setTimeout(function() {
      $("#quizResult").addClass('allow-scroll');
      $('#snowHillContainer').addClass('allow-scroll');
    },1000);

  })


  // Compare Results
  //----------------

  // show the compare reults page

  $(".btn-compare").click(function() {

    var progressStep = 'compare';

    $("#quizResult").removeClass('show allow-scroll show-back').addClass('hide-down');
    $('#snowHillContainer').removeClass('allow-scroll show-up-results').addClass('hide-down');
    $("#progressBarContainer").addClass('hide').removeClass('show');
    $("#compareResult").addClass('allow-scroll show').removeClass('hide');

    $("#progressBar").attr('class', progressStep);

  })


  // Retake Quiz
  //------------

  $(".btn-retake").click(function() {

    $("#quizResult").addClass('hide');

    clearQuiz('start');

  })


  // Compare Retake Quiz
  //--------------------

  // if you press retake quiz on the compare results page

  $('.btn-compare-retake').click(function() {

    $("#compareResult").removeClass('allow-scroll show').addClass('hide');

    setTimeout(function(){
      $('#snowHillContainer').removeClass('hide-down');
      clearQuiz('show-up-home');
    },500);

  })


  // First Question
  //---------------

  function startQuestions() {

    var currentQuestion = $('#questionOne');
    var nextQuestion = $('#questionTwo');
    var progressStep = $(nextQuestion).attr('data-progress');

    $(currentQuestion).addClass('hide').removeClass('show hide-back show-back');
    $(nextQuestion).addClass('show').removeClass('hide hide-back show-back');

    $("#progressBar").attr('class', progressStep);
    $("#snowHillContainer").attr('class', progressStep);

    // insert user's first name in the question
    $('.first-name').html(firstName + ', ');

  }


  function checkAnswers() {

    var answers = $('input[type=radio]:checked');

    for (var i = 0, ii = answers.length; i < ii; i++) {

      var answerKey = answers[i].getAttribute('data-key')
      if (answerKey == "dew") {
        dewCount++;
      } else if (answerKey == "glue") {
        glueCount++;
      } else if (answerKey == "skew") {
        skewCount++;
      }
    }

  }

  function gatherAnswers() {
    if (dewCount >= 3 && skewCount <= 2 && glueCount <= 2) {
      $('.results-beetle').show(); spirit = 'beetle'
    } else if (glueCount >= 3 && skewCount <= 2 && dewCount <= 2) {
      $('.results-manatee').show(); spirit = 'manatee'
    } else if (skewCount >= 3 && glueCount <= 2 && dewCount <= 2) {
      $('.results-mandrill').show(); spirit = 'mandrill'
    } else if (dewCount == 3 && skewCount == 3) {
      $('.results-fish').show(); spirit = 'fish'
    } else if (dewCount == 3 && glueCount == 3) {
      $('.results-bird').show(); spirit = 'bird'
    } else if (glueCount == 3 && skewCount == 3) {
      $('.results-sloth').show(); spirit = 'sloth'
    } else if (dewCount == 2 && glueCount == 2 && skewCount == 2) {
      $('.results-okapi').show(); spirit = 'okapi'
    }
  }

  function clearQuiz(progressStep) {
    dewCount = 0;
    glueCount = 0;
    skewCount = 0;

    firstName = $('#firstName').val('');
    lastName = $('#lastName').val('');

    $('#btnContinue').hide();
    $('input[type=radio]:checked').attr('checked',false);

    $("#quizStart").toggleClass('hide show');
    $("#quizLogo").toggleClass('show hide');
    $(".quiz-question").removeClass('hide');

    $("#progressBarContainer").attr('class', 'hide');

    setTimeout(function() {
      $("#quizResult").find('.results').hide();
    }, 1000);

    $("#quizResult").removeClass('allow-scroll hide-down show show-back');
    $('#snowHillContainer').removeClass('allow-scroll show-up-results')
  }

})();