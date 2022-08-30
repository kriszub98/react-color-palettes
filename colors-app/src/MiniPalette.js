import React from 'react';
import './MiniPalette.css';
import DeleteIcon from '@mui/icons-material/Delete';

const MiniPalette = ({ paletteName, emoji, colors, handleClick }) => {
	const miniColorBoxes = colors.map((color) => (
		<div key={color.name} className="MiniPalette-miniColor" style={{ backgroundColor: color.color }} />
	));

	return (
		<div className="MiniPalette-root" onClick={handleClick}>
			<div className="MiniPalette-delete">
				<DeleteIcon className="MiniPalette-deleteIcon" style={{ transition: 'all 0.3s ease-in-out' }} />
			</div>

			<div className="MiniPalette-colors">{miniColorBoxes}</div>

			<h5 className="MiniPalette-title">
				{paletteName} <span className="MiniPalette-emoji">{emoji}</span>
			</h5>
		</div>
	);
};

export default MiniPalette;
