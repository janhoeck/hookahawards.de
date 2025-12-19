'use client'

import { useStatistics } from '@/lib/hooks'
import { H3, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

export const MostVotedSection = () => {
  const { data } = useStatistics()

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
          {data.mostVotes.map((item) => {
            return (
              <TableRow key={item.categoryId}>
                <TableCell>{item.categoryTitle}</TableCell>
                <TableCell>{item.itemTitle}</TableCell>
                <TableCell className='text-center'>{item.voteCount}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
