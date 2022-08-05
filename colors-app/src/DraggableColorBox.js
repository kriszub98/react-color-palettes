import React from 'react';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const Box = styled('div')(({ color }) => ({
	width: '20%',
	height: '25%',
	backgroundColor: color,
	margin: '0 auto',
	display: 'inline-block',
	position: 'relative',
	cursor: 'pointer',
	marginBottom: '-3.5px',
	'.deleteIcon': {
		transition: 'all .3s ease-in-out'
	},
	'&:hover .deleteIcon': {
		color: 'white',
		transform: 'scale(1.5)'
	}
}));

const BoxContent = styled('div')(() => ({
	boxSizing: 'border-box',
	position: 'absolute',
	left: '0px',
	bottom: '0px',
	width: '100%',
	padding: '10px',
	color: 'black',
	letterSpacing: '1px',
	textTransform: 'uppercase',
	fontSize: '12px',
	display: 'flex',
	justifyContent: 'space-between'
}));

const DraggableColorBox = ({ color, name, onRemoveClickHandler }) => {
	return (
		<Box color={color}>
			<BoxContent>
				<span>{name}</span>
				<DeleteIcon className="deleteIcon" onClick={onRemoveClickHandler} />
			</BoxContent>
		</Box>
	);
};

export default DraggableColorBox;
