import React from 'react';
import langConst from '../../libs/lang';
import SearchSideBarInPage from '../../components/SearchSideBarInPage';
import SearchResultInPage from '../../components/SearchResultInPage';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import PostDataHighestRatedFreelancer from '../../helpers/PostDataHighestRatedFreelancer';

export default class ServiceDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			isSearchSuccess: false,
			loading: false,
			optionsSearch:{},
			dataSearchResult: [],
			currentPaged: 0,
			totalPage: 0,
		};
		this.serviceSlug = '';
	};
	componentDidMount(){
		this.roundDataOptionsSearch();
	};
	componentDidUpdate(prevProps, prevState){

	};

	roundDataOptionsSearch = () => {
		if(this.props.match && this.props.match.params && this.props.match.params.slug){
			this.setState({
				optionsSearch: {
					...this.state.optionsSearch,
					ServicesSelected: [this.props.match.params.slug]
				}
			})
		}
		console.log(this.props);
	};

	getListResult = () => {

	};

	render(){
		return(
			<React.Fragment>
			<div className="margin-top-90 hide-on-mobile"></div>
			<div className="container">
				<div className="row">
					<div className="col-xl-3 col-lg-4 hide-on-mobile">
						{this.state.optionsSearch && this.state.optionsSearch.ServicesSelected && (
							<SearchSideBarInPage
								dataOptions={this.state.optionsSearch} 
								{...this.props}/>
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
			</React.Fragment>
		);
	}
};