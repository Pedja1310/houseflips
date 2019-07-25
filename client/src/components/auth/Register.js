import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import { TextField } from '@material-ui/core';

const Register = props => {
  return (
    <ThemeProvider>
      <TextField />
    </ThemeProvider>
  )
}

Register.propTypes = {

}

export default Register
