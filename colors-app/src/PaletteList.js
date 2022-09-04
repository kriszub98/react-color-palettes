import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import './PaletteList.css';

const PaletteList = ({ palettes, deletePalette }) => {
	const navigation = useNavigate();

	const goToPalette = (id) => {
		return navigation(`/palette/${id}`);
	};

	return (
		<div className="PaletteList-root">
			<div className="PaletteList-container">
				<nav className="PaletteList-nav">
					<h1 className="PaletteList-title">React Colors</h1>
					<Link to="/palette/new">Create New Palette</Link>
				</nav>
				<div className="PaletteList-palettes">
					{palettes.map((palette) => (
						<MiniPalette
							key={palette.id}
							deletePalette={() => deletePalette(palette.id)}
							handleClick={() => goToPalette(palette.id)}
							{...palette}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PaletteList;
