import React, { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import './PaletteList.css';

const PaletteList = ({ palettes, deletePalette }) => {
	const navigation = useNavigate();
	const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = React.useState(false);
	const [ idPaletteToDelete, setIdPaletteToDelete ] = React.useState('');

	const openDeleteDialog = useCallback((id) => {
		setIdPaletteToDelete(id);
		return setIsDeleteDialogOpen(true);
	}, []);

	const closeDeleteDialog = () => {
		setIdPaletteToDelete('');
		return setIsDeleteDialogOpen(false);
	};

	const goToPalette = useCallback(
		(id) => {
			return navigation(`/palette/${id}`);
		},
		[ navigation ]
	);

	const handleDelete = () => {
		deletePalette(idPaletteToDelete);
		return closeDeleteDialog();
	};

	return (
		<div className="PaletteList-root">
			<div className="PaletteList-container">
				<nav className="PaletteList-nav">
					<h1 className="PaletteList-title">React Colors</h1>
					<Link to="/palette/new">Create New Palette</Link>
				</nav>
				<TransitionGroup className="PaletteList-palettes">
					{palettes.map((palette) => (
						<CSSTransition key={palette.id} classNames="PaletteListFade" timeout={500}>
							<MiniPalette
								id={palette.id}
								openDeleteDialog={openDeleteDialog}
								goToPalette={goToPalette}
								{...palette}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>

			<Dialog open={isDeleteDialogOpen} aria-labelledby="delete-palette-dialog" onClose={closeDeleteDialog}>
				<DialogTitle id="delete-palette-dialog-title">Delete this palette?</DialogTitle>
				<List>
					<ListItemButton onClick={handleDelete}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Delete" />
					</ListItemButton>

					<ListItemButton onClick={closeDeleteDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Cancel" />
					</ListItemButton>
				</List>
			</Dialog>
		</div>
	);
};

export default PaletteList;
