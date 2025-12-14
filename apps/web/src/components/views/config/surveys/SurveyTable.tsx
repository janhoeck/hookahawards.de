'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from '@janhoeck/ui'

import { deleteSurveyAction } from './actions'
import { EditSurveyButton } from './edit/EditSurveyButton'
import { shortenText } from '@/utils/shorten-text'
import { Trash } from 'lucide-react'

export const SurveyTable = () => {
  const { surveys, categories, removeSurvey } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Beschreibung</TableCell>
          <TableCell>Kategorie</TableCell>
          <TableCell className='w-[80px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {surveys.map((survey) => {
          const category = categories.find((category) => category.id === survey.categoryId)
          return (
            <TableRow key={survey.id}>
              <TableCell>{survey.title}</TableCell>
              <TableCell className='whitespace-normal'>{shortenText(survey.description ?? '')}</TableCell>
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
                    <Trash />
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
