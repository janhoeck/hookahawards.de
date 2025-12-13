import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

export const ConfigSectionSkeleton = () => {
  return (
    <div className='w-full animate-pulse flex flex-col'>
      <div className='flex flex-row justify-between items-center mb-6'>
        <div className='h-8 w-40 bg-foreground/10 rounded'></div>
        <div className='h-9 w-28 bg-foreground/10 rounded-full'></div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className='h-8 w-40 bg-foreground/10 rounded' />
            </TableHead>
            <TableHead>
              <div className='h-8 w-40 bg-foreground/10 rounded' />
            </TableHead>
            <TableHead>
              <div className='h-8 w-40 bg-foreground/10 rounded' />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(6)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className='h-8 w-40 bg-foreground/10 rounded' />
              </TableCell>
              <TableCell>
                <div className='h-8 w-40 bg-foreground/10 rounded' />
              </TableCell>
              <TableCell>
                <div className='h-8 w-40 bg-foreground/10 rounded' />
              </TableCell>
              <TableCell>
                <div className='h-9 w-28 bg-foreground/10 rounded-full' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
