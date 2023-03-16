import React, { useState } from 'react';
import './Carrousel.css';

import leftChevron from './../../img/carrousel_leftChevron.svg';
import rightChevron from './../../img/carrousel_rightChevron.svg';

function Carrousel({ slides }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const goToNext = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	return (
		<div className="carrousel m-5">
			{slides.length > 1 && (
				<>
					<img
						src={leftChevron}
						alt="Flèche gauche"
						className="chevron chevron-left"
						onClick={goToPrevious}
					/>
					<img
						src={rightChevron}
						alt="Flèche droite"
						className="chevron chevron-right"
						onClick={goToNext}
					/>
				</>
			)}

			<div
				style={{ backgroundImage: `url(${slides[currentIndex]})` }}
				className="slide"
			></div>
			{slides.length > 1 && (
				<div className="slide-index">
					{`${currentIndex + 1}/${slides.length}`}
				</div>
			)}
		</div>
	);
}

export default Carrousel;
