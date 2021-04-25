const $ = window.$;
export function runScript(){
	var _leftH = $('.dashboard-container').innerHeight();
	$('.dashboard-container-inner').css('height', `${_leftH}px`);
	$(window).on('resize', function(e){
		var _leftH = $('.dashboard-container').innerHeight();
		$('.dashboard-container-inner').css('height', `${_leftH}px`);
	});

    $('.dashboard-nav ul li a').on('click', function(e){
		if($(this).closest("li").children("ul").length) {
			if ( $(this).closest("li").is(".active-submenu") ) {
	           $('.dashboard-nav ul li').removeClass('active-submenu');
	        } else {
	            $('.dashboard-nav ul li').removeClass('active-submenu');
	            $(this).parent('li').addClass('active-submenu');
	        }
	        e.preventDefault();
		}
	});
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
  });
  var $tabsNav    = $('.popup-tabs-nav'),
    $tabsNavLis = $tabsNav.children('li');

  $tabsNav.each(function() {
    var $this = $(this);

    $this.next().children('.popup-tab-content').stop(true,true).hide().first().show();
    $this.children('li').first().addClass('active').stop(true,true).show();
  });

  $tabsNavLis.on('click', function(e) {
    var $this = $(this);

    $this.siblings().removeClass('active').end().addClass('active');

    $this.parent().next().children('.popup-tab-content').stop(true,true).hide()
      .siblings( $this.find('a').attr('href') ).fadeIn();

    e.preventDefault();
  });

  var hash = window.location.hash;
  var anchor = $('.tabs-nav a[href="' + hash + '"]');
  if (anchor.length === 0) {
    $(".popup-tabs-nav li:first").addClass("active").show(); //Activate first tab
    $(".popup-tab-content:first").show(); //Show first tab content
  } else {
    anchor.parent('li').click();
  }

  // Link to Register Tab
  $('.register-tab').on('click', function(event) {
    event.preventDefault();
    $(".popup-tab-content").hide();
    $("#register.popup-tab-content").show();
    $("body").find('.popup-tabs-nav a[href="#register"]').parent("li").click();
  });

  // Disable tabs if there's only one tab
  $('.popup-tabs-nav').each(function() {
    var listCount = $(this).find("li").length;
    if ( listCount < 2 ) {
      $(this).css({
        'pointer-events': 'none'
      });
    }
  });
}

export function starRating(ratingElem) {

    $(ratingElem).each(function() {

      var dataRating = $(this).attr('data-rating');

      // Rating Stars Output
      function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
        return(''+
          '<span class="'+firstStar+'"></span>'+
          '<span class="'+secondStar+'"></span>'+
          '<span class="'+thirdStar+'"></span>'+
          '<span class="'+fourthStar+'"></span>'+
          '<span class="'+fifthStar+'"></span>');
      }

      var fiveStars = starsOutput('star','star','star','star','star');

      var fourHalfStars = starsOutput('star','star','star','star','star half');
      var fourStars = starsOutput('star','star','star','star','star empty');

      var threeHalfStars = starsOutput('star','star','star','star half','star empty');
      var threeStars = starsOutput('star','star','star','star empty','star empty');

      var twoHalfStars = starsOutput('star','star','star half','star empty','star empty');
      var twoStars = starsOutput('star','star','star empty','star empty','star empty');

      var oneHalfStar = starsOutput('star','star half','star empty','star empty','star empty');
      var oneStar = starsOutput('star','star empty','star empty','star empty','star empty');

      // Rules
      if (dataRating >= 4.75) {
        $(this).append(fiveStars);
      } else if (dataRating >= 4.25) {
        $(this).append(fourHalfStars);
      } else if (dataRating >= 3.75) {
        $(this).append(fourStars);
      } else if (dataRating >= 3.25) {
        $(this).append(threeHalfStars);
      } else if (dataRating >= 2.75) {
        $(this).append(threeStars);
      } else if (dataRating >= 2.25) {
        $(this).append(twoHalfStars);
      } else if (dataRating >= 1.75) {
        $(this).append(twoStars);
      } else if (dataRating >= 1.25) {
        $(this).append(oneHalfStar);
      } else if (dataRating < 1.25) {
        $(this).append(oneStar);
      }

    });

  }
  window.starRating = starRating;
