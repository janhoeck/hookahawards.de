import { TableCell, TableRow } from '@janhoeck/ui'
import { GripHorizontal } from 'lucide-react'
import { shortenText } from '@/utils/shorten-text'
import { EditCategoryButton } from '@/components/views/config/categories/edit/EditCategoryButton'
import { DeleteButtonWithConfirm } from '@/components/views/config/components/DeleteButtonWithConfirm'
import { Category } from '@janhoeck/domain'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type CategoryTableRowProps = {
  category: Category
  onDelete: () => void
}

export const CategoryTableRow = (props: CategoryTableRowProps) => {
  const { category, onDelete } = props

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <TableRow
      className='group'
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <TableCell
        className='w-[24px] cursor-move'
        {...listeners}
      >
        <GripHorizontal className='text-muted-foreground group-hover:text-foreground transition-colors' />
      </TableCell>
      <TableCell className='w-[250px]'>{category.title}</TableCell>
      <TableCell>{category.type === 'clip' ? 'Clip' : 'Umfrage'}</TableCell>
      <TableCell className='whitespace-normal'>{shortenText(category.description ?? '')}</TableCell>
      <TableCell>
        <div className='flex flex-row space-x-2'>
          <EditCategoryButton category={category} />
          <DeleteButtonWithConfirm
            description={`Bist du sicher, dass du die Kategorie "${category.title}" wirklich löschen?`}
            onConfirm={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
