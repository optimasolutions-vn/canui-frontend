import React from 'react';

export default function Pagination(props){
	return(
		<>
			<div className="row">
				<div className="col-md-12">
					<div className="pagination-container margin-top-30 margin-bottom-60">
						<nav className="pagination">
							<ul>
								<li className="pagination-arrow"><a href="#"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
								<li><a href="#" className="current-page">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#">4</a></li>
								<li className="pagination-arrow"><a href="#"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</>
	);	
};