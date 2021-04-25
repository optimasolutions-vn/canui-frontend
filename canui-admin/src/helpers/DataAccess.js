import {KEY} from '../libs/constValue';
const _ctstr = 'xyz@abc';
const _rstr = '%3D%3D';
export const encodeData = (_object) => {
  let _buf = '';
  let _rt, _sub;
  let _string = typeof _object === 'object' ? JSON.stringify(_object) : _object;
  if (typeof Buffer.from === "function") {
    _buf = Buffer.from(encodeURIComponent(_string)).toString('base64');
  } else {
    _buf = new Buffer(encodeURIComponent(_string)).toString('base64');
  }
  _rt = encodeURIComponent(_buf).replace(new RegExp(_rstr + '$'), _ctstr);
  _sub = _rt.substr(0, Math.ceil(_rt.length/2));
  _rt = `${_rt.replace(_sub, '')}${_sub}`;
  return _rt || false;
};

export const decodeData = (_string) => {
  if(typeof _string !== 'string'){
    console.log('input must be a String, current is :', typeof _string);
    return;
  }
  let _slpt, _buf = '';
  let _return = false;
  _slpt = _string.split(_ctstr);
  _string = `${_slpt[1]}${_slpt[0]}${_rstr}`;
  if (typeof Buffer.from === "function") {
    _buf = Buffer.from(decodeURIComponent(_string), 'base64');
  } else {
    _buf = new Buffer(decodeURIComponent(_string), 'base64');
  }

  try{
  	_return = JSON.parse(decodeURIComponent(_buf))
  }catch(err){
  	_return = decodeURIComponent(_buf)
  }
  return _return;
};
export const MaxSizeUpload = 2097152;
export const Languages = ['EN', 'VN', 'KR', 'JP', 'CN'];
export const JobStatus = ['PROCESSING', 'COMPLETED', 'PENDING', 'CANCEL'];
export const Currency = ['USD', 'AUD', 'SGD', 'VND'];
export const ServiceType = [
	{
		key: 'PERSONAL',
		value: 'Cá nhân' 
	},
	{
		key: 'FAMILY',
		value: 'Hộ kinh doanh cá nhân' 
	},
	{
		key: 'COMPANY',
		value: 'Pháp nhân' 
	},
];

export const convertNumberToHaveCommas = (_number) => {
  return _number ? parseInt((_number.toString()).replace(/\D/g,''),10).toLocaleString({locale: 'fr-FR'}) : 0;
}
export const convertStringCommasToNumber = (_string) => {
  return _string.replace(/\,/g, '');
}
export const getAvatar = (x) => {
  if(x?.canu_avatar?.length > 0){
    return x.canu_avatar[x.canu_avatar.length - 1].url;
  }else if(x?.avatar?.length > 0){
    return x.avatar[x.avatar.length - 1].url;
  }else{
    return null;
  }
}
export const getJobImage = (x) => {
  return x.image;
}
export const setSessionStore = (_key, _val) => {
  if(window.sessionStorage){
    let _data = {};
    try{
      _data = window.sessionStorage.getItem(_key);
      _data = JSON.parse(_data);
    }catch(err){

    }
    window.sessionStorage.setItem(_key, JSON.stringify(_val));
  }
}
export const getSessionStore = (_key) => {
  if(window.sessionStorage){
    let _data = window.sessionStorage.getItem(_key);
    if(_data){
      try{
        _data = JSON.parse(_data);
      }catch(err){

      }
    }
    return _data || false;
  }
  return false;
}

export const getNationList = () => {
  return getSessionStore(`${KEY.country}`);
}

export const getCitiesList = (_nationId) => {
  return getSessionStore(`${KEY.city}${_nationId}`);
}