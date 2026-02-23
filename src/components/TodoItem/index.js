// Write your code here
import './index.css'

import {Component, useState} from 'react'

class TodoItem extends Component {
  state = {
    mode: 'edit',
    newTitle: this.props.item.title,
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

  onInput = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onDelete = () => {
    const {deleteTodo} = this.props

    deleteTodo(this.props.item.id)
  }

  render() {
    const {mode, newTitle, title, isChecked} = this.state
    const {id} = this.props.item

    return (
      <li className="list">
        <div>
          {mode !== 'edit' ? (
            <textarea onChange={this.onText}>{newTitle}</textarea>
          ) : (
            <div>
              <input id="todo" onChange={this.onInput} type="checkbox" />
              <label className={isChecked ? 'checked' : null} htmlFor="todo">
                {newTitle}
              </label>
            </div>
          )}

          {mode === 'edit' ? (
            <button onClick={this.onEdit}>Edit</button>
          ) : (
            <button onClick={this.onSave}>Save</button>
          )}
        </div>
        <button onClick={this.onDelete}>Delete</button>
      </li>
    )
  }
}

export default TodoItem
