'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'

import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

import Link from '@/components/Link'
import CustomInputsDebounced from '@/@core/components/custom-inputs/Debounced'
import ActionMenu from '@/@core/components/option-menu/ActionMenu'
import TableGeneric from '@/@core/components/table/Generic'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const defaultData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@mail.com',
    phone: '+62 812 3456 7890',
    subject: 'Permintaan Brosur',
    message: 'Halo, saya ingin meminta brosur produk terbaru.',
    is_read: false,
    created_at: '2025-01-03 14:30'
  },
  {
    id: 2,
    name: 'Sarah Tan',
    email: 'sarah.tan@mail.com',
    phone: '+62 811 2233 4455',
    subject: 'Kerjasama Distribusi',
    message: 'Apakah perusahaan Anda membuka peluang kerja sama distribusi?',
    is_read: true,
    created_at: '2025-01-07 09:20'
  },
  {
    id: 3,
    name: 'Rudi Pratama',
    email: 'rudi@mail.com',
    phone: '+62 812 9876 5432',
    subject: 'Info Produk Baru',
    message: 'Saya tertarik dengan produk terbaru Anda, mohon kirim detailnya.',
    is_read: false,
    created_at: '2025-02-01 11:00'
  }
]

const columnHelper = createColumnHelper()

const ContactMessagesPage = () => {
  const [data, setData] = useState(defaultData)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()

  const toggleReadStatus = id => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, is_read: !item.is_read } : item)))
    setFilteredData(prev => prev.map(item => (item.id === id ? { ...item, is_read: !item.is_read } : item)))
  }

  const deleteMessage = id => {
    setData(prev => prev.filter(item => item.id !== id))
    setFilteredData(prev => prev.filter(item => item.id !== id))
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('subject', {
        header: 'Subject',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('is_read', {
        header: 'Read',
        cell: info => <Switch checked={info.getValue()} onChange={() => toggleReadStatus(info.row.original.id)} />
      }),
      columnHelper.accessor('created_at', {
        header: 'Date',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Button
              size='small'
              variant='outlined'
              color='primary'
              onClick={() => router.push(`/esse-panel/contact-messages/${row.original.id}`)}
            >
              View
            </Button>
            <Button size='small' variant='outlined' color='error' onClick={() => deleteMessage(row.original.id)}>
              Delete
            </Button>
          </div>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card>
      <CardHeader title='Contact Messages' className='p-4' />
      <Divider />
      <div className='flex justify-between flex-col sm:flex-row p-4 gap-4'>
        <CustomInputsDebounced
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Message'
        />
      </div>
      <TableGeneric table={table} />

      <TablePagination
        component='div'
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize || 10}
        page={table.getState().pagination.pageIndex || 0}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  )
}

export default ContactMessagesPage
