'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import useSnackbar from '@/@core/hooks/useSnackbar'
import { getUserById, deleteUser, updatePassword } from '@/services/users'
import DetailField from '@/components/DetailField'
import BackdropLoading from '@/components/BackdropLoading'
import DetailActions from '@/components/DetailActions'
import DialogBasic from '@/components/DialogBasic'
import CustomTextField from '@/@core/components/custom-inputs/TextField'
import { handleApiResponse } from '@/utils/handleApiResponse'

const UserDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const { success, error, SnackbarComponent } = useSnackbar()

  const [user, setUser] = useState(null)
  const [data, setData] = useState({ password: '', rePassword: '' })
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [loading, setLoading] = useState(true)

  const passwordsMatch = data.password === data.rePassword

  const passwordsValid = useMemo(() => {
    return data.password.length > 0 && data.rePassword.length > 0 && passwordsMatch
  }, [data.password, data.rePassword, passwordsMatch])

  const resetPasswordState = useCallback(() => {
    setData({ password: '', rePassword: '' })
    setShowPassword(false)
    setShowRePassword(false)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id)

        if (res?.data) {
          setUser(res.data)
        } else {
          setUser(null)
          error('User not found')
          router.push('/esse-panel/users')
        }
      } catch (err) {
        console.error('Failed to fetch User:', err)
        error('Failed to load user: ' + (err.message || 'A server error occurred.'))
        router.push('/esse-panel/users')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchUser()
  }, [id, error, router])

  const handleDelete = useCallback(async () => {
    setLoading(true)

    await handleApiResponse(() => deleteUser(id), {
      success: msg => success(msg || 'Successfully deleted!'),
      error: msg => error(msg || 'Failed to delete user.'),
      onSuccess: () => router.push('/esse-panel/users'),
      onError: () => {
        setLoading(false)
      }
    })
  }, [id, success, error, router])

  const handleChangePassword = useCallback(async () => {
    if (!passwordsValid) {
      error(passwordsMatch ? 'Password cannot be empty.' : 'Passwords do not match.')

      return
    }

    setLoading(true)
    const payload = { new_password: data.password }

    await handleApiResponse(() => updatePassword(id, payload), {
      success: msg => success(msg || 'Password successfully updated!'),
      error: msg => error(msg || 'Failed to update password.'),
      onSuccess: () => {
        setShowChangePassword(false)
        resetPasswordState()
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      }
    })
  }, [id, success, error, data.password, passwordsValid, passwordsMatch, resetPasswordState])

  const handleCloseChangePassword = useCallback(() => {
    setShowChangePassword(false)
    resetPasswordState()
  }, [resetPasswordState])

  const handlePasswordChange = useCallback(e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardHeader title='User Detail' />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Name' value={user?.name} />
            <DetailField label='Username' value={user?.username} />
            <DetailField label='Email' value={user?.email} />
            <DetailField label='Role' value={user?.role?.label} />
            <DetailField
              label={'Status'}
              value={
                user?.is_active ? (
                  <Chip label='Active' size='small' color='success' variant='tonal' sx={{ borderRadius: 1 }} />
                ) : (
                  <Chip label='Inactive' size='small' color='error' variant='tonal' sx={{ borderRadius: 1 }} />
                )
              }
            />
          </Grid>
        </CardContent>
        <Divider />
        <DetailActions
          customButton={
            <Button variant='contained' color='info' className='w-1/4' onClick={() => setShowChangePassword(true)}>
              Change Password
            </Button>
          }
          id={id}
          href='users'
          onConfirm={() => {
            handleDelete()
          }}
        />
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
      <DialogBasic
        open={showChangePassword}
        onClose={handleCloseChangePassword}
        onSubmit={handleChangePassword}
        title='Change Password'
        submitLabel='Update Password'
        submitButtonProps={{
          disabled: !passwordsValid
        }}
      >
        <Grid container spacing={3} pt={3}>
          <CustomTextField
            name='password'
            label='New Password'
            type={showPassword ? 'text' : 'password'}
            value={data.password}
            onChange={handlePasswordChange}
            fullWidth
            required
            size={12}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    <i
                      className={
                        showPassword ? 'ri-eye-off-line  text-md !text-gray-400' : 'ri-eye-line text-md !text-gray-400'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <CustomTextField
            name='rePassword'
            label='Confirm New Password'
            type={showRePassword ? 'text' : 'password'}
            value={data.rePassword}
            onChange={handlePasswordChange}
            fullWidth
            required
            size={12}
            error={!passwordsMatch && data.rePassword.length > 0}
            helperText={!passwordsMatch && data.rePassword.length > 0 ? 'Passwords do not match.' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowRePassword(!showRePassword)}>
                    <i
                      className={
                        showRePassword
                          ? 'ri-eye-off-line  text-md !text-gray-400'
                          : 'ri-eye-line text-md !text-gray-400'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </DialogBasic>
    </Box>
  )
}

export default UserDetailPage
