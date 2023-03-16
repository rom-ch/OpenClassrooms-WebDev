import React, { useState } from 'react';

import './Dropdown.css';

import arrowDown from './../../img/accordion_arrowDown.svg';
import arrowUp from './../../img/accordion_arrowUp.svg';

function Dropdown(props) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(o => !o);

	const content = Array.isArray(props.content) ? (
		<ul className="dropdown__content">
			{props.content.map((cont, index) => (
				<li key={index}>{cont}</li>
			))}
		</ul>
	) : (
		<div className="dropdown__content">{props.content}</div>
	);

	return (
		<div className="dropdown">
			<div className="dropdown__header" onClick={toggle}>
				<div className="dropdown__header-title">{props.title}</div>
				<img src={isOpen ? arrowUp : arrowDown} alt="Symbole Flèche" />
			</div>

			{isOpen && content}
		</div>
	);
}

export default Dropdown;
