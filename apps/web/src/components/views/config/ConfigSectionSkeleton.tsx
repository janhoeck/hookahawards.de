import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'
import React from 'react'

export const ConfigSectionSkeleton = () => {
  return (
    <div className='flex w-full animate-pulse flex-col'>
      <div className='mb-6 flex flex-row items-center justify-between'>
        <div className='bg-foreground/10 h-8 w-40 rounded'></div>
        <div className='bg-foreground/10 h-9 w-28 rounded-full'></div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className='bg-foreground/10 h-8 w-40 rounded' />
            </TableHead>
            <TableHead>
              <div className='bg-foreground/10 h-8 w-40 rounded' />
            </TableHead>
            <TableHead>
              <div className='bg-foreground/10 h-8 w-40 rounded' />
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
                <div className='bg-foreground/10 h-9 w-28 rounded-full' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
