'use client'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const CustomTextField = ({
  name,
  label,
  placeholder,
  size = 12,
  disabled = false,
  multiline = false,
  rows = 1,
  value = '',
  required = false,
  onChange,
  InputProps,
  type = 'text',
  select = false,
  children
}) => {
  return (
    <Grid item xs={12} sm={size} key={name}>
      <TextField
        size='small'
        disabled={disabled}
        fullWidth
        multiline={multiline}
        minRows={rows}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        InputProps={InputProps}
        type={type}
        select={select}
      >
        {children}
      </TextField>
    </Grid>
  )
}

export default CustomTextField
