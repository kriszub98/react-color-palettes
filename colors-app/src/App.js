import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import './App.css';

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes')) || seedColors;
	const [ palettes, setPalettes ] = React.useState(savedPalettes);
	const didMount = React.useRef(false);
	const location = useLocation();

	React.useEffect(
		() => {
			if (!didMount.current) {
				didMount.current = true;
				return;
			}

			// Sync palette changes to localstorage
			return window.localStorage.setItem('palettes', JSON.stringify(palettes));
		},
		[ palettes ]
	);

	const savePalette = (newPalette) => {
		return setPalettes((palettes) => [ ...palettes, newPalette ]);
	};

	const findPalette = (id) => {
		return palettes.find(function(palette) {
			return palette.id === id;
		});
	};

	const deletePalette = (id) => {
		return setPalettes((palettes) => palettes.filter((palette) => palette.id !== id));
	};

	return (
		<div className="root">
			<TransitionGroup>
				<CSSTransition key={location.pathname} classNames="page" timeout={350}>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<Page>
									<PaletteList palettes={palettes} deletePalette={deletePalette} />
								</Page>
							}
						/>
						<Route
							exact
							path="/palette/new"
							element={
								<Page>
									<NewPaletteForm savePalette={savePalette} palettes={palettes} />
								</Page>
							}
						/>
						<Route
							exact
							path="/palette/:id"
							element={
								<Page>
									<Palette findPalette={findPalette} />
								</Page>
							}
						/>
						<Route
							exact
							path="/palette/:paletteId/:colorId"
							element={
								<Page>
									<SingleColorPalette findPalette={findPalette} />
								</Page>
							}
						/>
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}

export default App;
