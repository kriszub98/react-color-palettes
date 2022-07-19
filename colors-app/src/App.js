import Palette from './Palette';
import PaletteList from './PaletteList';
import { Route, Routes } from 'react-router-dom';
import seedColors from './seedColors';
import './App.css';

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<PaletteList palettes={seedColors} />} />
			<Route exact path="/palette/:id" element={<Palette />} />
			<Route exact path="/palette/:paletteId/:colorId" element={<h1>Single Color</h1>} />
		</Routes>
	);
}

export default App;
