import React from 'react';
import CountUp, { startAnimation } from 'react-countup';
import { useTranslation } from 'react-i18next';
function StatsSection (props){
  const { t, i18n } = useTranslation();
	React.useEffect(() => {
		//runScript();
	}, []);
	return (
		<div className="row">
			<div className="col-md-12">
				<ul className="intro-stats margin-top-45 hide-under-992px">
					<li>
						<CountUp className="counter fwB" start={0} end={1586} duration={3} />
						<span>{t("Jobs Posted")}</span>
					</li>
					<li>
						<CountUp className="counter" start={0} end={1233} duration={3} />
						<span>{t("Freelancers")}</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
export default StatsSection;
