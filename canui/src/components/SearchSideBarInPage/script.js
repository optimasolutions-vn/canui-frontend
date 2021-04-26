const $ = window.$;
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

export default function runCustomJs(){
	// Bidding Slider Average Value
	$('.selectpicker').selectpicker();
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
};