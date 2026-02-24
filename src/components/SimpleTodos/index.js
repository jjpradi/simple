import {Component} from 'react'
import Cookies from 'js-cookie'

import {Navigate, Link} from 'react-router-dom'
import './index.css'
import TodoItem from '../TodoItem'
const priorityList = ['HIGH', 'MEDIUM', 'LOW']
const statusList = ['TO DO', 'IN PROGRESS', 'DONE']

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]
// Write your code here
class SimpleTodos extends Component {
  state = {
    todoList: [],
    searchInput: '',
    priority: 'HIGH',
    status: 'IN PROGRESS',
    redirectToLogin: false,
  }

  componentDidMount() {
    this.getProduct()
  }

  getProduct = async () => {
    const url = process.env.REACT_APP_API_URL || 'http://localhost:5000'
    console.log(`fetching from ${url}/todos`)
    const res = await fetch('https://todoapplication-j07a.onrender.com/todos')
    console.log(res)
    const data = await res.json()
    console.log(data)
    this.setState({todoList: data})
  }

  onSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }
  onPriorityChange = value => {
    console.log(value)
    this.setState({priority: value})
  }

  onPriorityFilter = value => {
    const {todoList} = this.state
    const filter = todoList.filter(e => e.priority === value)
    console.log(filter)
    this.setState({todoList: filter})
  }
  onStatusFilter = value => {
    const {todoList} = this.state
    const filter = todoList.filter(e => e.status === value)
    console.log(filter)
    this.setState({todoList: filter})
  }
  onStatusChange = value => {
    console.log(value)
    this.setState({status: value})
  }

  addTodo = async () => {
    const {searchInput, todoList} = this.state

    const options = {
      method: 'POST',

      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        todo: searchInput,
        priority: this.state.priority,
        status: this.state.status,
        id: todoList.length + 1,
        due_date: new Date().toISOString(),
      }),
    }

    const res = await fetch(
      'https://todoapplication-j07a.onrender.com/todos',
      options,
    )
    if (res.ok === false) {
      console.log(res.errorMsg)
    }
    const countOfList = todoList.length

    const t = searchInput.slice(searchInput.length - 1)

    console.log(t)
    const newTodo = {
      id: countOfList + 1,
      todo: searchInput,
      priority: this.state.priority,
      status: this.state.status,
      due_date: new Date().toISOString(),
    }

    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
    }))
  }

  deleteTodo = id => {
    const {todoList} = this.state
    const filter = todoList.filter(e => e.id !== id)
    console.log(filter)

    console.log(id)

    this.setState({
      todoList: filter,
    })
  }
  onLogout = () => {
    Cookies.remove('jwt_token')
    this.setState({redirectToLogin: true})
  }

  render() {
    const {listCardBg} = this.props
    const {redirectToLogin} = this.state
    if (redirectToLogin) {
      return <Navigate to="/login" />
    }
    const {searchInput} = this.state

    const {todoList} = this.state
    return (
      <div className="bg" style={{minHeight: '100vh'}}>
        <div className="add-card  filter-card">
          <div className="add-card">
            <div className="new-todo">
              <input value={searchInput} onChange={this.onSearch} type="text" />
              <select
                onChange={event => this.onPriorityChange(event.target.value)}
              >
                {' '}
                {priorityList.map(p => (
                  <option key={p}>{p}</option>
                ))}{' '}
              </select>
              <select
                onChange={event => this.onStatusChange(event.target.value)}
              >
                {' '}
                {statusList.map(s => (
                  <option key={s}>{s}</option>
                ))}{' '}
              </select>
            </div>
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <div className="filter-card" style={{margin: '15px'}}>
            <h5>Priority:</h5>
            {priorityList.map(p => (
              <button
                className="filter-btn"
                type="button"
                key={p}
                onClick={() => this.onPriorityFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="filter-card" style={{margin: '15px'}}>
            <h5>Status:</h5>
            {statusList.map(s => (
              <button
                className="filter-btn"
                type="button"
                key={s}
                onClick={() => this.onStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            style={{
              margin: '15px',
              padding: '8px 18px',
              background: '#e3f2fd',
              color: '#1976d2',
              border: 'none',
              borderRadius: '24px',
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 6px rgba(25,118,210,0.08)',
            }}
            onClick={this.getProduct}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h5M20 20v-5h-5M5.07 19A9 9 0 0021 12.93M19 5.07A9 9 0 003 11"
              />
            </svg>
            Reset
          </button>
        </div>
        <div
          className="list-card"
          style={{
            backgroundImage:
              listCardBg ||
              "url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(120deg, #e3f2fd 0%, #bbdefb 100%)",
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        >
          <ul
            className="todo-list"
            style={{
              margin: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              padding: 0,
              listStyle: 'none',
            }}
          >
            {todoList.map(e => (
              <TodoItem item={e} key={e.id} deleteTodo={this.deleteTodo} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SimpleTodos
