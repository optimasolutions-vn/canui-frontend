const Domain = 'https://canui.tech';
const UrlEndPoint = {
	ApiGetOptions : `${Domain}/api/v1/data/get-properties`,
	ApiGetServices : `${Domain}/api/v1/data/services`,
	ApiPostJob : `${Domain}/api/v1/canu/post-job`,
	ApiGetJobsList : `${Domain}/api/v1/job/list/`,
	ApiGetRatingCriteria : `${Domain}/api/v1/canu/get-user-rating`,
	ApiUpdateUserRating : `${Domain}/api/v1/canu/update-user-rating`,
	ApiUserRating : `${Domain}/api/v1/canu/rating-user`,
	ApiCanIRating : `${Domain}/api/v1/cani/rating-user`,
	ApiDeleteJob : `${Domain}/api/v1/job/cancel-job`,
	ApiCanUCompleteJob : `${Domain}/api/v1/job/canu-complete`,
	ApiCanICompleteJob : `${Domain}/api/v1/job/cani-complete`,
	ApiGetKeyWord : `${Domain}/api/v1/data/get-keyword`,
	ApiGetCountry : `${Domain}/api/v1/data/get-country`,
	ApiGetCityByCountry : `${Domain}/api/v1/data/get-city`,
	ApiGetListCanI : `${Domain}/api/v1/data/detail-list`,
	ApiVerifyPhone : `${Domain}/api/v1/canu/phone-verification`,
	ApiVerifyCode : `${Domain}/api/v1/canu/check-mobile-code`,
	ApiSendContact : `${Domain}/api/v1/data/support/initial`,
};

export default Object.freeze({
	...UrlEndPoint,
});
