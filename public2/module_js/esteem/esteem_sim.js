var hintsList=
[
  {
    hint: `Nick's best friends, Liam and Vanessa, have posted that they are
    hanging out, but Nick was not invited. Click on the post to reflect on how
    Nick might feel and what he can do if he is experiencing a red flag
    feeling.`,
    element: '#hint1',
    position: 'right',
    hintPosition: 'middle-right'
  },
  {
    hint: `Click on the post to think about how Nick might feel when he sees
    this post and the things he can do about it.`,
    element: '#hint3',
    position: 'bottom',
    hintPosition: 'middle-right'
  },
  {
    hint: `Seeing everything his friends are posting might make Nick feel like
    his life isn't as interesting or fun. But a lot of people just post the
    positive and exciting things going on in their lives.`,
    element: '#hint3A',
    position: 'right',
    hintPosition: 'bottom-right'
  },
  {
    hint: `Nick can always take a break from social media. He can meet up with
    friends and family or do something else he enjoys, like riding his bike.`,
    element: '#hint4',
    position: 'bottom-right',
    hintPosition: 'middle-right'
  }

]

var stepsList=
[
  {
    element: '#step1',
    intro: `This is Nick's social media timeline. He just got back from school
    and is checking out his feed.
    Click on the blue dots&nbsp;<a role='button' tabindex='0'
    class='introjs-hint'><div class='introjs-hint-dot'></div><div class=
    'introjs-hint-pulse'></div></a> &nbsp; &nbsp; &nbsp;to learn more...`,
    position: "left",
    scrollTo: 'tooltip'
  }

]

function eventsAfterHints(){
    introJs().hideHints();
    introJs().showHint(0);

  $('.ui.fluid.card.test img').on('click', function(){
    $('.ui.accordion').accordion('open', 0);
    $('.ui.accordion').accordion('close', 1);
    $('input[type=checkbox]').prop('checked',false);
    $('#esteem_post_modal').modal('show');
  });

  $('#nextButton').on('click', function () {
    $('#modSection2').click();
  });
};


function customOnHintCloseFunction(stepID) {
  // sequential hint appearance
  stepID += 1;
  if(stepID !== numberOfHints){
    introJs().showHint(stepID);
  }

  closedHints++;
  clickedHints = 0;
  if($('#removeHidden').is(":visible")){
    $('#removeHidden').transition('fade');
    if($('#clickAllDotsWarning').is(":hidden")){
      $('#cyberTransButton').css("margin-bottom", "4em");
    }
  }
  if(closedHints == numberOfHints) {
    if($('#clickAllDotsWarning').is(':visible')){
      $('#clickAllDotsWarning').transition('fade');
      $('#cyberTransButton').css("margin-bottom", "4em");
    }
    $( "#cyberTransButton" ).addClass("green");
  }
}
