import { Button, Modal, TextField, Typography, Box } from '@mui/material'
import React from 'react'

export default function Tileset() {
    const handleClose = () => {}

  return (
  <Box>
    <Typography >
      Tileset
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