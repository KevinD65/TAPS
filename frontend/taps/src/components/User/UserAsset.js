import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import Map from "./Map"
import Tileset from "./Tileset"

const drawerWidth = 240;
const dummyData=[{name:"waterfall" ,image:"something.svg", owner:"abcd", type:"map",starred:0},{name:"waterfall 1" ,image:"something.svg", owner:"abcd1", type:"map",starred:1},{name:"mountain" ,image:"something.svg", owner:"abcd2", type:"tiles",starred:0},{name:"soil" ,image:"something.svg", owner:"abcd2", type:"tiles",starred:1}]

export default function UserAsset() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
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
  <Button variant='contained' sx={{marginTop:3, marginBottom:3, pr:4, pl:4, }}>
  <Typography variant="h3" component="h2">
  +
</Typography>
<Typography variant="h6" component="h2">
&nbsp; New
</Typography>
  </Button>
</Box>
<Divider />
         
            {[{name:'All', icon:<InboxIcon/>}, {name:'Maps', icon:<MapOutlinedIcon/>}, {name:'Tiles', icon:<GridViewOutlinedIcon/>}, {name:'Starred', icon:<StarBorderIcon/>}, {name:'Shared with me', icon:<FolderSharedOutlinedIcon/>}].map((text, index) => (
              <ListItem key={text.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                 
                  
                </ListItemButton>
                
              </ListItem>
              
            ))}
             <Divider />
          </List>
          
          
          
        </Box>
      </Drawer>

      
      

      
      
        
      {dummyData.map((data)=>{
                if (data.type=="map"){
                    
                   return<Map mapdata={data.name}/>
                    
                }
        })}
        
        
        {dummyData.map((data)=>{
                if (data.type=="tiles"){
                    
                   return<Tileset mapdata={data.name}/>
                    
                }
        })}
        
        
    
      
    </Box>
  );
}
