import { Button, Modal, TextField, Typography, Box } from '@mui/material'
import React from 'react'

export default function Map() {
    const handleClose = () => {}
// create, update, publish, get, delete
  return (
  <Box>
    <Typography >
      Map
    </Typography>
    <TextField/>
    <Button>Create</Button>
    <Button>Update</Button>
    <Button>Publish</Button>
    <Button>Get</Button>
    <Button>Delete</Button>
    <Button>Comment</Button>
    <Typography >
      Property
    </Typography>
    <TextField/>
    <Typography >
      Value
    </Typography>
    <TextField/>


  </Box>
  )
}