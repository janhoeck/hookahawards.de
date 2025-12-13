'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'
import { FaRegTrashAlt } from 'react-icons/fa'

import { deleteCategoryAction } from './actions'
import { EditCategoryButton } from './edit/EditCategoryButton'

export const CategoryTable = () => {
  const { categories, removeCategory } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead>Typ</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.title}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>{category.type === 'clip' ? 'Clip' : 'Umfrage'}</TableCell>
            <TableCell>
              <div className='flex flex-row space-x-2'>
                <EditCategoryButton category={category} />
                <Button
                  variant='outline'
                  size='icon'
                  onClick={async () => {
                    await deleteCategoryAction(category)
                    removeCategory(category.id)
                  }}
                >
                  <FaRegTrashAlt />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
