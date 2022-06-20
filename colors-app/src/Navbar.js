import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'hex'
		};
		this.handleFormatChange = this.handleFormatChange.bind(this);
	}
	handleFormatChange(event) {
		this.setState({ format: event.target.value });
		this.props.handleFormatChange(event.target.value);
	}
	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;
		return (
			<header className="Navbar">
				<div className="logo">
					<a href="#">reactcolorpicker</a>
				</div>
				<div className="slider-container">
					<span>Level: {level}</span>
					<div className="slider">
						<Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} />
					</div>
				</div>
				<div className="select-container">
					<Select value={format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255)</MenuItem>
					</Select>
				</div>
			</header>
		);
	}
}

export default Navbar;
