import React from 'react';
import { useTranslation } from 'react-i18next';
import Validation from '../../helpers/Validation';
export default function SubscribeArticle (props){

	const { t, i18n } = useTranslation();
	const inputEl = React.useRef(null);
	
	const handleActionInput = () => {};
	const handleActionSubmit = (e) => {
		e.preventDefault();
		console.log(Validation.test(inputEl.current.value, 'email'));
	};
	
	return (
		<div className="col-xl-4 col-lg-4 col-md-12">
			<h3><i className="icon-feather-mail"></i> {t(props.data.title)}</h3>
			<p>{t(props.data.description)}</p>
			<form method="post" className="newsletter" onSubmit={e => handleActionSubmit(e)}>
				<input ref={inputEl} type="text" name="fname" defaultValue='' placeholder={t(props.data.placeHolder)} />
				<button type="submit"><i className="icon-feather-arrow-right"></i></button>
			</form>
		</div>
	);
};