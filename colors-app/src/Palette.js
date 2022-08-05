import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { generatePalette } from './colorHelpers';

import './Palette.css';
import PaletteFooter from './PaletteFooter';

const Palette = ({ findPalette }) => {
	const [ level, setLevel ] = useState(500);
	const [ format, setFormat ] = useState('hex');
	const { id } = useParams();

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
			<Navbar level={level} changeLevel={changeLevel} handleFormatChange={changeFormat} showSlider />
			<div className="Palette-colors">{colorBoxes}</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

export default Palette;
