import React from 'react';
import { defaultsToTrue } from '../../static/utils';
import ConditionalRendering from '../ConditionalRendering';
import Footer from '../Footer';
import TempoRendering from '../TempoRendering';

import './index.scss';

interface ErrorMsgProps {
    title   	: string,
    message 	: string,
    icon?   	: JSX.Element,
	autoHide?	: boolean,
	time?		: number
}

export default function ErrorMessage(props: ErrorMsgProps) {
    
	const { icon, message, title } = props;

	let { autoHide, time } = props || {};
	autoHide = defaultsToTrue(autoHide);
	time     = time || 10000;

	const element = (
		<Footer className="error-msg">

			<aside className="error-msg__icon">
				{icon}
			</aside>
			<section className="error-msg__content">
				<div className="error-msg__header">
					{title}
				</div>
				<div className="error-msg__body">
					{message}
				</div>
			</section>

		</Footer>
	);

	const tempoElement = (
		<TempoRendering time={time}>
			{element}
		</TempoRendering>
	)

	return (<ConditionalRendering
				condition = { !autoHide }
				ifTrue	  = {element}
				ifFalse	  = {tempoElement}
		    />);
}