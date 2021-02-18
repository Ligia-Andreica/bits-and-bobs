import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Item } from './Item'

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  width: 220px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`
const ColumnTitle = styled.h3`
  padding: 8px;
`
const ItemList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex: 1 1 auto;
  min-height: 100px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
`
export const Column = ({ column, index, isDropDisabled = false, columnItems }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <ColumnContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <ColumnTitle>{column.title}</ColumnTitle>
          <Droppable droppableId={column.id} isDropDisabled={isDropDisabled} type="item">
            {(provided, snapshot) => (
              <ItemList {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                {columnItems.map((item, index) => (
                  <Item key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </ItemList>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  )
}
