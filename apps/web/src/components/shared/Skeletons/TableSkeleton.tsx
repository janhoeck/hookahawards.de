import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'
import React from 'react'

export const TableSkeleton = () => {
  return (
    <Table className='w-full animate-pulse'>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className='bg-foreground/10 h-8 w-40 rounded' />
          </TableHead>
          <TableHead>
            <div className='bg-foreground/10 h-8 w-40 rounded' />
          </TableHead>
          <TableHead>
            <div className='bg-foreground/10 h-8 w-[80px] rounded' />
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(6)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className='bg-foreground/10 h-8 w-40 rounded' />
            </TableCell>
            <TableCell>
              <div className='bg-foreground/10 h-8 w-40 rounded' />
            </TableCell>
            <TableCell>
              <div className='bg-foreground/10 h-8 w-40 rounded' />
            </TableCell>
            <TableCell>
              <div className='bg-foreground/10 h-9 w-[80px] rounded' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
