import React from 'react';
import { useNavigate } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import './PaletteList.css';

const PaletteList = ({ palettes }) => {
	const navigation = useNavigate();

	const goToPalette = (id) => {
		return navigation(`/palette/${id}`);
	};

	return (
		<div className="PaletteList-root">
			<div className="PaletteList-container">
				<nav className="PaletteList-nav">
					<h1>React Colors</h1>
				</nav>
				<div className="PaletteList-palettes">
					{palettes.map((palette) => (
						<MiniPalette key={palette.id} handleClick={() => goToPalette(palette.id)} {...palette} />
					))}
				</div>
			</div>
		</div>
	);
};

export default PaletteList;
