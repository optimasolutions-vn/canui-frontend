import React from 'react';
import BannerIntroSection from './BannerIntroSection';
import SearchSection from './SearchSection';
import StatsSection from './StatsSection';
import CategoriesBox from '../../components/categoriesBox';
import FeaturedJobs from './FeaturedJobs';
import FeaturedCities from './FeaturedCities';
import HighestRatedFreelancer from './HighestRatedFreelancer';
import langConst from '../../libs/lang';
import Loader from '../../components/effects/Loader';

const _imgBanner = '/images/home-background-banner.jpeg';


export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	};
	componentDidMount(){
		console.log(this.props);
	};
	componentDidUpdate(prevProps, prevState){

	};
	render(){
		return(
			<React.Fragment>
			<div className="intro-banner">
				<div className="container">
					<BannerIntroSection
						t={this.props.t}
						/>
					<SearchSection t={this.props.t}
						/>
					<StatsSection t={this.props.t}
						/>
				</div>
				<div className="background-image-container" style={{backgroundImage: `url(${_imgBanner})`}}></div>
			</div>

			<CategoriesBox />

			<FeaturedJobs />

			<FeaturedCities />

			<HighestRatedFreelancer />
			</React.Fragment>
		);
	}
};
