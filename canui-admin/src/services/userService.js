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
  if (response.status) {
    return {
      status: true,
      message: 'Completed',
      data: response.data || response
    }
  } else {
    return {
      status: false,
      message: response.message,
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
  let users = localStorage.getItem('cms_users');
  let arrayUser = [];
  if (users){
    try {
      arrayUser = JSON.parse(users);
    } catch(ex) {
      arrayUser = [];
    }
  }
  let index = arrayUser.map(item => {
    return item.access_token
  }).indexOf(token);
  let user = {};
  if (index !== -1) {
    user = arrayUser[index]
  }
  return {
    status: true,
    message: '',
    data: {
      profile: user.profile || {email: user.username}
    }
  }
};

export const loginSocial = async params => {
  // console.log(params);
  // if (params.provider === 'facebook' || params.provider === 'google') {
  //   let url = `${UrlPath.API.SERVER}/${params.provider}/login?social_access_token=${params.token.accessToken}&token_type=bearer&expires_at=${params.token.expiresAt}`
  //   let payload = {
  //     withoutToken: true,
  //     url: url,
  //     method: 'GET',
  //     payload: {}
  //   }
  //   let response = await defaultFetch.fetchData(payload);
  //   console.log(response)
  // }

  if (params.token.accessToken) {
    return {
      status: true,
      message: '',
      data: {
        access_token: params.token.accessToken
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
  let response = await fetch(`${UrlPath.API.UPLOAD_IMAGE}`, {
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
