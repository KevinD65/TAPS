import React from "react";
import { useState } from "react";
import "./mapEdit.css"


import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



const Pixel = () => {
   
   const [pixelColor, setPixelColor]= useState("#4287f5")
   let pixels=[]
   let changeColor=()=>{
    setPixelColor("#000000")
    console.log("entered")

   }
   

    return(
        <div className="pixel"  onClick={changeColor}  style={{backgroundColor:pixelColor}}></div>
    )
}

export default Pixel