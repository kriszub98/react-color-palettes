import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = ({ colors, setColors, removeColor }) => {
	const sensors = useSensors(useSensor(PointerSensor));

	function handleDragEnd(event) {
		const { active, over } = event;
		if (active.id !== over.id) {
			setColors((colors) => {
				const oldIndex = colors.findIndex((color) => color.name === active.id);
				const newIndex = colors.findIndex((color) => color.name === over.id);
				return arrayMove(colors, oldIndex, newIndex);
			});
		}
	}

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={colors.map((c) => c.name)} strategy={rectSortingStrategy}>
				{colors.map((color) => (
					<DraggableColorBox
						handle={true}
						key={color.name}
						id={color.name}
						color={color.color}
						name={color.name}
						onRemoveClickHandler={() => removeColor(color.name)}
					/>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default DraggableColorList;
