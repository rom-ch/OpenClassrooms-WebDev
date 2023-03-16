import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import './Home.css';

function Home(props) {
	const housingValues = props.housingData.map(housing => (
		<Card
			housingInfos={props.housingData}
			key={housing.id}
			title={housing.title}
			cover={housing.cover}
			id={housing.id}
		/>
	));

	return (
		<>
			<Header />
			<section className="home__hero m-5">
				<h1 className="home__hero-title">
					Chez vous, partout et ailleurs
				</h1>
			</section>
			<section className="home__gallery m-5">{housingValues}</section>
			<Footer />
		</>
	);
}

export default Home;
