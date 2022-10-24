import { Button, Modal, TextField, Typography, Box } from '@mui/material'
import React from 'react'

export default function Login() {
    const handleClose = () => {}

  return (
  <Box>
    <Typography >
      Username
    </Typography>
    <TextField/>
    <Typography >
      Password
    </Typography>
    <TextField/>
    <Button>Login</Button>
  </Box>
  )
}
