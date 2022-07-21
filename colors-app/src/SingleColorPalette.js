import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import './Palette.css';

const SingleColorPalette = () => {
	const { paletteId, colorId } = useParams();

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

	const { colors, paletteName, emoji, id } = generatePalette(findPalette(paletteId));
	const shades = gatherShades(colors, colorId);
	const colorBoxes = shades.map((color) => {
		return <ColorBox key={color.name} name={color.name} background={color.hex} />;
	});

	return (
		<div className="Palette">
			<h1>SingleColorPalette</h1>
			<div className="Palette-colors">{colorBoxes}</div>
		</div>
	);
};

export default SingleColorPalette;
