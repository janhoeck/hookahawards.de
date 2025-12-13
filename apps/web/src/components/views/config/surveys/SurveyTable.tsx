'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from '@janhoeck/ui'
import { FaRegTrashAlt } from 'react-icons/fa'

import { deleteSurveyAction } from './actions'
import { EditSurveyButton } from './edit/EditSurveyButton'

export const SurveyTable = () => {
  const { surveys, categories, removeSurvey } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Beschreibung</TableCell>
          <TableCell>Kategorie</TableCell>
          <TableCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {surveys.map((survey) => {
          const category = categories.find((category) => category.id === survey.categoryId)
          return (
            <TableRow key={survey.id}>
              <TableCell>{survey.title}</TableCell>
              <TableCell>{survey.description}</TableCell>
              <TableCell>{category?.title}</TableCell>
              <TableCell>
                <div className='flex flex-row space-x-2'>
                  <EditSurveyButton survey={survey} />
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={async () => {
                      await deleteSurveyAction(survey)
                      removeSurvey(survey.id)
                    }}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
