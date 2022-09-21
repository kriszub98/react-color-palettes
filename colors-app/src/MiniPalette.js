import React, { memo } from 'react';
import './MiniPalette.css';
import DeleteIcon from '@mui/icons-material/Delete';

const MiniPalette = ({ id, paletteName, emoji, colors, goToPalette, openDeleteDialog }) => {
	const miniColorBoxes = colors.map((color) => (
		<div key={color.name} className="MiniPalette-miniColor" style={{ backgroundColor: color.color }} />
	));

	const handlePaletteClick = () => goToPalette(id);

	const handleDeletePaletteClick = (evt) => {
		evt.stopPropagation();
		openDeleteDialog(id);
	};

	return (
		<div className="MiniPalette-root" onClick={handlePaletteClick}>
			<div className="MiniPalette-delete" style={{ transition: 'all 0.3s ease-in-out' }}>
				<DeleteIcon className="MiniPalette-deleteIcon" onClick={handleDeletePaletteClick} />
			</div>

			<div className="MiniPalette-colors">{miniColorBoxes}</div>

			<h5 className="MiniPalette-title">
				{paletteName} <span className="MiniPalette-emoji">{emoji}</span>
			</h5>
		</div>
	);
};

export default memo(MiniPalette);
