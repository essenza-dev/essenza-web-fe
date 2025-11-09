'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
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
import ActionMenu from '@/@core/components/option-menu/ActionMenu'
import TableGeneric from '@/@core/components/table/Generic'
import CustomInputsDebounced from '@/@core/components/custom-inputs/Debounced'

// --- Fuzzy filter for search
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// --- Default dummy data
const defaultPageData = [
  {
    id: 1,
    slug: 'about-us',
    title: 'About Us',
    content: 'Halaman yang menjelaskan tentang sejarah dan visi misi perusahaan.',
    meta_title: 'Tentang Kami - Global Nusantara',
    meta_description: 'Informasi lengkap tentang perusahaan Global Nusantara.',
    meta_keywords: 'tentang kami, profil perusahaan, global nusantara',
    template: 'about',
    is_active: true,
    created_at: '2025-01-12 10:00',
    updated_at: '2025-01-20 12:30'
  },
  {
    id: 2,
    slug: 'contact',
    title: 'Contact',
    content: 'Halaman untuk menghubungi kami dan mendapatkan informasi kontak.',
    meta_title: 'Hubungi Kami - Global Nusantara',
    meta_description: 'Kontak resmi Global Nusantara untuk pertanyaan dan kerja sama.',
    meta_keywords: 'hubungi kami, kontak, alamat, global nusantara',
    template: 'contact',
    is_active: true,
    created_at: '2025-01-15 09:45',
    updated_at: '2025-02-01 14:00'
  },
  {
    id: 3,
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: 'Kebijakan privasi pengguna website ini.',
    meta_title: 'Kebijakan Privasi - Global Nusantara',
    meta_description: 'Kebijakan perlindungan data pribadi pengguna situs kami.',
    meta_keywords: 'privacy, data protection, kebijakan privasi',
    template: 'custom',
    is_active: false,
    created_at: '2025-02-10 08:00',
    updated_at: '2025-02-12 09:00'
  }
]

// --- Column helper
const columnHelper = createColumnHelper()

const PagesManagement = () => {
  const [data, setData] = useState(defaultPageData)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()

  // --- Toggle active/inactive
  const toggleActive = id => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, is_active: !item.is_active } : item)))
    setFilteredData(prev => prev.map(item => (item.id === id ? { ...item, is_active: !item.is_active } : item)))
  }

  // --- Delete page
  const deletePage = id => {
    setData(prev => prev.filter(item => item.id !== id))
    setFilteredData(prev => prev.filter(item => item.id !== id))
  }

  // --- Actions
  const actionsData = row => [
    {
      text: 'View',
      icon: <i className='ri-eye-line text-blue-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/pages/${row.original.id}`)
      }
    },
    {
      text: 'Edit',
      icon: <i className='ri-edit-box-line text-yellow-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/pages/${row.original.id}/edit`)
      }
    },
    {
      text: 'Delete',
      icon: <i className='ri-delete-bin-line text-red-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => deletePage(row.original.id)
      }
    }
  ]

  // --- Columns definition
  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('slug', {
        header: 'Slug',
        cell: info => <Typography className='text-gray-500 text-sm'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('template', {
        header: 'Template',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('is_active', {
        header: 'Active',
        cell: info => (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              info.getValue() ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {info.getValue() ? 'Yes' : 'No'}
          </span>
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Created',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('updated_at', {
        header: 'Updated',
        cell: info => <Typography>{info.getValue()}</Typography>
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

  // --- React Table setup
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
      <CardHeader title='Pages Management' className='p-4' />
      <Divider />

      <div className='flex justify-between flex-col sm:flex-row p-4 gap-4'>
        <CustomInputsDebounced
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Page'
        />
        <Link href='/esse-panel/pages/add'>
          <Button variant='contained' color='primary' startIcon={<i className='ri-add-line' />}>
            Add Page
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

export default PagesManagement
