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
          <TableHead className='w-[250px]'>Title</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead className='w-[80px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className='w-[250px]'>{category.title}</TableCell>
            <TableCell>{category.type === 'clip' ? 'Clip' : 'Umfrage'}</TableCell>
            <TableCell className='whitespace-normal'>{shortenText(category.description ?? '')}</TableCell>
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
