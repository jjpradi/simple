import {Component} from 'react'

import './index.css'
import TodoItem from '../TodoItem'

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
  state = {todoList: initialTodosList, searchInput: ''}

  componentDidMount() {
    this.getProduct()
  }

  getProduct = async () => {
    const response = await fetch(
      'https://todoapplication-j07a.onrender.com/todos',
    )

    const data = await response.json()
    console.log(data)
  }

  onSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  addTodo = async () => {
    const {searchInput, todoList} = this.state

    const options = {
      method: 'POST',

      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({
        todo: searchInput,
        priority: 'HIGH',
        status: 'IN PROGRESS',
        id: 39,
      }),
    }

    const res = await fetch(
      'https://todoapplication-j07a.onrender.com/todos',
      options,
    )
    if (res.ok == false) {
      console.log(res.errorMsg)
    }
    const countOfList = todoList.length

    const t = searchInput.slice(searchInput.length - 1)

    console.log(t)

    if (parseInt(t) == t) {
      console.log('space')

      for (let y = 0; y < t; y++) {
        const newTodo = {
          id: countOfList + 1,
          title: searchInput,
        }

        this.setState(prevState => ({
          todoList: [...prevState.todoList, newTodo],
        }))
      }
    } else {
      const newTodo = {
        id: countOfList + 1,
        title: searchInput,
      }

      this.setState(prevState => ({
        todoList: [...prevState.todoList, newTodo],
      }))
    }
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

  render() {
    const {searchInput} = this.state

    const {todoList} = this.state
    return (
      <div className="bg">
        <div className="card">
          <h1>simple Todos</h1>

          <div>
            <input value={searchInput} onChange={this.onSearch} type="text" />

            <button onClick={this.addTodo}>Add</button>
          </div>

          <ul className="">
            {todoList.map(e => (
              <TodoItem
                item={e}
                key={e.id}
                deleteTodo={this.deleteTodo}
                key={e.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default SimpleTodos
