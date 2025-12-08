'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const defaultMenus = [{ id: 1, name: 'Main Menu', position: 'header', created_at: new Date() }]

const defaultMenuItems = [{ id: 1, menu_id: 1, lang: 'en', label: 'Home', link: '/', parent_id: null, order_no: 1 }]

const positions = ['header', 'footer', 'sidebar']

const MenuPage = () => {
  const [menus, setMenus] = useState(defaultMenus)
  const [menuItems, setMenuItems] = useState(defaultMenuItems)

  const handleAddMenu = () => {
    const newMenu = {
      id: menus.length + 1,
      name: '',
      position: 'header',
      created_at: new Date()
    }

    setMenus([...menus, newMenu])
  }

  const handleRemoveMenu = id => {
    setMenus(menus.filter(m => m.id !== id))
    setMenuItems(menuItems.filter(mi => mi.menu_id !== id))
  }

  const handleMenuChange = (id, field, value) => {
    setMenus(menus.map(m => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const handleAddMenuItem = menu_id => {
    const newItem = {
      id: menuItems.length + 1,
      menu_id,
      lang: 'en',
      label: '',
      link: '',
      parent_id: null,
      order_no: menuItems.filter(mi => mi.menu_id === menu_id).length + 1,
      created_at: new Date()
    }

    setMenuItems([...menuItems, newItem])
  }

  const handleRemoveMenuItem = id => {
    setMenuItems(menuItems.filter(mi => mi.id !== id))
  }

  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(menuItems.map(mi => (mi.id === id ? { ...mi, [field]: value } : mi)))
  }

  const handleSubmit = () => {
    alert('Menus saved successfully!')
  }

  return (
    <Card>
      <CardHeader title='Menu Settings' />
      <CardContent>
        <Grid container spacing={3} className='mb-5'>
          {menus.map(menu => (
            <Box key={menu.id} className='mb-6 w-full border rounded p-4'>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={4}>
                  <TextField
                    label='Menu Name'
                    size='small'
                    fullWidth
                    value={menu.name}
                    onChange={e => handleMenuChange(menu.id, 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth size='small'>
                    <InputLabel>Position</InputLabel>
                    <Select
                      value={menu.position}
                      label='Position'
                      onChange={e => handleMenuChange(menu.id, 'position', e.target.value)}
                    >
                      {positions.map(pos => (
                        <MenuItem key={pos} value={pos}>
                          {pos.charAt(0).toUpperCase() + pos.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <IconButton color='error' onClick={() => handleRemoveMenu(menu.id)}>
                    <i className='ri-delete-bin-line text-red-500 text-lg' />
                  </IconButton>
                </Grid>
              </Grid>

              {/* Menu Items */}
              <Box className='mt-4'>
                {menuItems
                  .filter(mi => mi.menu_id === menu.id)
                  .sort((a, b) => a.order_no - b.order_no)
                  .map(mi => (
                    <Grid container spacing={2} alignItems='center' key={mi.id} className='mb-2'>
                      <Grid item xs={3}>
                        <TextField
                          label='Label'
                          size='small'
                          fullWidth
                          value={mi.label}
                          onChange={e => handleMenuItemChange(mi.id, 'label', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          label='Link'
                          size='small'
                          fullWidth
                          value={mi.link}
                          onChange={e => handleMenuItemChange(mi.id, 'link', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label='Lang'
                          size='small'
                          fullWidth
                          value={mi.lang}
                          onChange={e => handleMenuItemChange(mi.id, 'lang', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label='Parent ID'
                          size='small'
                          type='number'
                          fullWidth
                          value={mi.parent_id ?? ''}
                          onChange={e =>
                            handleMenuItemChange(mi.id, 'parent_id', e.target.value ? parseInt(e.target.value) : null)
                          }
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          label='Order'
                          size='small'
                          type='number'
                          value={mi.order_no}
                          onChange={e => handleMenuItemChange(mi.id, 'order_no', parseInt(e.target.value))}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton color='error' onClick={() => handleRemoveMenuItem(mi.id)}>
                          <i className='ri-delete-bin-line text-red-500 text-lg' />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}

                <Button
                  startIcon={<i className='ri-add-circle-line text-blue-500 text-lg' />}
                  variant='outlined'
                  color='primary'
                  onClick={() => handleAddMenuItem(menu.id)}
                  className='mt-2'
                >
                  Add Menu Item
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>

        <Box className='mb-5'>
          <Button
            startIcon={<i className='ri-add-circle-line text-blue-500 text-lg' />}
            variant='outlined'
            color='primary'
            onClick={handleAddMenu}
          >
            Add Menu
          </Button>
        </Box>

        <Divider className='mb-5' />

        <Box className='text-right'>
          <Button className='w-1/4' variant='contained' color='success' onClick={handleSubmit}>
            Save All
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MenuPage
