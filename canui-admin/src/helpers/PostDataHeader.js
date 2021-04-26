import UrlPath from '../libs/UrlPath';
const menuHeader = [
	{
		label: 'Home',
		value: `${UrlPath.Home}`,
		child: []
	},
	{
		label: 'About us',
		value: `${UrlPath.AboutUs}`,
		child: []
	},
	{
		label: 'Services',
		value: `${UrlPath.Services}`,
		child: []
	},
	{
		label: 'Search',
		value: `${UrlPath.Search}`,
		child: []
	},
	{
		label: 'Register CanI',
		value: `${UrlPath.CanI}`,
		child: []
	},
	{
		label: 'FAQ',
		value: `${UrlPath.Faq}`,
		child: []
	},
	{
		label: 'Support',
		value: `${UrlPath.Support}`,
		child: []
	},
];

export default {
	menuHeader: menuHeader,
};