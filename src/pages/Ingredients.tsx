import { createSignal, createEffect, For } from 'solid-js'
import type { Component } from "solid-js"
import MainLayout from '../layouts/MainLayout'

interface Ingredient {
  id: string
  name: string
  created_at: string
  updated_at: string
}

const Ingredients: Component = () => {
  const [ingredients, setIngredients] = createSignal<Ingredient[]>([])

  createEffect(() => {
    fetch('http://localhost:5000/ingredients')
      .then((response) => response.json())
      .then((data: Ingredient[]) => setIngredients(data))
      .catch((error) => console.error(error))
  })

  return (
    <MainLayout>
      <For each={ingredients()} fallback={<div>Loading...</div>}>
        { (ingredient: Ingredient) => (
          <div>
            {ingredient.name}
          </div>
        )}
      </For>
    </MainLayout>
  )
}

export default Ingredients
