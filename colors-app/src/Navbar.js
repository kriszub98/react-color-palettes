import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'hex',
			isSnackbarOpen: false
		};
		this.handleFormatChange = this.handleFormatChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}
	handleFormatChange(event) {
		this.setState({ format: event.target.value, isSnackbarOpen: true });
		this.props.handleFormatChange(event.target.value);
	}
	closeSnackbar() {
		this.setState({ isSnackbarOpen: false });
	}
	render() {
		const { level, changeLevel, showSlider } = this.props;
		const { format, isSnackbarOpen } = this.state;
		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">reactcolorpicker</Link>
				</div>
				{showSlider && (
					<div className="slider-container">
						<span>Level: {level}</span>
						<div className="slider">
							<Slider defaultValue={level} min={100} max={900} step={100} onChange={changeLevel} />
						</div>
					</div>
				)}

				<div className="select-container">
					<Select value={format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={isSnackbarOpen}
					message={<span id="message-id">Format Changed To {format}!</span>}
					autoHideDuration={3000}
					onClose={this.closeSnackbar}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
							<CloseIcon />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}

export default Navbar;
