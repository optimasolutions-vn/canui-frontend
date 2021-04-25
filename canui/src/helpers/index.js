import React from 'react';

export const checkAuthenticated = () => {
  let token = localStorage.getItem('access_token');
  return !!token;
};

export const checkIsCanIState = () => {
	let _state = window.sessionStorage.getItem('IsCanIState');
	return !!_state;
};

export const swapIsCanIState = () => {
	let _state = window.sessionStorage.getItem('IsCanIState');
	if(_state){
		window.sessionStorage.removeItem('IsCanIState');
		return false;
	}else{
		window.sessionStorage.setItem('IsCanIState', true);
		return true;
	}
};
