import { createSignal, createEffect, For } from 'solid-js'
import MainLayout from '../layouts/MainLayout'
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
  const [recipes, setRecipes] = createSignal<Recipe[]>([])

  createEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((response) => response.json())
      .then((data: Recipe[]) => {
        console.log(data)
        setRecipes(data)
      })
      .catch((error) => console.error(error))
  })

  return (
    <MainLayout>
      <For each={recipes()} fallback={<div>Loading...</div>}>
        { (recipe: Recipe) => (
          <div>
            {recipe.name}
          </div>
        )}
      </For>
    </MainLayout>
  )
}

export default Recipes
