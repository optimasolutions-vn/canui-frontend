import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.scss';

export default function Loader() {
	return (
		<div className='loading__transparent' tabIndex='-1'>
			<div className='loading__transparent--content'>
				<CircularProgress color="primary" />
			</div>
		</div>
	);
}
