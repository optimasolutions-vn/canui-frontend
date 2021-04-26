const heighestRatedFreelancer = [
	{
		id: 1,
		name: 'Tom Smith',
		title: 'Tom Smith 1',
		avatar: '/images/user-avatar-big-01.jpg',
		verified: true,
		total_jobs: 376,
		slug: 'tom-smit-1',
		rated: 5.0,
		location: 'London',
		price: '$60 / hr',
		job_success: '95%',
		skill: 'Magento Certified Developer',
		services_support: 'Dịch Vụ Cấp phát giấy tờ, Dịch vụ điện thoại',
	},
	{
		id: 2,
		name: 'Tom Smith 2 ',
		title: 'Tom Smith 2',
		avatar: '/images/user-avatar-big-01.jpg',
		verified: true,
		total_jobs: 376,
		slug: 'tom-smit-2',
		rated: 4.0,
		location: 'London',
		price: '$60 / hr',
		job_success: '95%',
		skill: 'Magento Certified Developer',
		services_support: 'Dịch Vụ Cấp phát giấy tờ, Dịch vụ điện thoại',
	},
	{
		id: 3,
		name: 'Tom Smith 3',
		title: 'Tom Smith 3',
		avatar: '/images/user-avatar-big-01.jpg',
		verified: true,
		total_jobs: 376,
		slug: 'tom-smit-3',
		rated: 4.2,
		location: 'London',
		price: '$60 / hr',
		job_success: '95%',
		skill: 'Magento Certified Developer',
		services_support: 'Dịch Vụ Cấp phát giấy tờ, Dịch vụ điện thoại',
	},
	{
		id: 4,
		name: 'Tom Smith 4',
		title: 'Tom Smith 4',
		avatar: '/images/user-avatar-big-01.jpg',
		verified: true,
		total_jobs: 376,
		slug: 'tom-smit-4',
		rated: 3.0,
		location: 'London',
		price: '$60 / hr',
		job_success: '95%',
		skill: 'Magento Certified Developer',
		services_support: 'Dịch Vụ Cấp phát giấy tờ, Dịch vụ điện thoại',
	},
	{
		id: 5,
		name: 'Tom Smith 5',
		title: 'Tom Smith 5',
		avatar: '/images/user-avatar-big-01.jpg',
		verified: true,
		total_jobs: 376,
		slug: 'tom-smit-5',
		rated: 3.6,
		location: 'London',
		price: '$60 / hr',
		job_success: '95%',
		skill: 'Magento Certified Developer',
		services_support: 'Dịch Vụ Cấp phát giấy tờ, Dịch vụ điện thoại',
	},
	{
		id: 6,
		name: 'Tom Smith 6',
		title: 'Tom Smith 6',
		avatar: '/images/user-avatar-big-01.jpg',
		verified: true,
		total_jobs: 376,
		slug: 'tom-smit-6',
		rated: 5.0,
		location: 'London',
		price: '$60 / hr',
		job_success: '95%',
		skill: 'Magento Certified Developer',
		services_support: 'Dịch Vụ Cấp phát giấy tờ, Dịch vụ điện thoại',
	},
];
function dmo(){
	if(window.localStorage){
		let _data = window.localStorage.getItem('canui-services-heighestRated');
		if(_data){
			try{
				_data = JSON.parse(_data);
			}catch(err){
				console.log(err);
				_data = false;
			}
			return _data;
		}else{
			window.localStorage.setItem('canui-services-heighestRated', JSON.stringify(heighestRatedFreelancer));
			return heighestRatedFreelancer;
		}	
	}
	return false;
}

export default {
	heighestRated: dmo(),
};