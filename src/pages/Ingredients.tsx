import { createSignal, createEffect, For } from 'solid-js'
import MainLayout from '../layouts/MainLayout'
import api from '../lib/api'
import type { Component } from "solid-js"

interface Ingredient {
  id: string
  name: string
  created_at: string
  updated_at: string
}

const Ingredients: Component = () => {
  const [ingredients, setIngredients] = createSignal<Ingredient[]>([])

  createEffect(() => {
    api.get('/ingredients')
      .then((response) => {
        setIngredients(response.data as Ingredient[])
      })
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
