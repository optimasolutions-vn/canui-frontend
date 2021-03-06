import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ReactQuill from 'react-quill';
import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';
import PostDataCountries from '../../helpers/PostDataCountries';
import SelectPicker from "../../components/SelectPicker";
import Loader from '../../components/effects/Loader';
import otherServices from '../../services/otherServices';
import {runScript} from './script';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import {getCitiesList, getNationList, Phones} from "../../helpers/DataAccess";
import {Currency} from "../../helpers/DataAccess"
import {Alert} from '../Scripts/ManualScript';
import {
  actionGetUserProfileCanI,
  actionUpdateProfileCanI,
  actionLogout
} from '../../actions/actionUser';
import {
  uploadImage
} from '../../services/userService';
import 'react-quill/dist/quill.snow.css';
import './style.scss';
import UrlPath from '../../libs/UrlPath';

const mapStateToProps = state => ({
 user: state.user,
 siteData: state.siteData
});

const mapDispatchToProps = dispatch => ({
  onload: () => dispatch(actionGetUserProfileCanI()),
  onUpdateProfile: (data) => dispatch(actionUpdateProfileCanI(data))
});

const $ = window.$;


class Profile extends Component {
  constructor(props) {
    super(props);
    let country = getNationList();
    let city = getCitiesList(country[0].countryId);
    this.state = {
      country: country,
      city: city,
      currencyList: Currency,
      avatarFile: null,
      certificateImageFile: null,
      currency: 'USD',
      profile: {},
      isLoading: true,
      currentPassword: '',
      repeatPassword: '',
      password: '',
      firstName: '',
      lastName: '',
      errorMessage: [],
      isShowSettingProfile: false,
      serviceType: 'PERSONAL',
      verifyCode: '',
      description: '',
      price: 0,
      phoneVerified: false,
      arrayImage: [],
      arrayFile: [],
      service: [props.siteData.categories[0].id],
      national: country[0].countryId,
      nationalService: country[0].countryId,
      avatar: '',
      certificateImage: '',
      arrayDeleteImage: [],
      tnc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor eleifend massa. Curabitur efficitur mauris et lacinia facilisis. Praesent vitae gravida magna, a imperdiet augue. Integer non commodo tortor, quis varius lacus. Integer odio odio, sollicitudin a mattis vehicula, tristique semper quam. Nunc justo diam, pulvinar non blandit a, interdum vel nibh. Proin nisl erat, hendrerit non augue a, varius ullamcorper dolor. Ut eu consequat purus. Quisque maximus mollis ornare. Donec scelerisque fringilla purus. Donec at ante quam.\n' +
      '\n' +
      'Etiam fringilla urna nec elit tempor, eu volutpat ante rutrum. Cras eleifend neque nec mauris fringilla, eu finibus eros rutrum. Maecenas eleifend pretium condimentum. Phasellus dolor magna, vulputate eu dapibus vitae, luctus sit amet eros. Nullam a velit nec orci tristique tempor tempor ut libero. Nam vel odio urna. Vivamus blandit at ante at tincidunt. Ut sodales mi nec ligula gravida cursus. Phasellus vel eros in risus posuere mattis. Curabitur at lectus gravida, consectetur risus eu, fermentum purus.\n' +
      '\n' +
      'Nullam ultrices ullamcorper mauris quis efficitur. Curabitur sit amet risus augue. Phasellus finibus vehicula tortor, vitae elementum nisi pellentesque egestas. Cras ultrices ornare metus nec maximus. Praesent vitae ipsum aliquam, elementum tellus vel, venenatis urna. Vestibulum sodales at metus at laoreet. Nunc commodo libero a massa congue elementum. Etiam ut leo sagittis erat condimentum condimentum convallis et ligula. In sit amet metus nisl. Duis condimentum blandit mattis. Fusce pellentesque urna pulvinar velit rhoncus pulvinar at id dui. Mauris scelerisque arcu nisl, in ultricies orci blandit ac. Quisque mauris dui, iaculis non tristique at, finibus ut tortor. Sed condimentum, nulla in commodo vulputate, nulla quam cursus magna, a porta lorem augue vel turpis. Duis tincidunt erat at velit imperdiet varius.\n' +
      '\n' +
      'Fusce semper nulla porta tortor vestibulum tincidunt. Etiam volutpat convallis eros, a sodales quam pharetra nec. Ut nec suscipit ligula. Curabitur porttitor sollicitudin quam, sit amet pulvinar ligula dictum eu. Nulla facilisi. Suspendisse scelerisque diam nec ante dictum, sit amet aliquam magna posuere. Donec suscipit varius leo, a ornare dui luctus ac. Donec eleifend cursus neque quis accumsan. Praesent nec molestie eros, nec placerat dui. Aenean pretium a metus quis rhoncus.\n' +
      '\n' +
      'Donec maximus vulputate ipsum, sit amet consectetur enim pharetra vel. Maecenas egestas varius laoreet. Integer ac nulla id nunc condimentum facilisis. Vestibulum faucibus diam elementum enim suscipit, id aliquam ligula venenatis. Ut vulputate lorem at magna consectetur pellentesque. Sed massa elit, vehicula in nulla ut, ultricies imperdiet justo. Mauris eu libero lacus. Mauris bibendum nisi leo, vitae sollicitudin nulla aliquet sit amet. Donec blandit diam id arcu aliquet accumsan. Nulla finibus dictum quam, et aliquam ipsum efficitur eu. Proin vitae dui dictum, efficitur purus sagittis, vestibulum est.'
    }
    this.onloadVerify = false;
  }
  async componentDidMount(){
    // let formDelete = new FormData();
    // formDelete.append("deleted", '29,32,45,48,59,28,31,34,43,44,47,58,30,33,35,36,37,38,39,40,46,49,50,51,52,53,54,55,56,57,60');
    // let resDelete = await uploadImage(formDelete);
    // return
    this.props.onload();//actionGetUserProfile();
    runScript();
    $('.selectpicker.services').on('changed.bs.select',  (e, clickedIndex, newValue, oldValue) => {
      let selected = $(e.currentTarget).val();
      this.setState({
        service: selected
      })
    });
  }

  handleChangeInput = (e) => {
    let {isShowSettingProfile} = this.state;
    if (e.target.name === 'isShowSettingProfile') {
      this.setState({
        isShowSettingProfile: !isShowSettingProfile
      });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    } else if (e.target.name === 'phone' || e.target.name === 'accountNumber') {
      const re = /^[0-9\b]+$/;

      // if value is not blank, then test the regex

      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({
        	[e.target.name]: e.target.value
        })
      }
    } else {
      console.log(e.target.value);
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    let { canI, profile, isUploadingProfileCanI, isLoadingProfileCanI, errorMessage } = this.props.user;
    let {siteData} = this.props;
    if (prevProps.user.isUploadingProfileCanI && !isUploadingProfileCanI && errorMessage) {
      window.Snackbar.show({
        text: errorMessage,
        pos: 'bottom-center',
        showAction: false,
        actionText: "Dismiss",
        duration: 2000,
        textColor: '#fff',
        backgroundColor: '#dc4534'
      });
    }
    if (prevProps.user.isUploadingProfileCanI && !isUploadingProfileCanI && !errorMessage) {
      window.Snackbar.show({
        text: prevProps.t('Success'),
        pos: 'bottom-center',
        showAction: false,
        actionText: "Dismiss",
        duration: 2000,
        textColor: '#5f9025',
        backgroundColor: '#EBF6E0'
      });
      prevProps.history.push(`${UrlPath.Home}`)
    }
    if (prevProps.user.isLoadingProfileCanI && !isLoadingProfileCanI) {
      let certificateImage = '';
      let avatar = profile.avatar || '';
      let arrayImage = [];
      let token = localStorage.getItem('access_token');
      let info = localStorage.getItem(`can-i-${token}`);
      let services = canI.service || [siteData.categories[0].id];
      let national = canI.national || prevState.country[0].countryId;
      let nationalService = canI.nationalService || prevState.country[0].countryId;
      let area = canI.area || prevState.city[0].id;
      let areaService = canI.areaService || prevState.city[0].id;
      let currency = canI.currency || 'VND';
      if (canI.files && Object.keys(canI.files).length !== 0) {
        certificateImage = canI.files.certificateImage ? canI.files.certificateImage[0].url : '';
        if (canI.files.serviceImage) {
          arrayImage = canI.files.serviceImage.map(function (item) {
            return item.url
          })
        }
        if (canI.files.cani_avatar) {
          avatar = canI.files.cani_avatar[0].url
        }
      }
      let name = `${profile.firstName || ''} ${profile.lastName || ''}`;
      this.setState({
          currency: currency,
          name: canI.name || name,
          serviceType: canI.serviceType || 'PERSONAL',
          companyName: canI.companyName || '',
          tax: canI.tax || '',
          email: canI.email || '',
          phone: canI.phone || '',
          address: canI.address || '',
          accountNumber: canI.accountNumber || '',
          accountName: canI.accountName || '',
          bankName: canI.bankName || '',
          agency: canI.bankBranch || '',
          service: services,
          description: canI.description || '',
          price: canI.price || 0,
          national: national,
          area: area,
          policy: canI.policy || '',
          nationalService: nationalService,
          areaService: areaService,
          certificateImage: certificateImage,
          avatar: avatar,
          arrayImage: arrayImage,
          title: canI.title,
          isLoading: false,
          phoneVerified: canI.phoneVerified,
      }, () => {
        $('.selectpicker').selectpicker();
        $(".selectpicker.services").selectpicker('val', services);
        $(".selectpicker.currency").selectpicker('val', currency);
      })
    }
  }
  handleSelectAvatar = (e) => {
    let { arrayDeleteImage, certificateImageFile, avatarFile } = this.state;
    let name  = e.target.name;
    let reader = new FileReader();
    let {canI} = this.props.user;
    let f = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    let url = '';
    if (name === 'avatar') {
      url = this.state.avatar;
      avatarFile = f
    } else {
      url = this.state.certificateImage;
      certificateImageFile = f
    }
    let arr = canI.files &&  canI.files[name] ? canI.files[name] : [];
    let idx = arr.map(item => {
      return item.url
    }).indexOf(url);
    if (idx !== -1) {
      arrayDeleteImage.push(arr[idx].id)
    }
    reader.onload = () => {
      console.log(avatarFile, certificateImageFile)
     this.setState({
       [name]: reader.result,
       avatarFile,
       certificateImageFile
     })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    // this.setState({
    //   [e.target.name]: e.target.files[0],
    // })
  };
  handleUpdateProfile = async (e) => {
    e.preventDefault();
    let {history, onUpdateProfile} = this.props;
    let { canI } = this.props.user;
    let {
      name,
      companyName,
      tax,
      email,
      phone,
      address,
      currency,
      accountNumber,
      accountName,
      bankName,
      agency,
      service,
      description,
      price,
      national,
      area,
      policy,
      serviceType,
      nationalService,
      areaService,
      certificateImage,
      dialCode,
      arrayImage,
      arrayFile,
      serviceName,
      arrayDeleteImage,
      certificateImageFile,
      avatarFile,
      title,
      isVerifyPhone
    } = this.state;
    let errorMessage = [];
    let { t } = this.props;
    if (!name) {
      errorMessage.push(t("H??? va t??n kh??ng ???????c r???ng"));
    }
    if (!tax) {
      errorMessage.push(t("M?? s??? thu?? kh??ng ???????c r???ng"));
    }
    if (!phone) {
      errorMessage.push(t("S??? ??i???n tho???i kh??ng ???????c r???ng"));
    } else if (!isVerifyPhone && (!canI.phone || canI.phone !== dialCode?.dialCode + phone) ) {
      errorMessage.push(t("Please verify phone"));
    }
    if (!address) {
      errorMessage.push(t("?????a ch??? kh??ng ???????c r???ng"));
    }
    if (!accountNumber) {
      errorMessage.push(t("T??i kho???n ng??n h??ng kh??ng ???????c r???ng"));
    }
    if (!accountName) {
      errorMessage.push(t("T??n ng??n h??ng kh??ng ???????c r???ng"));
    }
    if (!agency) {
      errorMessage.push(t("Chi Nh??nh ng??n h??ng kh??ng ???????c r???ng"));
    }
    if (!service) {
      errorMessage.push(t("D???ch v??? kh??ng ???????c r???ng"));
    }
    if (!description) {
      errorMessage.push(t("M?? t??? d???ch v??? kh??ng ???????c r???ng"));
    }
    if (!price) {
      errorMessage.push(t("Gi?? kh??ng ???????c r???ng"));
    }
    if (!national) {
      errorMessage.push(t("Qu???c gia kh??ng ???????c r???ng"));
    }
    if (!area) {
      errorMessage.push(t("Khu v???c kh??ng ???????c r???ng"));
    }
    if (!policy) {
      errorMessage.push(t("Ch??nh s??ch ho??n tr??? kh??ng ???????c r???ng"));
    }
    if (!nationalService) {
      errorMessage.push(t("Qu???c gia s??? d???ng d???ch v??? kh??ng ???????c r???ng"));
    }
    if (!areaService) {
      errorMessage.push(t("Khu v???c s??? d???ng d???ch v??? kh??ng ???????c r???ng"));
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessage: errorMessage
      });
      return;
    }
    this.setState({
      isLoading: true,
      errorMessage: errorMessage
    });
    let profile = {
      name,
      companyName,
      tax,
      email,
      phone: dialCode?.dialCode + phone,
      address,
      accountNumber,
      accountName,
      bankName,
      agency,
      service,
      description,
      price,
      national,
      area,
      policy,
      serviceType,
      nationalService,
      areaService,
      serviceName,
      bankBranch: agency,
      currency,
      title
    };
    if (arrayDeleteImage.length > 0) {
      let formDelete = new FormData();
      formDelete.append('deleted', arrayDeleteImage.toString());
      let res = await uploadImage(formDelete);
    }

    if (avatarFile || certificateImageFile || arrayFile.length > 0) {
      let formData = new FormData();
      if (certificateImageFile) {
        formData.append("certificateImage", certificateImageFile)
      }
      if (avatarFile) {
        formData.append("cani_avatar", avatarFile)
      }
      if (arrayFile.length > 0) {
        for (let i of arrayFile) {
          formData.append("serviceImage", i)
        }
      }
      let res = await uploadImage(formData);
      if (!res.status) {
        this.setState({
          errorMessage: t("Dung l?????ng ???nh qu?? l???n kh??ng th??? upload")
        })
        return
      }
    }

    if (canI.id) {
      profile.id = canI.id
    }
    // console.log(profile);
    // debugger;
    onUpdateProfile(profile);
    this.setState({
      isLoading: false
    })
    // let token = localStorage.getItem('access_token');
    // localStorage.setItem(`can-i-${token}`, JSON.stringify(profile));
    // this.setState({
    //   isLoading: false,
    //   errorMessage: []
    // });
    // $('.popup-with-zoom-anim').click();
  };
  handleChangeService = (e) => {
    this.setState({
      serviceName: e.target.value
    })
  };
  handleChangeCurrency = (e) => {
    this.setState({
      currency: e.target.value
    })
  };

  onChangePhone = (e, v, x) => {
  	console.log(e);
  	console.log(v);
  	console.log(x);
  	if(!e){
  		if(!this.state.errorMessagePhone){
  			let errorMessagePhone = this.props.t("Please enter your phone");
	        this.setState({
	          errorMessagePhone: errorMessagePhone
	        })
  		}
  	}else{
  		this.setState({
  		  phone: v,
  		  dialCode: x,
          errorMessagePhone: false
        })
  	}
  }
  onBlurPhone = (e, v, x) => {
  	console.log(e);
  	if(!e){
  		if(!this.state.errorMessagePhone){
  			let errorMessagePhone = this.props.t("Please enter your phone");
	        this.setState({
	          errorMessagePhone: errorMessagePhone
	        })
  		}
  	}
  }
  handleVerifyPhone = async (e) => {
    e.preventDefault();
    let { isVerifyPhone, verifyCode, phone, dialCode } = this.state;
    let { t } = this.props;
    let errorMessagePhone = "";

    /*window.Snackbar.show({
      text: "T??nh n??ng ??ang ???????c ho??n thi???n",
      pos: 'bottom-center',
      showAction: false,
      actionText: "Dismiss",
      duration: 2000,
      textColor: '#fff',
      backgroundColor: '#dc4534'
    });
    return;*/

    if (!isVerifyPhone) {
      if (!phone) {
        errorMessagePhone = t("Please enter your phone");
        this.setState({
          errorMessagePhone: errorMessagePhone
        })
      } else {
      	if(this.onloadVerify){
      		return;
      	}
      	this.onloadVerify = true;
      	if(dialCode?.iso2 === 'vn'){
      		let _n = phone.slice(0, 3);
      		if(Phones.vn.mobifone.filter(x => x === _n)?.length > 0){
      			this.setState({
		          errorMessagePhone: t("At this moment we are not support verify Mobifone number !")
		        })
		        Alert({
		        	title: t("At this moment we are not support verify Mobifone number"),
		        	time: 4000,
		        })
		        return;
      		}
      	}
        let _res = await  otherServices.verifyPhone({
					        	phoneNumber : `+${dialCode?.dialCode}${phone}`
					        });
    	if(_res?.status){
    		this.setState({
				isVerifyPhone: true,
				verifyPhone: '',
				errorMessagePhone: t('Please enter code!')
    		})
    	}else{
    		this.setState({
				isVerifyPhone: false,
				errorMessagePhone: t("Something wrong, please try again after 10 minutes !")
    		})
    	}
    	this.onloadVerify = false;
      }
    } else if (!verifyCode) {
      this.setState({
        errorMessagePhone: t('Please enter otp')
      })
    } else {
    	if(this.onloadVerify){
    		return;
    	}
    	this.onloadVerify = true;
      let _resv = await  otherServices.verifyCode({
					        	code : `${verifyCode}`
					        });
    	if(_resv?.status){
    		Alert({
    			title: t('Your number have been verified!'),
    			status: 'success',
    			time: 4000
    		})
    		this.setState({
				errorMessagePhone: ''
    		})
    	}else{
    		this.setState({
				isVerifyPhone: false,
				verifyCode: '',
				errorMessagePhone: t("Something wrong, please try again")
    		})
    	}
    	this.onloadVerify = false;
    }

  };
  cancelVerify = (e) => {
    e.preventDefault();
    this.setState({isVerifyPhone: false})
  };
  handleChange = (value) => {
    this.setState({ description: value })
  };

  handleSelectImage = (e) => {
    let { arrayImage, arrayFile } = this.state;
    if (arrayImage.length < 10) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        arrayImage.push(reader.result);
        arrayFile.push(file);
        this.setState({
          arrayImage: arrayImage,
          arrayFile: arrayFile
        })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }

  };

  removeImage = (index) => {
    let {arrayImage, arrayFile, arrayDeleteImage} = this.state;
    let {canI} = this.props.user;
    if (arrayImage[index].indexOf('https://') !== -1) {
      let arr = canI.files &&  canI.files.serviceImage ? canI.files.serviceImage : [];
      console.log(arr)
      let idx = arr.map(item => {
        return item.url
      }).indexOf(arrayImage[index]);
      console.log(arr, idx)
      if (idx !== -1) {
        arrayDeleteImage.push(arr[idx].id)
      }
    }
    arrayImage.splice(index, 1);
    arrayFile.splice(index, 1);
    this.setState({
      arrayImage,
      arrayFile
    })
  };
  handleChangeServiceT = (e) => {
		let _sl = e.target.selectedOptions;
		let _cr = [];
		for(let i of _sl){
			_cr.push(Number(i.value));
		}
		this.setState({
			service: _cr
		})
	}
  handleChangeNationalArea = (data) => {
    this.setState(data);
  };
  handleConfirmDialog = () => {
    $.magnificPopup.close();
    this.props.history.push(`${UrlPath.Home}`);
  };
  render () {
    let {
      currencyList,
      errorMessage,
      serviceType,
      tnc,
      isShowSettingProfile,
      name,
      companyName,
      tax,
      email,
      phone,
      address,
      verifyCode,
      isVerifyPhone,
      errorMessagePhone,
      accountNumber,
      accountName,
      bankName,
      agency,
      service,
      description,
      price,
      national,
      area,
      policy,
      nationalService,
      areaService,
      certificateImage,
      avatar,
      arrayImage,
      isLoading,
      title
    } = this.state;
    let {
      isLoadingProfileCanI,
      isUploadingProfileCanI
    } = this.props.user;
    let { t, history, siteData } = this.props;
    return (
      <div className="dashboard-content-container">
        <div className="dashboard-content-inner" >

          {/*<div className="dashboard-headline">*/}
            {/*<h3>Settings</h3>*/}

            {/*<nav id="breadcrumbs" className="dark">*/}
              {/*<ul>*/}
                {/*<li><a href="#">Home</a></li>*/}
                {/*<li><a href="#">Dashboard</a></li>*/}
                {/*<li>Settings</li>*/}
              {/*</ul>*/}
            {/*</nav>*/}
          {/*</div>*/}
          {
            isLoading || isUploadingProfileCanI || isLoadingProfileCanI ? <Loader /> : <div className="row">



              <div className="col-xl-12">
                <div className="dashboard-box margin-top-0 margin-bottom-20">


                  <div className="headline">
                    <h3><i className="icon-material-outline-face" /> My Profile</h3>
                  </div>

                  <div className="content">
                    <ul className="fields-ul">
                      {
                        !isShowSettingProfile && <li>
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="submit-field">
                                <h5>{t('Term of use')}</h5>
                                <div className="tnc-content">
                                  {
                                    tnc
                                  }
                                </div>
                                <div className="col-xl-12 checkbox margin-top-10 tnc-checkbox">
                                  <input type="checkbox" id="two-step" name="isShowSettingProfile" onChange={this.handleChangeInput} />
                                  <label htmlFor="two-step"><span className="checkbox-icon"/> Accept term</label>
                                </div>
                              </div>

                            </div>
                          </div>
                        </li>
                      }
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("T??n ng?????i ?????i di???n")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={name}
                                name="name"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <div className="bidding-widget">

                                <h5>{t("Ph??n lo???i h??nh th???c d???ch v???")}</h5>
                                <div className="radio">
                                  <input
                                    value="PERSONAL"
                                    onChange={this.handleChangeInput}
                                    id="radio-1"
                                    name="serviceType"
                                    type="radio"
                                    checked={serviceType === 'PERSONAL'}
                                  />
                                  <label htmlFor="radio-1"><span className="radio-label" /> C?? nh??n</label>
                                </div>


                                <div className="radio">
                                  <input
                                    value="FAMILY"
                                    onChange={this.handleChangeInput}
                                    id="radio-2"
                                    name="serviceType"
                                    type="radio"
                                    checked={serviceType === 'FAMILY'}
                                  />
                                  <label htmlFor="radio-2"><span className="radio-label" /> H??? kinh doanh c?? nh??n</label>
                                </div>
                                <div className="radio">
                                  <input
                                    value="COMPANY"
                                    id="radio-3"
                                    name="serviceType"
                                    onChange={this.handleChangeInput}
                                    type="radio"
                                    checked={serviceType === 'COMPANY'}
                                  />
                                  <label htmlFor="radio-3"><span className="radio-label" /> Ph??p nh??n</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("T??n c??ng ty")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={companyName}
                                name="companyName"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("M?? s??? thu???")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={tax}
                                name="tax"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Email")}</h5>
                              <input
                                type="email"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={email}
                                name="email"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("?????a ch???")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={address}
                                name="address"
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <h5>{t("H??nh GPDKKD")}</h5>
                            </div>
                          </div>
                          {
                            certificateImage &&  <div className="image-review col-xl-12 margin-bottom-10">
                              <img src={certificateImage || "/images/user-avatar-placeholder.png"} alt="" />
                            </div>
                          }

                          <div className="uploadButton margin-top-0 col-xl-6 ">
                            <input name="certificateImage" onChange={this.handleSelectAvatar} className="uploadButton-input" type="file" accept="image/*" id="upload-certificate"/>
                            <label className="uploadButton-button ripple-effect" htmlFor="upload-certificate">Upload Files</label>
                            <span className="uploadButton-file-name">Maximum file size: 2 MB</span>
                          </div>
                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-6">
                            {
                              !isVerifyPhone ? (
                                <div className="submit-field">
                                  <h5>{t("Phone")}</h5>
                                  <IntlTelInput
								      preferredCountries={['vn','kr','jp','cn']}
								      defaultValue={phone}
								      fieldName="phone"
								      inputClassName="with-border"
								      onPhoneNumberChange={this.onChangePhone}
								      onPhoneNumberBlur={this.onBlurPhone}
								    />
                                  {
                                    errorMessagePhone &&  <div className="error-message">
                                      {errorMessagePhone}
                                    </div>
                                  }
                                </div>
                              ) : (
                                <div className="submit-field">
                                  <h5>{t("M?? x??c nh???n")}</h5>
                                  <input
                                    type="text"
                                    className="with-border"
                                    onChange={this.handleChangeInput}
                                    value={verifyCode}
                                    name="verifyCode"
                                    id="verifyCodeNumber"
                                  />
                                  {
                                    errorMessagePhone &&  <div className="error-message">
                                      {errorMessagePhone}
                                    </div>
                                  }
                                </div>
                              )
                            }

                          </div>

                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5/>
                              {(this.state.phone || isVerifyPhone) && (
                              <a href="" onClick={this.handleVerifyPhone} className="button ripple-effect small margin-top-28">{t('Verify')}</a>

                              )}
                              {
                                isVerifyPhone && <a href="" onClick={this.cancelVerify} className="margin-left-10 button ripple-effect small margin-top-28 btn-cancel">H???y</a>
                              }
                            </div>
                          </div>

                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <SelectPicker
                            callback={this.handleChangeNationalArea}
                            national={national}
                            area={area}
                            nationalName="national"
                            areaName="area"
                            nationalTitle={t('Qu???c gia')}
                            areaTitle={t('Khu v???c')}
                          />
                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("T??i kho???n ng??n h??ng")}</h5>
                              <input
                                type="text"
                                pattern="[0-9]"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={accountNumber}
                                name="accountNumber"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Ch??? th???")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={accountName}
                                name="accountName"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Ng??n h??ng")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={bankName}
                                name="bankName"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Chi nh??nh")}</h5>
                              <input
                                type="text"
                                className="with-border"
                                onChange={this.handleChangeInput}
                                value={agency}
                                name="agency"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={isShowSettingProfile ? "" : "hide"}>
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("H??nh ?????i di???n")}</h5>
                              </div>
                              <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                <img className="profile-pic" src={ avatar || "/images/user-avatar-placeholder.png"} alt="" />
                                <div className="upload-button" />
                                <input id="avatar" name="avatar" onChange={this.handleSelectAvatar} className="file-upload" type="file" accept="image/*"/>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("D???ch v???")}</h5>
                              </div>

                              <select onChange={this.handleChangeServiceT} className="selectpicker services" data-live-search="true" multiple>
                                {
                                  siteData.categories.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.title}</option>
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                                <h5>{t("T??n D???ch v???")}</h5>
                                <input
                                  type="text"
                                  className="with-border"
                                  onChange={this.handleChangeInput}
                                  value={title}
                                  name="title"
                                />


                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <h5>{t("Gi?? d???ch v???")}</h5>
                              <input
                                type="number"
                                min="0"
                                className="input-text"
                                placeholder="Placeholder"
                                onChange={this.handleChangeInput}
                                value={price}
                                name="price"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("????n v??? ti???n t???")}</h5>
                              </div>

                              <select className="selectpicker currency" data-live-search="true" onChange={this.handleChangeCurrency}>
                                {
                                  currencyList.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <SelectPicker
                            callback={this.handleChangeNationalArea}
                            national={nationalService}
                            area={areaService}
                            nationalName="nationalService"
                            areaName="areaService"
                            nationalTitle={t('Qu???c gia ???????c s??? d???ng')}
                            areaTitle={t('Khu v???c ???????c s??? d???ng')}
                          />
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Gi???i thi???u d???ch v???")}</h5>
                              </div>
                              <textarea
                                value={description}
                                cols="30"
                                rows="5"
                                className="with-border"
                                name="description"
                                onChange={this.handleChangeInput}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("Quy ?????nh h???y, ho??n ti???n")}</h5>
                              </div>
                              <textarea
                                value={policy}
                                cols="30"
                                rows="5"
                                className="with-border"
                                name="policy"
                                onChange={this.handleChangeInput}
                              />

                            </div>
                          </div>

                          <div className="col-xl-12">
                            <div className="submit-field">
                              <div className="section-headline">
                                <h5>{t("???nh d???ch v???")}</h5>
                              </div>
                            </div>
                          </div>
                          {
                            arrayImage.map((item, index) => {
                              return <div key={`image-${index}`} className="col-xl-1 col-md-3 col-xs-4 service-image margin-bottom-10">
                                <div className="btn-close " onClick={() => this.removeImage(index)}>
                                  <i className="icon-line-awesome-close" />
                                </div>
                                <img src={item || "/images/user-avatar-placeholder.png"} alt="" />
                              </div>
                            })
                          }
                          <div className="upload-service margin-top-0 col-xl-12">
                            <input  onChange={this.handleSelectImage} className="upload-service-input" type="file" accept="image/*" id="image-service"/>
                            <label className="upload-service-button ripple-effect" htmlFor="image-service">Upload Files</label>
                            <span className="upload-service-file-name">Maximum file size: 2 MB</span>
                          </div>


                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
              {
                errorMessage.length > 0 &&  <div className="margin-top-20 col-xl-12">
                  <div className="notification error ">
                    {
                      errorMessage.map(item => {
                        return <p key={item}>{item}</p>
                      })
                    }
                  </div>
                </div>
              }
              {
                isShowSettingProfile && <div className="col-xl-12">
                  <a href="" onClick={this.handleUpdateProfile} className="button ripple-effect big margin-top-20 margin-bottom-20">Save Changes</a>
                </div>
              }

            </div>
          }


        </div>
        <div style={{display: 'none'}} className="add-note-button">
          <a href="#small-dialog" className="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i className="icon-material-outline-arrow-right-alt"></i></a>
        </div>
        <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

          <div className="sign-in-form">


            <div className="popup-tabs-container">

              <div className="popup-tab-content" id="tab">
                <div className="welcome-text">
                  <h3>????ng k?? th??nh c??ng</h3>
                </div>
                <div className="text">
                  B???n ho??n th??nh ????ng k?? CanI. B???n c?? th??? s???a th??ng tin ??? m???c My Page
                </div>
                <button onClick={this.handleConfirmDialog} className="button full-width button-sliding-icon ripple-effect">Trang ch??? <i className="icon-material-outline-arrow-right-alt"/></button>

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

