'use client'

import { useEffect, useMemo, useState } from 'react'
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

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const defaultProjectData = [
  {
    id: 1,
    title: 'Renovasi Gedung Sekolah',
    location: 'Jakarta Barat',
    description: 'Proyek renovasi gedung sekolah dengan fasilitas modern dan ramah lingkungan.',
    image: '/images/projects/project1.jpg',
    gallery: ['/images/projects/project1a.jpg', '/images/projects/project1b.jpg'],
    meta_title: 'Renovasi Gedung Sekolah - Global Nusantara',
    meta_description: 'Renovasi gedung sekolah dengan desain modern dan aman.',
    meta_keywords: 'renovasi sekolah, proyek pendidikan, gedung sekolah',
    slug: 'renovasi-gedung-sekolah',
    is_active: true,
    created_at: '2025-01-12 10:00'
  },
  {
    id: 2,
    title: 'Pembangunan Mall Hijau',
    location: 'BSD City',
    description: 'Mall dengan konsep eco-friendly dan penggunaan energi terbarukan.',
    image: '/images/projects/project2.jpg',
    gallery: ['/images/projects/project2a.jpg', '/images/projects/project2b.jpg'],
    meta_title: 'Pembangunan Mall Hijau - Global Nusantara',
    meta_description: 'Mall modern dengan konsep ramah lingkungan.',
    meta_keywords: 'mall hijau, proyek komersial, energi terbarukan',
    slug: 'pembangunan-mall-hijau',
    is_active: false,
    created_at: '2025-02-05 14:30'
  },
  {
    id: 3,
    title: 'Apartemen Skyline Residence',
    location: 'Jakarta Selatan',
    description: 'Pembangunan apartemen premium dengan fasilitas lengkap.',
    image: '/images/projects/project3.jpg',
    gallery: ['/images/projects/project3a.jpg'],
    meta_title: 'Apartemen Skyline Residence - Global Nusantara',
    meta_description: 'Apartemen premium di pusat kota dengan fasilitas lengkap.',
    meta_keywords: 'apartemen, skyline, hunian modern',
    slug: 'apartemen-skyline-residence',
    is_active: true,
    created_at: '2025-03-01 09:00'
  }
]

const columnHelper = createColumnHelper()

const ProjectsPage = () => {
  const [data, setData] = useState(defaultProjectData)
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const router = useRouter()

  const toggleActive = id => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, is_active: !item.is_active } : item)))
    setFilteredData(prev => prev.map(item => (item.id === id ? { ...item, is_active: !item.is_active } : item)))
  }

  const deleteProject = id => {
    setData(prev => prev.filter(item => item.id !== id))
    setFilteredData(prev => prev.filter(item => item.id !== id))
  }

  const actionsData = row => [
    {
      text: 'View',
      icon: <i className='ri-eye-line text-blue-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/projects/${row.original.id}`)
      }
    },
    {
      text: 'Edit',
      icon: <i className='ri-edit-box-line text-yellow-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => router.push(`/esse-panel/projects/${row.original.id}/edit`)
      }
    },
    {
      text: 'Delete',
      icon: <i className='ri-delete-bin-line text-red-500' />,
      menuItemProps: {
        className: 'gap-2',
        onClick: () => deleteProject(row.original.id)
      }
    }
  ]

  const columns = useMemo(
    () => [
      columnHelper.accessor('image', {
        header: 'Image',
        cell: info => <img src={info.getValue()} alt='Project' className='w-24 h-12 object-cover rounded' />
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('slug', {
        header: 'Slug',
        cell: info => <Typography className='text-gray-500 text-sm'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('created_at', {
        header: 'Created At',
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
      <CardHeader title='Project Management' className='p-4' />
      <Divider />

      <div className='flex justify-between flex-col sm:flex-row p-4 gap-4'>
        <CustomInputsDebounced
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Project'
        />
        <Link href='/esse-panel/projects/add'>
          <Button variant='contained' color='primary' startIcon={<i className='ri-add-line' />}>
            Add Project
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

export default ProjectsPage
