import React, { Component } from 'react';
import './Palette.css';
import ColorBox from './ColorBox';

class Palette extends Component {
	render() {
		const { colors } = this.props;
		const colorBoxes = colors.map((color) => <ColorBox background={color.color} name={color.name} />);

		return (
			<div className="Palette">
				{/* Navbar goes here */}
				<div className="Palette-colors">{colorBoxes}</div>
				{/* Footer */}
			</div>
		);
	}
}

export default Palette;
