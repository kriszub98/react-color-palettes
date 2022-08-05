import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import './App.css';

function App() {
	const [ palettes, setPalettes ] = React.useState(seedColors);

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
			<Route exact path="/palette/new" element={<NewPaletteForm savePalette={savePalette} />} />
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
