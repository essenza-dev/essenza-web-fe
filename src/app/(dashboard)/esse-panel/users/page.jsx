'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Chip, Card, CardHeader, Divider, TablePagination, Typography, Tooltip, Button } from '@mui/material'

import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import useSnackbar from '@/@core/hooks/useSnackbar'
import ActionMenu from '@/@core/components/option-menu/ActionMenu'
import TableGeneric from '@/@core/components/table/Generic'
import { deleteUser, getUsers } from '@/services/users'
import TableHeaderActions from '@/@core/components/table/HeaderActions'
import { getTruncateText } from '@/utils/string'
import DialogBasic from '@/components/DialogBasic'
import BackdropLoading from '@/components/BackdropLoading'
import { formatDateToCustomStringNative } from '@/utils/helpers'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const columnHelper = createColumnHelper()

const UsersPage = () => {
  const router = useRouter()
  const { success, error, SnackbarComponent } = useSnackbar()

  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ page: 0, page_size: 10 })
  const [globalFilter, setGlobalFilter] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)

    try {
      const res = await getUsers(pagination)

      if (res?.data) {
        setData(res.data)
      }
    } catch (err) {
      error('Failed to load data.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [error])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteId) return

    setLoading(true)

    try {
      const res = await deleteUser(deleteId)

      if (res?.success) {
        success('User successfully deleted!')

        fetchUsers()
      } else {
        error(res?.message || 'Failed to delete user!')
      }
    } catch (err) {
      error(err.message || 'An error occurred during deletion.')
      console.error(err)
    } finally {
      setLoading(false)
      setDeleteId(null)
    }
  }, [deleteId, fetchUsers, success, error])

  const actionsData = useCallback(
    row => [
      {
        text: 'View',
        icon: <i className='ri-eye-line text-blue-500' />,
        menuItemProps: {
          className: 'gap-2',
          onClick: () => router.push(`/esse-panel/users/${row.original.id}`)
        }
      },
      {
        text: 'Edit',
        icon: <i className='ri-edit-box-line text-yellow-500' />,
        menuItemProps: {
          className: 'gap-2',
          onClick: () => router.push(`/esse-panel/users/${row.original.id}/edit`)
        }
      },
      {
        text: 'Delete',
        icon: <i className='ri-delete-bin-line text-red-500' />,
        menuItemProps: {
          className: 'gap-2',

          onClick: () => setDeleteId(row.original.id)
        }
      }
    ],
    [router]
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: info => (
          <Typography variant='body2' fontWeight={600}>
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: info => <Typography variant='body2'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography variant='body2'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: info => <Typography variant='body2'>{info.getValue()?.label || '-'}</Typography>
      }),
      columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: info => <Typography variant='body2'>{formatDateToCustomStringNative(info.getValue())}</Typography>
      }),
      columnHelper.accessor('updated_at', {
        header: 'Upadated At',
        cell: info => <Typography variant='body2'>{formatDateToCustomStringNative(info.getValue())}</Typography>
      }),
      columnHelper.accessor('is_active', {
        header: 'Status',
        cell: info => {
          const isActive = info.getValue()

          return isActive ? (
            <Chip label='Active' size='small' color='success' variant='tonal' sx={{ borderRadius: 1 }} />
          ) : (
            <Chip label='Inactive' size='small' color='error' variant='tonal' sx={{ borderRadius: 1 }} />
          )
        }
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <Box className='flex items-center gap-2'>
            <ActionMenu actions={actionsData(row)} />
          </Box>
        )
      })
    ],
    [actionsData]
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 }
    }
  })

  return (
    <>
      <Card sx={{ boxShadow: 3 }}>
        <CardHeader title='User Management' sx={{ p: 4 }} />
        <Divider />
        <TableHeaderActions
          searchPlaceholder='Search User'
          searchValue={globalFilter ?? ''}
          onSearchChange={setGlobalFilter}
          addLabel='Add User'
          addHref='/esse-panel/users/add'
          addColor='success'
        />
        <TableGeneric table={table} />
        <TablePagination
          component='div'
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
            setPagination(prev => ({ ...prev, page }))
          }}
          onRowsPerPageChange={e => {
            const newSize = Number(e.target.value)

            table.setPageSize(newSize)
            setPagination(prev => ({
              ...prev,
              page_size: newSize,
              page: 0
            }))
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <DialogBasic
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onSubmit={handleConfirmDelete}
        title='Delete User'
        description='Apakah Anda yakin ingin menghapus User ini?'
      />
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default UsersPage
