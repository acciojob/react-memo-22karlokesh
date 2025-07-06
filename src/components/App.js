// <p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>


import React, { useState, useMemo, useCallback } from 'react';

// Memoized Todo component to prevent unnecessary re-renders
const Todo = React.memo(({ task }) => {
  console.log('Rendering task:', task); // helpful for checking memoization
  return <li>{task}</li>;
});

export default function App() {
  const [todos, setTodos] = useState(['First Task']);
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);

  // Expensive calculation simulated with useMemo
  const expensiveCalculation = useMemo(() => {
    console.log('Running expensive calculation...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += 1;
    }
    return result;
  }, []);

  // Add new default todo
  const handleAddTodo = () => {
    setTodos(prev => [...prev, 'New todo']);
  };

  // Add custom todo if valid
  const handleSubmit = () => {
    if (inputValue.length > 5) {
      setTodos(prev => [...prev, inputValue]);
      setInputValue('');
    } else {
      alert('Task must be more than 5 characters');
    }
  };

  // Increment counter
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  // Memoize the todo list rendering
  const memoizedTodos = useMemo(() => {
    return todos.map((task, index) => <Todo key={index} task={task} />);
  }, [todos]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🗂️ Task Manager</h1>

      {/* Todo Section */}
      <div>
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>{memoizedTodos}</ul>
      </div>

      {/* Input Section */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a custom task"
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Counter Section */}
      <div style={{ marginTop: '20px' }}>
        <h2>🔢 Counter: {count}</h2>
        <button onClick={handleIncrement}>Increment</button>
      </div>

      {/* Expensive Calc Display */}
      <div style={{ marginTop: '20px' }}>
        <h4>🧠 Expensive Calculation Result: {expensiveCalculation}</h4>
      </div>
    </div>
  );
}
