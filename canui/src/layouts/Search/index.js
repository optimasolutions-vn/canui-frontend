import React from 'react';
import langConst from '../../libs/lang';
import SearchSideBarInPage from '../../components/SearchSideBarInPage';
import SearchResultInPage from '../../components/SearchResultInPage';
import {UrlToObject} from '../../helpers/convert';
import Validation from '../../helpers/Validation';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import PostDataHighestRatedFreelancer from '../../helpers/PostDataHighestRatedFreelancer';
import otherServices from '../../services/otherServices';
import Loader from '../../components/effects/Loader';
const minValue = 3;

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			isSearchSuccess: false,
			loading: true,
			optionsSearch: Object.fromEntries(new URLSearchParams(this.props.location.search)) || {},
			dataSearchResult: [],
			currentPaged: 0,
			totalPage: 0,
			resultSearch: false,
		};
	};
	componentDidMount(){
		this.roundDataOptionSearch();
	};
	componentDidUpdate(prevProps, prevState){
		if(prevProps.location.search !== this.props.location.search){
			this.setState({
				optionsSearch: Object.fromEntries(new URLSearchParams(this.props.location.search))
			}, () => {
				this.roundDataOptionSearch();
			})
		}
	};

	handleCallBackNextPage = (_page) => {
		if(_page){
			this.setState({
				optionsSearch: {
					...this.state.optionsSearch,
					page: _page
				}
			}, () => {
				let _n = new URLSearchParams(this.state.optionsSearch).toString();
				this.props.history.push({
					pathname: this.props.location.pathname,
					search: `?${_n}`
				})
			})
		}
	};

	handleCallBackChangeOrder = (_order) => {
		this.setState({
			optionsSearch: {
				...this.state.optionsSearch,
				sort: _order
			}
		}, () => {
			let _n = new URLSearchParams(this.state.optionsSearch).toString();
			this.props.history.push({
				pathname: this.props.location.pathname,
				search: `?${_n}`
			})
		})
	}

	roundDataOptionSearch = async () => {
		let _s = this.state.optionsSearch;
		let _newObj = {
			page: (_s?.page - 1) || 0,
			size: _s?.size || 10,
			sort: _s.sort ? `id,${_s.sort}` : 'id,desc',
		};
		if(_s?.crnation){
			_newObj.nation = _s.crnation;//.split(/\,/);
			if(_s?.crcities){
				_newObj.city = _s.crcities;//.split(/\,/);
			}
		}
		if(_s?.crkeys){
			_newObj.key = _s.crkeys;
		}
		if(_s?.crservices){
			_newObj.services = _s.crservices;//.split(/\,/);
		}
		if(_s?.crserviceType){
			_newObj.serviceType = _s.crserviceType;
		}
		if(_s?.crprice){
			_newObj.price = _s.crprice;
		}
		let _res = await otherServices.getListCanIByFilter(_newObj);
		if(_res?.status && _res?.data?.content){
			this.setState({
				loading: false,
				resultSearch: _res.data
			})
		}else{
			this.setState({
				loading: false
			})
		}
	};

	render(){
		return(
			<>

				<div>
					<div className="margin-top-90 hide-on-mobile"></div>
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-lg-4 hide-on-mobile">
								<SearchSideBarInPage
									dataOptions={this.state.optionsSearch}
								/>
							</div>
							<div className="col-xl-9 col-lg-8 content-left-offset">
								<SearchResultInPage
									dataOptions={this.state?.resultSearch}
									callBackNextPage={this.handleCallBackNextPage}
									callBackChangeOrder={this.handleCallBackChangeOrder}
									order={this.state?.optionsSearch?.sort}
									{...this.props}
								 />
							</div>
						</div>
					</div>
				</div>
				{this.state.loading && <Loader />}
			</>
		);
	}
};