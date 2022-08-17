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
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';

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

export default function NewPaletteForm({ savePalette, palettes, maxColors = 20 }) {
	const theme = useTheme();
	const navigation = useNavigate();
	const [ open, setOpen ] = React.useState(true);
	const [ colorName, setColorName ] = React.useState('');
	const [ currentColor, setCurrentColor ] = React.useState('teal');
	const [ colors, setColors ] = React.useState(palettes[0].colors);

	const paletteIsFull = colors.length >= maxColors;

	ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
		return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
	});

	ValidatorForm.addValidationRule('isColorUnique', (value) => {
		return colors.every(({ color }) => color !== value);
	});

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleColorNameChange = (evt) => {
		setColorName(evt.target.value);
	};

	const addNewColor = () => {
		const newColor = { color: currentColor, name: colorName };
		setColors((colors) => [ ...colors, newColor ]);
		setColorName('');
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
				<Typography variant="h4">Design Your Palette</Typography>
				<div>
					<Button variant="contained" color="secondary" onClick={clearColors}>
						Clear Palette
					</Button>
					<Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
						{paletteIsFull ? 'Palette Is Full' : 'Random Color'}
					</Button>
				</div>
				<ChromePicker color={currentColor} onChangeComplete={(newColor) => setCurrentColor(newColor.hex)} />
				<ValidatorForm onSubmit={addNewColor}>
					<TextValidator
						value={colorName}
						name="colorName"
						onChange={handleColorNameChange}
						validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
						errorMessages={[ 'Enter a color name', 'Color name must be unique', 'Color must be unique' ]}
					/>
					<Button
						variant="contained"
						color="primary"
						style={{ backgroundColor: paletteIsFull ? 'gray' : currentColor }}
						type="submit"
						disabled={paletteIsFull}
					>
						{paletteIsFull ? 'Palette Is Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<DraggableColorList colors={colors} setColors={setColors} removeColor={removeColor} />
			</Main>
		</Box>
	);
}
