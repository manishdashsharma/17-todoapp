import React, {useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function TodoList() {
    const [todos , setTodos] =useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
          return;
        }
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
      };
      
    const updateTodo = (todoId , newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
          }
          setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr);
    };
    
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
        return todo;
    });
    setTodos(updatedTodos);
    };  

    const handleSearchChange = e => {
        setSearchKeyword(e.target.value);
    };

    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchKeyword.toLowerCase()));

    return (
        <div>
            <h1>What's the Plan for today ?</h1>
            <TodoForm onSubmit = {addTodo}/>
            <div>
                <input type="text" placeholder="Search" value={searchKeyword} className='todo-input' onChange={handleSearchChange} />
                <button className='todo-button'>Search</button>
            </div>
            <Todo todos = {filteredTodos} completeTodo = {completeTodo} removeTodo= {removeTodo} updateTodo={updateTodo}/>    
        </div>
    )
}

export default TodoList
