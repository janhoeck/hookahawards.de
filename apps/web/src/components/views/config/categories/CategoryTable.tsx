'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

import { deleteCategoryAction } from './actions'
import { EditCategoryButton } from './edit/EditCategoryButton'
import { shortenText } from '@/utils/shorten-text'
import { DeleteButtonWithConfirm } from '../components/DeleteButtonWithConfirm'

export const CategoryTable = () => {
  const { categories, removeCategory } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead className='w-[80px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.title}</TableCell>
            <TableCell className='whitespace-normal'>{shortenText(category.description ?? '')}</TableCell>
            <TableCell>{category.type === 'clip' ? 'Clip' : 'Umfrage'}</TableCell>
            <TableCell>
              <div className='flex flex-row space-x-2'>
                <EditCategoryButton category={category} />
                <DeleteButtonWithConfirm
                  description={`Bist du sicher, dass du die Kategorie "${category.title}" wirklich löschen?`}
                  onConfirm={async () => {
                    await deleteCategoryAction(category)
                    removeCategory(category.id)
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
