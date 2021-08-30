import { createSignal, createEffect, For } from 'solid-js'

interface Ingredient {
  id: string
  name: string
  created_at: string
  updated_at: string
}

const IngredientList = (props) => {
  const [ingredients, setIngredients] = createSignal<Ingredient[]>([])

  createEffect(() => {
    fetch('http://localhost:5000/ingredients')
      .then((response) => response.json())
      .then((data: Ingredient[]) => setIngredients(data))
      .catch((error) => console.error(error))
  })

  return (
    <div>
      <For each={ingredients()} fallback={<div>Loading...</div>}>
        { (ingredient: Ingredient) => (
          <div>
            {ingredient.name}
          </div>
        )}
      </For>
    </div>
  )
}

export default IngredientList
