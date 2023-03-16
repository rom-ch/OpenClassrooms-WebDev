import Accordion from '../../components/Accordion/Accordion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './About.css';

function About() {
	const aboutData = [
		{
			title: 'Fiabilité',
			content:
				'Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes.',
			id: 1,
		},
		{
			title: 'Respect',
			content:
				'La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.',
			id: 2,
		},
		{
			title: 'Service',
			content:
				"Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.",
			id: 3,
		},
		{
			title: 'Sécurité',
			content:
				"La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes.",
			id: 4,
		},
	];

	return (
		<>
			<Header />
			<section className="about__hero m-5"></section>
			<section className="about__accordion">
				{aboutData.map(data => (
					<Accordion
						title={data.title}
						content={data.content}
						key={data.id}
					/>
				))}
			</section>

			<Footer />
		</>
	);
}

export default About;
