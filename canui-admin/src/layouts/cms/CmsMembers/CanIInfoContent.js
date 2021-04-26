import React from 'react';
import {connect} from 'react-redux';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import NoImageUser from '../../../assets/images/no-image-user.png';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import {convertDateTimeToLocaleString} from '../../../helpers/convert';
import {getNationList, ServiceType, convertNumberToHaveCommas} from '../../../helpers/DataAccess';
const mapStateToProps = state => ({
	services: state.siteData.categories
});
class CanIInfoContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 50,
			page: 0,
			userId: 0,
			dataUser: false,
			sort: 'userId,desc',
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		ScriptTabs();
		this.setupParams();
	};
	componentDidUpdate(prevProps, prevState){
		if(prevProps?.match?.params?.id !== this.props?.match?.params?.id){
			this.setupParams();
		}
	};
	setupParams = () => {
		if(this.props?.match?.params?.id){
			this.setState({
				userId : this.props.match.params.id
			});
			this.getMembers(this.props.match.params.id);
		}
	};
	getMembers = (_uid) => {
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await MembersServices.getMemberDetail(_uid);
			if(_res?.data){
				this.setState({
					dataUser: _res.data.content[0],
				});
				console.log(_res);
			}else{
				this.setState({
					errorMes: [_res.message || 'Fail on Request']
				})
			}
			this.setState({
				isLoading: false
			})
		})
		
	};

	renderNationName = (_nation) => {
		if(!_nation){
			return null;
		}
		let _nl = getNationList();
		return _nl.filter(x => x.countryId === _nation)[0].countryName;
	};

	renderServiceType = (_type) => {
		return _type ? ServiceType.filter(x => x.key === _type)[0].value : null;
	}

	renderServicesRegist = (_list) => {
		return _list ? _list.map(x => {
			return (
				<div>{this.props.services.filter(y => y.id === x)[0].title}</div>
			);
		}) : null;
	}
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	render(){
		const { t } = this.props;
		return(
			<>
				<div className="row member-table">
					<div className="col-12">
						<table>
							<tbody>
								<tr>
									<th><div>Avatar</div></th>
									<td><div><div className='img-wrapper avatarImg'><img src={this.props.data.cani?.avatar || NoImageUser} alt={this.props.data.cani?.name} /></div></div></td>
								</tr>
								<tr>
									<th><div>Rating</div></th>
									<td><div>{this.props.data.cani?.rating || 0}</div></td>
								</tr>
								<tr>
									<th><div>Favourite</div></th>
									<td><div>{this.props.data?.favoriteCount || 0}</div></td>
								</tr>
								<tr>
									<th><div>Name</div></th>
									<td><div>{this.props.data.cani?.name}</div></td>
								</tr>
								<tr>
									<th><div>Service Type</div></th>
									<td><div>{this.renderServiceType(this.props.data.cani?.serviceType)}</div></td>
								</tr>
								<tr>
									<th><div>Company Name</div></th>
									<td><div>{this.props.data.cani?.companyName}</div></td>
								</tr>
								<tr>
									<th><div>Tax Number</div></th>
									<td><div>{this.props.data.cani?.tax}</div></td>
								</tr>
								<tr>
									<th><div>Email</div></th>
									<td><div>{this.props.data.cani?.email}</div></td>
								</tr>
								<tr>
									<th><div>Phone</div></th>
									<td><div>{this.props.data.cani?.phone}</div></td>
								</tr>
								<tr>
									<th><div>Address</div></th>
									<td><div>{this.props.data.cani?.address}</div></td>
								</tr>
								<tr>
									<th><div>Certificate Image</div></th>
									<td><div>
										{this.props.data.cani?.files?.certificateImage?.length > 0 && (
											<div className='img-wrapper'>
												<img src={this.props.data.cani?.files?.certificateImage[this.props.data.cani?.files?.certificateImage?.length - 1].url} alt='Certificate Image' />
											</div>
										)}
									</div></td>
								</tr>
								<tr>
									<th><div>Nation</div></th>
									<td><div>{this.renderNationName(this.props.data.cani?.national)}</div></td>
								</tr>
								<tr>
									<th><div>City</div></th>
									<td><div>{this.props.data.cani?.area}</div></td>
								</tr>
								<tr>
									<th><div>Bank Name</div></th>
									<td><div>{this.props.data.cani?.bankName}</div></td>
								</tr>
								<tr>
									<th><div>Bank Account Name</div></th>
									<td><div>{this.props.data.cani?.accountName}</div></td>
								</tr>
								<tr>
									<th><div>Bank Account Number</div></th>
									<td><div>{this.props.data.cani?.accountNumber}</div></td>
								</tr>
								<tr>
									<th><div>Bank Branch</div></th>
									<td><div>{this.props.data.cani?.bankBranch}</div></td>
								</tr>
								<tr>
									<th><div>Services Regist</div></th>
									<td><div>{this.renderServicesRegist(this.props.data.cani?.service)}</div></td>
								</tr>
								<tr>
									<th><div>Price</div></th>
									<td><div>{convertNumberToHaveCommas(this.props.data.cani?.price)} {this.props.data.cani?.currency}</div></td>
								</tr>
								<tr>
									<th><div>Nation Service</div></th>
									<td><div>{this.renderNationName(this.props.data.cani?.nationalService)}</div></td>
								</tr>
								<tr>
									<th><div>City Service</div></th>
									<td><div>{this.props.data.cani?.areaService}</div></td>
								</tr>
								<tr>
									<th><div>Service Name</div></th>
									<td><div>{this.props.data.cani?.title}</div></td>
								</tr>
								<tr>
									<th><div>Description</div></th>
									<td><div className="preline">{this.props.data.cani?.description}</div></td>
								</tr>
								<tr>
									<th><div>Policy</div></th>
									<td><div className="preline">{this.props.data.cani?.policy}</div></td>
								</tr>
								<tr>
									<th><div>Service Images</div></th>
									<td><div>
										{this.props.data.cani?.files?.serviceImage?.length > 0 && this.props.data.cani?.files?.serviceImage.map(x => {
											return (
												<div className='img-wrapper'>
													<img src={x.url} alt='Service Images' />
												</div>
											);
										}
										)}
									</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</>
		);
	}
};
export default connect(
	mapStateToProps,
)(CanIInfoContent);
