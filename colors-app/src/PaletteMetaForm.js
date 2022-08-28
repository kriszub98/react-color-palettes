import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const PaletteMetaForm = ({ palettes, handleSavePalette, hideForm }) => {
	const [ paletteName, setPaletteName ] = useState('');
	const [ savingStage, setSavingStage ] = useState('paletteName');

	const handlePaletteNameChange = (evt) => {
		setPaletteName(evt.target.value);
	};

	const showEmojiPicker = () => {
		return setSavingStage('emoji');
	};

	const savePalette = (emoji) => {
		let newPalette = { paletteName, emoji: emoji.native };
		return handleSavePalette(newPalette);
	};

	ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
		return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLocaleLowerCase());
	});

	return (
		<div>
			<Dialog open={savingStage === 'emoji'}>
				<DialogTitle>Choose a Palette Emoji</DialogTitle>
				<Picker data={data} onEmojiSelect={savePalette} />
			</Dialog>
			<Dialog open={savingStage === 'paletteName'} onClose={hideForm}>
				<DialogTitle>Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={showEmojiPicker}>
					<DialogContent>
						<DialogContentText>
							Please enter a name for your new beautiful palette. Make sure it's unique!
						</DialogContentText>
						<TextValidator
							label="Palette Name"
							name="paletteName"
							fullWidth
							margin="normal"
							value={paletteName}
							onChange={handlePaletteNameChange}
							validators={[ 'required', 'isPaletteNameUnique' ]}
							errorMessages={[ 'Enter Palette Name', 'Name is already used!' ]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={hideForm}>Cancel</Button>
						<Button variant="contained" color="primary" type="submit">
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
};

export default PaletteMetaForm;
