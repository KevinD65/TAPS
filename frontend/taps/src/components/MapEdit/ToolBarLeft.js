import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MapEditNav from './MapEditNav';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';


const drawerWidth = 220;
const Sidemenu = () => {
  const [anchor,setAnchor]=useState(null)
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }
    return (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
      >
        
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
          <Box textAlign='center'>
            {/* Button for the  add menu */}
            <Button aria-label ="import-button"variant='contained' sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#009879" }} onClick={openPopover}>
                <Typography variant="h6" component="h2">Import</Typography>
                
            </Button>
            
            <Menu
                id="basic-menu"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={()=>{setAnchor(null)}}
                PaperProps={{  
                  style: {  
                    width: 200,  
                  }}}
                MenuListProps={{
                  'aria-labelledby': 'import-button',
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
              >
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Open Map project</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; New Map</MenuItem>
                
              </Menu>
              <Button variant='contained' sx={{marginTop:2, marginBottom:2, pr:5.5, pl:5.5, backgroundColor:"#009879" }} onClick={openPopover}>
                <Typography variant="h6" component="h2">Save</Typography>
                
            </Button>
              <Menu
                id="basic-menu"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={()=>{setAnchor(null)}}
                PaperProps={{  
                  style: {  
                    width: 200,  
                  }}}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
              >
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Save As</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save</MenuItem>
                
              </Menu>
      
              {/* Menu for adding notes and tilesets */}
              
            </Box>
    <Divider />
         {/* List of sidebar components */}
         <MapEditNav/>
        <Divider />
    </List>
    
    
    
  </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu


