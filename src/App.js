import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToDo from './ToDo';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddToDo = (e) => {
    e.preventDefault();
    const trimmedNewTodo = e.target.elements.todo.value.trim();
    if (!trimmedNewTodo) return;

    const newToDoItem = {
      id: Date.now().toString(),
      task: trimmedNewTodo,
      completed: false
    };
    setTodos([...todos, newToDoItem]);
    e.target.elements.todo.value = '';
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    // Dropped outside the list
    if (!destination) return;
  
    // Reordering in the same list
    if (source.droppableId === destination.droppableId) {
      const items = reorder(todos, source.index, destination.index);
      setTodos(items);
    } else {
      // Moving between lists
      const item = todos[source.index];
      const newTodos = [...todos];
      newTodos.splice(source.index, 1); // Remove from source
      item.completed = !item.completed; // Toggle completed status
      newTodos.splice(destination.index, 0, item); // Insert at destination
      setTodos(newTodos);
    }
  };
 
  
  
  // Reorder function
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div className="App">
      <div className="todo-list-container">
        <header><h1>My To-Do App</h1></header>
        <form onSubmit={handleAddToDo}>
          <input name="todo" type="text" placeholder="Add a new task" />
          <button type="submit">Add</button>
        </form>
 
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="activeTodos">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Active Tasks</h2>
                {todos.filter(todo => !todo.completed).map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ToDo 
                          task={todo.task} 
                          onDelete={() => deleteTodo(todo.id)} 
                          onToggleComplete={() => toggleComplete(todo.id)}
                          completed={todo.completed}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      
          <Droppable droppableId="completedTodos">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Completed Tasks</h2>
                {todos.filter(todo => todo.completed).map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ToDo 
                          task={todo.task} 
                          onDelete={() => deleteTodo(todo.id)}
                          onToggleComplete={() => toggleComplete(todo.id)}
                          completed={todo.completed}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
       </DragDropContext>
      </div>

</div>
);
}

export default App;

