// Write your code here
import './index.css'

import {Component} from 'react'

class TodoItem extends Component {
  state = {
    mode: 'edit',
    newTitle: this.props.item.todo,
    title: '',
    isChecked: false,
    isFavourite: false,
  }
  toggleFavourite = () => {
    this.setState(prev => ({isFavourite: !prev.isFavourite}))
  }

  onEdit = () => {
    this.setState({
      mode: 'save',
    })
  }

  onSave = () => {
    this.setState({
      mode: 'edit',
    })
  }

  onText = event => {
    console.log(event.target.value)
    this.setState({newTitle: event.target.value})
  }

  onInput = async event => {
    if (event.target.checked) {
      this.setState({
        isChecked: true,
      })
    } else {
      this.setState({
        isChecked: false,
      })
    }

    if (event.target.checked) {
      const oprions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          todo: this.state.newTitle,
          priority: this.props.item.priority,
          status: this.props.item.status,
          due_date: this.props.item.due_date,
          is_completed: event.target.checked,
        }),
      }
      const res = await fetch(
        `https://todoapplication-j07a.onrender.com/todos/${this.props.item.id}`,
        oprions,
      )
      console.log(res)
    } else {
      const oprions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({is_completed: event.target.checked}),
      }
      const res = await fetch(
        `https://todoapplication-j07a.onrender.com/todos/${this.props.item.id}`,
        oprions,
      )
      console.log(res)
    }
  }

  onDelete = async () => {
    const {deleteTodo} = this.props

    const options = {
      method: 'DELETE',

      headers: {'Content-Type': 'application/json'},
    }

    const dbRes = await fetch(
      `https://todoapplication-j07a.onrender.com/todos/${this.props.item.id}`,
      options,
    )

    console.log(dbRes)

    deleteTodo(this.props.item.id)
  }

  render() {
    const {mode, newTitle, isChecked, isFavourite} = this.state
    const {id, priority, status} = this.props.item

    return (
      <li
        className="list"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '8px 0',
        }}
      >
        <div
          className="textArea"
          style={{flex: 1, display: 'flex', alignItems: 'center', gap: 12}}
        >
          {mode !== 'edit' ? (
            <textarea rows={2} cols={22} onChange={this.onText}>
              {newTitle}
            </textarea>
          ) : (
            <div
              className="todo-items"
              style={{display: 'flex', alignItems: 'center', gap: 12}}
            >
              <input
                placeholder="Enter todo title"
                id={id}
                onChange={this.onInput}
                type="checkbox"
                checked={isChecked}
                style={{marginRight: 8}}
              />
              <label
                className={isChecked ? 'checked' : null}
                style={{minWidth: 0, flex: 1, marginRight: 8}}
                htmlFor={id}
              >
                {newTitle}
              </label>
              <p style={{margin: 0, fontWeight: 500}}>{priority}</p>
              <p style={{margin: 0, fontWeight: 500}}>{status}</p>
            </div>
          )}
          {mode === 'edit' ? (
            <button
              type="button"
              className="btn"
              style={{width: 36, minWidth: 36}}
              onClick={this.onEdit}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              style={{width: 36, minWidth: 36}}
              onClick={this.onSave}
            >
              Save
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label="Favourite"
          onClick={this.toggleFavourite}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: 8,
          }}
        >
          {isFavourite ? (
            <svg
              width="22"
              height="22"
              fill="#FFD600"
              stroke="#FFD600"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#FFD600"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          aria-label="Delete"
          onClick={this.onDelete}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#e53935',
            padding: 0,
          }}
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#e53935"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </li>
    )
  }
}

export default TodoItem
