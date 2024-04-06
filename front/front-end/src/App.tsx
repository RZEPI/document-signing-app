import { useState } from 'react';
import './App.css';
import { UserType } from './models/UserType';
import Header from './components/Header';
import UserPanel from './components/UserPanel'; 

function App() {
  const [userType, setUserType] = useState<UserType>(UserType.User_a);
  
  function onUserTypeChange(userType: UserType) {
    setUserType(userType);
  }

  return (
    <div className="App">
      <Header currUserType={userType} onUserTypeChange={onUserTypeChange}/>
      <UserPanel userType={userType}/>

    </div>
  );
}

export default App;
