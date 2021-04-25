export default {
	defaultOptionsConst: {
		tokenKey: 'Authorization',
	},
	returnObject(_data) {
		return {
			status: _data.status || false,
			message: _data.message,
			data: _data.data,
		};
	},
	async getCurrentToken() {
		let accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			return `Bearer ${accessToken}`;
		}
		return 'token-default';
	},
	async prepareOptions(_options) {
		if(!_options || !_options.url){
			return false;
		}
		/*
		{
			withoutToken: true, // no need token attach in header
			urlWithToken: false, // change to true if need token in url
			method: 'GET' | 'POST' | 'PUT', // default 'POST' when empty
			url: 'endpoint', // url API endpoint
			haveCookie: false, // default
			headers: {

			},
			payload: {
				t: c,
				d: z
			}
		}
		*/
    	_options.method = _options.method || 'POST';

		const _obj = {
			url: _options.url,
			method: _options.method || 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: {},
		};
		if(!_options.withoutToken){
			_obj.headers[`${this.defaultOptionsConst.tokenKey}`] = await this.getCurrentToken();
		}
		if(_options.urlWithToken){
			if(_options.url.indexOf(`${this.defaultOptionsConst.tokenKey}`) === -1){
				let _crt = await this.getCurrentToken();
				if(_options.url.indexOf('?') > -1){
					_options.url = `${_options.url}&${this.defaultOptionsConst.tokenKey}=${_crt}`;
				}else{
					_options.url = `${_options.url}?${this.defaultOptionsConst.tokenKey}=${_crt}`;
				}
			}
		}
		if(_options.headers){
			_obj.headers = Object.assign(_obj.headers, _options.headers);
		}
		if(_options.payload){
			if(typeof _options.payload === 'object'){
				_obj.body = JSON.stringify(_options.payload);
			}else if(typeof _options.payload === 'array'){
				_obj.body = _options.payload;
			}
			delete _obj.body.dfa;
		}

		return _obj;
	},
	async fetchData(_options){
		let result,
			_params = await this.prepareOptions(_options);

		if(!_params){
			return this.returnObject({
				status: false,
				message: 'Wrong Data Input',
				data: false
			});
		}

		try{
			if(_options?.method === 'GET'){
          		console.log(_params)
	    		result = await fetch(_options.url, {
	            	headers: _params.headers
	          	});
	    	}else{
	    		result = await fetch(_options.url, _params);
	    	}
		}catch(err){
			console.log(err)
			// check err to handle
			return this.returnObject({
				status: false,
				message: 'fail',
				data: false
			})
		}
		if(result){
			if (result.status !== 200 ){
		        return this.returnObject({
		          status: false,
		          message: '' ,
		          data: {}
		        });
			}
			let _r = await result.json();
			if(result.ok){
				return this.returnObject({
					status: true,
					message: _r.message || 'Completed',
					data: _r.data || _r || {}
				});
			}else{
				return this.returnObject({
					status: false,
					message: _r.message ,
					data: {}
				});
			}
		}else{
			return this.returnObject({
				status: false,
				message: '' ,
				data: {}
			});
		}

	},
}
