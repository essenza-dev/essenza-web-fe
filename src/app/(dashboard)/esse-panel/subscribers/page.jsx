'use client'

import { useEffect, useMemo, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
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

import CustomInputsDebounced from '@/@core/components/custom-inputs/Debounced'

import TableGeneric from '@/@core/components/table/Generic'

import { getSubscribes } from '@/services/subscribe'
import { formatDateToCustomStringNative } from '@/utils/helpers'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const columnHelper = createColumnHelper()

const SubscribersPage = () => {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({ page: 0, page_size: 10 })
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('created_at', {
        header: 'Created at',
        cell: info => <Typography>{formatDateToCustomStringNative(info.getValue())}</Typography>
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

  const fetchSubscriber = async () => {
    const res = await getSubscribes(pagination)

    if (res?.data) {
      setData(res.data)
      setFilteredData(res.data)
    }
  }

  useEffect(() => {
    fetchSubscriber()
  }, [])

  useEffect(() => {
    fetchSubscriber()
  }, [pagination])

  return (
    <>
      <Card>
        <CardHeader title='Subscribes List' className='p-4' />
        <Divider />
        <div className='flex justify-between flex-col sm:flex-row p-4 gap-4'>
          <CustomInputsDebounced
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Subscriber'
          />
        </div>
        <TableGeneric table={table} />

        <TablePagination
          component='div'
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize || 10}
          page={table.getState().pagination.pageIndex || 0}
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
    </>
  )
}

export default SubscribersPage
