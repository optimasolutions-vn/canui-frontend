const Domain = 'https://canui.tech';
const UrlEndPoint = {
	ApiGetOptions : `${Domain}/api/v1/data/get-properties`,
	ApiSetOptions : `${Domain}/api/v1/data/add-properties`,
	ApiGetServices : `${Domain}/api/v1/data/services`,
	ApiUpdateServices : `${Domain}/api/v1/data/update-services`,
	ApiUploadFile : `${Domain}/api/v1/canu/uploadFile`,
	ApiGetMembers : `${Domain}/api/v1/admin/member`,
	ApiGetMembersDetail : `${Domain}/api/v1/canu/view-profile/`,
	ApiGetJobsList : `${Domain}/api/v1/job/list/`,
	ApiGetJobsDetail : `${Domain}/api/v1/canu/job-detail/`,
	ApiCreateJob : `${Domain}/api/v1/canu/post-job`,
	ApiUpdateJob : `${Domain}/api/v1/job/update-job`,
	ApiDeleteJob : `${Domain}/api/v1/job/cancel-job`,
	ApiGetCountry : `${Domain}/api/v1/data/get-country`,
	ApiGetCityByCountry : `${Domain}/api/v1/data/get-city`,
	ApiGetKeyWord : `${Domain}/api/v1/data/get-keyword`,
	ApiGetListAnnouncement : `${Domain}/api/v1/data/announce/list`,
	ApiGetAnnouncement : `${Domain}/api/v1/data/announce/`,
	ApiUpdateAnnouncement : `${Domain}/api/v1/data/announce/initial`,
	ApiDeleteAnnouncement : `${Domain}/api/v1/data/announce/delete`,
	ApiGetListGuide : `${Domain}/api/v1/data/guide/list`,
	ApiUpdateGuide : `${Domain}/api/v1/data/guide/initial`,
	ApiDeleteGuide : `${Domain}/api/v1/data/guide/delete`,
	ApiGetGuide : `${Domain}/api/v1/data/guide/`,
	ApiGetContactList : `${Domain}/api/v1/data/support/list`,
	ApiGetContactDetail : `${Domain}/api/v1/data/support/`,
	ApiDeleteContact : `${Domain}/api/v1/data/support/delete`,
	ApiUpdateContact : `${Domain}/api/v1/data/support/initial`,
};

export default Object.freeze({
	...UrlEndPoint,
});