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
  '../../images/bg_full.jpg',
  '../../images/bg_full-mobile.jpg',
  '../../images/results-beetle.gif',
  '../../images/results-bird.gif',
  '../../images/results-fish.gif',
  '../../images/results-manatee.gif',
  '../../images/results-mandrill.gif',
  '../../images/results-okapi.gif',
  '../../images/results-sloth.gif'
  ]
).done(function(images){
  setTimeout(function() {
    $('.loading').slideUp(function() {
      $('.main-container').fadeIn();
    });
  }, 2000)
})
