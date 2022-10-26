import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Account/Login"
import UserAsset from "./components/User/UserAsset"
import UserProfile from "./components/User/UserProfile"
import Community from "./components/Community/Community"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div id='screen'>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
      <Navbar/>
      <Routes>
<<<<<<< HEAD
        
        <Route path='/login' element={<Login />}/>
        <Route path='/userAsset' element={<UserAsset />}>
          
        </Route>
=======
        <Route path='/userAsset' element={<UserAsset />}/>
>>>>>>> fa02a26d153841c1e51048eae53ec21989cdafeb
        <Route path='/userProfile' element={<UserProfile />}/>
        <Route path='/community' element={<Community />}/>
      </Routes>
    </div>
    

  );
}

export default App;
