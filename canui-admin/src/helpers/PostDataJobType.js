const jobtype = [
	{
		id: 1,
		title: 'Cá Nhân',
		slug: 'ca-nhan'
	},
	{
		id: 2,
		title: 'Hộ kinh doanh cá nhân',
		slug: 'ho-kinh-doanh-ca-nhan'
	},
	{
		id: 1,
		title: 'Pháp nhân',
		slug: 'phap-nhan'
	},
];
function dmo(){
	if(window.localStorage){
		let _data = window.localStorage.getItem('canui-services-jobtype');
		if(_data){
			try{
				_data = JSON.parse(_data);
			}catch(err){
				console.log(err);
				_data = false;
			}
			return _data;
		}else{
			window.localStorage.setItem('canui-services-jobtype', JSON.stringify(jobtype));
			return jobtype;
		}	
	}
	return false;
}

export default {
	jobtype: dmo(),
};