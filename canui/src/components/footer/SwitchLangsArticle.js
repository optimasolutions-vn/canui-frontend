import React from 'react';
import { useTranslation } from 'react-i18next';
import Validation from '../../helpers/Validation';

import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function SwitchLangsArticle (props){

	const { t, i18n } = useTranslation();
	const inputEl = React.useRef(null);
	const onChangeLang = (e) => {
		console.log(e.target.value);
	};


	return (
		<div className="footer-row">
			<div className="footer-row-inner">
				<select onChange={e => onChangeLang(e)} defaultValue='en' className="selectpicker language-switcher" data-selected-text-format="count" data-size="5">
					<option value='en' selected>English</option>
					<option value='kr'>Korea</option>
					<option value='jp'>Japan</option>
					<option value='cn'>China</option>
					<option value='vn'>VietNam</option>
				</select>
			</div>
		</div>
	);
};
