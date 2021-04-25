const featuredJobsHome = [
	{
		id: 1,
		image: '',
		title: 'Bilingual Event Support Specialist',
		slug: 'bilingual-event-support-specialist',
		description: 'Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist',
		status: 'pending', //'publish'
		service: {
			id: 1,
			title: 'Cấp phát giấy tờ'
		},
		city: {
			id: 1,
			label: 'Ho Chi Minh',
			code: 700000
		},
		job_type: {
			id: 1,
			label: 'Cá nhân',
			value: 'ca-nhan'
		},
		created_at: '2021-01-13 08:10:10'
	},
	{
		id: 1,
		image: '',
		title: 'Bilingual Event Support Specialist',
		slug: 'bilingual-event-support-specialist',
		description: 'Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist',
		service: {
			id: 1,
			title: 'Cấp phát giấy tờ'
		},
		city: {
			id: 1,
			label: 'Ho Chi Minh',
			code: 700000
		},
		job_type: {
			id: 1,
			label: 'Cá nhân',
			value: 'ca-nhan'
		},
		created_at: '2021-01-17 01:10:10'
	},
	{
		id: 1,
		image: '',
		title: 'Bilingual Event Support Specialist',
		slug: 'bilingual-event-support-specialist',
		description: 'Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist',
		service: {
			id: 1,
			label: 'Cấp phát giấy tờ',
		},
		job_type: {
			id: 1,
			label: 'Cá nhân',
			value: 'ca-nhan'
		},
		city: {
			id: 1,
			label: 'Ho Chi Minh',
			code: 700000
		},
		created_at: '2021-01-16 08:10:10'
	},
	{
		id: 1,
		image: '',
		title: 'Bilingual Event Support Specialist',
		slug: 'bilingual-event-support-specialist',
		description: 'Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist',
		service: {
			id: 1,
			title: 'Cấp phát giấy tờ'
		},
		job_type: {
			id: 1,
			label: 'Cá nhân',
			value: 'ca-nhan'
		},
		city: {
			id: 1,
			label: 'Ho Chi Minh',
			code: 700000
		},
		created_at: '2021-01-16 08:10:10'
	},
	{
		id: 1,
		image: '',
		title: 'Bilingual Event Support Specialist',
		slug: 'bilingual-event-support-specialist',
		description: 'Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist, Bilingual Event Support Specialist',
		service: {
			id: 1,
			title: 'Cấp phát giấy tờ'
		},
		job_type: {
			id: 1,
			label: 'Cá nhân',
			value: 'ca-nhan'
		},
		city: {
			id: 1,
			label: 'Ho Chi Minh',
			code: 700000
		},
		created_at: '2021-01-16 08:10:10'
	},
];
function dmo(){
	if(window.localStorage){
		let _data = window.localStorage.getItem('canui-services-featuredJobs');
		if(_data){
			try{
				_data = JSON.parse(_data);
			}catch(err){
				console.log(err);
				_data = false;
			}
			return _data;
		}else{
			window.localStorage.setItem('canui-services-featuredJobs', JSON.stringify(featuredJobsHome));
			return featuredJobsHome;
		}	
	}
	return false;
}

export default {
	featuredJobs: dmo(),
};