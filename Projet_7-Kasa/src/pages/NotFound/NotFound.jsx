import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './NotFound.css';

function NotFound() {
	return (
		<>
			<Header />
			<section className="not-found m-5">
				<div className="not-found__text">
					<h1 className="not-found__text-title">404</h1>
					<p className="not-found__text-subtitle">
						Oups ! La page que vous demandez n'existe pas.
					</p>
				</div>
				<Link to="/home" className="not-found__link">
					Retourner sur la page d’accueil
				</Link>
			</section>
			<Footer />
		</>
	);
}

export default NotFound;
