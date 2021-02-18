export const mockData = {
  items: {
    'item-1' : {id: 'item-1', content: 'item 1 -  content'},
    'item-2' : {id: 'item-2', content: 'item 2 - content'},
    'item-3' : {id: 'item-3', content: 'item 3 - content'},
    'item-4' : {id: 'item-4', content: 'item 4 - content'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      itemIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      itemIds: []
    },
  },
  // for reordering the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
}
