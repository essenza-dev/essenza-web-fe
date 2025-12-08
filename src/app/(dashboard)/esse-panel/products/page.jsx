'use client'

import { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
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

import DialogBasic from '@/components/DialogBasic'
import BackdropLoading from '@/components/BackdropLoading'

// Fuzzy filter untuk search
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

// Dummy data produk
const defaultProductData = [
  {
    id: 1,
    name: 'Keramik Lantai Motif Kayu',
    lang: 'id',
    model: 'KMK-001',
    size: '60x60',
    description: 'Keramik lantai dengan motif kayu alami.',
    type: 'lantai',
    image: '/images/products/keramik1.jpg',
    gallery: ['/images/products/keramik1a.jpg', '/images/products/keramik1b.jpg'],
    brochure_id: 2,
    meta_title: 'Keramik Lantai Motif Kayu - Global',
    meta_description: 'Keramik lantai kayu terbaik untuk rumah Anda.',
    meta_keywords: 'keramik lantai, motif kayu, global',
    slug: 'keramik-lantai-motif-kayu',
    is_active: true,
    created_at: '2025-01-01 10:00',
    updated_at: '2025-01-02 12:00'
  },
  {
    id: 2,
    name: 'Keramik Dinding Putih Glossy',
    lang: 'id',
    model: 'KDP-002',
    size: '30x60',
    description: 'Keramik dinding dengan permukaan mengkilap.',
    type: 'dinding',
    image: '/images/products/keramik2.jpg',
    gallery: ['/images/products/keramik2a.jpg'],
    brochure_id: 1,
    meta_title: 'Keramik Dinding Putih - Global',
    meta_description: 'Keramik dinding putih glossy untuk tampilan bersih.',
    meta_keywords: 'keramik dinding, putih, glossy',
    slug: 'keramik-dinding-putih-glossy',
    is_active: false,
    created_at: '2025-01-05 09:00',
    updated_at: '2025-01-06 11:00'
  }
]

const columnHelper = createColumnHelper()

const ProductPage = () => {
  const [data, setData] = useState(defaultProductData)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()

  const actionsData = row => [
    {
      text: 'View',
      icon: <i className='ri-eye-line text-blue-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/products/${row.original.id}`)
      }
    },
    {
      text: 'Edit',
      icon: <i className='ri-edit-box-line text-yellow-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/products/${row.original.id}/edit`)
      }
    },
    {
      text: 'Delete',
      icon: <i className='ri-delete-bin-line text-red-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => deleteProduct(row.original.id)
      }
    }
  ]

  const columns = useMemo(
    () => [
      columnHelper.accessor('image', {
        header: 'Image',
        cell: info => <img src={info.getValue()} alt='Product' className='w-24 h-12 object-cover rounded' />
      }),
      columnHelper.accessor('name', {
        header: 'Product Name',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('model', {
        header: 'Model',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('size', {
        header: 'Size',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: info => (
          <Typography className='capitalize'>{info.getValue() === 'lantai' ? 'Lantai' : 'Dinding'}</Typography>
        )
      }),
      columnHelper.accessor('is_active', {
        header: 'Active',
        cell: info => <Switch checked={info.getValue()} onChange={() => toggleActive(info.row.original.id)} />
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

  const toggleActive = id => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, is_active: !item.is_active } : item)))
    setFilteredData(prev => prev.map(item => (item.id === id ? { ...item, is_active: !item.is_active } : item)))
  }

  const deleteProduct = id => {
    setData(prev => prev.filter(item => item.id !== id))
    setFilteredData(prev => prev.filter(item => item.id !== id))
  }

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
      <CardHeader title='Product Management' className='p-4' />
      <Divider />

      <div className='flex justify-between flex-col sm:flex-row p-4 gap-4'>
        <CustomInputsDebounced
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Product'
        />
        <Link href='/esse-panel/products/add'>
          <Button variant='contained' color='primary' startIcon={<i className='ri-add-line' />}>
            Add Product
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

export default ProductPage
