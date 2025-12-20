'use client'

import { useCategories, useMutateCategory } from '@/lib/hooks'
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

import { CategoryTableRow } from './CategoryTableRow'
import { updateCategoriesPositionAction } from './actions'

export const CategoryTable = () => {
  const { data: categories } = useCategories()
  const { deleteMutation, updateInCache } = useMutateCategory()
  const deleteCategory = deleteMutation.mutate

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = categories.findIndex((category) => category.id === active.id)
    const newIndex = categories.findIndex((category) => category.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const start = Math.min(oldIndex, newIndex)
    const end = Math.max(oldIndex, newIndex)

    const reorderedCategories = arrayMove(categories, oldIndex, newIndex)

    for (let i = start; i <= end; i++) {
      const category = reorderedCategories[i]
      if (category && category.position !== i) {
        updateInCache({ ...category, position: i })
      }
    }

    const updatedCategories = reorderedCategories.slice(start, end + 1).map((category, index) => ({
      id: category.id,
      position: start + index,
    }))

    await updateCategoriesPositionAction(updatedCategories)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={categories}
        strategy={verticalListSortingStrategy}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[24px]' />
              <TableHead className='w-[250px]'>Title</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Beschreibung</TableHead>
              <TableHead className='w-[80px]' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <CategoryTableRow
                key={category.id}
                category={category}
                onDelete={() => {
                  deleteCategory(category.id)
                }}
              />
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  )
}
