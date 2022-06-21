import Palette from './Palette';
import { Route, Routes } from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import './App.css';

function App() {
	return (
		<Routes>
			<Route exact path="/" element={<h1>Palette</h1>} />
			<Route exact path="/palette/:id" element={<h1>Indiv Route</h1>} />
		</Routes>
	);
	{
		/* <div className="App">
		<Palette palette={generatePalette(seedColors[4])} />
	</div> */
	}
}

export default App;
