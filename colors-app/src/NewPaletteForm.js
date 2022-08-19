import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	flexGrow: 1,
	height: 'calc(100vh - 64px)',
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	})
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

const DrawerContainer = styled('div')(() => ({
	width: '90%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
}));

const ButtonsContainer = styled('div')(() => ({}));

export default function NewPaletteForm({ savePalette, palettes, maxColors = 20 }) {
	const theme = useTheme();
	const navigation = useNavigate();
	const [ open, setOpen ] = React.useState(true);
	const [ colors, setColors ] = React.useState(palettes[0].colors);

	const paletteIsFull = colors.length >= maxColors;

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addNewColor = (newColor) => {
		return setColors((colors) => [ ...colors, newColor ]);
	};

	const clearColors = () => {
		return setColors([]);
	};

	const addRandomColor = () => {
		// Pick Random Color from exisitng palettes
		const allColors = palettes.map((p) => p.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		let randomColor = allColors[rand];

		// Save it to state
		return setColors((colors) => [ ...colors, randomColor ]);
	};

	const removeColor = (colorName) => {
		return setColors((colors) => colors.filter((color) => color.name !== colorName));
	};

	const handleSavePalette = (paletteName) => {
		const newPalette = {
			paletteName,
			id: paletteName.toLocaleLowerCase().replace(/ /g, '-'),
			colors
		};

		savePalette(newPalette);
		return navigation(`/`);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<PaletteFormNav
				open={open}
				palettes={palettes}
				handleSavePalette={handleSavePalette}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<DrawerContainer>
					<Typography variant="h4">Design Your Palette</Typography>
					<ButtonsContainer>
						<Button variant="contained" color="secondary" onClick={clearColors}>
							Clear Palette
						</Button>
						<Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
							{paletteIsFull ? 'Palette Is Full' : 'Random Color'}
						</Button>
					</ButtonsContainer>
					<ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={addNewColor} colors={colors} />
				</DrawerContainer>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<DraggableColorList colors={colors} setColors={setColors} removeColor={removeColor} />
			</Main>
		</Box>
	);
}
