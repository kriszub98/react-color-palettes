import React from 'react';
import MiniPalette from './MiniPalette';

const PaletteList = ({ palettes }) => {
	return (
		<div>
			<h1>React Colors</h1>
			{palettes.map((palette) => <MiniPalette key={palette.id} {...palette} />)}
		</div>
	);
};

export default PaletteList;
