//= require_tree .
//= require jquery

$(window).resize(function() {
  var more = document.getElementById("js-navigation-more");
  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
    }
  }
});

$(document).ready(function() {

  var menuToggle = $("#js-mobile-menu").unbind();
  $("#js-navigation-menu").removeClass("show");

  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
  });

  // contact form
  var base64_email = 'am9zaHVhLmF1c2VAZ21haWwuY29t';
  var base_url = 'https://formspree.io/';
  var action = base_url + atob(base64_email);
  $('#contact-form').attr('action', action);

});

$(function(){
  var INDEX = null;
  var MAP = null;
  var SEL = null;
  var MAX = null;

  function ensureIndex(cb){
    if(!INDEX) {
      $.getJSON('/search.json', function(data){
        INDEX = lunr.Index.load(data.index);
        MAP = data.map;
        cb();
      });
    } else {
      cb();
    }
  }

  function doSearch(val){
    ensureIndex(function() {
      var res = INDEX.search(val);
      $('.searchbar .content .result').remove();

      if(res.length > 0) {
        MAX = res.length;
        SEL = 0;

        res.forEach(function(r, i) {
          var _r = $('<div class="result"/>');
          var _a = $('<a href ="' + r.ref + '">').appendTo(_r);
          _a.append('<div class="title">' + (i + 1) + '. ' + MAP[r.ref].title + '</div>');
          _a.append('<div class="description">' + MAP[r.ref].description + '</div>');
          _r.mouseover(function(){
            SEL = $('.searchbar .content .result').index(this);
            updateSelection();
          });
          _r.appendTo('.searchbar .content');
        });

        //updateSelection();
      } else {
        $('<div class="result"/>').html('Nothing found...').appendTo('.searchbar .content');
      }

      $('.searchbar').show();
    });
  }

  function updateSelection(){
    var s = $('.searchbar .content .result');
    s.removeClass('active');
    $(s.get(SEL)).addClass('active');
  }

  function doSelection() {
    var link = $($('.searchbar .content .result').get(SEL)).find('a').attr('href');

    if(link) {
      window.location = link;
    }
  }

  $('.searchbar').hide();

  $('.search').keyup(function(e){
    var val = $(this).val();
    if(e.keyCode == 40) {
      SEL++;
      if(SEL >= MAX) {
        SEL = 0;
      }
      updateSelection();
    } else if (e.keyCode == 38) {
      SEL--;
      if(SEL < 0) {
        SEL = MAX-1;
      }
      updateSelection();
    } else if(e.keyCode == 13) {
      doSelection();
    }  else if(e.keyCode == 27) {
      $('.searchbar').hide();
    } else if(val.length > 0) {
      doSearch(val);
    } else {
      $('.searchbar').hide();
    }
  }).focus();
});
