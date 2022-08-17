import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	transition: theme.transitions.create([ 'margin', 'width' ], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}));

const PaletteFormNav = ({ open, palettes, handleDrawerOpen, handleSavePalette }) => {
	const [ paletteName, setPaletteName ] = React.useState('');

	ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
		return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLocaleLowerCase());
	});

	const handlePaletteNameChange = (evt) => {
		setPaletteName(evt.target.value);
	};

	return (
		<div>
			<CssBaseline />
			<AppBar position="fixed" open={open} color="default">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Persistent drawer
					</Typography>
					<ValidatorForm onSubmit={() => handleSavePalette(paletteName)}>
						<TextValidator
							label="Palette Name"
							name="paletteName"
							value={paletteName}
							onChange={handlePaletteNameChange}
							validators={[ 'required', 'isPaletteNameUnique' ]}
							errorMessages={[ 'Enter Palette Name', 'Name is already used!' ]}
						/>

						<Button variant="contained" color="primary" type="submit">
							Save Palette
						</Button>
						<Link to="/">
							<Button variant="contained" color="secondary">
								Go Back
							</Button>
						</Link>
					</ValidatorForm>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default PaletteFormNav;
