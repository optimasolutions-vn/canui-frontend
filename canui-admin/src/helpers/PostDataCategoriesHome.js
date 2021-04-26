import { stores } from '../stores';
//import store from './redux/store.js';
const categoriesHome = [
	{
		id: 1,
		title: 'Tư vấn kinh doanh',
		description: 'Software Engineer, Web / Mobile Developer & More',
		short_intro: 'Software Engineer, Web / Mobile Developer & More',
		slug: 'tu-van-kinh-doanh',
		quantity: 612,
		icon_url: '/images/icon-categories/icon-tvkd.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 2,
		title: 'Cấp phát giấy tờ',
		description: 'Data Specialist / Scientist, Data Analyst & More',
		short_intro: 'Data Specialist / Scientist, Data Analyst & More',
		slug: 'cap-phat-giay-to',
		quantity: 113,
		icon_url: '/images/icon-categories/icon-cpgt.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 3,
		title: 'Khảo sát thị trường',
		description: 'Auditor, Accountant, Fnancial Analyst & More',
		short_intro: 'Auditor, Accountant, Fnancial Analyst & More',
		slug: 'khao-sat-thi-truong',
		quantity: 186,
		icon_url: '/images/icon-categories/icon-kstt.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 4,
		title: 'Dịch vụ hợp đồng',
		description: 'Copywriter, Creative Writer, Translator & More',
		short_intro: 'Copywriter, Creative Writer, Translator & More',
		slug: 'dich-vu-hop-dong',
		quantity: 298,
		icon_url: '/images/icon-categories/icon-dvhd.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 5,
		title: 'Dịch vụ kế toán',
		description: 'Brand Manager, Marketing Coordinator & More',
		short_intro: 'Brand Manager, Marketing Coordinator & More',
		slug: 'dich-vu-ke-toan',
		quantity: 549,
		icon_url: '/images/icon-categories/icon-dvkt.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 6,
		title: 'Dịch vụ tuyển dụng',
		description: 'Creative Director, Web Designer & More',
		short_intro: 'Creative Director, Web Designer & More',
		slug: 'dich-vu-tuyen-dung',
		quantity: 873,
		icon_url: '/images/icon-categories/icon-dvtd.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 7,
		title: 'Dịch vụ thư kí',
		description: 'Darketing Analyst, Social Profile Admin & More',
		short_intro: 'Darketing Analyst, Social Profile Admin & More',
		slug: 'dich-vu-thu-ky',
		quantity: 125,
		icon_url: '/images/icon-categories/icon-dvtk.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 8,
		title: 'Dịch vụ Pickup',
		description: 'Advisor, Coach, Education Coordinator & More',
		short_intro: 'Advisor, Coach, Education Coordinator & More',
		slug: 'dich-vu-pickup',
		quantity: 445,
		icon_url: '/images/icon-categories/icon-dvpk.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 9,
		title: 'Dịch vụ làm thay',
		description: 'Software Engineer, Web / Mobile Developer & More',
		short_intro: 'Software Engineer, Web / Mobile Developer & More',
		slug: 'dich-vu-lam-thay',
		quantity: 612,
		icon_url: '/images/icon-categories/icon-dvlt.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 10,
		title: 'Dịch vụ điện thoại',
		description: 'Data Specialist / Scientist, Data Analyst & More',
		short_intro: 'Data Specialist / Scientist, Data Analyst & More',
		slug: 'dich-vu-dien-thoai',
		quantity: 113,
		icon_url: '/images/icon-categories/icon-dvdt.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 11,
		title: 'Bảo hộ bản thân',
		description: 'Auditor, Accountant, Fnancial Analyst & More',
		short_intro: 'Auditor, Accountant, Fnancial Analyst & More',
		slug: 'bao-ho-ban-than',
		quantity: 186,
		icon_url: '/images/icon-categories/icon-bhbt.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 12,
		title: 'Dịch vụ mua sắm',
		description: 'Copywriter, Creative Writer, Translator & More',
		short_intro: 'Copywriter, Creative Writer, Translator & More',
		slug: 'dich-vu-mua-sam',
		quantity: 298,
		icon_url: '/images/icon-categories/icon-dvms.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 13,
		title: 'Dịch vụ theo nhu cầu',
		description: 'Brand Manager, Marketing Coordinator & More',
		short_intro: 'Brand Manager, Marketing Coordinator & More',
		slug: 'dich-vu-theo-nhu-cau',
		quantity: 549,
		icon_url: '/images/icon-categories/icon-dvtnc.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 14,
		title: 'Dịch vụ đồng hành',
		description: 'Creative Director, Web Designer & More',
		short_intro: 'Creative Director, Web Designer & More',
		slug: 'dich-vu-dong-hanh',
		quantity: 873,
		icon_url: '/images/icon-categories/icon-dvdh.png',
		icon_awesome_class: '',
		image_background: '',
	},
	{
		id: 15,
		title: 'Giao hàng',
		description: 'Darketing Analyst, Social Profile Admin & More',
		short_intro: 'Darketing Analyst, Social Profile Admin & More',
		slug: 'giao-hang',
		quantity: 125,
		icon_url: '/images/icon-categories/icon-gh.png',
		icon_awesome_class: '',
		image_background: '',
	},
];


function aFunction(){
   var newState = stores.getState();
   return newState?.siteData?.categories || {};
}
stores.subscribe(aFunction);
export default {
	categories: aFunction(),
};