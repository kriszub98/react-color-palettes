import React from 'react';
import MiniPalette from './MiniPalette';
import './PaletteList.css';

const PaletteList = ({ palettes }) => {
	return (
		<div className="PaletteList-root">
			<div className="PaletteList-container">
				<nav className="PaletteList-nav">
					<h1>React Colors</h1>
				</nav>
				<div className="PaletteList-palettes">
					{palettes.map((palette) => <MiniPalette key={palette.id} {...palette} />)}
				</div>
			</div>
		</div>
	);
};

export default PaletteList;
