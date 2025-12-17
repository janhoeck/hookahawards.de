'use client'

import { useDataContext } from '@/components/contexts/data/DataContext'
import { shortenText } from '@/utils/shorten-text'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@janhoeck/ui'

import { DeleteButtonWithConfirm } from '../components/DeleteButtonWithConfirm'
import { deleteSurveyAction } from './actions'
import { EditSurveyButton } from './edit/EditSurveyButton'

export const SurveyTable = () => {
  const { surveys, categories, removeSurvey } = useDataContext()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[250px]'>Title</TableHead>
          <TableHead>Kategorie</TableHead>
          <TableHead>Beschreibung</TableHead>
          <TableHead className='w-[80px]' />
        </TableRow>
      </TableHeader>
      <TableBody>
        {surveys.map((survey) => {
          const category = categories.find((category) => category.id === survey.categoryId)
          return (
            <TableRow key={survey.id}>
              <TableCell className='w-[250px]'>{survey.title}</TableCell>
              <TableCell>{category?.title}</TableCell>
              <TableCell className='whitespace-normal'>{shortenText(survey.description ?? '')}</TableCell>
              <TableCell>
                <div className='flex flex-row space-x-2'>
                  <EditSurveyButton survey={survey} />
                  <DeleteButtonWithConfirm
                    description={`Bist du sicher, dass du die Umfragen Option "${survey.title}" wirklich löschen?`}
                    onConfirm={async () => {
                      await deleteSurveyAction(survey)
                      removeSurvey(survey.id)
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
