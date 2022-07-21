import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

import './Palette.css';

const Palette = () => {
	const [ level, setLevel ] = useState(500);
	const [ format, setFormat ] = useState('hex');
	const { id } = useParams();

	const findPalette = (id) => {
		return seedColors.find(function(palette) {
			return palette.id === id;
		});
	};

	const changeFormat = (newFormat) => {
		return setFormat(newFormat);
	};

	const changeLevel = (level) => {
		return setLevel(level);
	};

	const { colors, paletteName, emoji, id: paletteId } = generatePalette(findPalette(id));

	const colorBoxes = colors[level].map((color) => (
		<ColorBox
			key={color.id}
			background={color[format]}
			name={color.name}
			id={color.id}
			paletteId={paletteId}
			showLink
		/>
	));

	return (
		<div className="Palette">
			<Navbar level={level} changeLevel={changeLevel} handleFormatChange={changeFormat} />
			<div className="Palette-colors">{colorBoxes}</div>
			<footer className="Palette-footr">
				{paletteName}e
				<span className="emoji">{emoji}</span>
			</footer>
		</div>
	);
};

export default Palette;
