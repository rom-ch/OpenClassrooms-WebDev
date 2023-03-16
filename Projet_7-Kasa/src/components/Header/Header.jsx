import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../img/header_logo.svg';
import './Header.css';

function Header() {
	return (
		<header className="header m-5">
			<div className="header__logo">
				<img src={logo} alt="logo Kasa" />
			</div>
			<nav className="header__nav">
				<ul className="header__nav-list">
					<li className="header__nav-list-item">
						<NavLink
							activeClassName={"active"}
							className="header__nav-list-link"
							to="/home"
						>
							Accueil
						</NavLink>
					</li>
					<li className="header__nav-list-item">
						<NavLink
							activeClassName={"active"}
							className="header__nav-list-link"
							to="/about"
						>
							A propos
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
