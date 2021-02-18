import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'lightgrey')};
  display: flex;
`

export const Item = ({ item, index }) => {
  const isDragDisabled = false // item.id === 'item-1'

  return (
    <Draggable draggableId={item.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {item.content}
        </Container>
      )}
    </Draggable>
  )
}
