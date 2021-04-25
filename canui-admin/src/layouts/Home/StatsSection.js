import React from 'react';
import CountUp, { startAnimation } from 'react-countup';
function StatsSection (props){
	React.useEffect(() => {
		//runScript();
	}, []);
	return (
		<div className="row">
			<div className="col-md-12">
				<ul className="intro-stats margin-top-45 hide-under-992px">
					<li>
						<CountUp className="counter fwB" start={0} end={1586} duration={3} />
						<span>Jobs Posted</span>
					</li>
					<li>
						<CountUp className="counter" start={0} end={1233} duration={3} />
						<span>Freelancers</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
export default StatsSection;