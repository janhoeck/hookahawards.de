'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'

import { mostVotesForCategory } from './utils'
import { H3, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

export const MostVotedSection = () => {
  const { categories, clips, surveys, votes } = useDataContext()

  return (
    <section>
      <H3 className='mb-6'>Meiste Votes</H3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kategorie</TableHead>
            <TableHead>Clip / Umfrage</TableHead>
            <TableHead className='text-center'>Votes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const { items, amount } = mostVotesForCategory(category, category.type === 'clip' ? clips : surveys, votes)

            return (
              <TableRow key={category.id}>
                <TableCell>{category.title}</TableCell>
                <TableCell>
                  <div className='flex flex-col space-y-4'>
                    {items.map((item) => (
                      <span key={item.id}>{item.title}</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className='text-center'>{amount ?? '--'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
