'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Components
import Link from '@/components/Link'
import ActionMenu from '@/@core/components/option-menu/ActionMenu'
import TableGeneric from '@/@core/components/table/Generic'
import CustomInputsDebounced from '@/@core/components/custom-inputs/Debounced'

// Fuzzy filter untuk search
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Dummy data brochures
const defaultBrochures = [
  {
    id: 1,
    title: 'Katalog Produk Global 2025',
    file_url: '/files/brochures/global-2025.pdf',
    description: 'Katalog lengkap produk Global Nusantara tahun 2025.',
    created_at: '2025-01-01 09:00'
  },
  {
    id: 2,
    title: 'Panduan Produk Keramik',
    file_url: '/files/brochures/panduan-keramik.pdf',
    description: 'Panduan lengkap pemilihan dan pemasangan keramik.',
    created_at: '2025-02-10 10:00'
  }
]

const columnHelper = createColumnHelper()

const BrochurePage = () => {
  const [data, setData] = useState(defaultBrochures)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()

  const deleteBrochure = id => {
    setData(prev => prev.filter(item => item.id !== id))
    setFilteredData(prev => prev.filter(item => item.id !== id))
  }

  const actionsData = row => [
    {
      text: 'View',
      icon: <i className='ri-eye-line text-blue-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/brochures/${row.original.id}`)
      }
    },
    {
      text: 'Edit',
      icon: <i className='ri-edit-box-line text-yellow-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/brochures/${row.original.id}/edit`)
      }
    },
    {
      text: 'Delete',
      icon: <i className='ri-delete-bin-line text-red-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => deleteBrochure(row.original.id)
      }
    }
  ]

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: info => <Typography className='line-clamp-2 max-w-[300px]'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('file_url', {
        header: 'File',
        cell: info => (
          <a href={info.getValue()} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
            View PDF
          </a>
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: info => <Typography>{new Date(info.getValue()).toLocaleString()}</Typography>
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <ActionMenu actions={actionsData(row)} />
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
      <CardHeader title='Brochure Management' className='p-4' />
      <Divider />

      <div className='flex justify-between flex-col sm:flex-row p-4 gap-4'>
        <CustomInputsDebounced
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Brochure'
        />
        <Link href='/esse-panel/brochures/add'>
          <Button variant='contained' color='primary' startIcon={<i className='ri-add-line' />}>
            Add Brochure
          </Button>
        </Link>
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

export default BrochurePage
