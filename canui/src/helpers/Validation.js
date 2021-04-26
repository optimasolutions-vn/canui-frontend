export default {
	patterns: {
		email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
		number: /^[0-9]+$/,
		cleanText: /[&<>"'*@`$()-_#!^.,:;?/%\\|}{+=~]/g,
	},
	clean(_val){
		_val = _val.replace(this.patterns.cleanText, ' ');
		return _val.replace(/[\s]{2,}/g, ' ');
	},
	test(_val, _type){
		if(_type === 'required'){
			let _test = _val.replace(/\s/g,'');
			if(_test.length > 0){
				return _val.trim();
			}
		}
		if(typeof _val === 'string' && _val.length > 0 && _type){
			_val = _val.trim();
			if(_val.length > 0){
				if(this.patterns[_type] && this.patterns[_type].test(_val)){
					return _val;
				}
				
			}
		}
		
		return false;
	}
};