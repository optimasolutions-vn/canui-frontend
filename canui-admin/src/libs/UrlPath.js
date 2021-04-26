const serverUrl = 'https://canui.tech';
const prefix = '';
const rootPath = `/${prefix}`;
const cmsPath = `/${prefix}`;

const UrlPath = {
	Home: `${rootPath}home`,
	AboutUs: `${rootPath}aboutus`,
	Services: `${rootPath}services`,
	Profile: `${rootPath}profiles`,
	CanI: `${rootPath}profiles/can-i`,
	Faq: `${rootPath}faq`,
	Privacy: `${rootPath}privacy`,
	RegisterCanI: `${rootPath}profiles/can-i`,
	Search: `${rootPath}search`,
	Support: `${rootPath}support`,
	Term: `${rootPath}terms`,
	Job: `${rootPath}job`,
	Person: `${rootPath}person`,
	NotFound: `${rootPath}*`,
};

const API = {
	SERVER: serverUrl,
	SIGN_UP: `${serverUrl}/api/v1/canu/signup`,
	SIGN_IN: `${serverUrl}/api/login`,
	UPLOAD_IMAGE: `${serverUrl}/api/v1/canu/uploadFile`,
  	CHANGE_PASSWORD: `${serverUrl}/api/v1/canu/change-password`
};

const CmsPath = {
	CmsLogin: `${cmsPath}login`,
	CmsDashBoard: `${cmsPath}dashboard`,
	CmsStaticHome: `${cmsPath}static-page/home`,
	CmsStaticAboutUs: `${cmsPath}static-page/aboutus`,
	CmsStaticPrivacy: `${cmsPath}static-page/privacy`,
	CmsStaticTerm: `${cmsPath}static-page/terms`,
	CmsStaticFaq: `${cmsPath}static-page/faq`,
	CmsContactDetail: `${cmsPath}contact/:id`,
	CmsContact: `${cmsPath}contact`,
	CmsHowToUseDetail: `${cmsPath}how-to-use/:id`,
	CmsNewHowToUse: `${cmsPath}how-to-use/new-post`,
	CmsHowToUse: `${cmsPath}how-to-use`,
	CmsAnnouncenmentDetail: `${cmsPath}announcenment/:id`,
	CmsAnnouncenment: `${cmsPath}announcenment`,
	CmsNewAnnouncenment: `${cmsPath}announcenment/new-post`,
	CmsServices: `${cmsPath}services`,
	CmsNewServicesDetail: `${cmsPath}services/new-service`,
	CmsServicesDetail: `${cmsPath}services/:slug`,
	CmsProfile: `${cmsPath}profiles`,
	CmsCanI: `${cmsPath}profiles/can-i`,
	CmsFaq: `${cmsPath}faq`,
	CmsRegisterCanI: `${cmsPath}profiles/can-i`,
	CmsSearch: `${cmsPath}search`,
	CmsSupport: `${cmsPath}support`,
	CmsJobs: `${cmsPath}jobs`,
	CmsJobsPagination: `${cmsPath}jobs/:page`,
	CmsJobsDetailWithid: `${cmsPath}jobs-detail/:id`,
	CmsJobsDetail: `${cmsPath}jobs-detail`,
	CmsJobsCreate: `${cmsPath}jobs-new`,
	CmsPerson: `${cmsPath}person`,
	CmsSiteSettings: `${cmsPath}site-settings`,
	CmsMembersPagination: `${cmsPath}members/:page`,
	CmsMembers: `${cmsPath}members`,
	CmsMembersDetailWithUid: `${cmsPath}members-detail/:id`,
	CmsMembersDetail: `${cmsPath}members-detail`,
	CmsChatTest: `${cmsPath}chat-test`,
	CmsNotFound: `${cmsPath}*`,
};

export default Object.freeze({
	...UrlPath,
  API: API,
  CmsPath: CmsPath
});
