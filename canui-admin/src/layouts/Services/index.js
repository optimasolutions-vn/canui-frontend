import React from 'react';
import langConst from '../../libs/lang';
import CategoriesBox from '../../components/CategoriesBox';


import SearchSideBarInPage from '../../components/SearchSideBarInPage';
import SearchResultInPage from '../../components/SearchResultInPage';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import PostDataHighestRatedFreelancer from '../../helpers/PostDataHighestRatedFreelancer';

export default class Services extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: false,
			isSearchSuccess: false,
			loading: false,
			optionsSearch:false,
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
		//console.log('this.props service', this.props);
		if(this.props.match && this.props.match.params && this.props.match.params.slug){
			this.setState({
				optionsSearch: {
					ServicesSelected: [this.props.match.params.slug]
				}
			})
		}else{
			this.setState({
				optionsSearch: {}
			});
		}
	};

	getListResult = () => {

	};

	render(){
		return(
			<React.Fragment>
				<div className="margin-top-35 hide-on-mobile"></div>
				<div className="container">
					<div className="row">
						<CategoriesBox />
					</div>
				</div>
				<div className="margin-top-90 hide-on-mobile"></div>
			</React.Fragment>
		);
	}
};
