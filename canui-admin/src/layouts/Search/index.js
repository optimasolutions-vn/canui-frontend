import React from 'react';
import langConst from '../../libs/lang';
import SearchSideBarInPage from '../../components/SearchSideBarInPage';
import SearchResultInPage from '../../components/SearchResultInPage';
import {UrlToObject} from '../../helpers/convert';
import Validation from '../../helpers/Validation';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import PostDataHighestRatedFreelancer from '../../helpers/PostDataHighestRatedFreelancer';

const minValue = 3;

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			isSearchSuccess: false,
			loading: true,
			optionsSearch:{},
			dataSearchResult: [],
			currentPaged: 0,
			totalPage: 0,
		};
	};
	componentDidMount(){
		this.roundDataOptionSearch();
	};
	componentDidUpdate(prevProps, prevState){

	};

	roundDataOptionSearch = () => {
		console.log(this.props);
		if(this.props.location.search){
			let dataOptionsSearch = {};
			let _rest = UrlToObject(this.props.location.search);
			if(_rest.keys){
				let _a = Validation.clean(_rest.keys);
				if(_a.length > minValue){
					dataOptionsSearch = {
						...this.state.optionsSearch,
						keys: _a
					}
				}
			}
			if(_rest.where){
				let _b = Validation.clean(_rest.where);
				if(_b.length > minValue){
					dataOptionsSearch = {
						...this.state.optionsSearch,
						where: _b
					}
				}
			}
			this.setState({
				loading: false,
				optionsSearch: dataOptionsSearch
			})
		}else{
			this.setState({
				loading: false
			});
		}
	};

	render(){
		return(
			<div>
				<div className="margin-top-90 hide-on-mobile"></div>
				<div className="container">
					<div className="row">
						<div className="col-xl-3 col-lg-4 hide-on-mobile">
						{!this.state.loading && (
							<SearchSideBarInPage
								dataOptions={this.state.optionsSearch}
							/>
						)}
						</div>
						<div className="col-xl-9 col-lg-8 content-left-offset">
							<SearchResultInPage
								dataOptions={PostDataHighestRatedFreelancer.heighestRated}
								{...this.props}
							 />
						</div>
					</div>
				</div>
			</div>
		);
	}
};