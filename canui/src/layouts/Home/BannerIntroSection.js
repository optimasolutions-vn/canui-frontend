import React from 'react';

function BannerIntroSection(props){
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="banner-headline">
					<h3>
						<strong>{props.t('Time-sharing service makes a real impact in the future')} </strong>
						<br/>
						<span>{props.t('You can hire or be hired for any job, any time.')}</span>
					</h3>
				</div>
			</div>
		</div>
	);
};
export default BannerIntroSection;
