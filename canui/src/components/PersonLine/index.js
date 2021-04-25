import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImageUser from "../../assets/images/no-image-user.png";
import {compareTime} from '../../helpers/convert';
import { useSelector, useDispatch } from 'react-redux';
import {convertNumberToHaveCommas} from '../../helpers/DataAccess';
import otherServices from '../../services/otherServices';
import {checkAuthenticated} from '../../helpers';
import { Alert } from '../../layouts/Scripts/ManualScript';

function PersonLine (props){
	const [nationC, setNationC] = React.useState(false);
	const _data = useSelector((state) => state.user);
	React.useEffect(() => {
		//console.log(props);
		getNation();
	}, []);
	const { t, i18n } = useTranslation();
	const getNation = async () => {
		let _data = await otherServices.getCountry();
		if(_data){
			setNationC(_data);
		}
	}
	const renderClassStar = (y, x) => {
		x = Number(x);
		y = Number(1 + y);
		//console.log(x,y);
		return y > x ? `star star-percentage-${(10*(x - Math.floor(x))).toFixed(0)}` : 'star';
	};
	const convertLocation = (_nation, _city) => {
		if(nationC){
			return `${nationC.filter(x => _nation === x.countryId)[0].countryName}, ${_city}`;
		}
		return `${_nation}, ${_city || ''}`;
	}
	const renderAvatar = () => {
		let _av = NoImageUser;
		if (props.dataOption?.files?.cani_avatar?.length > 0) {
		    _av = props.dataOption?.files?.cani_avatar[props.dataOption.files?.cani_avatar?.length - 1]?.url;
		}else if(props.dataOption?.files?.avatar?.length > 0){
			_av =  props.dataOption?.files?.avatar[props.dataOption?.files?.avatar?.length - 1]?.url;
		}else if(props.dataOption?.files?.canu_avatar?.length > 0){
		  	_av =  props.dataOption?.files?.canu_avatar[props.dataOption?.files?.canu_avatar?.length - 1]?.url;
		}
		return _av;
	}
	const handleAlertFail = (e) => {
		e.preventDefault();
		Alert({
			title: 'Please Login !!!'
		})
	}
	return (
		<>
		<div className="freelancer">
			<div className="freelancer-overview">
				<div className="freelancer-overview-inner">
					<span className="bookmark-icon"></span>
					<div className="freelancer-avatar">
						{props.dataOption.verified && (
							<div className="verified-badge"></div>
						)}
						{!checkAuthenticated() && (
							<a href="#" onClick={handleAlertFail}>
								<LazyImage
				                        key={props.dataOption.id + Math.random()}
				                        src={renderAvatar() || NoImageUser}
				                        alt={props.dataOption.name}
				                    />
							</a>
						)}
						{checkAuthenticated() && (
							<Link to={`${UrlPath.UserDetail}/${props.dataOption.id}`}>
								<LazyImage
			                        key={props.dataOption.id + Math.random()}
			                        src={renderAvatar() || NoImageUser}
			                        alt={props.dataOption.name}
			                    />
							</Link>
						)}
					</div>
					<div className="freelancer-name hide-on-mobile">
						<h4>
							{!checkAuthenticated() && (
								<a href="#" onClick={handleAlertFail}>
									{props.dataOption.name} 
								</a>
							)}
							{checkAuthenticated() && (
								<Link to={`${UrlPath.UserDetail}/${props.dataOption.id}`}>
									{props.dataOption.name} 
								</Link>
							)}
						</h4>
						<div>
							<div>{props.dataOption.title}</div>
							
						</div>
						{props.dataOption.rating && (
						<div className="freelancer-rating">
							<div className="star-rating" data-rating={props.dataOption.rating}>
							{props.dataOption.rating && Number(props.dataOption.rating) > 0 && [...Array(Math.ceil(props.dataOption.rating)).keys()].map(y => {
								return (
									<span className={renderClassStar(y, props.dataOption.rating)}></span>
								);
							})}
							</div>
						</div>
						)}
					</div>
				</div>
			</div>
			<div className="freelancer-details">
				<div className="freelancer-name hide-on-desktop">
					{!checkAuthenticated() && (
						<a href="#" onClick={handleAlertFail}>
							<h4>{props.dataOption.name} </h4>
							<div className="freelancer-rating">
								<div className="star-rating" data-rating={props.dataOption.rating}>
								{props.dataOption.rating && Number(props.dataOption.rating) > 0 && [...Array(Math.ceil(props.dataOption.rating)).keys()].map(y => {
									return (
										<span className={renderClassStar(y, props.dataOption.rating)}></span>
									);
								})}
								</div>
							</div>
						</a>
					)}
					{checkAuthenticated() && (
						<Link to={`${UrlPath.UserDetail}/${props.dataOption.id}`}>
							<h4>{props.dataOption.name} </h4>
							<div className="freelancer-rating">
								<div className="star-rating" data-rating={props.dataOption.rating}>
								{props.dataOption.rating && Number(props.dataOption.rating) > 0 && [...Array(Math.ceil(props.dataOption.rating)).keys()].map(y => {
									return (
										<span className={renderClassStar(y, props.dataOption.rating)}></span>
									);
								})}
								</div>
							</div>
						</Link>
					)}
				</div>
				<div className="freelancer-details-list special-mobile">
					<ul>
						<li>Location <strong><i className="icon-material-outline-location-on hide-on-mobile"></i> 
						{props.dataOption?.areaService}
						</strong></li>
						<li>Job Success <strong>{props.dataOption?.jobSuccess?.replace(/%/, '') || 0}%</strong></li>
					</ul>
					<div className="clearfix"></div>
				</div>
				{!checkAuthenticated() && (
					<a href="#" onClick={handleAlertFail} className="button button-sliding-icon ripple-effect hide-on-mobile">View Profile <i className="icon-material-outline-arrow-right-alt"></i></a>
				)}
				{checkAuthenticated() && (
					<Link to={`${UrlPath.UserDetail}/${props.dataOption.id}`} className="button button-sliding-icon ripple-effect hide-on-mobile">View Profile <i className="icon-material-outline-arrow-right-alt"></i></Link>
				)}
			</div>
		</div>
		</>
	);
};

export default PersonLine;

