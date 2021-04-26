const featuredCities = [
	{
		id: 1,
		idcity: 23,
		image: '/images/cities/city-hanoi.png',
		label: 'Ha Noi',
		total_jobs: 376,
		slug: 'ha-noi'
	},
	{
		id: 2,
		idcity: 27,
		image: '/images/cities/city-hochiminh.png',
		label: 'Ho Chi Minh',
		total_jobs: 376,
		slug: 'ho-chi-minh'
	},
	{
		id: 3,
		idcity: 14,
		image: '/images/cities/city-danang.png',
		label: 'Da Nang',
		total_jobs: 376,
		slug: 'da-nang'
	},
	{
		id: 4,
		idcity: 12,
		image: '/images/cities/city-cantho.png',
		label: 'Can Tho',
		total_jobs: 376,
		slug: 'can-tho'
	}
];
function dmo(){
	return featuredCities;
	if(window.sessionStorage){
		let _data = window.sessionStorage.getItem('canui-services-featuredCities');
		if(_data){
			try{
				_data = JSON.parse(_data);
			}catch(err){
				console.log(err);
				_data = false;
			}
			return _data;
		}else{
			window.sessionStorage.setItem('canui-services-featuredCities', JSON.stringify(featuredCities));
			return featuredCities;
		}	
	}
	return false;
}

export default {
	featuredCities: dmo(),
};