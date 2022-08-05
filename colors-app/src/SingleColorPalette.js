import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

const SingleColorPalette = ({ findPalette }) => {
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

	const changeFormat = (newFormat) => {
		return setFormat(newFormat);
	};

	const { colors, paletteName, emoji, id } = generatePalette(findPalette(paletteId));
	const shades = gatherShades(colors, colorId);
	const colorBoxes = shades.map((color) => {
		return <ColorBox key={color.name} name={color.name} background={color[format]} />;
	});

	return (
		<div className="SingleColorPalette Palette">
			<Navbar handleFormatChange={changeFormat} />
			<div className="Palette-colors">
				{colorBoxes}
				<div className="go-back ColorBox">
					<Link to={`/palette/${id}`} className="back-button">
						Go Back
					</Link>
				</div>
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

export default SingleColorPalette;
