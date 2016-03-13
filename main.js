/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';

  var thumbnailbarHeight = 70,
  closeButtonHeight = 16;
  /**
   * Only related to example 6.
   */
  $('.lightbox').click(function() {
    var windowHeigth = window.innerHeight || $(window).height(), // make it worjk on ipad & android
        windowWidth  = window.innerWidth  || $(window).width();

    // Display the overlay
    $('<div id="overlay"></div>')
      .css('opacity', '0')
      .animate({'opacity' : '0.7'}, 'slow')
      .appendTo('body');

    // Create the lightbox container
    $('<div id="lightbox"></div>')
      .hide()
      .appendTo('body');

    // Append close-button
    $('<div id="close-button"></div>')
      .hide()
      .appendTo('body');

    // Append close-button
    $('<div id="thumbnail-bar"></div>')
      .hide()
      .appendTo('body');


    // Display the image on load
    $('<img>')
      .attr('src', $(this).attr('src'))
      .css({
        'max-height': windowHeigth - 200,
        'max-width':  windowWidth - 200
      })
      .load(function() {
        $('#lightbox')
          .css({
            'top':  (windowHeigth - $('#lightbox').height()) / 2 - thumbnailbarHeight/2,
            'left': (windowWidth  - $('#lightbox').width())  / 2
          })
          .fadeIn();

          var lightboxHeight = $('#lightbox').height(),
              lightboxWidth  = $('#lightbox').width();

          $('#close-button')
            .css({
              'top':  (windowHeigth - $('#button-close').height()) / 2 - lightboxHeight / 2 - thumbnailbarHeight/2 - closeButtonHeight/2,
              'left': (windowWidth  - $('#button-close').width())  / 2 + lightboxWidth / 2 - 10
            })
            .fadeIn();

          $('#thumbnail-bar')
            .css({
              'top':  windowHeigth - thumbnailbarHeight,
              'left': 0
            })
            .fadeIn();

      })
      .appendTo('#lightbox');

      // Remove it all on click
      $('#close-button').click(function() {
        $('#overlay, #lightbox, #close-button, #thumbnail-bar').remove();
      });

      document.onkeydown = function(event) {
        var key;
        key = event.keyCode || event.which;
        switch(key) {
          case 27:
          $('#overlay, #lightbox, #close-button, #thumbnail-bar').remove();
          break;
          default:
          break;
        }};

        thumbBar();

    console.log("Display image in colorbox.");
  });


  // Show images in our thumbnail bar
  var thumbBar = function() {
    var current = null;
    $('#nojs-gallery img').each(function () {
      var img = $(this).clone(true);
      // Remove the lightbox class and the click event
      img.removeClass('lightbox').off('click').on('click', changeLightBoxPicture);
      $('#thumbnail-bar').append(img);

    });
  }

  /*
  /* Change the picture in the lightbox from or thumbnailbar
  /* TODO: Fix the hack when changing picture
  */
  var changeLightBoxPicture = function() {
    var windowHeigth = window.innerHeight || $(window).height(), // make it worjk on ipad & android
        windowWidth  = window.innerWidth  || $(window).width();
    console.log($(this).attr('src'));
    var ImgSrc = $(this).attr('src');
    $('#lightbox img, #close-button').fadeOut(200, function() {
      $('#lightbox img').attr('src', ImgSrc)
      .fadeIn();
    })
    }


});
