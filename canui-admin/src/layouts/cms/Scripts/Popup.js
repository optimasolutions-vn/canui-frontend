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
	window.$(`.selectpicker${_ClassName}`).selectpicker();
}
