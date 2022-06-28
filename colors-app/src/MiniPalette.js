import React from 'react';
import './MiniPalette.css';

const MiniPalette = ({ paletteName, emoji, colors }) => {
	const miniColorBoxes = colors.map((color) => (
		<div key={color.name} className="MiniPalette-miniColor" style={{ backgroundColor: color.color }} />
	));

	return (
		<div className="MiniPalette-root">
			<div className="MiniPalette-colors">{miniColorBoxes}</div>

			<h5 className="MiniPalette-title">
				{paletteName} <span className="MiniPalette-emoji">{emoji}</span>
			</h5>
		</div>
	);
};

export default MiniPalette;
