import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import './App.css';

function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem('palettes')) || seedColors;
	const [ palettes, setPalettes ] = React.useState(savedPalettes);
	const didMount = React.useRef(false);

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

	return (
		<Routes>
			<Route exact path="/" element={<PaletteList palettes={palettes} />} />
			<Route
				exact
				path="/palette/new"
				element={<NewPaletteForm savePalette={savePalette} palettes={palettes} />}
			/>
			<Route exact path="/palette/:id" element={<Palette findPalette={findPalette} />} />
			<Route
				exact
				path="/palette/:paletteId/:colorId"
				element={<SingleColorPalette findPalette={findPalette} />}
			/>
		</Routes>
	);
}

export default App;
