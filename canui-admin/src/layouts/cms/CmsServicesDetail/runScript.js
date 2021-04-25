const $ = window.$;
export const runScript = () => {
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
}