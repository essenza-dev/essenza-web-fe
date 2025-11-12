'use client'
import React, { useCallback, useState } from 'react'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const useSnackbar = () => {
  const [state, setState] = useState({
    open: false,
    message: '',
    severity: 'info'
  })

  const show = useCallback((message, severity = 'info') => {
    setState({ open: true, message, severity })
  }, [])

  const success = useCallback(message => show(message, 'success'), [show])
  const error = useCallback(message => show(message, 'error'), [show])
  const info = useCallback(message => show(message, 'info'), [show])
  const warning = useCallback(message => show(message, 'warning'), [show])

  const close = useCallback(() => {
    setState(prev => ({ ...prev, open: false }))
  }, [])

  const SnackbarComponent = (
    <Snackbar
      open={state.open}
      autoHideDuration={4000}
      onClose={close}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ zIndex: 2000 }}
    >
      <Alert onClose={close} severity={state.severity}>
        {state.message}
      </Alert>
    </Snackbar>
  )

  // 🪄 return helper lengkap
  return { show, success, error, info, warning, SnackbarComponent }
}

export default useSnackbar
