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
    <div>
      <Navbar/>
      <Routes>
        
        <Route path='/login' element={<Login />}/>
        <Route path='/userAsset' element={<UserAsset />}>
          
        </Route>
        <Route path='/userProfile' element={<UserProfile />}/>
        <Route path='/community' element={<Community />}/>
        
      </Routes>
    </div>
    

  );
}

export default App;
