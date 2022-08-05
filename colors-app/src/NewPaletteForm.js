import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorBox from './DraggableColorBox';

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

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

export default function NewPaletteForm({ savePalette, palettes }) {
	const theme = useTheme();
	const navigation = useNavigate();
	const [ open, setOpen ] = React.useState(true);
	const [ colorName, setColorName ] = React.useState('');
	const [ paletteName, setPaletteName ] = React.useState('');
	const [ currentColor, setCurrentColor ] = React.useState('teal');
	const [ colors, setColors ] = React.useState([]);

	ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
		return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
	});

	ValidatorForm.addValidationRule('isColorUnique', (value) => {
		return colors.every(({ color }) => color !== value);
	});

	ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
		return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLocaleLowerCase());
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

	const handlePaletteNameChange = (evt) => {
		setPaletteName(evt.target.value);
	};

	const addNewColor = () => {
		const newColor = { color: currentColor, name: colorName };
		setColors((colors) => [ ...colors, newColor ]);
		setColorName('');
	};

	const removeColor = (colorName) => {
		return setColors((colors) => colors.filter((color) => color.name !== colorName));
	};

	const handleSavePalette = () => {
		const newPalette = {
			paletteName: paletteName,
			id: paletteName.toLocaleLowerCase().replace(/ /g, '-'),
			colors
		};

		savePalette(newPalette);
		return navigation(`/`);
	};

	return (
		<Box sx={{ display: 'flex' }}>
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
					<ValidatorForm onSubmit={handleSavePalette}>
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
					</ValidatorForm>
				</Toolbar>
			</AppBar>
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
					<Button variant="contained" color="secondary">
						Clear Palette
					</Button>
					<Button variant="contained" color="primary">
						Random Color
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
					<Button variant="contained" color="primary" style={{ backgroundColor: currentColor }} type="submit">
						Add Color
					</Button>
				</ValidatorForm>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				{colors.map((color) => (
					<DraggableColorBox
						key={color.name}
						color={color.color}
						name={color.name}
						onRemoveClickHandler={() => removeColor(color.name)}
					>
						{color}
					</DraggableColorBox>
				))}
			</Main>
		</Box>
	);
}
