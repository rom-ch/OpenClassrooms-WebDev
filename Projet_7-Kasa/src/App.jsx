import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Housing from './pages/Housing/Housing';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

function App() {
	const [housing, setHousing] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchHousingHandler = useCallback(async () => {
		setError(null);
		try {
			const response = await fetch(
				'http://localhost:3000/logements.json'
			);

			if (!response.ok) {
				throw new Error("Une erreur s'est produite !");
			}

			const data = await response.json();
			setHousing(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
		}
	}, []);

	useEffect(() => {
		fetchHousingHandler();
	}, [fetchHousingHandler]);

	if (loading) return <div>Chargement...</div>;
	if (error) return <div>Erreur...</div>;

	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route path="/home">
					<Home housingData={housing} />
				</Route>
				<Route path="/housing/:id">
					{housing && <Housing housingData={housing} />}
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
