import { createSignal, createEffect, For } from 'solid-js'
import { useParams } from 'solid-app-router'
import { styled } from 'solid-styled-components'
import RecipeLayout from '@layouts/RecipeLayout'
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
  const [recipe, setRecipe] = createSignal<Recipe | null>(null)
  const params = useParams()

  usePrivateRoute()

  createEffect(() => {
    if (!sessionStarted()) return
    
    api.get(`/recipes/${params.id}`, { headers: authHeaders() })
      .then((response) => {
        console.log(response.data)
        setRecipe(response.data as Recipe)
      })
      .catch((error) => console.error(error))
  })

  return (
    <RecipeLayout>
      <RecipeWrapper>
        <Header>

        </Header>
      </RecipeWrapper>
    </RecipeLayout>
  )
}

export default Recipes

/**
 * Styles
 */

const RecipeWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const Header = styled('div')`
  height: 300px;
  width: 100%;
  background-image: url(https://s01.sgp1.cdn.digitaloceanspaces.com/article/143395-pysnzzzleh-1593090551.jpg);
  background-size: cover;
`
