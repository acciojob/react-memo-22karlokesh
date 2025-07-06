// <p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>


import React, { useState, useMemo } from 'react';

// React.memo inline component
const ReactMemoComponent = React.memo(({ todos }) => {
  console.log('Rendering React.memo Component...');
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>React.memo Example</h2>
      <p>Total Tasks: {todos.length}</p>
    </div>
  );
});

function App() {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Functions
  const addTodo = () => {
    setTodos([...todos, 'New todo']);
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  const handleSubmit = () => {
    if (inputValue.length > 5) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    } else {
      alert('Task must be more than 5 characters.');
    }
  };

  // useMemo: expensive calculation
  const expensiveCount = useMemo(() => {
    console.log('Calculating expensive value...');
    return counter * 2;
  }, [counter]);

  // Another useMemo example: squared counter
  const squaredValue = useMemo(() => {
    console.log('Squaring count...');
    return counter * counter;
  }, [counter]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Management App with React Memo</h1>

      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button onClick={increment}>Increment Counter</button>
        <p>Counter: {counter}</p>
        <p>Expensive Count (double): {expensiveCount}</p>
        <p>Squared Count: {squaredValue}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter task > 5 chars"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit Custom Task</button>
      </div>

      <ReactMemoComponent todos={todos} />
    </div>
  );
}

export default App;
