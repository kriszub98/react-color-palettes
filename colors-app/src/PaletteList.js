import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
				<TransitionGroup className="PaletteList-palettes">
					{palettes.map((palette) => (
						<CSSTransition key={palette.id} classNames="fade" timeout={500}>
							<MiniPalette
								deletePalette={() => deletePalette(palette.id)}
								handleClick={() => goToPalette(palette.id)}
								{...palette}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
		</div>
	);
};

export default PaletteList;
