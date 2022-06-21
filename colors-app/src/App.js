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
		</Routes>
	);
}

export default App;
