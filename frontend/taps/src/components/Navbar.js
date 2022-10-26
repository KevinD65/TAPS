import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import tapsLogo from "../static/taps-logo.svg" 
import { Tabs,Tab } from '@mui/material';
import { borderLeft } from '@mui/system';
import {Link} from "react-router-dom"

const Navbar=()=> {
  const [value,setvalue]=useState(0)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#AD6A0C"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link} to={`/userAsset`}
            onClick={()=>{setvalue(0)}}
          >
            <img src={tapsLogo} alt="logo"  />
          </IconButton>
          <Tabs 
          textColor='inherit' 
          value={value}  
          TabIndicatorProps={{
    style: {backgroundColor: "white" }
  }} onChange={(e,value)=>{setvalue(value)}} sx={{ flexGrow: 1}}>
            <Tab label="Home" component={Link} to={`/userAsset`} sx={{color:"white", fontWeight:700, marginRight:5}} > </Tab>
            <Tab label="Community" component={Link} to={`/community`} sx={{color:"white", fontWeight:700,marginRight:5}}></Tab>
            <Tab label="Profile" component={Link} to={`/userProfile`} sx={{color:"white", fontWeight:700,marginRight:5}}></Tab>
            
          </Tabs>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;