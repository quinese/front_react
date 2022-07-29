import { ITodo } from './types.js'
import TodoItem from './TodoItem.js'

interface State {
  value: string
  todos: ITodo[]
}

class App extends React.Component<any, State> {
  state: State = {
    value: '',
    todos: []
  }

  dump() {
    let json = JSON.stringify(this.state.todos)
    localStorage.setItem('todos', json)
    console.log(json)
  }

  keyPress(event: KeyboardEvent) {
    let value = this.state.value.trim()
    // console.log(event.key)
    if (event.key === 'Enter' && value !== '') {
      this.state.todos.push({
        content: value,
        finished: false
      })
      this.setState({
        todos: this.state.todos,
        value: ''
      })
      console.log(localStorage.getItem('todos'))
      console.log("todo:",this.state.todos)
      console.log("value:",this.state.value)
      this.dump()
    }
  }

  delItem(index: number) {
    this.state.todos.splice(index, 1)
    this.setState({
      todos: this.state.todos
    })
    this.dump()
  }

  toggleItem(todo: ITodo) {
    todo.finished = !todo.finished
    this.setState({
      todos: this.state.todos
    })
    this.dump()
  }

  componentDidMount() {
    try {
      let _todos = localStorage.getItem('todos')
      if (_todos) {
        let todos: ITodo[] = JSON.parse(_todos)
        this.setState({ todos })
      }
    } catch (error) {
      console.log('invalid cache')
    }
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <div className="title">TS Todo</div>
          <input
            id="input"
            type="text"
            className="input"
            placeholder="What needs to be done?"
            autoComplete="off"
            value={this.state.value}
            onKeyPress={this.keyPress.bind(this)}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </header>
        
        <section id="todos">
          {this.state.todos.map((todo, i) => (
            <TodoItem todo={todo} key={i} onDelete={() => this.delItem(i)} onToggle={() => this.toggleItem(todo)} />
          ))}
        </section>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))


// if (important !== true) {
//   setImportant(true)
// } else {
//   setImportant(false)
// }

// interface StoreContext {
//   // todos: ITodo[]
//   important: string[]
//   finished: string[]
//   // setTodo: (todo: ITodo) => void
//   setFinished: (id: string[]) => void
//   setImportant: (id: string[]) => void

// }

// const item = useMemo(() => {
//   return todos.filter((item)=>{ return item.finished })
// }, [todos])