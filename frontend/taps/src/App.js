import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';




function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/userAsset' element={<UserAsset />}/>
        <Route path='/userProfile' element={<UserProfile />}/>
        <Route path='/community' element={<Community />}/>
      </Routes>
    </div>
    

  );
}

export default App;
