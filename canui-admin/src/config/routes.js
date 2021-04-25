import React from "react";
/*import Home from '../layouts/Home';
import Profile from '../layouts/Profile';
import CanI from '../layouts/ProfileCanI';

import Services from '../layouts/Services';
import ServiceDetail from '../layouts/ServiceDetail';
import JobDetail from '../layouts/JobDetail';
import AboutUs from '../layouts/AboutUs';
import Faq from '../layouts/FAQ';
import Privacy from '../layouts/Privacy';
import RegisterCanI from '../layouts/Register';
import Search from '../layouts/Search';
import Support from '../layouts/Support';
import Term from '../layouts/Term';
import Person from '../layouts/Person';*/

import PageNotFound from '../layouts/PageNotFound';
import UrlPath from '../libs/UrlPath';

/*cms*/

import CmsLogin from '../layouts/cms/CmsLogin';
import CmsDashBoard from '../layouts/cms/CmsDashBoard';
import CmsServices from '../layouts/cms/CmsServices';
import CmsServicesDetail from '../layouts/cms/CmsServicesDetail';
import CmsServicesDetailCreate from '../layouts/cms/CmsServicesDetail/CmsServicesDetailCreate';
import CmsJobs from '../layouts/cms/CmsJobs';
import CmsJobDetail from '../layouts/cms/CmsJobs/DetailJob';
import CreateJob from '../layouts/cms/CmsJobs/CreateJob';
import CmsSiteSettings from '../layouts/cms/CmsSiteSettings';
import CmsMembers from '../layouts/cms/CmsMembers';
import CmsMemberDetail from '../layouts/cms/CmsMembers/Detail';
import CmsStaticHome from '../layouts/cms/CmsStaticHome';
import CmsStaticAboutUs from '../layouts/cms/CmsStaticAboutUs';
import CmsStaticPrivacy from '../layouts/cms/CmsStaticPrivacy';
import CmsStaticTerm from '../layouts/cms/CmsStaticTerm';
import CmsStaticFaq from '../layouts/cms/CmsStaticFAQ';
import CmsHowToUse from '../layouts/cms/CmsHowToUse';
import CmsNewHowToUse from '../layouts/cms/CmsHowToUse/CreateHowToUse';
import CmsHowToUseDetail from '../layouts/cms/CmsHowToUse/UpdateHowToUse';
import CmsAnnouncenment from '../layouts/cms/CmsAnnouncenment';
import CmsNewAnnouncenment from '../layouts/cms/CmsAnnouncenment/CreateAnnouncenment';
import CmsAnnouncenmentDetail from '../layouts/cms/CmsAnnouncenment/UpdateAnnouncenment';
import CmsContact from '../layouts/cms/CmsContact';
import CmsContactDetail from '../layouts/cms/CmsContact/Detail';
import ChatTest from '../components/cms/chattest';

const cmsRoutes = [
  {
    path: `${UrlPath.CmsPath.CmsChatTest}`,
    component: ChatTest,
    isPrivate: true,
    exact: true
  },
  {
    path: `${UrlPath.CmsPath.CmsLogin}`,
    component: CmsLogin,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsDashBoard}`,
    component: CmsDashBoard,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsContact}`,
    component: CmsContact,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsContactDetail}`,
    component: CmsContactDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsNewHowToUse}`,
    component: CmsNewHowToUse,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsHowToUseDetail}`,
    component: CmsHowToUseDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsHowToUse}`,
    component: CmsHowToUse,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsNewAnnouncenment}`,
    component: CmsNewAnnouncenment,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsAnnouncenmentDetail}`,
    component: CmsAnnouncenmentDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsAnnouncenment}`,
    component: CmsAnnouncenment,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsNewServicesDetail}`,
    component: CmsServicesDetailCreate,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsServices}`,
    component: CmsServices,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsServicesDetail}`,
    component: CmsServicesDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsSiteSettings}`,
    component: CmsSiteSettings,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsMembers}`,
    component: CmsMembers,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsMembersDetailWithUid}`,
    component: CmsMemberDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsMembersPagination}`,
    component: CmsMembers,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsJobs}`,
    component: CmsJobs,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsJobsPagination}`,
    component: CmsJobs,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsJobsDetailWithid}`,
    component: CmsJobDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsJobsCreate}`,
    component: CreateJob,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsStaticHome}`,
    component: CmsStaticHome,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsStaticAboutUs}`,
    component: CmsStaticAboutUs,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsStaticPrivacy}`,
    component: CmsStaticPrivacy,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsStaticTerm}`,
    component: CmsStaticTerm,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.CmsPath.CmsStaticFaq}`,
    component: CmsStaticFaq,
    isPrivate: true,
    exact: true,
  },
  {
    component: PageNotFound,
    isPrivate: false,
  },
];

export default cmsRoutes;
