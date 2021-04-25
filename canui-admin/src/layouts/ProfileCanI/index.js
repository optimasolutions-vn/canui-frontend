import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ReactQuill from 'react-quill';
//import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';
import PostDataCountries from '../../helpers/PostDataCountries';
import SelectPicker from "../../components/SelectPicker";
import Loader from '../../components/effects/Loader';
import {
  actionGetUserProfile,
  actionLogout
} from '../../actions/actionUser';
import 'react-quill/dist/quill.snow.css';
import './style.scss';

const mapStateToProps = state => ({
 user: state.user,
 siteData: state.siteData
});

const mapDispatchToProps = dispatch => ({
  onload: () => dispatch(actionGetUserProfile())
});

const $ = window.$;
const runScript = () => {
  /*--------------------------------------------------*/
  /*  Mobile Menu - mmenu.js
  /*--------------------------------------------------*/




  /*--------------------------------------------------*/
  /*  Sticky Header
  /*--------------------------------------------------*/
  function stickyHeader() {

    $(window).on('scroll load', function() {

      if($(window).width() < '1099') {
        $("#header-container").removeClass("cloned");
      }

      if($(window).width() > '1099') {

        // CSS adjustment
        $("#header-container").css({
          position: 'fixed',
        });

        var headerOffset = $("#header-container").height();

        if($(window).scrollTop() >= headerOffset){
          $("#header-container").addClass('cloned');
          $(".wrapper-with-transparent-header #header-container").addClass('cloned').removeClass("transparent-header unsticky");
        } else {
          $("#header-container").removeClass("cloned");
          $(".wrapper-with-transparent-header #header-container").addClass('transparent-header unsticky').removeClass("cloned");
        }

        // Sticky Logo
        var transparentLogo = $('#header-container #logo img').attr('data-transparent-logo');
        var stickyLogo = $('#header-container #logo img').attr('data-sticky-logo');

        if( $('.wrapper-with-transparent-header #header-container').hasClass('cloned')) {
          $("#header-container.cloned #logo img").attr("src", stickyLogo);
        }

        if( $('.wrapper-with-transparent-header #header-container').hasClass('transparent-header')) {
          $("#header-container #logo img").attr("src", transparentLogo);
        }

        $(window).on('load resize', function() {
          var headerOffset = $("#header-container").height();
          $("#wrapper").css({'padding-top': headerOffset});
        });
      }
    });
  }

  // Sticky Header Init
  stickyHeader();


  /*--------------------------------------------------*/
  /*  Transparent Header Spacer Adjustment
  /*--------------------------------------------------*/
  $(window).on('load resize', function() {
    var transparentHeaderHeight = $('.transparent-header').outerHeight();
    $('.transparent-header-spacer').css({
      height: transparentHeaderHeight,
    });
  });


  /*----------------------------------------------------*/
  /*  Back to Top
  /*----------------------------------------------------*/

  // Button
  function backToTop() {
    $('body').append('<div id="backtotop"><a href="#"></a></div>');
  }
  backToTop();

  // Showing Button
  var pxShow = 600; // height on which the button will show
  var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

  $(window).scroll(function(){
    if($(window).scrollTop() >= pxShow){
      $("#backtotop").addClass('visible');
    } else {
      $("#backtotop").removeClass('visible');
    }
  });

  $('#backtotop a').on('click', function(){
    $('html, body').animate({scrollTop:0}, scrollSpeed);
    return false;
  });


  /*--------------------------------------------------*/
  /*  Ripple Effect
  /*--------------------------------------------------*/
  $('.ripple-effect, .ripple-effect-dark').on('click', function(e) {
    var rippleDiv = $('<span class="ripple-overlay">'),
      rippleOffset = $(this).offset(),
      rippleY = e.pageY - rippleOffset.top,
      rippleX = e.pageX - rippleOffset.left;

    rippleDiv.css({
      top: rippleY - (rippleDiv.height() / 2),
      left: rippleX - (rippleDiv.width() / 2),
      // background: $(this).data("ripple-color");
    }).appendTo($(this));

    window.setTimeout(function() {
      rippleDiv.remove();
    }, 800);
  });


  /*--------------------------------------------------*/
  /*  Interactive Effects
  /*--------------------------------------------------*/
  $(".switch, .radio").each(function() {
    var intElem = $(this);
    intElem.on('click', function() {
      intElem.addClass('interactive-effect');
      setTimeout(function() {
        intElem.removeClass('interactive-effect');
      }, 400);
    });
  });


  /*--------------------------------------------------*/
  /*  Sliding Button Icon
  /*--------------------------------------------------*/
  $(window).on('load', function() {
    $(".button.button-sliding-icon").not(".task-listing .button.button-sliding-icon").each(function() {
      var buttonWidth = $(this).outerWidth()+30;
      $(this).css('width',buttonWidth);
    });
  });


  /*--------------------------------------------------*/
  /*  Sliding Button Icon
  /*--------------------------------------------------*/
  $('.bookmark-icon').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('bookmarked');
  });

  $('.bookmark-button').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('bookmarked');
  });


  /*----------------------------------------------------*/
  /*  Notifications Boxes
  /*----------------------------------------------------*/
  $("a.close").removeAttr("href").on('click', function(){
    function slideFade(elem) {
      var fadeOut = { opacity: 0, transition: 'opacity 0.5s' };
      elem.css(fadeOut).slideUp();
    }
    slideFade($(this).parent());
  });

  /*--------------------------------------------------*/
  /*  Full Screen Page Scripts
  /*--------------------------------------------------*/

  // Wrapper Height (window height - header height)
  function wrapperHeight() {
    var headerHeight = $("#header-container").outerHeight();
    var windowHeight = $(window).outerHeight() - headerHeight;
    $('.full-page-content-container, .dashboard-content-container, .dashboard-sidebar-inner, .dashboard-container, .full-page-container').css({ height: windowHeight });
    $('.dashboard-content-inner').css({ 'min-height': windowHeight });
  }

  // Enabling Scrollbar
  function fullPageScrollbar() {
    $(".full-page-sidebar-inner, .dashboard-sidebar-inner").each(function() {

      var headerHeight = $("#header-container").outerHeight();
      var windowHeight = $(window).outerHeight() - headerHeight;
      var sidebarContainerHeight = $(this).find(".sidebar-container, .dashboard-nav-container").outerHeight();

      // Enables scrollbar if sidebar is higher than wrapper
      if (sidebarContainerHeight > windowHeight) {
        $(this).css({ height: windowHeight });

      } else {
        $(this).find('.simplebar-track').hide();
      }
    });
  }

  // Init
  $(window).on('load resize', function() {
    wrapperHeight();
    fullPageScrollbar();
  });
  wrapperHeight();
  fullPageScrollbar();

  // Sliding Sidebar
  $('.enable-filters-button').on('click', function(){
    $('.full-page-sidebar').toggleClass("enabled-sidebar");
    $(this).toggleClass("active");
    $('.filter-button-tooltip').removeClass('tooltip-visible');
  });

  /*  Enable Filters Button Tooltip */
  $(window).on('load', function() {
    $('.filter-button-tooltip').css({
      left: $('.enable-filters-button').outerWidth() + 48
    })
      .addClass('tooltip-visible');
  });

  // Avatar Switcher
  function avatarSwitcher() {
    var readURL = function(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('.profile-pic').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    $(".file-upload").on('change', function(){
      readURL(this);
    });
    $('.dashboard-content-container').on('click', '.upload-button', function() {
      console.log('asdasdsadasd')
      $(".file-upload").click();
    });
  } avatarSwitcher();


  /*----------------------------------------------------*/
  /* Dashboard Scripts
  /*----------------------------------------------------*/

  // Dashboard Nav Submenus
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


  // Responsive Dashbaord Nav Trigger
  $('.dashboard-responsive-nav-trigger').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');

    var dashboardNavContainer = $('body').find(".dashboard-nav");

    if( $(this).hasClass('active') ){
      $(dashboardNavContainer).addClass('active');
    } else {
      $(dashboardNavContainer).removeClass('active');
    }

    $('.dashboard-responsive-nav-trigger .hamburger').toggleClass('is-active');

  });

  // Fun Facts
  function funFacts() {
    /*jslint bitwise: true */
    function hexToRgbA(hex){
      var c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.07)';
      }
    }

    $(".fun-fact").each(function() {
      var factColor = $(this).attr('data-fun-fact-color');

      if(factColor !== undefined) {
        $(this).find(".fun-fact-icon").css('background-color', hexToRgbA(factColor));
        $(this).find("i").css('color', factColor);
      }
    });

  } funFacts();


  // Notes & Messages Scrollbar
  $(window).on('load resize', function() {
    var winwidth = $(window).width();
    if ( winwidth > 1199) {

      // Notes
      $('.row').each(function() {
        var mbh = $(this).find('.main-box-in-row').outerHeight();
        var cbh = $(this).find('.child-box-in-row').outerHeight();
        if ( mbh < cbh ) {
          var headerBoxHeight = $(this).find('.child-box-in-row .headline').outerHeight();
          var mainBoxHeight = $(this).find('.main-box-in-row').outerHeight() - headerBoxHeight + 39;

          $(this).find('.child-box-in-row .content')
            .wrap('<div class="dashboard-box-scrollbar" style="max-height: '+mainBoxHeight+'px" data-simplebar></div>');
        }
      });

      // Messages Sidebar
      // var messagesList = $(".messages-inbox").outerHeight();
      // var messageWrap = $(".message-content").outerHeight();
      // if ( messagesList > messagesWrap) {
      // 	$(messagesList).css({
      // 		'max-height': messageWrap,
      // 	});
      // }
    }
  });

  // Mobile Adjustment for Single Button Icon in Dashboard Box
  $('.buttons-to-right').each(function() {
    var btr = $(this).width();
    if (btr < 36) {
      $(this).addClass('single-right-button');
    }
  });

  // Small Footer Adjustment
  $(window).on('load resize', function() {
    var smallFooterHeight = $('.small-footer').outerHeight();
    $('.dashboard-footer-spacer').css({
      'padding-top': smallFooterHeight + 45
    });
  });


  // Auto Resizing Message Input Field
  /* global jQuery */
  jQuery.each(jQuery('textarea[data-autoresize]'), function() {
    var offset = this.offsetHeight - this.clientHeight;

    var resizeTextarea = function(el) {
      jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };
    jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
  });


  /*--------------------------------------------------*/
  /*  Star Rating
  /*--------------------------------------------------*/
  function starRating(ratingElem) {
    return;
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

  } starRating('.star-rating');


  /*--------------------------------------------------*/
  /*  Enabling Scrollbar in User Menu
  /*--------------------------------------------------*/
  function userMenuScrollbar() {
    $(".header-notifications-scroll").each(function() {
      var scrollContainerList = $(this).find('ul');
      var itemsCount = scrollContainerList.children("li").length;
      var notificationItems;

      // Determines how many items are displayed based on items height
      /* jshint shadow:true */
      if (scrollContainerList.children("li").outerHeight() > 140) {
        var notificationItems = 2;
      } else {
        var notificationItems = 3;
      }


      // Enables scrollbar if more than 2 items
      if (itemsCount > notificationItems) {

        var listHeight = 0;

        $(scrollContainerList).find('li:lt('+notificationItems+')').each(function() {
          listHeight += $(this).height();
        });

        $(this).css({ height: listHeight });

      } else {
        $(this).css({ height: 'auto' });
        $(this).find('.simplebar-track').hide();
      }
    });
  }

  // Init
  userMenuScrollbar();


  /*--------------------------------------------------*/
  /*  Tippy JS
  /*--------------------------------------------------*/
  /* global tippy */
  tippy('[data-tippy-placement]', {
    delay: 100,
    arrow: true,
    arrowType: 'sharp',
    size: 'regular',
    duration: 200,

    // 'shift-toward', 'fade', 'scale', 'perspective'
    animation: 'shift-away',

    animateFill: true,
    theme: 'dark',

    // How far the tooltip is from its reference element in pixels
    distance: 10,

  });


  /*----------------------------------------------------*/
  /*	Accordion @Lewis Briffa
  /*----------------------------------------------------*/
  var accordion = (function(){

    var $accordion = $('.js-accordion');
    var $accordion_header = $accordion.find('.js-accordion-header');

    // default settings
    var settings = {
      // animation speed
      speed: 400,

      // close all other accordion items if true
      oneOpen: false
    };

    return {
      // pass configurable object literal
      init: function($settings) {
        $accordion_header.on('click', function() {
          accordion.toggle($(this));
        });

        $.extend(settings, $settings);

        // ensure only one accordion is active if oneOpen is true
        if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
          $('.js-accordion-item.active:not(:first)').removeClass('active');
        }

        // reveal the active accordion bodies
        $('.js-accordion-item.active').find('> .js-accordion-body').show();
      },
      toggle: function($this) {

        if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
          $this.closest('.js-accordion')
            .find('> .js-accordion-item')
            .removeClass('active')
            .find('.js-accordion-body')
            .slideUp();
        }

        // show/hide the clicked accordion item
        $this.closest('.js-accordion-item').toggleClass('active');
        $this.next().stop().slideToggle(settings.speed);
      }
    };
  })();

  $(document).ready(function(){
    accordion.init({ speed: 300, oneOpen: true });
  });


  /*--------------------------------------------------*/
  /*  Tabs
  /*--------------------------------------------------*/
  $(window).on('load resize', function() {
    if ($(".tabs")[0]){
      $('.tabs').each(function() {

        var thisTab = $(this);

        // Intial Border Position
        var activePos = thisTab.find('.tabs-header .active').position();

        function changePos() {

          // Update Position
          activePos = thisTab.find('.tabs-header .active').position();

          // Change Position & Width
          thisTab.find('.tab-hover').stop().css({
            left: activePos.left,
            width: thisTab.find('.tabs-header .active').width()
          });
        }

        changePos();

        // Intial Tab Height
        var tabHeight = thisTab.find('.tab.active').outerHeight();

        // Animate Tab Height
        function animateTabHeight() {

          // Update Tab Height
          tabHeight = thisTab.find('.tab.active').outerHeight();

          // Animate Height
          thisTab.find('.tabs-content').stop().css({
            height: tabHeight + 'px'
          });
        }

        animateTabHeight();

        // Change Tab
        function changeTab() {
          var getTabId = thisTab.find('.tabs-header .active a').attr('data-tab-id');

          // Remove Active State
          thisTab.find('.tab').stop().fadeOut(300, function () {
            // Remove Class
            $(this).removeClass('active');
          }).hide();

          thisTab.find('.tab[data-tab-id=' + getTabId + ']').stop().fadeIn(300, function () {
            // Add Class
            $(this).addClass('active');

            // Animate Height
            animateTabHeight();
          });
        }

        // Tabs
        thisTab.find('.tabs-header a').on('click', function (e) {
          e.preventDefault();

          // Tab Id
          var tabId = $(this).attr('data-tab-id');

          // Remove Active State
          thisTab.find('.tabs-header a').stop().parent().removeClass('active');

          // Add Active State
          $(this).stop().parent().addClass('active');

          changePos();

          // Update Current Itm
          tabCurrentItem = tabItems.filter('.active');

          // Remove Active State
          thisTab.find('.tab').stop().fadeOut(300, function () {
            // Remove Class
            $(this).removeClass('active');
          }).hide();

          // Add Active State
          thisTab.find('.tab[data-tab-id="' + tabId + '"]').stop().fadeIn(300, function () {
            // Add Class
            $(this).addClass('active');

            // Animate Height
            animateTabHeight();
          });
        });

        // Tab Items
        var tabItems = thisTab.find('.tabs-header ul li');

        // Tab Current Item
        var tabCurrentItem = tabItems.filter('.active');

        // Next Button
        thisTab.find('.tab-next').on('click', function (e) {
          e.preventDefault();

          var nextItem = tabCurrentItem.next();

          tabCurrentItem.removeClass('active');

          if (nextItem.length) {
            tabCurrentItem = nextItem.addClass('active');
          } else {
            tabCurrentItem = tabItems.first().addClass('active');
          }

          changePos();
          changeTab();
        });

        // Prev Button
        thisTab.find('.tab-prev').on('click', function (e) {
          e.preventDefault();

          var prevItem = tabCurrentItem.prev();

          tabCurrentItem.removeClass('active');

          if (prevItem.length) {
            tabCurrentItem = prevItem.addClass('active');
          } else {
            tabCurrentItem = tabItems.last().addClass('active');
          }

          changePos();
          changeTab();
        });
      });
    }
  });


  /*--------------------------------------------------*/
  /*  Keywords
  /*--------------------------------------------------*/
  $(".keywords-container").each(function() {

    var keywordInput = $(this).find(".keyword-input");
    var keywordsList = $(this).find(".keywords-list");

    // adding keyword
    function addKeyword() {
      var $newKeyword = $("<span class='keyword'><span class='keyword-remove'></span><span class='keyword-text'>"+ keywordInput.val() +"</span></span>");
      keywordsList.append($newKeyword).trigger('resizeContainer');
      keywordInput.val("");
    }

    // add via enter key
    keywordInput.on('keyup', function(e){
      if((e.keyCode == 13) && (keywordInput.val()!=="")){
        addKeyword();
      }
    });

    // add via button
    $('.keyword-input-button').on('click', function(){
      if((keywordInput.val()!=="")){
        addKeyword();
      }
    });

    // removing keyword
    $(document).on("click",".keyword-remove", function(){
      $(this).parent().addClass('keyword-removed');

      function removeFromMarkup(){
        $(".keyword-removed").remove();
      }
      setTimeout(removeFromMarkup, 500);
      keywordsList.css({'height':'auto'}).height();
    });


    // animating container height
    keywordsList.on('resizeContainer', function(){
      var heightnow = $(this).height();
      var heightfull = $(this).css({'max-height':'auto', 'height':'auto'}).height();

      $(this).css({ 'height' : heightnow }).animate({ 'height': heightfull }, 200);
    });

    $(window).on('resize', function() {
      keywordsList.css({'height':'auto'}).height();
    });

    // Auto Height for keywords that are pre-added
    $(window).on('load', function() {
      var keywordCount = $('.keywords-list').children("span").length;

      // Enables scrollbar if more than 3 items
      if (keywordCount > 0) {
        keywordsList.css({'height':'auto'}).height();

      }
    });

  });


  /*--------------------------------------------------*/
  /*  Bootstrap Range Slider
  /*--------------------------------------------------*/

  // Thousand Separator
  function ThousandSeparator(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  // Bidding Slider Average Value
  var avgValue = (parseInt($('.bidding-slider').attr("data-slider-min")) + parseInt($('.bidding-slider').attr("data-slider-max")))/2;
  if ($('.bidding-slider').data("slider-value") === 'auto') {
    $('.bidding-slider').attr({'data-slider-value': avgValue});
  }

  // Bidding Slider Init
  $('.bidding-slider').slider();

  $(".bidding-slider").on("slide", function(slideEvt) {
    $("#biddingVal").text(ThousandSeparator(parseInt(slideEvt.value)));
  });
  $("#biddingVal").text(ThousandSeparator(parseInt($('.bidding-slider').val())));


  // Default Bootstrap Range Slider
  var currencyAttr = $(".range-slider").attr('data-slider-currency');

  $(".range-slider").slider({
    formatter: function(value) {
      return currencyAttr + ThousandSeparator(parseInt(value[0])) + " - " + currencyAttr + ThousandSeparator(parseInt(value[1]));
    }
  });

  $(".range-slider-single").slider();


  /*----------------------------------------------------*/
  /*  Payment Accordion
  /*----------------------------------------------------*/
  var radios = document.querySelectorAll('.payment-tab-trigger > input');

  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', expandAccordion);
  }

  function expandAccordion (event) {
    /* jshint validthis: true */
    var tabber = this.closest('.payment');
    var allTabs = tabber.querySelectorAll('.payment-tab');
    for (var i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove('payment-tab-active');
    }
    event.target.parentNode.parentNode.classList.add('payment-tab-active');
  }

  $('.billing-cycle-radios').on("click", function() {
    if($('.billed-yearly-radio input').is(':checked')) { $('.pricing-plans-container').addClass('billed-yearly'); }
    if($('.billed-monthly-radio input').is(':checked')) { $('.pricing-plans-container').removeClass('billed-yearly'); }
  });


  /*--------------------------------------------------*/
  /*  Quantity Buttons
  /*--------------------------------------------------*/
  function qtySum(){
    var arr = document.getElementsByName('qtyInput');
    var tot=0;
    for(var i=0;i<arr.length;i++){
      if(parseInt(arr[i].value))
        tot += parseInt(arr[i].value);
    }
  }
  qtySum();

  $(".qtyDec, .qtyInc").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.hasClass('qtyInc')) {
      $button.parent().find("input").val(parseFloat(oldValue) + 1);
    } else {
      if (oldValue > 1) {
        $button.parent().find("input").val(parseFloat(oldValue) - 1);
      } else {
        $button.parent().find("input").val(1);
      }
    }

    qtySum();
    $(".qtyTotal").addClass("rotate-x");

  });


  /*----------------------------------------------------*/
  /*  Inline CSS replacement for backgrounds
  /*----------------------------------------------------*/
  function inlineBG() {

    // Common Inline CSS
    $(".single-page-header, .intro-banner").each(function() {
      var attrImageBG = $(this).attr('data-background-image');

      if(attrImageBG !== undefined) {
        $(this).append('<div class="background-image-container"></div>');
        $('.background-image-container').css('background-image', 'url('+attrImageBG+')');
      }
    });

  } inlineBG();

  // Fix for intro banner with label
  $(".intro-search-field").each(function() {
    var bannerLabel = $(this).children("label").length;
    if ( bannerLabel > 0 ){
      $(this).addClass("with-label");
    }
  });

  // Photo Boxes
  $(".photo-box, .photo-section, .video-container").each(function() {
    var photoBox = $(this);
    var photoBoxBG = $(this).attr('data-background-image');

    if(photoBox !== undefined) {
      $(this).css('background-image', 'url('+photoBoxBG+')');
    }
  });


  /*----------------------------------------------------*/
  /*  Share URL and Buttons
  /*----------------------------------------------------*/
  /* global ClipboardJS */
  $('.copy-url input').val(window.location.href);
  new ClipboardJS('.copy-url-button');

  $(".share-buttons-icons a").each(function() {
    var buttonBG = $(this).attr("data-button-color");
    if(buttonBG !== undefined) {
      $(this).css('background-color',buttonBG);
    }
  });


  /*----------------------------------------------------*/
  /*  Tabs
  /*----------------------------------------------------*/
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


  /*----------------------------------------------------*/
  /*  Indicator Bar
  /*----------------------------------------------------*/
  $('.indicator-bar').each(function() {
    var indicatorLenght = $(this).attr('data-indicator-percentage');
    $(this).find("span").css({
      width: indicatorLenght + "%"
    });
  });


  /*----------------------------------------------------*/
  /*  Custom Upload Button
  /*----------------------------------------------------*/

  var uploadButton = {
    $button    : $('.uploadButton-input'),
    $nameField : $('.uploadButton-file-name')
  };

  uploadButton.$button.on('change',function() {
    console.log('aaaaaa')
    _populateFileField($(this));
  });

  var uploadButtonService = {
    $button    : $('.upload-service-input'),
    $nameField : $('.upload-service-file-name')
  };

  uploadButtonService.$button.on('change',function() {
    _populateFileFieldService($(this));
  });
  function _populateFileFieldService($button) {
    var selectedFile = [];
    for (var i = 0; i < $button.get(0).files.length; ++i) {
      selectedFile.push($button.get(0).files[i].name +'<br>');
    }
    uploadButtonService.$nameField.html(selectedFile);
  }


  function _populateFileField($button) {
    var selectedFile = [];
    for (var i = 0; i < $button.get(0).files.length; ++i) {
      selectedFile.push($button.get(0).files[i].name +'<br>');
    }
    uploadButton.$nameField.html(selectedFile);
  }


  /*----------------------------------------------------*/
  /*  Slick Carousel
  /*----------------------------------------------------*/
  $('.default-slick-carousel').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1292,
        settings: {
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  });


  $('.testimonial-carousel').slick({
    centerMode: true,
    centerPadding: '30%',
    slidesToShow: 1,
    dots: false,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          centerPadding: '21%',
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 993,
        settings: {
          centerPadding: '15%',
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 769,
        settings: {
          centerPadding: '5%',
          dots: true,
          arrows: false
        }
      }
    ]
  });


  $('.logo-carousel').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 5,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  });

  $('.blog-carousel').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 3,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  });

  /*----------------------------------------------------*/
  /*  Magnific Popup
  /*----------------------------------------------------*/
  $('.mfp-gallery-container').each(function() { // the containers for all your galleries

    $(this).magnificPopup({
      type: 'image',
      delegate: 'a.mfp-gallery',

      fixedContentPos: true,
      fixedBgPos: true,

      overflowY: 'auto',

      closeBtnInside: false,
      preloader: true,

      removalDelay: 0,
      mainClass: 'mfp-fade',

      gallery:{enabled:true, tCounter: ''}
    });
  });

  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'scroll',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    closeOnContentClick: false,
    closeOnBgClick: false,
    showCloseBtn: false,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
  });

  $('.mfp-image').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-fade',
    image: {
      verticalFit: true
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      isLoading: true,
      currentPassword: '',
      repeatPassword: '',
      password: '',
      firstName: '',
      lastName: '',
      errorMessage: [],
      isShowSettingProfile: false,
      serviceType: 'PERSONAL',
      verifyCode: '',
      description: '',
      price: 0,
      arrayImage: [],
      service: [this.props.siteData.categories[0].id],
      national: PostDataCountries.countries[0].code,
      nationalService: PostDataCountries.countries[0].code,
      tnc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor eleifend massa. Curabitur efficitur mauris et lacinia facilisis. Praesent vitae gravida magna, a imperdiet augue. Integer non commodo tortor, quis varius lacus. Integer odio odio, sollicitudin a mattis vehicula, tristique semper quam. Nunc justo diam, pulvinar non blandit a, interdum vel nibh. Proin nisl erat, hendrerit non augue a, varius ullamcorper dolor. Ut eu consequat purus. Quisque maximus mollis ornare. Donec scelerisque fringilla purus. Donec at ante quam.\n' +
      '\n' +
      'Etiam fringilla urna nec elit tempor, eu volutpat ante rutrum. Cras eleifend neque nec mauris fringilla, eu finibus eros rutrum. Maecenas eleifend pretium condimentum. Phasellus dolor magna, vulputate eu dapibus vitae, luctus sit amet eros. Nullam a velit nec orci tristique tempor tempor ut libero. Nam vel odio urna. Vivamus blandit at ante at tincidunt. Ut sodales mi nec ligula gravida cursus. Phasellus vel eros in risus posuere mattis. Curabitur at lectus gravida, consectetur risus eu, fermentum purus.\n' +
      '\n' +
      'Nullam ultrices ullamcorper mauris quis efficitur. Curabitur sit amet risus augue. Phasellus finibus vehicula tortor, vitae elementum nisi pellentesque egestas. Cras ultrices ornare metus nec maximus. Praesent vitae ipsum aliquam, elementum tellus vel, venenatis urna. Vestibulum sodales at metus at laoreet. Nunc commodo libero a massa congue elementum. Etiam ut leo sagittis erat condimentum condimentum convallis et ligula. In sit amet metus nisl. Duis condimentum blandit mattis. Fusce pellentesque urna pulvinar velit rhoncus pulvinar at id dui. Mauris scelerisque arcu nisl, in ultricies orci blandit ac. Quisque mauris dui, iaculis non tristique at, finibus ut tortor. Sed condimentum, nulla in commodo vulputate, nulla quam cursus magna, a porta lorem augue vel turpis. Duis tincidunt erat at velit imperdiet varius.\n' +
      '\n' +
      'Fusce semper nulla porta tortor vestibulum tincidunt. Etiam volutpat convallis eros, a sodales quam pharetra nec. Ut nec suscipit ligula. Curabitur porttitor sollicitudin quam, sit amet pulvinar ligula dictum eu. Nulla facilisi. Suspendisse scelerisque diam nec ante dictum, sit amet aliquam magna posuere. Donec suscipit varius leo, a ornare dui luctus ac. Donec eleifend cursus neque quis accumsan. Praesent nec molestie eros, nec placerat dui. Aenean pretium a metus quis rhoncus.\n' +
      '\n' +
      'Donec maximus vulputate ipsum, sit amet consectetur enim pharetra vel. Maecenas egestas varius laoreet. Integer ac nulla id nunc condimentum facilisis. Vestibulum faucibus diam elementum enim suscipit, id aliquam ligula venenatis. Ut vulputate lorem at magna consectetur pellentesque. Sed massa elit, vehicula in nulla ut, ultricies imperdiet justo. Mauris eu libero lacus. Mauris bibendum nisi leo, vitae sollicitudin nulla aliquet sit amet. Donec blandit diam id arcu aliquet accumsan. Nulla finibus dictum quam, et aliquam ipsum efficitur eu. Proin vitae dui dictum, efficitur purus sagittis, vestibulum est.'
    }
  }
  componentDidMount(){
    this.props.onload();//actionGetUserProfile();
    runScript();
    $('.selectpicker.services').on('changed.bs.select',  (e, clickedIndex, newValue, oldValue) => {
      let selected = $(e.currentTarget).val();
      this.setState({
        service: selected
      })
    });
  }
  handleChangeInput = (e) => {
    let {isShowSettingProfile} = this.state;
    if (e.target.name === 'isShowSettingProfile') {
      this.setState({
        isShowSettingProfile: !isShowSettingProfile
      });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    } else if (e.target.name === 'phone') {
      const re = /^[0-9\b]+$/;

      // if value is not blank, then test the regex

      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({phone: e.target.value})
      }
    } else {
      console.log(e.target.value);
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    let { profile, isLoadedProfile } = this.props.user;
    if (!prevProps.user.isLoadedProfile && isLoadedProfile) {
      let token = localStorage.getItem('cms_access_token');
      let info = localStorage.getItem(`cms_can-i-${token}`);
      let profile = {};
      if (info) {
        profile = JSON.parse(info)
      }
      let services = profile.service || [this.props.siteData.categories[0].id];
      let serviceName = profile.serviceName || this.props.siteData.categories[0].id;
      let national = profile.national || PostDataCountries.countries[0].code;
      let nationalService = profile.nationalService || PostDataCountries.countries[0].code;
      let area = profile.area || PostDataCountries.countries[0].area[0].code;
      let areaService = profile.areaService || PostDataCountries.countries[0].area[0].code;
      this.setState({
          name: profile.name || '',
          serviceType: profile.serviceType || 'PERSONAL',
          companyName: profile.companyName || '',
          tax: profile.tax || '',
          email: profile.email || '',
          phone: profile.phone || '',
          address: profile.address || '',
          accountNumber: profile.accountNumber || '',
          accountName: profile.accountName || '',
          bankName: profile.bankName || '',
          agency: profile.agency || '',
          service: services,
          description: profile.description || '',
          price: profile.price || 0,
          national: national,
          area: area,
          policy: profile.policy || '',
          nationalService: nationalService,
          areaService: areaService,
          certificateImage: profile.certificateImage || '',
          avatar: profile.avatar || '',
          arrayImage: profile.arrayImage || [],
          serviceName: profile.serviceName || this.props.siteData.categories[0].id,
          isLoading: false
      }, () => {
        $('.selectpicker').selectpicker();
        $(".selectpicker.services").selectpicker('val', services);
        $(".selectpicker.service-name").selectpicker('val', serviceName);
      })
    }
  }
  handleSelectAvatar = (e) => {
    let name  = e.target.name;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
     this.setState({
       [name]: reader.result
     })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    // this.setState({
    //   [e.target.name]: e.target.files[0],
    // })
  };
  handleUpdateProfile = (e) => {
    e.preventDefault();
    let {history} = this.props;
    let {
      name,
      companyName,
      tax,
      email,
      phone,
      address,
      verifyCode,
      isVerifyPhone,
      errorMessagePhone,
      accountNumber,
      accountName,
      bankName,
      agency,
      service,
      description,
      price,
      national,
      area,
      policy,
      serviceType,
      nationalService,
      areaService,
      certificateImage,
      avatar,
      arrayImage,
      serviceName
    } = this.state;
    let errorMessage = [];
    let { t } = this.props;
    if (!name) {
      errorMessage.push(t("Họ va tên không được rỗng"));
    }
    if (!tax) {
      errorMessage.push(t("Mã số thuê không được rỗng"));
    }
    if (!email) {
      errorMessage.push(t("Email không được rỗng"));
    }
    if (!phone) {
      errorMessage.push(t("Số điện thoại không được rỗng"));
    }
    if (!address) {
      errorMessage.push(t("Địa chỉ không được rỗng"));
    }
    if (!accountNumber) {
      errorMessage.push(t("Tài khoản ngân hàng không được rỗng"));
    }
    if (!accountNumber) {
      errorMessage.push(t("Tên ngân hàng không được rỗng"));
    }
    if (!agency) {
      errorMessage.push(t("Chi Nhánh ngân hàng không được rỗng"));
    }
    if (!service) {
      errorMessage.push(t("Dịch vụ không được rỗng"));
    }
    if (!description) {
      errorMessage.push(t("Mô tả dịch vụ không được rỗng"));
    }
    if (!price) {
      errorMessage.push(t("Giá không được rỗng"));
    }
    if (!national) {
      errorMessage.push(t("Quốc gia không được rỗng"));
    }
    if (!area) {
      errorMessage.push(t("Khu vực không được rỗng"));
    }
    if (!policy) {
      errorMessage.push(t("Chính sách hoàn trả không được rỗng"));
    }
    if (!nationalService) {
      errorMessage.push(t("Quốc gia sử dụng dịch vụ không được rỗng"));
    }
    if (!areaService) {
      errorMessage.push(t("Khu vực sử dụng dịch vụ không được rỗng"));
    }
    if (!certificateImage) {
      errorMessage.push(t("avatar không được rỗng"));
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessage: errorMessage
      });
      return;
    }
    this.setState({
      isLoading: true,
      errorMessage: errorMessage
    })
    let profile = {
      name,
      companyName,
      tax,
      email,
      phone,
      address,
      accountNumber,
      accountName,
      bankName,
      agency,
      service,
      description,
      price,
      national,
      area,
      policy,
      serviceType,
      nationalService,
      areaService,
      certificateImage,
      avatar,
      arrayImage,
      serviceName
    };
    let token = localStorage.getItem('cms_access_token');
    localStorage.setItem(`cms_can-i-${token}`, JSON.stringify(profile));
    this.setState({
      isLoading: false,
      errorMessage: []
    });
    $('.popup-with-zoom-anim').click();
  };
  handleChangeService = (e) => {
    this.setState({
      serviceName: e.target.value
    })
  };
  handleVerifyPhone = (e) => {
    e.preventDefault();
    window.Snackbar.show({
      text: "Tính năng đang được hoàn thiện",
      pos: 'bottom-center',
      showAction: false,
      actionText: "Dismiss",
      duration: 2000,
      textColor: '#fff',
      backgroundColor: '#dc4534'
    });
    return;
    let { isVerifyPhone, verifyPhone, phone } = this.state;
    let { t } = this.props;
    let errorMessagePhone = "";
    if (!isVerifyPhone) {

      if (!phone) {
        errorMessagePhone = t("Please enter your phone")
        this.setState({
          errorMessagePhone: errorMessagePhone
        })
      } else {
        this.setState({
          isVerifyPhone: true,
          verifyPhone: '',
          errorMessagePhone: errorMessagePhone
        })
      }
    } else if (!verifyPhone) {
      this.setState({
        errorMessagePhone: t('Please enter otp')
      })
    } else {
      this.state({
        errorMessagePhone: ''
      })
    }

  };
  cancelVerify = (e) => {
    e.preventDefault();
    this.setState({phone: '', isVerifyPhone: false})
  };
  handleChange = (value) => {
    this.setState({ description: value })
  };

  handleSelectImage = (e) => {
    let { arrayImage } = this.state;
    if (arrayImage.length < 10) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        arrayImage.push(reader.result);
        this.setState({
          arrayImage: arrayImage
        })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

  };

  removeImage = (index) => {
    let {arrayImage} = this.state;
    arrayImage.splice(index, 1);
    this.setState({
      arrayImage
    })
  };
  handleChangeNationalArea = (data) => {
    this.setState(data);
  };
  handleConfirmDialog = () => {
    $.magnificPopup.close();
    this.props.history.push('/home');
  };
  render () {
    let {
      firstName,
      lastName,
      currentPassword,
      repeatPassword,
      password,
      errorMessage,
      serviceType,
      tnc,
      isShowSettingProfile,
      name,
      companyName,
      tax,
      email,
      phone,
      address,
      verifyCode,
      isVerifyPhone,
      errorMessagePhone,
      accountNumber,
      accountName,
      bankName,
      agency,
      service,
      description,
      price,
      national,
      area,
      policy,
      nationalService,
      areaService,
      certificateImage,
      avatar,
      arrayImage,
      isLoading
    } = this.state;
    let { t, history } = this.props;
    return (
      <div className="dashboard-content-container">
        <div className="dashboard-content-inner" >

          {/*<div className="dashboard-headline">*/}
            {/*<h3>Settings</h3>*/}

            {/*<nav id="breadcrumbs" className="dark">*/}
              {/*<ul>*/}
                {/*<li><a href="#">Home</a></li>*/}
                {/*<li><a href="#">Dashboard</a></li>*/}
                {/*<li>Settings</li>*/}
              {/*</ul>*/}
            {/*</nav>*/}
          {/*</div>*/}
          {
            isLoading ? <Loader /> : <div className="row">



              <div className="col-xl-12">
                <div className="dashboard-box margin-top-0 margin-bottom-20">


                  <div className="headline">
                    <h3><i className="icon-material-outline-face" /> My Profile</h3>
                  </div>

                  <div className="content">
                    <ul className="fields-ul">
                      {
                        !isShowSettingProfile && <li>
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="submit-field">
                                <h5>{t('Term of use')}</h5>
                                <div className="tnc-content">
                                  {
                                    tnc
                                  }
                                </div>
                                <div className="col-xl-12 checkbox margin-top-10 tnc-checkbox">
                                  <input type="checkbox" id="two-step" name="isShowSettingProfile" onChange={this.handleChangeInput} />
                                  <label htmlFor="two-step"><span className="checkbox-icon"/> Accept term</label>
                                </div>
                              </div>

                            </div>
                          </div>
                        </li>
                      }
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Tên người đại diện")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={name}
                                name="name"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <div className="bidding-widget">

                                <h5>{t("Phân loại hình thức dịch vụ")}</h5>
                                <div className="radio">
                                  <input
                                    value="PERSONAL"
                                    onChange={this.handleChangeInput}
                                    id="radio-1"
                                    name="serviceType"
                                    type="radio"
                                    checked={serviceType === 'PERSONAL'}
                                  />
                                  <label htmlFor="radio-1"><span className="radio-label" /> Cá nhân</label>
                                </div>


                                <div className="radio">
                                  <input
                                    value="FAMILY"
                                    onChange={this.handleChangeInput}
                                    id="radio-2"
                                    name="serviceType"
                                    type="radio"
                                    checked={serviceType === 'FAMILY'}
                                  />
                                  <label htmlFor="radio-2"><span className="radio-label" /> Hộ kinh doanh cá nhân</label>
                                </div>
                                <div className="radio">
                                  <input
                                    value="COMPANY"
                                    id="radio-3"
                                    name="serviceType"
                                    onChange={this.handleChangeInput}
                                    type="radio"
                                    checked={serviceType === 'COMPANY'}
                                  />
                                  <label htmlFor="radio-3"><span className="radio-label" /> Pháp nhân</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Tên công ty")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={companyName}
                                name="companyName"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Mã số thuế")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={tax}
                                name="tax"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Email")}</h5>
                              <input
                                type="email"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={email}
                                name="email"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Địa chỉ")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={address}
                                name="address"
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <h5>{t("Hình GPDKKD")}</h5>
                            </div>
                          </div>
                          {
                            certificateImage &&  <div className="image-review col-xl-12 margin-bottom-10">
                              <img src={certificateImage || "/images/user-avatar-placeholder.png"} alt="" />
                            </div>
                          }

                          <div className="uploadButton margin-top-0 col-xl-6 ">
                            <input name="certificateImage" onChange={this.handleSelectAvatar} className="uploadButton-input" type="file" accept="image/*" id="upload-certificate"/>
                            <label className="uploadButton-button ripple-effect" htmlFor="upload-certificate">Upload Files</label>
                            <span className="uploadButton-file-name">Maximum file size: 2 MB</span>
                          </div>
                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-6">
                            {
                              !isVerifyPhone ? (
                                <div className="submit-field">
                                  <h5>{t("Phone")}</h5>
                                  <input
                                    type="text"
                                    pattern="[0-9]"
                                    className="with-border"
                                    onChange={this.handleChangeInput}
                                    value={phone}
                                    name="phone"
                                  />
                                  {
                                    errorMessagePhone &&  <div className="error-message">
                                      {errorMessagePhone}
                                    </div>
                                  }
                                </div>
                              ) : (
                                <div className="submit-field">
                                  <h5>{t("Mã xác nhận")}</h5>
                                  <input
                                    type="text"
                                    className="with-border"
                                    onChange={this.handleChangeInput}
                                    value={verifyCode}
                                    name="verifyCode"
                                  />
                                  {
                                    errorMessagePhone &&  <div className="error-message">
                                      {errorMessagePhone}
                                    </div>
                                  }
                                </div>
                              )
                            }

                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5/>
                              <a href="" onClick={this.handleVerifyPhone} className="button ripple-effect small margin-top-28">Xác nhận</a>
                              {
                                isVerifyPhone && <a href="" onClick={this.cancelVerify} className="margin-left-10 button ripple-effect small margin-top-28 btn-cancel">Hủy</a>
                              }
                            </div>
                          </div>

                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <SelectPicker
                            callback={this.handleChangeNationalArea}
                            national={national}
                            area={area}
                            nationalName="national"
                            areaName="area"
                            nationalTitle={t('Quốc gia')}
                            areaTitle={t('Khu vực')}
                          />
                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Tài khoản ngân hàng")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={accountNumber}
                                name="accountNumber"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Chủ thẻ")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={accountName}
                                name="accountName"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Ngân hàng")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={bankName}
                                name="bankName"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Chi nhánh")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={agency}
                                name="agency"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Hình đại diện")}</h5>
                              </div>
                              <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                <img className="profile-pic" src={ avatar || "/images/user-avatar-placeholder.png"} alt="" />
                                <div className="upload-button" />
                                <input name="avatar" onChange={this.handleSelectAvatar} className="file-upload" type="file" accept="image/*"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Dịch vụ")}</h5>
                              </div>

                              <select className="selectpicker services" data-live-search="true" multiple>
                                {
                                  this.props.siteData.categories.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.title}</option>
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Tên Dịch vụ")}</h5>
                              </div>

                              <select className="selectpicker service-name" data-live-search="true" onChange={this.handleChangeService}>
                                {
                                  this.props.siteData.categories.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.title}</option>
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Giá dịch vụ")}</h5>
                              <div className="input-with-icon-left no-border">
                                <i className="icon-feather-dollar-sign" />
                                <input
                                  type="number"
                                  min="0"
                                  className="input-text"
                                  placeholder="Placeholder"
                                  onChange={this.handleChangeInput}
                                  value={price}
                                  name="price"
                                />
                              </div>
                            </div>
                          </div>
                          <SelectPicker
                            callback={this.handleChangeNationalArea}
                            national={nationalService}
                            area={areaService}
                            nationalName="nationalService"
                            areaName="areaService"
                            nationalTitle={t('Quốc gia được sử dụng')}
                            areaTitle={t('Khu vực được sử dụng')}
                          />
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Giới thiệu dịch vụ")}</h5>
                              </div>
                              <textarea
                                value={description}
                                cols="30"
                                rows="5"
                                className="with-border"
                                name="description"
                                onChange={this.handleChangeInput}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Quy định hủy, hoàn tiền")}</h5>
                              </div>
                              <textarea
                                value={policy}
                                cols="30"
                                rows="5"
                                className="with-border"
                                name="policy"
                                onChange={this.handleChangeInput}
                              />

                            </div>
                          </div>

                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Ảnh dịch vụ")}</h5>
                              </div>
                            </div>
                          </div>
                          {
                            arrayImage.map((item, index) => {
                              return <div key={`image-${index}`} className="col-xl-1 col-md-3 col-xs-4 service-image margin-bottom-10">
                                <div className="btn-close " onClick={() => this.removeImage(index)}>
                                  <i className="icon-line-awesome-close" />
                                </div>
                                <img src={item || "/images/user-avatar-placeholder.png"} alt="" />
                              </div>
                            })
                          }
                          <div className="upload-service margin-top-0 col-xl-12">
                            <input  onChange={this.handleSelectImage} className="upload-service-input" type="file" accept="image/*" id="image-service"/>
                            <label className="upload-service-button ripple-effect" htmlFor="image-service">Upload Files</label>
                            <span className="upload-service-file-name">Maximum file size: 2 MB</span>
                          </div>


                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
              {
                errorMessage.length > 0 &&  <div className="margin-top-20 col-xl-12">
                  <div className="notification error ">
                    {
                      errorMessage.map(item => {
                        return <p key={item}>{item}</p>
                      })
                    }
                  </div>
                </div>
              }
              {
                isShowSettingProfile && <div className="col-xl-12">
                  <a href="" onClick={this.handleUpdateProfile} className="button ripple-effect big margin-top-20 margin-bottom-20">Save Changes</a>
                </div>
              }

            </div>
          }


        </div>
        <div style={{display: 'none'}} className="add-note-button">
          <a href="#small-dialog" className="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i class="icon-material-outline-arrow-right-alt"></i></a>
        </div>
        <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

          <div className="sign-in-form">


            <div className="popup-tabs-container">

              <div className="popup-tab-content" id="tab">
                <div className="welcome-text">
                  <h3>Đăng ký thành công</h3>
                </div>
                <div className="text">
                  Bạn hoàn thành đăng ký CanI. Bạn có thể sửa thông tin ở mục My Page
                </div>
                <button onClick={this.handleConfirmDialog} className="button full-width button-sliding-icon ripple-effect">Trang chủ <i class="icon-material-outline-arrow-right-alt"/></button>

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

