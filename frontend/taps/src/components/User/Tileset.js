import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Waterfall from "../../static/waterfall.svg"
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import {useNavigate} from "react-router-dom"

const Tileset=({tileName})=> {
  console.log(tileName)
  const navigate= useNavigate();
  
  return (
    <Card sx={{ minWidth: 230  ,ml:3, mr:3, }}
    onDoubleClick={()=>{
      navigate('/TileEditor');
    }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={Waterfall}
          alt="map"
        />
        <CardContent>
          
          <Typography gutterBottom variant="h6" component="div">
            <GridViewOutlined></GridViewOutlined>
            
          {tileName}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Tileset;