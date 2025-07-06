// <p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>


import React, { useState, useMemo } from 'react';

const ReactMemoComponent = React.memo(({ skills }) => {
  console.log('Rendering React.memo Component...');
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>React.memo Example</h2>
      <ul data-cy="skill-list">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
});

function App() {
  const [todos, setTodos] = useState([]);
  const [skills, setSkills] = useState([]);
  const [counter, setCounter] = useState(0);
  const [skillInput, setSkillInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, 'New todo']);
  };

  const addSkill = () => {
    if (skillInput.length > 5) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    } else {
      alert('Skill must be more than 5 characters.');
    }
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  const expensiveCount = useMemo(() => {
    console.log('Calculating expensive value...');
    return counter * 2;
  }, [counter]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Management App with React Memo</h1>

      {/* Use Memo testing */}
      <div style={{ marginTop: '20px' }}>
        <button data-cy="add-todo" onClick={addTodo}>Add todo</button>
        <ul data-cy="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={increment}>Increment Counter</button>
        <p>Counter: {counter}</p>
        <p>Expensive Count (double): {expensiveCount}</p>
      </div>

      {/* React Memo testing */}
      <div style={{ marginTop: '20px' }}>
        <input
          data-cy="skill-input"
          type="text"
          placeholder="Enter skill > 5 chars"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button data-cy="add-skill" onClick={addSkill}>Add skill</button>
      </div>

      <ReactMemoComponent skills={skills} />
    </div>
  );
}

export default App;
