import './Card.css';
import { Link } from 'react-router-dom';

function Card(props) {
	return (
		<Link
			to={`/housing/${props.id}`}
			className="card"
			style={{
				background: `url(${props.cover})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				textDecoration: 'none',
			}}
		>
			<h3 className="card__title">{props.title}</h3>
		</Link>
	);
}

export default Card;
