import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { mockData } from './mock-data'
import { Column } from './Column'

const Container = styled.div`
  display: flex;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'lightgrey')};
`

const App = () => {
  const [initialData, setInitialData] = useState(mockData)

  const reorderColumns = (result) => {
    const { source, destination } = result

    const newColumnsOrder = [...initialData.columnOrder]
    const [removed] = newColumnsOrder.splice(source.index, 1)
    newColumnsOrder.splice(destination.index, 0, removed)

    setInitialData({ ...initialData, columnOrder: newColumnsOrder })
  }
  const onReorderItems = (result) => {
    const { destination, source, draggableId } = result

    // now we need reorder the task inside the column
    const column = initialData.columns[source.droppableId]
    const newItemIds = [...column.itemIds] //new array in order not to mutate a data
    newItemIds.splice(source.index, 1) //remove draggable task from array
    newItemIds.splice(destination.index, 0, draggableId) //remove nothing, insert draggableId

    const newColumn = { ...column, itemIds: newItemIds }
    const columns = { ...initialData.columns }
    columns[newColumn.id] = newColumn
    const newInitialData = {
      ...initialData,
      columns,
    }
    setInitialData(newInitialData)
  }
  const onMoveItems = (result) => {
    const { source, destination, draggableId } = result
    //moving from one list(column) to another
    const startColumn = initialData.columns[source.droppableId]
    const finishedColumn = initialData.columns[destination.droppableId]

    const startItemIds = [...startColumn.itemIds] //new array in order not to mutate a data
    startItemIds.splice(source.index, 1) //remove draggable task from start column
    const updatedStartColumn = { ...startColumn, itemIds: startItemIds }

    const finishedItemIds = Array.from(finishedColumn.itemIds) //new array in order not to mutate a data
    finishedItemIds.splice(destination.index, 0, draggableId)
    const updatedFinishedColumn = { ...finishedColumn, itemIds: finishedItemIds }

    const columns = { ...initialData.columns }
    columns[startColumn.id] = updatedStartColumn
    columns[finishedColumn.id] = updatedFinishedColumn
    const newInitialData = {
      ...initialData,
      columns,
    }
    setInitialData(newInitialData)
  }

  const reorderItems = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // location of drop destination the same as source
      return
    }

    if (source.droppableId === destination.droppableId) {
      onReorderItems(result)
    } else {
      onMoveItems(result)
    }
  }

  const onDragStart = (result) => {
    // console.log(result)
  }

  const onDragEnd = (result) => {
    const { source, destination, type } = result
    if (!destination) return // was dropped outside

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // location of drop destination the same as source
      return
    }

    if (type === 'item') {
      reorderItems(result)
    }

    if (type === 'column') {
      reorderColumns(result)
    }
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="main-horizontal-container" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <Container {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {initialData.columnOrder.map((columnId, index) => {
              const column = initialData.columns[columnId]
              const columnItems = column.itemIds.map((itemId) => {
                return initialData.items[itemId]
              })

              return <Column key={columnId} column={column} index={index} columnItems={columnItems} />
            })}
            {/* add more space during dragging the item */}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App
