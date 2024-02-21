import React, { useState } from 'react';

function ToDo({ task, onDelete, onToggleComplete, completed }) {
    return (
      <div className="todo-item" style={{ textDecoration: completed ? 'line-through' : 'none', color: completed ? 'grey' : 'inherit' }}>
        <input type="checkbox" checked={completed} onChange={onToggleComplete} />
        {task}
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  }

export default ToDo;