import React from 'react'
import './index.css'

const Sidebar = ({lists, selectedList, onSelectList, onAddList}) => {
  const [newListName, setNewListName] = React.useState('')

  const handleAdd = () => {
    if (!newListName.trim()) return
    onAddList(newListName)
    setNewListName('')
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">My Lists</h2>
      <div style={{marginBottom: '1rem'}}>
        <button
          className={
            selectedList === 'IMPORTANT' ? 'sidebar-list-selected' : ''
          }
          style={{
            width: '100%',
            background: '#ff9800',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 6,
            padding: '0.5rem 0',
            marginBottom: 4,
            cursor: 'pointer',
            boxShadow:
              selectedList === 'IMPORTANT'
                ? '0 2px 8px rgba(255,152,0,0.15)'
                : 'none',
            transition: 'box-shadow 0.2s',
          }}
          onClick={() => onSelectList('IMPORTANT')}
        >
          ⭐ Important (Planned)
        </button>
      </div>
      <ul className="sidebar-list">
        {lists.map(list => (
          <li key={list}>
            <button
              className={selectedList === list ? 'sidebar-list-selected' : ''}
              onClick={() => onSelectList(list)}
            >
              {list}
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-add-list">
        <input
          value={newListName}
          onChange={e => setNewListName(e.target.value)}
          placeholder="Add new list"
        />
        <button onClick={handleAdd}>+</button>
      </div>
    </aside>
  )
}

export default Sidebar
