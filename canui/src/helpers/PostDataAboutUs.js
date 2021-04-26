const PostDataAboutUs = {
	pageName: 'About Us',
	nameCompany: 'CANUI',
	description: 'Times Sharing Services',
	titleH3: 'About Company',
	map: {
		title: 'Location',
		address: '01 Hoa Su, Phuong 07, Quan Phu Nhuan, Thanh Pho Ho Chi Minh',
		lat: 10.816422937250831,
		lng: 106.67805438878126
	},
	content: `<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
								<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p><p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
								<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
								<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
								<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
								<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
								<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
								<p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
								<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>`,
	socialsProfile: [
		{
			name: 'Twitter',
			iconImage: '',
			iconClass: 'icon-brand-twitter',
			urlPage: 'https://twitter.com'
		},
		{
			name: 'Dribbble',
			iconImage: '',
			iconClass: 'icon-brand-dribbble',
			urlPage: 'https://dribbble.com'
		},
		{
			name: 'Behance',
			iconImage: '',
			iconClass: 'icon-brand-behance',
			urlPage: 'https://www.behance.net'
		},
		{
			name: 'GitHub',
			iconImage: '',
			iconClass: 'icon-brand-github',
			urlPage: 'https://github.com'
		},
		{
			name: 'Facebook',
			iconImage: '',
			iconClass: 'icon-brand-facebook',
			urlPage: 'https://facebook.com'
		},
	],
	socialsShare: [
		{
			name: 'Facebook',
			iconImage: '',
			iconClass: 'icon-brand-facebook-f',
			urlShare: 'https://twitter.com'
		},
		{
			name: 'Twitter',
			iconImage: '',
			iconClass: 'icon-brand-twitter',
			urlShare: 'https://dribbble.com'
		},
		{
			name: 'Google Plus',
			iconImage: '',
			iconClass: 'icon-brand-google-plus-g',
			urlShare: 'https://www.behance.net'
		},
		{
			name: 'LinkedIn',
			iconImage: '',
			iconClass: 'icon-brand-linkedin-in',
			urlShare: 'https://github.com'
		},
	],
};
function dmo(){
	if(window.localStorage){
		let _data = window.localStorage.getItem('canui-services-aboutus');
		if(_data){
			try{
				_data = JSON.parse(_data);
			}catch(err){
				console.log(err);
				_data = false;
			}
			return _data;
		}else{
			window.localStorage.setItem('canui-services-aboutus', JSON.stringify(PostDataAboutUs));
			return PostDataAboutUs;
		}	
	}
	return false;
}

export default {
	aboutus: dmo(),
};