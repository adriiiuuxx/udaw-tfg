import { Grid } from '@mui/material'
import {IngredientsTable} from './IngredientsTable'
import React from 'react'
import { IngredientCategoryTable } from './IngredientCategoryTable'

export const Ingredients = () => {
  return (
    <div className='px-2'>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg:8}}>
            <IngredientsTable/>
        </Grid>
        <Grid size={{ xs: 12, lg:4}}>
            <IngredientCategoryTable/>
        </Grid>
      </Grid>
    </div>
  )
}
