import React from "react";
import { Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography} from "@mui/material";

import "./mapEdit.css"

  
export default function LayersEdit() {
 return (
    <>
    
    <table class="layers-table">
    
    <thead>
        <tr>
            <th>Layers</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Map Width</td>
            <td><Checkbox defaultChecked /></td>
        </tr>
        <tr class="active-row">
        <td>Map Height</td>
            <td><Checkbox  defaultChecked /></td>
            
    
        </tr>
        <tr>
            <td>Map Width</td>
            
            <td><Checkbox  defaultChecked /></td>
            
        </tr>
        
    </tbody>
</table>
    
    </>
    
 );
}