import qs from 'qs';
export const convertDateTimeToLocaleString = (_dateTimeString) => {
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let _formatDisplay = 'en-US';
  let _obj = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
    timeZone: tz
  };
  if(_dateTimeString.indexOf('T') === -1){
    _dateTimeString = (_dateTimeString.trim()).replace(/\s+/g, 'T') + 'Z';
  }else if(_dateTimeString.indexOf('T') > -1 && _dateTimeString.indexOf('Z') === -1){
    _dateTimeString = `${_dateTimeString.trim()}Z`;
  }
  console.log(_dateTimeString);
  return ( new Date(`${_dateTimeString}`)).toLocaleString(_formatDisplay, _obj);
};

export const compareTime = (_dateTimeString) => {
  let _toDay = new Date();
  let _toDayString = _toDay.toDateString();
  let _resDayLong = convertDateTimeToLocaleString(_dateTimeString);
  let _more = (Date.parse(_toDayString) - Date.parse(_resDayLong))/1000; // seconds
  let _res;
  // in current day
  //console.log(_more);
  if(_more < 0){
    _res = (Date.now() - Number(Date.parse(_resDayLong)))/1000/60; // minute
    //console.log(_res);
    if(_res && _res < 60){
      return `${_res} minute ago`;
    }else if(_res > 60 && _res < 1440){
      return `${Math.ceil(_res/60)} hours ago`;
    }else{
      return `${Math.ceil(_res/60/60)} days ago`;
    }
  }else if(_more < 0){
    _res = (Date.now() - Number(Date.parse(_resDayLong)))/1000/60; // minute
    //console.log(_res);
    if(_res && _res < 60){
      return `${_res} minute ago`;
    }else if(_res > 60 && _res < 1440){
      return `${Math.ceil(_res/60)} hours ago`;
    }else{
      return `${Math.ceil(_res/60/60)} days ago`;
    }
  }else{

  }
  //let  sameDate;
  
  //return ((Date.now() - Date.parse(convertDateTimeToLocaleString(_dateTimeString)))/1000).toFixed(0)/60/60;
}

export const objectToUrl = (params) => {
  let url = new URL(window.origin);
  //console.log(url);
  for(let i in params){
    url.searchParams.append(i, params[i]);
  }
  return url;
};

export const UrlToObject = (search) => {
  let params = qs.parse(search || window.location.search, {ignoreQueryPrefix: true});
  for (let i in params) {
    if (!params[i]) {
      delete params[i];
    }
  }
  return params;
}