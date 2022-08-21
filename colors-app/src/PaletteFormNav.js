import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
	transition: theme.transitions.create([ 'margin', 'width' ], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: '64px',
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
	return (
		<div style={{ display: 'flex' }}>
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
						Create A Palette
					</Typography>
				</Toolbar>
				<div>
					<PaletteMetaForm palettes={palettes} handleSavePalette={handleSavePalette} />
					<Link to="/">
						<Button variant="contained" color="secondary">
							Go Back
						</Button>
					</Link>
				</div>
			</AppBar>
		</div>
	);
};

export default PaletteFormNav;
