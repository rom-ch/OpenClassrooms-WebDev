import './Footer.css';
import logo from './../../img/footer_logo.svg';

function Footer() {
	return (
		<footer className='footer'>
			<img className='footer__img' src={logo} alt="logo Kasa" />
			<h2 className='footer__text'>© 2020 Kasa. All rights reserved</h2>
		</footer>
	);
}

export default Footer;
