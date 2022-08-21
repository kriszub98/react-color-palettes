import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const PaletteMetaForm = ({ palettes, handleSavePalette }) => {
	const [ open, setOpen ] = useState(false);
	const [ paletteName, setPaletteName ] = useState('');

	const handlePaletteNameChange = (evt) => {
		setPaletteName(evt.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
		return palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLocaleLowerCase());
	});

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Open form dialog
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here. We will send updates
						occasionally.
					</DialogContentText>
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
					</ValidatorForm>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default PaletteMetaForm;
