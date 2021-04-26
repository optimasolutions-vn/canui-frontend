import React from 'react';
import { useTranslation } from 'react-i18next';
export default function BottomSection (props){

	const { t, i18n } = useTranslation();
	return (
		<div className="footer-bottom-section">
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						{t(props.data.copyRight)}
					</div>
				</div>
			</div>
		</div>
	);
};