import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Waterfall from "../../static/waterfall.svg"
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const Map=(props)=> {
  console.log(props.mapData)
  return (
    <Card sx={{ minWidth: 230  ,ml:3, mr:3, mt:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={Waterfall}
          alt="map"
        />
        <CardContent>
          
          <Typography gutterBottom variant="h6" component="div">
            <MapOutlinedIcon></MapOutlinedIcon>
            
          Dummy Map
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Map;