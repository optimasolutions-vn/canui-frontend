const $ = window.$;
export const Popup = () => {
	$('.popup-with-zoom-anim').magnificPopup({
		 type: 'inline',
		 fixedContentPos: false,
		 fixedBgPos: true,
		 overflowY: 'auto',
		 closeBtnInside: true,
		 preloader: false,
		 midClick: true,
		 removalDelay: 300,
		 mainClass: 'my-mfp-zoom-in'
	});
}
export const Alert = (_obj) => {

	window.Snackbar.show({
	      text: _obj?.title || (_obj?.status === 'success' ? "Content has updated" : "Something wrong!"),
	      pos: 'bottom-center',
	      showAction: false,
	      actionText: "Dismiss",
	      duration: _obj?.time || 2500,
	      textColor: _obj?.status === 'success' ? '#5f9025' : '#de5959',
	      backgroundColor: _obj?.status === 'success' ? '#EBF6E0' : '#ffe9e9',
    });
}

export const SelectPicker = (_ClassName) => {
	window.$(`.selectpicker.${_ClassName}`).selectpicker();
}

export const Accordion = () => {
	
	  
	  var $accordion = $('.js-accordion');
	  var $accordion_header = $accordion.find('.js-accordion-header');
	 
	  // default settings 
	  var settings = {
	    // animation speed
	    speed: 400,
	    
	    // close all other accordion items if true
	    oneOpen: false
	  };
	    
	  var accordion = {
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
	
	accordion.init({ speed: 300, oneOpen: true });
}
