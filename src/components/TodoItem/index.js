// Write your code here
import './index.css'

import {Component, useState} from 'react'

class TodoItem extends Component {
  state = {
    mode: 'edit',
    newTitle: this.props.item.todo,
    title: '',
    isChecked: false,
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
      this.setState(prevState => ({
        isChecked: true,
      }))
    } else {
      this.setState(prevState => ({
        isChecked: false,
      }))
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
    const {mode, newTitle, title, isChecked} = this.state
    const {id, todo, priority, status, due_date} = this.props.item

    return (
      <li className="list">
        <div className="textArea">
          {mode !== 'edit' ? (
            <textarea rows={2} cols={22} onChange={this.onText}>
              {newTitle}
            </textarea>
          ) : (
            <div className="todo-items">
              <input
                placeholder="Enter todo title"
                id={id}
                onChange={this.onInput}
                type="checkbox"
              />
              <label
                className={isChecked ? 'checked' : null}
                style={{width: '15vw'}}
                htmlFor={id}
              >
                {newTitle}
              </label>

              <p>{priority}</p>
              <p>{status}</p>
            </div>
          )}
          {mode === 'edit' ? (
            <button
              className="btn"
              style={{width: '3vw'}}
              onClick={this.onEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn"
              style={{width: '3vw'}}
              onClick={this.onSave}
            >
              Save
            </button>
          )}
        </div>
        <button onClick={this.onDelete}>Delete</button>
      </li>
    )
  }
}

export default TodoItem
