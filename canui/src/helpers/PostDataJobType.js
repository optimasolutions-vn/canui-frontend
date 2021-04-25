const jobtype = [
	{
		id: 1,
		title: 'Cá Nhân',
		slug: 'PERSONAL'
	},
	{
		id: 2,
		title: 'Hộ kinh doanh cá nhân',
		slug: 'FAMILY'
	},
	{
		id: 3,
		title: 'Pháp nhân',
		slug: 'COMPANY'
	},
];
function dmo(){
	if(window.sessionStorage){
		let _data = window.sessionStorage.getItem('canui-services-jobtype');
		if(_data){
			try{
				_data = JSON.parse(_data);
			}catch(err){
				console.log(err);
				_data = false;
			}
			return _data;
		}else{
			window.sessionStorage.setItem('canui-services-jobtype', JSON.stringify(jobtype));
			return jobtype;
		}	
	}
	return false;
}

export default {
	jobtype: dmo(),
};