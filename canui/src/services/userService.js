import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export const register = async params => {
  let payLoad = {
    withoutToken: true,
    url: UrlPath.API.SIGN_UP,
    payload: {
      email: params.email,
      password: params.password,
      captcha: params.captcha
    }
  };
  let response = await defaultFetch.fetchData(payLoad);
  if (response.status) {
    return {
      status: true,
      message: 'Completed',
      data: response.data
    }
  } else {
    return {
      status: false,
      message: response.message,
      data: {}
    }
  }

};

export const resetPassword = async params => {
  let payLoad = {
    withoutToken: true,
    url: UrlPath.API.RESET_PASSWORD,
    payload: {
      token: params.token,
      newPassword: params.password
    }
  };
  let response = await defaultFetch.fetchData(payLoad);
  if (response.status) {
    return {
      status: true,
      message: 'Completed',
      data: response.data
    }
  } else {
    return {
      status: false,
      message: response.message,
      data: {}
    }
  }

};

export const login = async params => {
  let payLoad = {
    withoutToken: true,
    url: UrlPath.API.SIGN_IN,
    payload: {
      email: params.email,
      password: params.password,
    }
  };
  let response = await defaultFetch.fetchData(payLoad);
  console.log(response, '123')
  if (response.status) {
    return {
      status: true,
      message: 'Completed',
      data: response.data || response
    }
  } else {
    return {
      status: false,
      message: 'Username or password is incorrect',
      data: {}
    }
  }

};

export const changePassword = async params => {
  let payLoad = {
    url: UrlPath.API.CHANGE_PASSWORD,
    payload: params
  };
  console.log(params);
  let response = await defaultFetch.fetchData(payLoad);
  if (response.status) {
    return {
      status: true,
      message: 'Completed',
      data: response.data
    }
  } else {
    return {
      status: false,
      message: response.message,
      data: {}
    }
  }

};

export const getProfile = async token => {
  let payLoad = {
    url: UrlPath.API.GET_PROFILE,
    method: 'GET',
    payload: {}
  };
  let response = await defaultFetch.fetchData(payLoad);
  let profile = {};
  if (response.status) {
    profile = response.data;
  }
  return {
    status: true,
    message: '',
    data: {
      profile: profile
    }
  }
  // if (response)
  // return {
  //   status: true,
  //   message: '',
  //   data: {
  //     profile: user.profile || {email: user.username}
  //   }
  // }
};

export const getProfileCanI = async () => {
  let payLoad = {
    url: UrlPath.API.GET_CAN_I_PROFILE,
    method: 'GET',
    payload: {}
  };
  let response = await defaultFetch.fetchData(payLoad);
  return response;
};

export const updateProfileCanI = async params => {
  let payLoad = {
    url: UrlPath.API.UPDATE_CAN_I_PROFILE,
    payload: {
      ...params
    }
  };
  let response = await defaultFetch.fetchData(payLoad);
  return response
};

export const updateProfile = async params => {
  let payLoad = {
    url: UrlPath.API.UPDATE_PROFILE,
    payload: {
      ...params
    }
  };
  let response = await defaultFetch.fetchData(payLoad);
  return response
};

export const getProfileUserDetail = async params => {

  let payLoad = {
    method: 'GET',
    url: UrlPath.API.GET_USER_PROFILE+'/'+params.userId,
    payload: {}
  };
  let response = await defaultFetch.fetchData(payLoad);
  return response
};

export const loginSocial = async params => {
  console.log(params);
  if (params.provider === 'facebook' || params.provider === 'google') {
    let url = `${UrlPath.API.SERVER}/api/${params.provider}/login?social_access_token=${params.token.accessToken}&token_type=bearer&expires_at=${params.token.expiresAt}`
    let payload = {
      withoutToken: true,
      url: url,
      // method: 'GET',
      payload: {}
    }
    let response = await defaultFetch.fetchData(payload);
    if (response.status) {
      return {
        status: true,
        message: '',
        data: {
          access_token: response.data.token
        }
      }
    } else {
      return {
        status: false,
        message: 'Can not login',
      }
    }
  } else {
    return {
      status: false,
      message: 'Can not login',
      data: {}
    }
  }

};

export const uploadImage = async params => {
  let token = localStorage.getItem('access_token');
  try {
    let response = await fetch(`${UrlPath.API.UPLOAD_IMAGE}`, {
      method: 'POST',
      body: params,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if(response){
      let _r = await response.json();
      console.log(_r)
      if(response.ok){
        return {
          status: true,
          message: 'Completed',
          data: _r.data || {}
        };
      }else{
        return {
          status: false
        };
      }
    }else{
      return {
        status: false,
      };
    }
  } catch (e) {
    return {
      status: false,
    };
  }

};

export const uploadMultiImage = async params => {
  let response = await fetch(`${UrlPath.API.UPLOAD_MULTI_IMAGE}`, {
    method: 'POST',
    body: params,
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2b21pbmh0YW0uaXRAZ21haWwuY29tIiwiaWF0IjoxNjExNTEzODY5LCJleHAiOjE2MTIzNzc4Njl9.ds02gzw9QKNJvmYipLp-efXJRKjGlQHaqxunYVsUY-Gts1MeCFpH5uyObDqV5TfxVmFlRA4KwrF0spJ4Z5E03g"
    }
  });
  if(response){
    let _r = await response.json();
    console.log(_r)
    if(response.ok){
      return {
        status: true,
        message: 'Completed',
        data: _r.data || {}
      };
    }else{
      return {
        status: false
      };
    }
  }else{
    return {
      status: false,
    };
  }
};

export const sendForgotPassword = async email => {
  let response = await fetch(`${UrlPath.API.FORGOT_PASSWORD}?email=${email}`, {
    method: 'GET',
  });
  if(response){
    let _r = await response.json();
    console.log(_r)
    if(_r.status === "OK"){
      return {
        status: true,
        message: 'Completed',
      };
    }else{
      return {
        status: false
      };
    }
  }else{
    return {
      status: false,
    };
  }
};
