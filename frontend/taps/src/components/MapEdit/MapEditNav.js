import React from "react";
import { Table,TableRow, TableBody, TableCell,TableContainer,TableHead, Typography} from "@mui/material";

import "./mapEdit.css"
function createData(number, item, qty, price) {
 return { number, item, qty, price };
}
  
export default function MapEditNav() {
 return (
    <>
    <Typography sx={{textAlign:"center" ,fontWeight:900}}>Properties</Typography>
    <table class="map-table">
    
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Map Width</td>
            <td>96</td>
        </tr>
        <tr class="active-row">
        <td>Map Height</td>
            <td>48</td>
            
    
        </tr>
        <tr>
            <td>Map Width</td>
            
            <td>16</td>
            
        </tr>
        <tr class="active-row">
            
            <td>Tile Height</td>
            <td>16</td>
        </tr>
        
    </tbody>
</table>
    
    </>
    
 );
}