export function init(){
	let _url = window.location.href;
	let _fb = 'graph_domain=facebook&access_token';
	if(_url.indexOf(_fb) > -1){
		let _str = '';
		//let _purl = new URL(_url);
		let _arParams = ['access_token', 'data_access_expiration_time', 'expires_in'];
		console.log(_url);
		//console.log(_purl);
		let _data = {
			token_type: 'bearer',
			callbacksocial: 'facebook'
		};
		let _pathUrl = _url.split('&') || [];
		if(_pathUrl?.length > 0){
			_pathUrl.map(x => {
				let _p = x.split('=') || [];
				if(_p?.length > 1){
					if(_arParams.indexOf(_p[0]) > -1){
						_data[_p[0]] = _p[1];
					}
				}
			})
		}
		if(_data?.data_access_expiration_time && _data?.expires_in){
			_data.expires_at = Number(_data.data_access_expiration_time) + Number(_data.expires_in);
			delete _data.data_access_expiration_time;
			delete _data.expires_in;
		}
		for (var i in _data) {
			if(_str){
				_str = `${_str}&${i}=${_data[i]}`; 
			}else{
				_str = `${i}=${_data[i]}`;
			}
		}
		console.log(_str);
		window.location.href = `CanuCaniTest://?${_str}`;
	}
}