import { createSignal, createEffect, For } from 'solid-js'
import { styled } from 'solid-styled-components'
import RecipeCard from '@components/RecipeCard'
import MainLayout from '@layouts/MainLayout'
import api from '@lib/api'
import usePrivateRoute from '../hooks/usePrivateRoute'
import { useCurrentUser } from '@context/CurrentUserContext'
import type { Component } from "solid-js"

interface Recipe {
  id: string
  name: string
  minutes: number
  steps: Step[]
  recipe_ingredients:  RecipeIngredient[]
}

interface Step {
  description: string
}

interface RecipeIngredient {
  id: number
}

const Recipes: Component = () => {
  const { sessionStarted, authHeaders } = useCurrentUser()
  const [recipes, setRecipes] = createSignal<Recipe[]>([])
  
  usePrivateRoute()

  createEffect(() => {
    if (!sessionStarted()) return
    
    api.get('/recipes', { headers: authHeaders() })
      .then((response) => {
        setRecipes(response.data as Recipe[])
      })
      .catch((error) => console.error(error))
  })

  return (
    <MainLayout>
      <RecipesWrapper>
        <For each={recipes()} fallback={<div>Loading...</div>}>
          { (recipe: Recipe) => (
            <RecipeCard recipe={recipe} />
          )}
        </For>
      </RecipesWrapper>
    </MainLayout>
  )
}

export default Recipes

/**
 * Styles
 */

const RecipesWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`