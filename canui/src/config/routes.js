import React from "react";
import Home from '../layouts/Home';
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
import Person from '../layouts/Person';
import ResetPassword from '../layouts/ResetPassword';
import Message from '../layouts/Message';
import JobPost from '../layouts/JobPost';
import UserDetail from '../layouts/UserDetail';

import MyPage from '../layouts/MyPage/MyPage';
import Favourite from '../layouts/Favourite';
import NotificationDetail from '../layouts/NotificationDetail';
import Payment from '../layouts/Checkout'

import PageNotFound from '../layouts/PageNotFound';
import UrlPath from '../libs/UrlPath';

const routes = [
  {
    path: UrlPath.Home,
    component: Home,
    isPrivate: false,
    exact: true,
  },
  {
    path: UrlPath.Favourite,
    component: Favourite,
    isPrivate: false,
    exact: true,
  },
  {
    path: UrlPath.Services,
    component: Services,
    isPrivate: false,
    exact: true,
  },
  {
    path: UrlPath.CanI,
    component: CanI,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.Services}/:slug`,
    component: ServiceDetail,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Job}/:slug`,
    component: JobDetail,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Search}/`,
    component: Search,
    isPrivate: false,
  },
  {
    path: `${UrlPath.Person}/:slug`,
    component: Person,
    isPrivate: false,
  },
  {
    path: `${UrlPath.AboutUs}`,
    component: AboutUs,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Faq}`,
    component: Faq,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Privacy}`,
    component: Privacy,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Support}`,
    component: Support,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Term}`,
    component: Term,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.RegisterCanI}`,
    component: RegisterCanI,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.ResetPassword}`,
    component: ResetPassword,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.JobPost}`,
    component: JobPost,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.JobDetail}/:jobId`,
    component: JobDetail,
    isPrivate: false,
    exact: true,
  },
  {
    path: `${UrlPath.Message}/:userId`,
    component: Message,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.Message}`,
    component: Message,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.UserDetail}/:userId`,
    component: UserDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.MyPage}/:slug`,
    component: MyPage,
    isPrivate: true,
    noFooter: true,
    exact: true,
  },
  {
    path: `${UrlPath.MyPage}`,
    component: MyPage,
    isPrivate: true,
    noFooter: true,
    exact: true,
  },
  {
    path: `${UrlPath.Notification}/:id`,
    component: NotificationDetail,
    isPrivate: true,
    exact: true,
  },
  {
    path: `${UrlPath.Payment}/:jobId`,
    component: Payment,
    isPrivate: true,
    exact: true,
  },
  {
    component: PageNotFound,
    isPrivate: false,
  },
];

export default routes;
