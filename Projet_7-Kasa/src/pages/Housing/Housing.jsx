import React from 'react';
import { useParams } from 'react-router-dom/';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Carrousel from '../../components/Carrousel/Carrousel';
import Tag from './../../components/Tag/Tag';
import Rating from '../../components/Rating/Rating';
import Dropdown from '../../components/Dropdown/Dropdown';

import './Housing.css';

function Housing(props) {
	const params = useParams();
	const [housing] = props.housingData.filter(acc => params.id === acc.id);

	return (
		<>
			<Header />
			<div className="housing__carrousel">
				<Carrousel slides={housing.pictures} />
			</div>
			<section className="housing__content m-5">
				<div className="housing__content-header">
					<div className="housing__content-left">
						<div className="housing__content-left-title">
							<h2>{housing.title}</h2>
							<p>{housing.location}</p>
						</div>
						<div className="housing__content-left-tags">
							{housing.tags.map((tag, index) => (
								<Tag tagText={tag} key={index} />
							))}
						</div>
					</div>
					<div className="housing__content-right">
						<div className="housing__content-right-profile">
							<p>{housing.host.name}</p>
							<img src={housing.host.picture} alt="" />
						</div>
						<div className="house__content-right-rating">
							<Rating rating={housing.rating} />
						</div>
					</div>
				</div>
				<div className="housing__content-dropdowns">
					<Dropdown
						title="Description"
						content={housing.description}
						id={housing.id}
					/>
					<Dropdown
						title="Equipements"
						content={housing.equipments}
						id={housing.id}
					/>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default Housing;
