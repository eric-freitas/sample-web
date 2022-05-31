import React from 'react';
import { defaultsToTrue } from '../../static/utils';
import ConditionalRendering from '../ConditionalRendering';
import Footer from '../Footer';
import ProgressBar from '../ProgressBar';
import RenderIfTrue from '../RenderIfTrue';
import TempoRendering from '../TempoRendering';

import './index.scss';

interface ErrorMsgProps {
    title   	: string,
    message 	: string,
    icon?   	: JSX.Element,
	autoHide?	: boolean,
	/**
	 * Time, in seconds, to hide the Error Message
	 *
	 * @type {number}
	 * @memberof ErrorMsgProps
	 */
	time?		: number
}

export default function ErrorMessage(props: ErrorMsgProps) {
    
	const { icon, message, title } = props;

	let { autoHide, time } = props || {};
	autoHide = defaultsToTrue(autoHide);
	time     = time || 10;

	const element = (
		<Footer className="error-msg">
			<RenderIfTrue condition={autoHide}>
				<ProgressBar time={time}/>
			</RenderIfTrue>
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
		<TempoRendering time={time * 1000}>
			{element}
		</TempoRendering>
	)

	return (
		<ConditionalRendering
			condition = { !autoHide }
			ifTrue	  = {element}
			ifFalse	  = {tempoElement}
		/>
	);
}