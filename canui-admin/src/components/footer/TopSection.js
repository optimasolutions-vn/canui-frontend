import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SwitchLangsArticle from './SwitchLangsArticle';

export default function TopSection (props){

	const { t, i18n } = useTranslation();

	return (
		<div className="footer-top-section">
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						<div className="footer-rows-container">

							<div className="footer-rows-left">
								<div className="footer-row">
									<div className="footer-row-inner footer-logo">
										<img src="/images/logo-canui.png" alt="CANU" />
									</div>
								</div>
							</div>

							<div className="footer-rows-right">
								<div className="footer-row">
									<div className="footer-row-inner">
										<ul className="footer-social-links">
											<li>
												<a href="#" title="Facebook" data-tippy-placement="bottom" data-tippy-theme="light">
													<i className="icon-brand-facebook-f"></i>
												</a>
											</li>
											<li>
												<a href="#" title="Twitter" data-tippy-placement="bottom" data-tippy-theme="light">
													<i className="icon-brand-twitter"></i>
												</a>
											</li>
											<li>
												<a href="#" title="Google Plus" data-tippy-placement="bottom" data-tippy-theme="light">
													<i className="icon-brand-google-plus-g"></i>
												</a>
											</li>
											<li>
												<a href="#" title="LinkedIn" data-tippy-placement="bottom" data-tippy-theme="light">
													<i className="icon-brand-linkedin-in"></i>
												</a>
											</li>
										</ul>
										<div className="clearfix"></div>
									</div>
								</div>
								<SwitchLangsArticle />
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
