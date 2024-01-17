import React from 'react';
import './App.css';
import News from './News';

function App() {
  return (
    <>
      <div className='mainNews'>
        <h2 className='News'>News:</h2>
        <News />
      </div>
    </>
  );
}

export default App;
