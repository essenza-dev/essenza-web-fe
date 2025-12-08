'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@/@core/components/custom-inputs/TextField'

import { getUserById, updateUser, createUser, getUserRoles } from '@/services/users'

import FormActions from '@/components/FormActions'
import useSnackbar from '@/@core/hooks/useSnackbar'

import BackdropLoading from '@/components/BackdropLoading'
import { handleApiResponse } from '@/utils/handleApiResponse'

const defaultData = {
  username: '',
  name: '',
  email: '',
  password: '',
  role: '',
  is_active: true
}

const UserForm = ({ id }) => {
  const router = useRouter()
  const isEdit = !!id

  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(false)
  const [userRoles, setUserRoles] = useState([])
  const [rePassword, setRePassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  const { success, error, SnackbarComponent } = useSnackbar()

  const passwordMatchError = useMemo(() => {
    return data.password && rePassword && data.password !== rePassword
  }, [data.password, rePassword])

  const fetchUser = useCallback(
    async id => {
      setLoading(true)

      try {
        const res = await getUserById(id)
        const userData = { ...res.data, role: res?.data?.role?.name, password: '' }

        setData(userData)
      } catch {
        error('Failed to load User details.')
      } finally {
        setLoading(false)
      }
    },
    [error]
  )

  const fetchUserRoles = useCallback(async () => {
    try {
      const res = await getUserRoles()

      if (res?.data) setUserRoles(res.data)

      return res?.data
    } catch {
      error('Failed to load User roles.')

      return []
    }
  }, [error])

  useEffect(() => {
    const loadData = async () => {
      const roles = await fetchUserRoles()

      if (id) {
        setLoading(true)
        await fetchUser(id)
      } else {
        setData(defaultData)
      }

      setRePassword('')
      setLoading(false)
    }

    loadData()
  }, [id, fetchUser, fetchUserRoles])

  const handleChange = useCallback(e => {
    const { name, value } = e.target
    console.log('name', name, value)
    setData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleRePasswordChange = useCallback(e => {
    setRePassword(e.target.value)
  }, [])

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const handleSwitchChange = e => {
    setData(prev => ({ ...prev, is_active: e.target.checked }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (!isEdit && data.password !== rePassword) {
      error('Password and Re-enter Password must match!')
      setLoading(false)

      return
    }

    const dataToSend =
      isEdit && !data.password ? Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'password')) : data

    await handleApiResponse(() => (id ? updateUser(id, dataToSend) : createUser(dataToSend)), {
      success: msg => success(msg),
      error: msg => error(msg),
      onSuccess: () =>
        setTimeout(() => {
          router.push('/esse-panel/users')
        }, 2000),
      onError: () => {
        setLoading(false)
      }
    })
  }

  const fieldPassword = useMemo(() => [
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Password',
      size: 6,
      required: true,
      type: 'password',
      show: showPassword
    },
    {
      name: 'rePassword',
      label: 'Re-enter Password',
      placeholder: 'Confirm Password',
      size: 6,
      required: true,
      type: 'password',
      show: showRePassword
    }
  ])

  const fields = useMemo(() => {
    const commonFields = [
      { name: 'name', label: 'Full Name', placeholder: 'Full Name', size: 6, required: true },
      { name: 'email', label: 'Email', placeholder: 'user@email.com', size: 6, required: true },
      { name: 'username', label: 'Username', placeholder: 'Username', size: 6, required: true, disabled: isEdit }
    ]

    if (isEdit) {
      return commonFields
        .map(field => {
          const disabled = field.name !== 'name' && field.name !== 'email'

          if (field.name === 'password' || field.name === 'rePassword') return null

          if (field.name === 'username') {
            return { ...field, disabled: true }
          }

          return {
            ...field,
            disabled: disabled,
            required: field.name === 'name' || field.name === 'email'
          }
        })
        .filter(Boolean)
    } else {
      return commonFields
    }
  }, [isEdit])

  const renderField = field => {
    if (field.name === 'password' && !isEdit) {
      return (
        <CustomTextField
          key={field.name}
          {...field}
          type={showPassword ? 'text' : 'password'}
          value={data.password || ''}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleTogglePasswordVisibility}>
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
      )
    }

    if (field.name === 'rePassword' && !isEdit) {
      return (
        <CustomTextField
          key={field.name}
          label='Re-enter Password'
          placeholder='Confirm Password'
          size={6}
          type={showRePassword ? 'text' : 'password'}
          value={rePassword}
          onChange={handleRePasswordChange}
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowRePassword(prev => !prev)}>
                  <i
                    className={
                      showRePassword ? 'ri-eye-off-line text-md !text-gray-400' : 'ri-eye-line text-md !text-gray-400'
                    }
                  />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={passwordMatchError}
          helperText={passwordMatchError ? 'Passwords do not match.' : field.helperText}
        />
      )
    }

    return (
      <CustomTextField
        key={field.name}
        {...field}
        type={field.type || 'text'}
        value={data[field.name] || ''}
        onChange={handleChange}
        fullWidth
      />
    )
  }

  return (
    <>
      <Card className='shadow'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <CardHeader title={isEdit ? 'Edit User' : 'Add User'} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              {fields.map(field => renderField(field))}
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Switch checked={data.is_active} onChange={handleSwitchChange} />}
                  label={data?.is_active ? 'Active' : 'Inactive'}
                />
              </Grid>
              <Grid item sm={12}>
                <Divider />
              </Grid>
              {fieldPassword.map(field => renderField(field))}
              <Grid item sm={12}>
                <Divider />
              </Grid>
              <CustomTextField
                label='Role'
                name='role'
                placeholder='Select user role'
                value={data.role || ''}
                onChange={handleChange}
                select
                fullWidth
                size={6}
                required
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {userRoles.map(option => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.label || option.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </CardContent>
          <Divider />
          <FormActions onCancel={() => router.push('/esse-panel/users')} isEdit={isEdit} />
        </form>
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default UserForm
