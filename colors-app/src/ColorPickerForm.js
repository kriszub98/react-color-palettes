import React from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './ColorPickerForm.css';

const ColorPickerForm = ({ paletteIsFull, addNewColor, colors }) => {
	const [ currentColor, setCurrentColor ] = React.useState('teal');
	const [ colorName, setColorName ] = React.useState('');

	const updateColor = (newColor) => setCurrentColor(newColor.hex);

	const handleColorNameChange = (evt) => {
		setColorName(evt.target.value);
	};

	const handleAddColorSubmit = () => {
		const newColor = { color: currentColor, name: colorName };
		addNewColor(newColor);
		return setColorName('');
	};

	ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
		return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
	});

	ValidatorForm.addValidationRule('isColorUnique', (value) => {
		return colors.every(({ color }) => color !== value);
	});

	return (
		<div
			style={{
				width: '100%',
				paddingLeft: '1rem'
			}}
		>
			<ChromePicker color={currentColor} onChangeComplete={updateColor} className="ColorPickerContainer" />
			<ValidatorForm onSubmit={handleAddColorSubmit}>
				<TextValidator
					value={colorName}
					name="colorName"
					onChange={handleColorNameChange}
					variant="filled"
					margin="normal"
					validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
					errorMessages={[ 'Enter a color name', 'Color name must be unique', 'Color must be unique' ]}
					className="colorNameInput"
					placeholder="Color Name"
				/>
				<Button
					variant="contained"
					color="primary"
					style={{ backgroundColor: paletteIsFull ? 'gray' : currentColor }}
					type="submit"
					disabled={paletteIsFull}
					className="addColorBtn"
				>
					{paletteIsFull ? 'Palette Is Full' : 'Add Color'}
				</Button>
			</ValidatorForm>
		</div>
	);
};

export default ColorPickerForm;
