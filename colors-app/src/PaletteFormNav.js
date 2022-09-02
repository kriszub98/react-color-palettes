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
import sizes from './sizes';

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
	alignItems: 'center',
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

const NavButtonsContainer = styled('div')(() => ({
	marginRight: '1rem',

	a: {
		textDecoration: 'none'
	},

	Button: {
		margin: '0 0.5rem'
	},

	[sizes.down('xs')]: {
		marginRight: 0,

		Button: {
			margin: '0.1rem',
			padding: '0 0.3rem'
		}
	}
}));

const PaletteFormNav = ({ open, palettes, handleDrawerOpen, handleSavePalette }) => {
	const [ isFormShowing, setIsFormShowing ] = React.useState(false);

	const showForm = () => {
		return setIsFormShowing(true);
	};

	const hideForm = () => {
		return setIsFormShowing(false);
	};

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
				<NavButtonsContainer>
					<Link to="/">
						<Button variant="contained" color="secondary">
							Go Back
						</Button>
					</Link>
					<Button variant="contained" onClick={showForm}>
						Save
					</Button>
				</NavButtonsContainer>
			</AppBar>
			{isFormShowing && (
				<PaletteMetaForm palettes={palettes} handleSavePalette={handleSavePalette} hideForm={hideForm} />
			)}
		</div>
	);
};

export default PaletteFormNav;
