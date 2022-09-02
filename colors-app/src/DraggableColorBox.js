import React from 'react';
import { styled } from '@mui/material/styles';
import { useSortable } from '@dnd-kit/sortable';
import DeleteIcon from '@mui/icons-material/Delete';
import { CSS } from '@dnd-kit/utilities';
import sizes from './sizes';

const Box = styled('div')(({ color, transform, transition, isDragging }) => ({
	width: '20%',
	height: '25%',
	backgroundColor: color,
	margin: '0 auto',
	display: 'inline-block',
	position: 'relative',
	cursor: 'pointer',
	marginBottom: '-3.5px',
	transform: CSS.Transform.toString(transform),
	transition,
	'.deleteIcon': {
		transition: 'all .3s ease-in-out'
	},
	'&:hover .deleteIcon': {
		color: '#ccc',
		transform: 'scale(1.5)'
	},
	'&:hover .deleteIcon:hover': {
		color: 'white'
	},
	zIndex: isDragging ? '999' : 'default',
	[sizes.down('lg')]: {
		width: '25%',
		height: '20%'
	},
	[sizes.down('md')]: {
		width: '50%',
		height: '10%'
	},
	[sizes.down('sm')]: {
		width: '100%',
		height: '5%'
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

const DraggableColorBox = ({ id, color, name, onRemoveClickHandler }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	return (
		<Box color={color} isDragging={isDragging} transform={transform} transition={transition} ref={setNodeRef}>
			<div style={{ width: '100%', height: '100%' }} {...attributes} {...listeners} />
			<BoxContent>
				<span>{name}</span>
				<DeleteIcon className="deleteIcon" onClick={onRemoveClickHandler} />
			</BoxContent>
		</Box>
	);
};

export default DraggableColorBox;
