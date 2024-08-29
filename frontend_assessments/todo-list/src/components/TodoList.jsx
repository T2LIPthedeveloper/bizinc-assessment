// import dependencies for TodoList component
import React from 'react';

// create basic TodoList component with ability to add/delete todos
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], // List of todos
      newTodo: '' // A new todo to add to the list
    };
  }

  // add new todo to list
  addTodo = () => {
    // If the newTodo is empty, return early
    if (!this.state.newTodo) {
      return;
    }
    this.setState({
      todos: [...this.state.todos, this.state.newTodo],
      newTodo: ''
    });
  }

  // delete todo from list
  deleteTodo = (index) => {
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== index) // We use the index of the todo to determine which todo to remove
    });
  }

  // render TodoList component
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.newTodo} // Set the value of the input to the newTodo
          onChange={(e) => this.setState({ newTodo: e.target.value })} // Update newTodo when the input changes
        />
        <button onClick={this.addTodo}>Add</button>
        <ul>
          {this.state.todos.map((todo, index) => ( // Map over the todos by index, and display the todo with a delete button
            <li key={index}>
              {todo}
              <button onClick={() => this.deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;