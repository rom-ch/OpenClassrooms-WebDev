import React, { useState } from 'react';
import './Accordion.css';
import arrowDown from './../../img/accordion_arrowDown.svg';
import arrowUp from './../../img/accordion_arrowUp.svg';

function Accordion(props) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(o => !o);

	return (
		<div className="accordion">
			<div className="accordion__header" onClick={toggle}>
				<div className="accordion__header-title">{props.title}</div>
				<img src={isOpen ? arrowUp : arrowDown} alt="Symbole Flèche" />
			</div>

			{isOpen && (
				<div className="accordion__content">{props.content}</div>
			)}
		</div>
	);
}

export default Accordion;
