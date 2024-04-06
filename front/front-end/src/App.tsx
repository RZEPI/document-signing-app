import { useState } from 'react';
import './App.css';
import { UserType } from './models/UserType';
import Header from './components/Header';
import UserPanel from './components/UserPanel'; 

function App() {
  return (
    <div className="App">
      <Header />
      <UserPanel/>

    </div>
  );
}

export default App;
