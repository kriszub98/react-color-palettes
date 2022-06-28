import React from 'react';
import './MiniPalette.css';

const MiniPalette = ({ classes, paletteName, emoji }) => {
	return (
		<div className="root">
			<div className="colors" />

			<h5 className="title">
				{paletteName} <span className="emoji">{emoji}</span>
			</h5>
		</div>
	);
};

export default MiniPalette;
