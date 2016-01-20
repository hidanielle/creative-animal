window.onorientationchange = function() {
  window.scrollTo(0, 0);
};

window.scrollTo(0, 0);

function preloadimages(arr){
    var newimages=[], loadedimages=0
    var postaction=function(){}
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //call postaction and pass in newimages array as parameter
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
        imageloadpost()
        }
    }
    return { //return blank object with done() method
        done:function(f){
            postaction=f || postaction //remember user defined callback functions to be called when images load
        }
    }
}

//sample run
preloadimages(
  [
  '/images/bg_full.jpg',
  '/images/bg_full-mobile.jpg',
  '/images/results-beetle.gif',
  '/images/results-bird.gif',
  '/images/results-fish.gif',
  '/images/results-manatee.gif',
  '/images/results-mandrill.gif',
  '/images/results-okapi.gif',
  '/images/results-sloth.gif'
  ]
).done(function(images){
  setTimeout(function() {
    $('.loading').slideUp(function() {
      $('.main-container').fadeIn();
    });
  }, 2000)
})



//canvas init
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//canvas dimensions
var W = window.innerWidth;
var H = window.innerHeight;

//snowflake particles
var mp = 150; //max particles
var particles = [];

var angle = 0;

window.onload = function(){
  $(canvas).addClass('start');
  snow();
}

function snow () {
  for(var i = 0; i < mp; i++)
  {
    particles.push({
      x: Math.random()*W, //x-coordinate
      y: Math.random()*H, //y-coordinate
      r: Math.random()*4+1, //radius
      d: Math.random()*mp //density
    })
  }
  setInterval(draw, 33);
}

function draw() {
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();
  for(var i = 0; i < mp; i++)
  {
    var p = particles[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
  }
  ctx.fill();
  update();
}

function update() {
  var W = window.innerWidth;
  var H = window.innerHeight;
  angle += 0.01;
  for(var i = 0; i < mp; i++)
  {
    var p = particles[i];

    p.y += Math.cos(angle+p.d) + 1 + p.r/2;
    p.x += Math.sin(angle) * 2;

    if(p.x > W+5 || p.x < -5 || p.y > H)
    {
      if(i%3 > 0)
      {
        particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
      }
      else
      {
        if(Math.sin(angle) > 0)
        {
          particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
        }
        else
        {
          particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
        }
      }
    }
  }
}

$(window).resize(function () {
  draw();
});

//////////////// Variables
/////////////////////////////////////////

// Quiz Pages
var quizQuestions = $('.quiz-question'),
    quizStart = $('.quiz-start'),
    quizResult = $('.quiz-result'),
    compareResult = $('.compare-results'),
    quizLogo = $('.quiz-logo');

// Quiz Status
var currentQuestion,
    nextQuestion,
    progressStep,
    progressBar = $('.progress-bar');

// Buttons
var nextBtn = $('.btn-next'),
    backBtn = $('.btn-back'),
    startBtn = $('.btn-start'),
    resultBtn = $('.btn-result'),
    retakeBtn = $('.btn-retake'),
    compareBtn = $('.btn-compare'),
    radioBtn = $('input[type="radio"]');

// Counts
var userAnswers = [];
    glueCount = 0;
    dewCount = 0;
    skewCount = 0;

// Profile
var firstName = '',
    lastName = '',
    spirit = '';

//////////////// Button Functions
/////////////////////////////////////////


// Quiz Start
$('.quiz-logo').click(function() {
  currentStep = $('#progressBar').attr('class');
  if (currentStep == 'step-8') {
    clearQuiz();
  } else if (currentStep == 'compare') {
    $(compareResult).removeClass('allow-scroll show').addClass('hide');
    setTimeout(function(){
      $('#snowHillContainer').removeClass('hide-down').addClass('show-up');
      clearQuiz('show-up');
    },200);
  } else {
    currentQuestion = $("section[data-progress='" + currentStep +"']");
    $(currentQuestion).addClass('hide-back').removeClass('show');
    $(quizStart).removeClass('show hide').addClass('show-back');
    progressStep = 'start';
    moveProgress(progressStep);
    $(progressBar).addClass('hide').removeClass('show');
    $(quizLogo).toggleClass('show hide');
    $('#snowHillContainer').removeClass('show-up');
  }
});

// Quiz Start
$(startBtn).click(function() {
  var nextQuestion = $('#question-one');
  var progressStep = $(nextQuestion).attr('data-progress');
  $(quizStart).addClass('hide').removeClass('show show-back hide-back');
  $(quizLogo).addClass('show').removeClass('hide');
  $(quizResult).removeClass('hide');
  $(canvas).addClass('stop').removeClass('start');
  moveProgress(progressStep);
  $(progressBar).addClass('show').removeClass('hide');
  $(nextQuestion).addClass('show').removeClass('hide');
  $(compareResult).removeClass('hide');
});

// Firstname/Lastname
$(".name-field").keyup(function(e) {
  firstName = $('#first_name').val();
  lastName = $('#last_name').val();
  if (firstName && lastName) {
    $('.btn-continue').slideDown('fast').addClass('visible');
    if (e.which == 13) {
     startQuestions();
    }
  } else {
    $('.btn-continue').slideUp('fast').removeClass('visible');
  }
});

// Next Question
$('.btn-continue').click(function() {
  startQuestions();
});

// Next Question
function startQuestions() {
  firstName = $('#first_name').val();
  lastName = $('#last_name').val();
  currentQuestion = $('#question-one');
  nextQuestion = $('#question-two');
  $(currentQuestion).addClass('hide').removeClass('show hide-back show-back');
  $(nextQuestion).addClass('show').removeClass('hide hide-back show-back');
  progressStep = $(nextQuestion).attr('data-progress');
  moveProgress(progressStep);
  $('.first-name').html(firstName + ', ');
}


// Next Question
$(radioBtn).click(function() {
  currentQuestion = $(this).parents('.quiz-question');
  nextQuestion = $(currentQuestion).next('.quiz-question');
  if (nextQuestion.length) {
    $(currentQuestion).addClass('hide').removeClass('show hide-back show-back');
    $(nextQuestion).addClass('show').removeClass('hide hide-back show-back');
    progressStep = $(nextQuestion).attr('data-progress');
    moveProgress(progressStep);
  } else {
    checkAnswers();
    gatherAnswers();
    $.post('/complete', {
      first_name: firstName,
      last_name: lastName,
      spirit: spirit
    }).done(function(data) {
      window.options.series[0].data = JSON.parse(data);
      $("#container").highcharts(window.options);
    });
    $(currentQuestion).addClass('hide').removeClass('show');
    $(quizResult).addClass('show');
    progressStep = $(quizResult).attr('data-progress');
    moveProgress(progressStep);
    $(canvas).addClass('start').removeClass('stop');
    setTimeout(function() {
      $(quizResult).addClass('allow-scroll');
      $('#snowHillContainer').addClass('allow-scroll');
    },1000);
  };
});

// Back
$(backBtn).click(function() {
  currentQuestion = $(this).parents('.quiz-question');
  prevQuestion = $(currentQuestion).prev('.quiz-question');
  $(currentQuestion).removeClass('show show-back').addClass('hide-back');
  if (prevQuestion.length) {
    $(prevQuestion).toggleClass('show-back hide');
    progressStep = $(prevQuestion).attr('data-progress');
    moveProgress(progressStep);
  } else {
    $(prevQuestion).toggleClass('show-back hide');
    $(quizStart).removeClass('show hide').addClass('show-back');
    progressStep = 'start';
    moveProgress(progressStep);
    $(progressBar).addClass('hide').removeClass('show');
    $(quizLogo).toggleClass('show hide');
    $(canvas).addClass('start').removeClass('stop');
  }
})

// Compare back
$('.btn-compare-back').click(function() {
  currentQuestion = $(this).parents('.compare-results');
  prevQuestion = $(currentQuestion).prev('.quiz-result');
  $(currentQuestion).removeClass('allow-scroll show').addClass('hide');
  $(prevQuestion).addClass('show-back').removeClass('hide-down');
  $(progressBar).addClass('show').removeClass('hide');
  progressStep = $(prevQuestion).attr('data-progress');
  moveProgress(progressStep);
  $('#snowHillContainer').addClass('show-up-results');
  setTimeout(function() {
    $(quizResult).addClass('allow-scroll');
    $('#snowHillContainer').addClass('allow-scroll');
  },1000);
})


// Retake Quiz
$(retakeBtn).click(function() {
  $(quizResult).addClass('hide');
  clearQuiz('start');
})

// Compare Results
$(compareBtn).click(function() {
  $(quizResult).removeClass('show allow-scroll show-back').addClass('hide-down');
  $('#snowHillContainer').removeClass('allow-scroll show-up-results').addClass('hide-down');
  $(progressBar).addClass('hide').removeClass('show');
  $(compareResult).addClass('allow-scroll show').removeClass('hide');
  progressStep = 'compare';
  moveProgress(progressStep);
})

// Compare Retake Quiz
$('.btn-compare-retake').click(function() {
  $(compareResult).removeClass('allow-scroll show').addClass('hide');
  setTimeout(function(){
    $('#snowHillContainer').removeClass('hide-down');
    clearQuiz('show-up-home');
  },500);
})


//////////////// Reusable Functions
/////////////////////////////////////////

function moveProgress(progressStep) {
  if (progressStep == "compare") {
    document.getElementById("progressBar").className = progressStep;
  } else {
    document.getElementById("progressBar").className = progressStep;
    document.getElementById("snowHillContainer").className = progressStep;
  }
}

function checkAnswers() {
  var answers = $('input[type=radio]:checked');
  for (var i = 0, ii = answers.length; i < ii; i++) {
    // userAnswers.push(answers[i].getAttribute('data-key'));
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
  firstName = $('#first_name').val('');
  lastName = $('#last_name').val('');
  $('.btn-continue').hide();
  $('input[type=radio]:checked').attr('checked',false);
  $(quizStart).toggleClass('hide show');
  $(quizLogo).toggleClass('show hide');
  $(quizQuestions).removeClass('hide');
  moveProgress(progressStep);
  $(progressBar).addClass('hide').removeClass('show');
  setTimeout(function() {
    $(quizResult).find('.results').hide();
  }, 1000)
  $(quizResult).removeClass('allow-scroll hide-down show show-back');
  $('#snowHillContainer').removeClass('allow-scroll show-up-results')
}
