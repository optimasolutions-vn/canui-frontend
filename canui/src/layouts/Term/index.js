import React from 'react';
import langConst from '../../libs/lang';
import { Link } from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import internalLibsAboutUs from '../../libs/internalLibsAboutUs';
import externalLibs from '../../libs/externalLibs';
import BreadCrumbs from '../../components/BreadCrumbs';
import PostDataAboutUs from '../../helpers/PostDataAboutUs';
import { getOptionPageTerms } from '../../services/optionsPagesServices';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import i18n from 'i18next';
function createMarkup(content){
	return{__html: content};
}
export default class Term extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banner_url: `/images/single-company.jpg`,
			data: {},
			isLoading: true,
		};
	};

	componentDidMount(){
		this.getContentPage();
	};

	componentDidUpdate(prevProps, prevState){

	};

	getContentPage = async () => {
		let _res = await getOptionPageTerms();
		if(_res?.data?.length > 0){
			this.setState({
				data: _res.data[0].value,
				banner_url: _res.data[0]?.value?.banner_url,
				isLoading: false,
			})
		}
	}

	createMarkup = (_content) => {
		return {__html: _content};
	}

	renderContentHTML = () => {
		if(i18n?.language && this.state.data[`${i18n?.language}`]){
			return draftToHtml(this.state.data[`${i18n?.language}`]?.content);
		}
		return null;
	}

	styles01 = () => {
		return {
			backgroundImage: `url("${this.state.banner_url}")`,
			backgroundPosition: 'center center',
			backgroundSize: `cover`,
			backgroundRepeat: `no-repeat`,
		};
	};

	render(){
		let {t} = this.props;
		return(
			<React.Fragment>
				<div className="single-page-header">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="single-page-header-inner">
									<div className="left-side">
										
										<div className="header-details">
											<h3>{t('Terms of use')}</h3>
											
										</div>
									</div>
									<div className="right-side">
									<BreadCrumbs 
										dataList={[
											{label: t('Terms of use')}
										]}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="background-image-container" style={this.styles01()}></div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12 content-right-offset">
							<div className="single-page-section">
								<div className='single-page-content-aboutus' dangerouslySetInnerHTML={this.createMarkup(this.renderContentHTML())} />
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};