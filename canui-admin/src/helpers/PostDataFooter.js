const copyRight = '© 2021 CANU. All Rights Reserved.';
const subscribe = {
	title: 'Sign Up For a Newsletter',
	description: 'Weekly breaking news, analysis and cutting edge advices on job searching.',
	placeHolder: 'Enter your email address'
};
const listSocial = [
	{
		name: 'Facebook',
		icon: '',
		url: '#Facebook'
	},
	{
		name: 'Twitter',
		icon: '',
		url: '#Twitter'
	},
	{
		name: 'Google Plus',
		icon: '',
		url: '#Google Plus'
	},
	{
		name: 'LinkedIn',
		icon: '',
		url: '#LinkedIn'
	},
];
const menuFooter = [
	{
		label: 'For CanU',
		child: [
			{
				label: 'Services',
				value: '/services'
			},
			{
				label: 'Search',
				value: '/search'
			}
		]
	},
	{
		label: 'For CanI',
		child: [
			{
				label: 'Register',
				value: '/register-cani'
			}
		],
	},
	{
		label: 'Helpful link',
		child: [
			{
				label: 'FAQ',
				value: '/faq'
			},
			{
				label: 'Support',
				value: '/support'
			},
			{
				label: 'Privacy policy',
				value: '/privacy'
			},
			{
				label: 'Terms of use',
				value: '/terms'
			}
		],
	}
];

export default {
	menuFooter: menuFooter,
	copyRight: copyRight,
	subscribe: subscribe
};