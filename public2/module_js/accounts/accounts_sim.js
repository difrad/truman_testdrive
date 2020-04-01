let stepsList = [
  {
    element: document.querySelectorAll('#generalStep')[0],
    intro: `Let’s practice creating an account on social media.`,
    position: "right",
    scrollTo: 'tooltip'
  },
  {
    element: document.querySelectorAll('#generalStep')[0],
    intro: `Click on the blue dots&nbsp;<a role='button' tabindex='0'
      class='introjs-hint'><div class='introjs-hint-dot'></div>
      <div class='introjs-hint-pulse'></div></a> &nbsp; &nbsp; &nbsp;
      to learn more...`,
    position: "right",
    scrollTo: 'tooltip'
  }
];

let hintsList = [
  {
    hint: `Think about whether you want to include your part of your name or a
    nickname. You may or may not want people to know exactly who you are based
    on your username. `,
    element: '#hint1',
    hintPosition: 'middle-middle'
  },
  {
    hint: `Make sure you have a strong password that you can easily remember,
    but that is difficult for others to guess!`,
    element: '#hint2',
    hintPosition: 'middle-middle'
  }
];

let result;


let clickCount = 0;
let counter = 0;
const numberOfHints = hintsList.length;
let suggestionStringHTML;

function displayFeedback(result){
  $('#feedbackWarning').text(result.feedback.warning);
  suggestionStringHTML = "";
  result.feedback.suggestions.forEach(element => {
    suggestionStringHTML = suggestionStringHTML.concat("<li>"+element+"</li>");
  });
  $('#feedbackSuggestion').html(suggestionStringHTML);
}

function hideFieldMessage(messageID){
  $(messageID).hide();
  if ( (counter === numberOfHints)
    && ($('input[name="username"]').val() !== "")
    && ($('input[name="password"]').val() !== "") ){
      $('#cyberTransButton').addClass('green');
  }else{
    $('#cyberTransButton').removeClass('green');
  }
}

function eventsAfterHints(){
  $('input[name="username"]').removeAttr('readonly');
  $('input[name="password"]').removeAttr('readonly');

  $('input[name="username"]').on('input', function(){
    hideFieldMessage('#usernameWarning');
  });

  $('input[name="password"]').on('input', function(){

    result = zxcvbn($(this).val());
    switch (result.score) {
      case 0:
        if(result.password === ""){
          $('#passwordStrength').progress('reset');
          $("#strengthLabel").text("Password Strength");
          $('#cyberTransButton').removeClass('green');
          $('#feedbackWarning').text("");
          $('#feedbackSuggestion').html("");
        } else {
          $('#passwordStrength').progress({ value: 1 });
          $("#strengthLabel").text("Password Strength: Very Weak");
          hideFieldMessage('#passwordWarning');
          displayFeedback(result);
        }
        break;
      case 1:
        $('#passwordStrength').progress({ value: 2 });
        $("#strengthLabel").text("Password Strength: Weak");
        hideFieldMessage('#passwordWarning');
        displayFeedback(result);
        break;
      case 2:
        $('#passwordStrength').progress({ value: 3 });
        $("#strengthLabel").text("Password Strength: Moderate");
        hideFieldMessage('#passwordWarning');
        displayFeedback(result);
        break;
      case 3:
        $('#passwordStrength').progress({ value: 4 });
        $("#strengthLabel").text("Password Strength: Strong");
        hideFieldMessage('#passwordWarning');
        displayFeedback(result);
        break;
      case 4:
        $('#passwordStrength').progress({ value: 5 });
        $("#strengthLabel").text("Password Strength: Very Strong");
        hideFieldMessage('#passwordWarning');
        displayFeedback(result);
        break;
      default:
        $('#passwordStrength').progress('reset');
        $("#strengthLabel").text("Password Strength");
        hideFieldMessage('#passwordWarning');
        displayFeedback(result);
        break;
    }
  });
};

//showing the "Need some help?" guidance message
function showHelp(){
  if($('#removeHidden').is(":hidden")){
    if(counter != numberOfHints){
      //user does not know to click blue dots
      $('#removeHidden').transition('fade');
      $('#cyberTransButton').css('margin-bottom', '10em');
    }
  }
};

function errorCheck(){
  if(counter != numberOfHints){
    //show the message normally the first time
    if($('#clickAllDotsWarning').is(":hidden")){
      $('#clickAllDotsWarning').transition('fade');
      $('#cyberTransButton').css("margin-bottom", "10em");
    }else{
      //otherwise, bounce the message to draw attention to it
      $('#clickAllDotsWarning').transition('bounce');
    }
  }

  if($('input[name="password"]').val() === ""){
    $('#passwordWarning').show();
  }

  if($('input[name="username"]').val() === ""){
    $('#usernameWarning').show();
  }
};

function startHints(){

  $('#cyberTransButton').on('click', errorCheck);

  window.scrollTo(0,0);

  var hints = introJs().setOptions({
    hints: hintsList
  });

  hints.addHints();

  //for providing guidance message
  hints.onhintclick(function() {
      clickCount++;
      if(clickCount >= numberOfHints){
        if(clickCount !== 1){
          //show the guidance message, user probably doesn't know to click "got it"
          if($('#removeHidden').is(":hidden")){
            $('#removeHidden').transition('fade');
            $('#cyberTransButton').css('margin-bottom', '10em');
          } else {
            $('#removeHidden').transition('bounce');
          }
        }
      }
  });

  hints.onhintclose(function() {
     counter++;
     clickCount = 0;
     if($('#removeHidden').is(":visible")){
       $('#removeHidden').transition('fade');
       if($('#clickAllDotsWarning').is(":hidden")){
         $('#cyberTransButton').css("margin-bottom", "4em");
       }
     }
     if(counter == numberOfHints) {
       if($('#clickAllDotsWarning').is(':visible')){
         $('#clickAllDotsWarning').transition('fade');
         $('#cyberTransButton').css("margin-bottom", "4em");
       }
       if(($('input[name="password"]').val() !== "") && ($('input[name="username"]').val() !== "")){
         $( "#cyberTransButton" ).addClass("green");
       }
     }
  });

  setInterval(showHelp, 120000);
};


function startIntro(){

  var intro = introJs().setOptions({ 'disableInteraction': true,
    'hidePrev': true, 'hideNext': true, 'exitOnOverlayClick': false,
    'showStepNumbers':false, 'showBullets':false, 'scrollToElement':true,
    'doneLabel':'Done &#10003'
  });
    intro.setOptions({
      steps: stepsList
    });
    intro.start().onexit(function(){
      startHints();
      // an eventsAfterHints function isn't always defined
      try{
        eventsAfterHints();
      }catch(error){
        console.log("No defined events after hints.");
        console.error(error);
      }

    });


};

$(window).on("load", function(){
  try {
    startIntro();
  } catch (error) {
    console.log("No intro. Try starting hints.");
    console.error(error);
    try {
      startHints();
    } catch (error) {
      console.log("No hints.");
      console.error(error);
    }
  }
});
