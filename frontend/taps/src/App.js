import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Account/Login';

function App() {
  return (
    <div id='screen'>
      <Routes>
        <Route path='/' element={<Login />}/>
        {/*
        <Route path='/userAsset' element={<UserAsset />}/>
        <Route path='/userProfile' element={<UserProfile />}/>
        <Route path='/community' element={<Community />}/>*/}
      </Routes>
    </div>
    

  );
}

export default App;
