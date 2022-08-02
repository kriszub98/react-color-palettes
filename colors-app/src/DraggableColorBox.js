import React from 'react';
import { styled } from '@mui/material/styles';

const Box = styled('div')(({ color }) => ({
	width: '20%',
	height: '25%',
	backgroundColor: color,
	margin: '0 auto',
	display: 'inline-block',
	position: 'relative',
	cursor: 'pointer',
	marginBottom: '-3.5px'
}));

const DraggableColorBox = (props) => {
	return <Box color={props.color}>{props.color}</Box>;
};

export default DraggableColorBox;
