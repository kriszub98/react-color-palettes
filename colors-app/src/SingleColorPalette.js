import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';
import PaletteFooter from './PaletteFooter';

const SingleColorPalette = () => {
	const { paletteId, colorId } = useParams();
	const [ format, setFormat ] = useState('hex');

	const gatherShades = (colors, colorToFilterBy) => {
		let shades = [];

		for (let key in colors) {
			shades = shades.concat(colors[key].filter((color) => color.id === colorToFilterBy));
		}

		// Return all shades of given color but the white that is generated as first
		return shades.slice(1);
	};

	const findPalette = (id) => {
		return seedColors.find(function(palette) {
			return palette.id === id;
		});
	};

	const changeFormat = (newFormat) => {
		return setFormat(newFormat);
	};

	const { colors, paletteName, emoji, id } = generatePalette(findPalette(paletteId));
	const shades = gatherShades(colors, colorId);
	const colorBoxes = shades.map((color) => {
		return <ColorBox key={color.name} name={color.name} background={color[format]} />;
	});

	return (
		<div className="Palette">
			<Navbar handleFormatChange={changeFormat} />
			<div className="Palette-colors">{colorBoxes}</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

export default SingleColorPalette;
