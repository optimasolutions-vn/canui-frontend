import React from 'react';

export const checkAuthenticated = () => {
  	let token = localStorage.getItem('cms_access_token');
  	return !!token;
};
export const checkIsLoginSession = () => {
	let token = window.sessionStorage.getItem('cms_access_token');
  	return !!token;
};
export const logout = () => {
	window.sessionStorage.removeItem('cms_access_token');
	window.location.reload();
};
